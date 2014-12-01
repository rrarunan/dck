//Docker daemon service in NodeJS
//Dependencies: Requires Docker Daemon to be running in the background
//1. Check if docker is running, if not fail
//2. Run `docker ps` and parse the results
//3. Run `docker inspect <id>` on demand and provide output

global.DaemonService = {
  currentHeaders: [],
  currentContainers: []
};

var rct = require('grunt-react');
console.log(rct);

(function () {
  var shell = require('shelljs'),
      Readable = require('stream').Readable,
      byline = require('byline'),
      _ = require('underscore'),
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
              currentContainer[DaemonService.currentHeaders[i]] = values[i];
            }
            checkAndUpdate(currentContainer);
          }
          ++lineCount;
          //console.log(line);
        });

      },
      checkAndUpdate = function(currentContainer) {
        //Push into DaemonService's currentContainers array
        //Push into currentContainers if ID not present already
        //Otherwise, just update that entry
        if(DaemonService.currentContainers.length >= 1) {
          for(j = 0; j < DaemonService.currentContainers.length; ++j) {
            pickId = _.pick(DaemonService.currentContainers[j], "containerId");
            console.log("Checking if present:" + JSON.stringify(pickId));
            if(_.values(pickId) === currentContainer.containerId) {
              //replace
              console.log("ID Already present. Updating...");
              DaemonService.currentContainers[j] = currentContainer;
            } else {
              console.log("New Entry. Adding...");
              //new
              DaemonService.currentContainers.push(currentContainer);
              //Log the current containers
              console.log(JSON.stringify(DaemonService.currentContainers))
            }
          }
        } else if(DaemonService.currentContainers.length === 0) {
          //No containers present
          DaemonService.currentContainers.push(currentContainer);
          //Log the current containers
          console.log(JSON.stringify(DaemonService.currentContainers))
        }
      };

  //Check if the Docker Daemon is available
  if(!shell.which('docker')) {
    shell.echo ("Sorry! Requires docker daemon to run.");
    shell.exit(1);
  }

  //Run `docker ps` and run it everytime a new container is added by docker
  if(shell.exec('docker ps', {silent: true}).code !== -1) {
    shell.echo("Running docker ps...");
    parseSummary(shell.exec('docker ps', {silent: true}).output);
  }
})()
