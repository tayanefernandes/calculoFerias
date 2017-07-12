import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import DatePicker from 'material-ui/DatePicker'

import Form from './form'


describe('<Form />', () => {
  it('renders <DatePicker /> component', () => {
    const wrapper = shallow(<Form />)
    expect(wrapper.find(DatePicker)).to.have.length(1)
  })

  it('set initial date of vacation', () => {
    const wrapper = shallow(<App />)
    wrapper.find(DatePicker).simulate('change', { target: {
      value: '18-06-2017' }
    });
    wrapper.update()

    expect(wrapper.state().initialDate).to.equal('18-06-2017');
  })

  it('set number of days of vacation', () => {
    const wrapper = shallow(<App />)
    wrapper.find('#numberOfDays').simulate('change', { target: {
      value: '7' }
    })
    wrapper.update()

    expect(wrapper.state().numberOfDays).to.equal(7);
  })
});
