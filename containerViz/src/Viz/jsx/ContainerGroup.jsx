/** @jsx React.DOM **/

var React = require("React");
var DockerContainerGrid = require("./DockerContainerVisualGrid.jsx");
var data = [{"containerId":"8e79450bf64e","image":"ubuntu:latest",
"command":"\"/bin/bash\"","created":"4 days ago","status":"Up 16 hours",
"ports":"","names":"jovial_meitner"}];

module.exports = React.createClass({
  render: function() {
    return (
      <div className="containerGroup">
        <h2 className="groupTitle">Docker Containers</h2>
        <div className="groupBody">
          <DockerContainerGrid data={data}/>
        </div>
      </div>
    );
  }
});
