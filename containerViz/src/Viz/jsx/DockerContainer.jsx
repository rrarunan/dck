/** @jsx React.DOM **/

var React = require("React");

module.exports = React.createClass({
  render: function() {
    return(
      <li className="dockerContainer">
        <div className="containerName containerItem">{this.props.name}</div><br/>
        <div className="containerStatus containerItem">{this.props.status}</div>
      </li>
    );
  }
});
