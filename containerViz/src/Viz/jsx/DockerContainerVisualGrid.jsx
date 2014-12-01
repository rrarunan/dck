/** @jsx React.DOM **/

var React = require("React");
var DockerContainer = require("./DockerContainer.jsx");

module.exports = React.createClass({
  render: function() {
    var containerNodes = this.props.data.map(function(dockerContainer) {
      return (
        <DockerContainer name={dockerContainer.names}>
          Status: {dockerContainer.status}
        </DockerContainer>
      );
    });
    return (
      <ul className="containerBox">
        {containerNodes}
      </ul>
    );
  }
});
