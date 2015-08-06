(function() {
  'use strict';

  //TODO: Use real react component
  var reactComponent = null;
  var module = angular.module('app', []);
  var reactComponent = null, population = null;
  var props = {a: 1, b: 2};

  module.directive('myDirective', function() {
    return Reactular.directive(reactComponent, {
      props: props, //Example of setting initial state

      onStateChange: function(newState) {
        
      },

      onRender: function(component) {
        reactComponent.getModel(); //Calling custom method!
      },

      controller: function($scope) {
        
      }
    });
  });
})();