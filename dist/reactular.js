(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.reactular = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function (options) {
  var module = options.module;
  var name = options.name; 
  var definition = options.definition;

	if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = definition();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(definition);
  } 

  if (typeof window != 'undefined') {
    // Global Variables
    window[name] = definition();
  }
};
},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exportable = require("exportable");

var _exportable2 = _interopRequireDefault(_exportable);

var Reactular = function Reactular() {
  function render(component, props, element) {
    return React.render(React.createElement(component, props), element);
  }

  function directive(component, params) {
    var props = params.props;
    var scope = null;

    props.onStateChange = function () {
      params.onStateChange.apply(this, arguments);

      if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
        scope.$apply();
      }
    };

    var directive = {
      restrict: "E",
      replace: true,
      link: function link(scope, elem, attrs) {
        var domElement = elem[0];

        directive.reactComponent = render(component, props, domElement);
        params.onRender(directive.reactComponent);

        scope.$on('$destroy', function () {
          React.unmountComponentAtNode(domElement);
        });
      },
      controller: function controller($scope) {
        scope = $scope;
        params.controller.apply(this, arguments);
      }
    };

    return directive;
  };

  return {
    render: render,
    directive: directive
  };
};

(0, _exportable2['default'])({
  module: module,
  name: 'Reactular',
  definition: Reactular
});

},{"exportable":1}]},{},[2])(2)
});