'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var multiREGL = void 0;
try {
  multiREGL = require('multi-regl')();
} catch (e) {}

var ReglComponent = function (_React$Component) {
  _inherits(ReglComponent, _React$Component);

  function ReglComponent() {
    _classCallCheck(this, ReglComponent);

    return _possibleConstructorReturn(this, (ReglComponent.__proto__ || Object.getPrototypeOf(ReglComponent)).apply(this, arguments));
  }

  _createClass(ReglComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (_get(ReglComponent.prototype.__proto__ || Object.getPrototypeOf(ReglComponent.prototype), 'componentDidMount', this)) {
        _get(ReglComponent.prototype.__proto__ || Object.getPrototypeOf(ReglComponent.prototype), 'componentDidMount', this).call(this);
      }
      var node = ReactDOM.findDOMNode(this);
      this.initialize(multiREGL, node, this.props);
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      // console.warn('initialize() not defined on ReglComponent.');
    }
  }, {
    key: 'update',
    value: function update() {
      // console.warn('update() not defined on ReglComponent.');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.update(nextProps);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          onClick = _props.onClick;

      className = (className ? className : '') + ' regl';
      return React.createElement('div', { className: className, style: style, onClick: onClick });
    }
  }]);

  return ReglComponent;
}(React.Component);

ReglComponent.defaultProps = {
  className: ''
};

module.exports = ReglComponent;
