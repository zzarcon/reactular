(function(root) {
  function render(component, props, element) {
    return React.render(React.createElement(component, props), element);
  }

  function directive(component, params) {
    var props = params.props;
    var scope = null;

    props.onStateChange = function() {
      params.onStateChange.apply(this, arguments);

      if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
        scope.$apply();
      }
    };

    var directive = {
      restrict: "E",
      replace: true,
      link: function(scope, elem, attrs) {
        var domElement = elem[0];

        directive.reactComponent = render(component, props, domElement);
        params.onRender(directive.reactComponent);

        scope.$on('$destroy', function() {
          React.unmountComponentAtNode(domElement);
        });
      },
      controller: function($scope) {
        scope = $scope;
        params.controller.apply(this, arguments);
      }
    };

    return directive;
  };

  //TODO: export supporting AMD and CommonJS
  root.Reactular = {
    render: render,
    directive: directive
  };
})(window);