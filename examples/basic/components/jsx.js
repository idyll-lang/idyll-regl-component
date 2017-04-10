import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import js from 'highlight.js/lib/languages/javascript';
import docco from 'react-syntax-highlighter/dist/styles/docco';

registerLanguage('javascript', js);

const React = require('react');
const IdyllComponent = require('idyll-component');

class CustomComponent extends IdyllComponent {
  render() {
    return <SyntaxHighlighter language='javascript' style={docco}>{this.props.children}</SyntaxHighlighter>;
  }
}

module.exports = CustomComponent;
