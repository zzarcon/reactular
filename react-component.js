var ReactComponent = React.createClass({
  render: function() {
    return <span>Hello {this.props.fname} {this.props.lname}</span>;
  }
});
console.log(window.ReactComponent)