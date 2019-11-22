import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  STYLES,
  getOpacity,
  getZIndex,
  getTransform,
  getBoxShadow,
  getCursor,
} from './styles.js';
import { POSITION, ALIGNMENT, SPREAD } from './constants.js';


/**
 * React Card Carousel
 * @returns {React.Node}
 */
class Cards extends Component {

  constructor(props) {
    super(props);

    this.state = {
      current_index: props.disable_fade_in ? props.initial_index : null,
      interval: null,
    };
  }

  static propTypes = {
    alignment: PropTypes.oneOf([ALIGNMENT.HORIZONTAL, ALIGNMENT.VERTICAL]),
    spread: PropTypes.oneOf([SPREAD.NARROW, SPREAD.MEDIUM, SPREAD.WIDE]),
    initial_index: PropTypes.number,
    disable_keydown: PropTypes.bool,
    disable_box_shadow: PropTypes.bool,
    disable_fade_in: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplay_speed: PropTypes.number,
    afterChange: PropTypes.func,
  }

  static defaultProps = {
    alignment: ALIGNMENT.HORIZONTAL,
    spread: SPREAD.MEDIUM,
    initial_index: 0,
    disable_keydown: false,
    disable_box_shadow: false,
    disable_fade_in: false,
    autoplay: false,
    autoplay_speed: 5000,
    afterChange: () => {},
  }

  /**
   * @public
   * Sets current index state
   */
  goTo = (idx) => {
    this.setState({ current_index: Number(idx) }, this.props.afterChange);
  }

  /**
   * @public
   * Goes to next card
   */
  next = () => {
    if (this._is_mounted) {
      this._cardOnClick(POSITION.NEXT);
    }
  }

  /**
   * @public
   * Goes to previous card
   */
  prev = () => this._cardOnClick(POSITION.PREV);

  /**
   * @public
   * Gets current card index
   */
  getCurrentIndex = () => this.state.current_index;

  componentDidMount() {
    const {
      initial_index,
      disable_keydown,
      disable_fade_in,
      autoplay,
    } = this.props;

    this._is_mounted = true;

    // Triggers initial animation
    if (!disable_fade_in) setTimeout(() => {
      this.setState({ current_index: initial_index });
    }, 0.25);

    // Sets right and left key event listener
    if (!disable_keydown) {
      document.onkeydown = this._keydownEventListener;
    }

    // Sets autoplay interval
    if (autoplay) this._autoplay();
  }

  componentWillUnmount() {
    this._is_mounted = false;
    if (!this.props.disable_keydown) document.onkeydown = null;
  }

  /**
   * Event listener for left/right arrow keys
   */
  _keydownEventListener = (e) => {
    if (e.which === 39) {
      return this.next();
    }
    if (e.which === 37) {
      return this.prev();
    }
  }

  /**
   * Sets interval for advancing cards
   */
  _autoplay = () => {
    if (this._is_mounted) {
      const { autoplay_speed } = this.props;
      const interval = setInterval(this.next, autoplay_speed);
      this.setState({ interval });
    }
  }

  /**
   * Resets autoplay interval
   */
  _resetInterval = () => {
    clearInterval(this.state.interval);
    this._autoplay();
  }

  /**
   * Gets card class for a specific card index
   * @param {Number} index
   * @returns {String}
   */
  _getCardClass = (index) => {
    const { children } = this.props;
    const { current_index } = this.state;

    if (current_index === null) return POSITION.HIDDEN;

    if (index === current_index) return POSITION.CURRENT;

    if (index === current_index + 1
      || (index === 0 && current_index === React.Children.count(children) - 1)) {
      return POSITION.NEXT;
    }

    if (index === current_index - 1
      || (index === React.Children.count(children) - 1 && current_index === 0)) {
      return POSITION.PREV;
    }

    return POSITION.HIDDEN;
  }

  /**
   * Changes current_index state
   * @param {String} position
   */
  _cardOnClick = (position) => {
    const { children, autoplay } = this.props;
    const { current_index } = this.state;

    if (autoplay) this._resetInterval();

    if (position === POSITION.NEXT) {
      if (current_index === React.Children.count(children) - 1) {
        this.setState({ current_index: 0 }, this.props.afterChange);
      }
      else this.setState({ current_index: current_index + 1 }, this.props.afterChange);
    }

    else if (position === POSITION.PREV) {
      if (current_index === 0) {
        this.setState({ current_index: React.Children.count(children) - 1 }, this.props.afterChange);
      }
      else this.setState({ current_index: current_index - 1 }, this.props.afterChange);
    }
  }

  /**
   * @returns {React.Node}
   */
  ChildComponents = () => {
    const { alignment, spread, disable_box_shadow } = this.props;

    return React.Children.map(
      this.props.children, (child, index) => {

        const position = this._getCardClass(index);

        return (
          <div
            key={ index }
            onClick={ () => this._cardOnClick(position) }
            style={{
              ...STYLES.CARD,
              opacity: getOpacity(position),
              zIndex: getZIndex(position),
              transform: getTransform(position, alignment, spread),
              boxShadow: getBoxShadow(position, alignment, disable_box_shadow),
              cursor: getCursor(position, alignment),
            }}
          >
            { child }
          </div>
        );
      });
  }

  render() {
    return (
      <div style={ STYLES.CONTAINER }>
        <this.ChildComponents />
      </div>
    );
  }
}

export default Cards;