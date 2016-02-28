/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Map } from 'immutable';
import { getData } from '__tests__/helper';
import { newSoundClass } from 'classes/';
import SoundList from '../soundList';

function setup(props = {}) {
  const propData = {
    ...getData('sounds'),
    ...getData('themes'),
    ...getData('intl'),
    ...props
  };
  const wrapper = shallow(<SoundList {...propData} />);
  return {
    props,
    wrapper
  };
}

function randomSounds(count) {
  let arr = new Map();
  for (let i = 0; i < count; i++) {
    const obj = { ...newSoundClass, progress: i > 2 ? 1 : 0.5, editing: i > 2 };
    arr = arr.set(i, Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? `test${i}` : obj[_e];
      return newObj;
    }, {}));
  }
  return arr;
}

describe('<SoundList/>', () => {
  it('renders null if no sounds', () => {
    const { wrapper } = setup();
    expect(wrapper.html()).to.eql('<div></div>');
  });

  describe('When given props', () => {
    it('renders as a <div> with className equals `container pure-g`', () => {
      const { wrapper } = setup({ sounds: randomSounds(4) });
      expect(wrapper.type()).to.eql('div');
      expect(wrapper.prop('className')).to.eql('container pure-g');
    });

    it('should only render sounds with `progress` === 1', () => {
      const { wrapper } = setup({ sounds: randomSounds(8) });
      expect(wrapper.find('.sound-item-wrap').length).to.eql(5);
    });
  });
});
