/** @jsx React.DOM **/

var React = require("React");
var DockerContainerGrid = require("./DockerContainerVisualGrid.jsx");

module.exports = React.createClass({
  //Initial state
  getInitialState: function() {
    return {
      data: []
    };
  },
  //Load Container Summary from Server
  loadContainerSummary: function() {
    $.get(this.props.dataUrl, function(result) {
      var data = Array.isArray(result) ? result : JSON.parse(result);
      this.setState({
        data: data
      });
    }.bind(this));
  },
  //When Component is Mounted
  componentDidMount: function() {
    this.loadContainerSummary();
    window.setInterval(this.loadContainerSummary, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="containerGroup">
        <h2 className="groupTitle">Docker Containers</h2>
        <div className="groupBody">
          <DockerContainerGrid data={this.state.data}/>
        </div>
      </div>
    );
  }
});
