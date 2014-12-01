/** @jsx React.DOM **/

var React = require("React");
var DockerContainer = require("./DockerContainer.jsx");

module.exports = React.createClass({
  render: function() {
    var containerNodes = [];
    if(this.props.data.length > 0) {
      containerNodes = this.props.data.map(function(dockerContainer) {
        return (
          <DockerContainer name={dockerContainer.names} status={dockerContainer.status}>
          </DockerContainer>
        );
      });
    }
    return (
      <ul className="containerBox">
        {containerNodes}
      </ul>
    );
  }
});
