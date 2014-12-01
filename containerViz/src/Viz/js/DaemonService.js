//Docker daemon service in NodeJS
//Dependencies: Requires Docker Daemon to be running in the background
//1. Check if docker is running, if not fail
//2. Run `docker ps` and parse the results
//3. Run `docker inspect <id>` on demand and provide output

global.DaemonService = {
  currentHeaders: [],
  currentContainers: []
};

(function () {
  var shell = require('shelljs'),
      Readable = require('stream').Readable,
      byline = require('byline'),
      _ = require('underscore'),
      app = require('express')(),
      http = require('http').Server(app),
      parseSummary = function(summaryString) {
        //Create readable stream
        var rs = new Readable,
            lineStream,
            lineCount = 0,
            ctrObjectTemplate = {},
            //Ref: http://stackoverflow.com/questions/10425287/convert-string-to-camelcase-with-regular-expression
            camelCase = function (input) {
              //console.log("Input: " + input);
              return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
                //console.log("Match: " + match);
                return group1.toUpperCase();
              });
            },
            splitData = function(dataString) {
              var i,
                  dataItems = [];
              //TODO: very bad assumption here, think of something better
              //CONTAINER ID         -> 20 characters
              for(i=0; i<dataString.length; i+=20) {
                dataItems.push(dataString.substring(i, i+20).trim());
              }
              return dataItems;
            };

        rs.setEncoding('utf8');
        rs.push(summaryString);
        rs.push(null);

        lineStream = byline(rs);
        lineStream.on('data', function(line) {
          var headerKeys = [],
              values = [],
              i, j,
              currentContainer,
              pickId;

          if(lineCount === 0) {
            //first line
            //Dynamically create keys of an object based on first line/header
            headerKeys = splitData(line);
            DaemonService.currentHeaders = headerKeys;
            for(i = 0; i < headerKeys.length; ++i) {
              headerKeys[i] = headerKeys[i].replace(" ", "-");
              headerKeys[i] = camelCase(headerKeys[i])
              //console.log("Creating Key: " + headerKeys[i] + "\n");
              ctrObjectTemplate[headerKeys[i]] = "";  //initialize to empty String
            }
          } else {
            currentContainer = _.clone(ctrObjectTemplate);
            values = splitData(line);
            for(i = 0; i < values.length; ++i) {
              if(DaemonService.currentHeaders[i] != null) {
                currentContainer[DaemonService.currentHeaders[i]] = values[i];
              }
            }
            checkAndUpdate(currentContainer);
          }
          ++lineCount;
          //console.log(line);
        });

      },
      checkAndUpdate = function(currentContainer) {
        //console.log("Current Container: " + currentContainer);
        var updatedEntry = false;
        //Push into DaemonService's currentContainers array
        //Push into currentContainers if ID not present already
        //Otherwise, just update that entry
        if(DaemonService.currentContainers.length >= 1) {
          for(j = 0; j < DaemonService.currentContainers.length; ++j) {
            pickId = _.pick(DaemonService.currentContainers[j], "containerId");
            /*console.log("Checking if present:" + _.values(pickId) +
              " With: " + currentContainer.containerId);*/

            if(_.values(pickId) == currentContainer.containerId) {
              //replace
              console.log("ID Already present. Updating...");
              DaemonService.currentContainers[j] = currentContainer;
              //console.log(JSON.stringify(DaemonService.currentContainers));
              updatedEntry = true;
              break;
            }
          }
          //if not in the list
          if (!updatedEntry) {
            DaemonService.currentContainers.push(currentContainer);
            //Log the current containers
            //console.log(JSON.stringify(DaemonService.currentContainers));
          } else {
            updatedEntry = false;
          }
        } else {
          //No containers present
          DaemonService.currentContainers.push(currentContainer);
          //Log the current containers
          //console.log(JSON.stringify(DaemonService.currentContainers));
        }
      },
      runDockerPS = function() {
        if(shell.exec('docker ps', {silent: true}).code !== -1) {
          shell.echo("Running docker ps...");
          parseSummary(shell.exec('docker ps', {silent: true}).output);
        }
      };

  //Check if the Docker Daemon is available
  if(!shell.which('docker')) {
    shell.echo ("Sorry! Requires docker daemon to run.");
    shell.exit(1);
  } else {
    //Run `docker ps` and run it every 30 seconds
    runDockerPS();
    //Short Polling implementation: Refresh data every 30 seconds
    setInterval(runDockerPS, 30000);
  }

  //Server App
  app.get('/ps', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9001');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.send(JSON.stringify(DaemonService.currentContainers));
  });

  http.listen(3000, function(){
    console.log('node http server listening on *:3000');
  });
})()
