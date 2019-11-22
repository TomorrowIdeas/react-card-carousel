# React Card Carousel
A simple React carousel.
* <a href="https://github.com/TomorrowIdeas/react-card-carousel" target="_blank">GitHub</a>
* <a href="https://codesandbox.io/s/react-card-carousel-0gib5" target="_blank">Demo</a>

## Installation
```
npm install react-card-carousel --save
```

## Peer Dependencies
Be sure to have all peer dependencies installed as well. React Card Carousel requires the peer dependencies below:
* `react`
* `react-dom`
* `prop-types`

## Current Version: 1.1.3
* 1.1.3 fixed setState warning on componentWillUnmount
* Removed styled-components as a peer dependency
* Greatly reduced package size
* Various bug fixes

## Usage
Import ReactCardCarousel and use it as a wrapper around card elements. Example:

```
import React, { Component } from 'react';
import ReactCardCarousel from 'react-card-carousel';

class MyCarousel extends Component {

  static get CARD_STYLE() {
    return {
      height: '200px',
      width: '200px',
      paddingTop: '80px',
      textAlign: 'center',
      background: '#52C0F5',
      color: '#FFF',
      fontSize: '12px',
      textTransform: 'uppercase',
      borderRadius: '10px',
    };
  }

  render() {
    return (
      <ReactCardCarousel autoplay={ true } autoplay_speed={ 2500 }>
        <div style={ MyCarousel.CARD_STYLE }>
          First Card
        </div>
        <div style={ MyCarousel.CARD_STYLE }>
          Second Card
        </div>
        <div style={ MyCarousel.CARD_STYLE }>
          Third Card
        </div>
        <div style={ MyCarousel.CARD_STYLE }>
          Fourth Card
        </div>
        <div style={ MyCarousel.CARD_STYLE }>
          Fifth Card
        </div>
      </ReactCardCarousel>
    );
  }
}

export default MyCarousel;
```

## Props
* `alignment` (String, oneOf[`horizontal`, `vertical`], default: `horizontal`): Card alignment display.
* `spread` (String, oneOf[`narrow`, `medium`, `wide`], default: `medium`): Spread between cards.
* `initial_index` (Number, default: 0): Which card to display as center card initially.
* `disable_keydown` (Boolean, default: false): Disables left and right arrow key scroll.
* `disable_box_shadow` (Boolean, default: false): Disables box shadow around center card.
* `disable_fade_in` (Boolean, default: false): Disables initial animation on component render.
* `autoplay` (Boolean, default: false)
* `autoplay_speed` (Number, default: 5000): Number in milliseconds.
* `afterChange` (Function, default: null): After card change function.

## Methods
To use any instance methods, you must first create a ref to the ReactCardCarousel instance. Learn more about React refs in the official <a href="https://reactjs.org/docs/refs-and-the-dom.html" target="_blank">documentation</a>.

```
<ReactCardCarousel ref={ Carousel => this.Carousel = Carousel }>
```

The methods can be accessed on the `this.Carousel` instance:
* `this.Carousel.next()`: Sets next card as center card.
* `this.Carousel.prev()`: Sets previous card as center card.
* `this.Carousel.goTo(index)`: Sets the specified number index as center card.
* `this.Carousel.getCurrentIndex()`: Gets current card index.

*NOTE*: If you choose to create the ref using React.createRef() instead of using a callback ref, the methods can be accessed on the `this.Carousel.current` instance.

## Credits
Created by <a href="https://github.com/strawbee" target="_blank">@strawbee</a> at <a href="https://tomorrow.me">Tomorrow Ideas</a>.