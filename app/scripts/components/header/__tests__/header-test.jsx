/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '__tests__/helper';
import { Link } from 'react-router';
import Header from '../header';

function setup(props={}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    location: { pathname: '' },
    ...getData('location'),
    ...props
  };
  const wrapper = shallow(<Header {...propData}/>);
  return {
    props,
    wrapper
  };
}

describe('<Header/>', () => {
  it('renders as a <header>', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('header');
  });

  it('contains 4 links', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Link)).to.have.length(4);
  });

  it('should render 3 icons', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.icon-add')).to.have.length(1);
    expect(wrapper.find('.icon-playlist')).to.have.length(1);
    expect(wrapper.find('.icon-settings')).to.have.length(1);
  });
});
