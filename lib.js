const React = require('react');
const ReactDOM = require('react-dom');
const multiREGL = require('multi-regl')();
const IdyllComponent = require('idyll-component');

class ReglComponent extends IdyllComponent {

  componentDidMount() {
    if (super.componentDidMount) {
      super.componentDidMount();
    }
    const node = ReactDOM.findDOMNode(this);
    this.initialize(multiREGL, node, this.props);
  }

  initialize() {
    // console.warn('initialize() not defined on ReglComponent.');
  }

  update() {
    // console.warn('update() not defined on ReglComponent.');
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let { className, style, onClick } = this.props;
    className = (className ? className : '') + ' regl';
    return React.createElement('div', { className, style, onClick });
  }
}

ReglComponent.defaultProps = {
  className: ''
};

module.exports = ReglComponent;
