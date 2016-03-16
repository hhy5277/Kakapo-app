/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '__tests__/helper';
import { Link } from 'react-router';
import Options from '../options';

function setup(props = {}) {
  const propData = {
    ...getData('intl'),
    ...props
  };
  const wrapper = shallow(<Options {...propData} />);
  return {
    props,
    wrapper
  };
}

describe('<Options/>', () => {
  it('renders as a <div> with className equals `downloads`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('downloads');
  });

  it('contains 6 links', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Link)).to.have.length(6);
  });

  it('should render 6 icons', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.icon-img-kakapo')).to.have.length(1);
    expect(wrapper.find('.icon-img-youtube')).to.have.length(1);
    expect(wrapper.find('.icon-img-soundcloud')).to.have.length(1);
    expect(wrapper.find('.icon-img-custom')).to.have.length(1);
    expect(wrapper.find('.icon-settings')).to.have.length(1);
    expect(wrapper.find('.icon-playlist')).to.have.length(1);
  });
});
