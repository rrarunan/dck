/** @jsx React.DOM **/

var React = require("React");

module.exports = React.createClass({
  render: function() {
    return(
      <li className="dockerContainer">
        {this.props.name}
      </li>
    );
  }
});
