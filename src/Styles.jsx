import React from 'react';
import styled from 'styled-components';
import { POSITION, ALIGNMENT, SPREAD } from './constants';

/**
 * @returns {React.Node}
 */
export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

/**
 * @returns {React.Node}
 */
export const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all 0.6s;
  opacity: ${ props => getOpacity(props.position) };
  z-index: ${ props => getZIndex(props.position) };
  transform: ${ props => getTransform(
    props.position,
    props.alignment,
    props.spread) };
  box-shadow: ${ props => getBoxShadow(
    props.position,
    props.alignment,
    props.disable_box_shadow) };
  cursor: ${ props => getCursor(props.position, props.alignment) };
`;

/**
 * @param {String} position
 * @returns {Number}
 */
function getOpacity(position) {
  if (position === POSITION.HIDDEN) return 0;
  return 1;
}

/**
 * @param {String} position
 * @returns {Number}
 */
function getZIndex(position) {
  if (position === POSITION.HIDDEN) return 0;
  if (position === POSITION.CURRENT) return 2;
  return 1;
}

/**
 * @param {String} position
 * @returns {String}
 */
function getTransform(position, alignment, spread) {
  const { prev, next } = getTranslationDistances(spread);

  if (alignment === ALIGNMENT.HORIZONTAL) {
    if (position === POSITION.PREV) return `translate(${ prev }, -50%) scale(0.82)`;
    if (position === POSITION.NEXT) return `translate(${ next }, -50%) scale(0.82)`;
  }
  if (alignment === ALIGNMENT.VERTICAL) {
    if (position === POSITION.PREV) return `translate(-50%, ${ prev }) scale(0.82)`;
    if (position === POSITION.NEXT) return `translate(-50%, ${ next }) scale(0.82)`;
  }
  return 'translate(-50%, -50%)';
}

/**
 * @param {String} spread
 * @returns {Object}
 */
function getTranslationDistances(spread) {
  let prev, next;
  if (spread === SPREAD.MEDIUM) {
    prev = '-85%';
    next = '-15%';
  }
  else if (spread === SPREAD.NARROW) {
    prev = '-75%';
    next = '-25%';
  }
  else if (spread === SPREAD.WIDE) {
    prev = '-95%';
    next = '-5%';
  }

  return { prev, next };
}

/**
 * @param {String} position
 * @returns {String}
 */
function getBoxShadow(position, alignment, disable_box_shadow) {
  if (!disable_box_shadow && position === POSITION.CURRENT) {
    if (alignment === ALIGNMENT.HORIZONTAL) {
      return '30px 0px 20px -20px rgba(0, 0, 0, .4), -30px 0px 20px -20px rgba(0, 0, 0, .4)';
    }
    if (alignment === ALIGNMENT.VERTICAL) {
      return '0px 30px 20px -20px rgba(0, 0, 0, .4), 0px -30px 20px -20px rgba(0, 0, 0, .4)';

    }
  }
  return 'unset';
}

/**
 * @param {String} position
 * @returns {String}
 */
function getCursor(position, alignment) {
  if (position === POSITION.NEXT) {
    if (alignment === ALIGNMENT.HORIZONTAL) return 'e-resize';
    if (alignment === ALIGNMENT.VERTICAL) return 's-resize';
  }
  if (position === POSITION.PREV) {
    if (alignment === ALIGNMENT.HORIZONTAL) return 'w-resize';
    if (alignment === ALIGNMENT.VERTICAL) return 'n-resize';
  }
  return 'unset';
}