import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import Form from './form'


describe('<Form />', () => {
  it('renders <DatePicker /> component', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Form
        handleNumberOfDaysChange={spy}
        handleInitialDateChange={spy}
        calculateResult={spy}
      />)
    expect(wrapper.find(DatePicker)).to.have.length(1)
  })

  it('set initial date of vacation', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Form
        handleNumberOfDaysChange={spy}
        handleInitialDateChange={spy}
        calculateResult={spy}
      />)
    wrapper.find(DatePicker).simulate('change', { target: { value: '2016-07-04' } })

    sinon.assert.calledOnce(spy)
  })

  it('set number of days of vacation', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Form
        handleNumberOfDaysChange={spy}
        handleInitialDateChange={spy}
        calculateResult={spy}
      />)
    wrapper.find(TextField).simulate('change', { target: { value: '7' } })

    sinon.assert.calledOnce(spy)
  })

  it('call the calculateResult prop method', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Form
        handleNumberOfDaysChange={spy}
        handleInitialDateChange={spy}
        calculateResult={spy}
      />)
    wrapper.find(RaisedButton).simulate('click', { preventDefault() {} })

    sinon.assert.calledOnce(spy)
  })
});
