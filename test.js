(function(exports) {
  var ReactComponent = React.createClass({
    render: function() {
      return React.createElement('h1', null, 'Hello, world!');
    }
  });


  var app = angular.module('app', ['reactular']);

  app.controller('fooController', function($scope) {
    $scope.foo = { 
      a: 1,
      b: 2
    };
  });

  app.directive('fooReact', function(reactularDirective) {
    var props = {a: 1, b: 2};
    var directive = reactularDirective(ReactComponent, {
      props: props
    });

    return directive
  });

  exports.app = app;
  exports.ReactComponent = ReactComponent;
})(window);