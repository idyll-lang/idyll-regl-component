# idyll-regl-component

Component base class to make it easy to integrate regl into Idyll projects

## Installation

```
npm install --save idyll-regl-component
```


## Usage

```jsx
const React = require('react');
const ReglComponent = require('idyll-regl-component');
const regl = require('regl');

class CustomReglComponent extends ReglComponent {

  initialize(r, node) {
    // set the width, height of node
    //...
    // then
    const regl = r(node);
    // your regl code here
  }
}

module.exports = CustomReglComponent;
```

In .idl file:
```
[CustomReglComponent someProp:someData /]
```


In order to use this component, you just need to define `initialize`.

### `iniatialize(multiRegl, node)`

The initialize function is called only once when your component first mounts. Use this function to
set up regl's draw loop.

### `update(props)`

This function is called any time the props object changes. Use this function e.g. to update
your component when some property changes. Note, for most cases you shouldn't need to use the
`update` function.

## Options

Anything you pass to your component will be available on the props object.
E.g.

In .idl file:
```
[CustomReglComponent someProperty:"abc" someOtherProperty:"xyz"  /]
```

```jsx
class CustomReglComponent extends ReglComponent {
  initialize(r, node) {
    // this.props:
    // {
    //  someProperty: "abc",
    //  someOtherProperty: "xyz"
    // }

    //...
  }
  update(props){/**/}
}

module.exports = CustomReglComponent;
```

### className

A css class name can be provided.

Sets the className:
```
[CustomReglComponent className:"regl-viz" /]
```

