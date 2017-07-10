import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'

import App from './app'
import Result from './result';

describe('<App />', () => {
  it('renders <Result /> component', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button').simulate('click', { preventDefault: () => {} });

    expect(wrapper.find(Result)).to.have.length(1);
  });
});
