/** @jsx React.DOM */

var React   = require('react');
var ContainerGroup = require('./ContainerGroup.jsx');

React.render(
  <ContainerGroup dataUrl="http://localhost:3000/ps" pollInterval="30000"/>,
  document.body
);
