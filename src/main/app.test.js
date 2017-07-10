import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import moment from 'moment'

import App from './app'
import Result from './result'

describe('<App />', () => {
  it('renders <Result /> component', () => {
    const wrapper = shallow(<App />)
    wrapper.find('button').simulate('click', { preventDefault: () => {} })

    expect(wrapper.find(Result)).to.have.length(1)
  });

  it('calculates vacation end date', () => {
    const wrapper = shallow(<App />)
    const startDate = moment('03-07-2017', 'DD-MM-YYYY').startOf('day')
    const endDate = wrapper.instance().calcEndDate(startDate, 15)

    expect(endDate.format('DD-MM-YYYY')).to.equal('17-07-2017')
  })

  it('calculates number of week days in the vacation', () => {
    const wrapper = shallow(<App />)
    const startDate = moment('03-07-2017', 'DD-MM-YYYY').startOf('day')
    const endDate = moment('17-07-2017', 'DD-MM-YYYY').startOf('day')
    const daysOfWeek = wrapper.instance().calcDaysOfWeek(startDate, endDate)

    expect(daysOfWeek).to.equal(11)
  })

  it('calculates number of weekends in the vacation', () => {
    const wrapper = shallow(<App />)
    const daysOfWeek = wrapper.instance().calcWeekends(15, 11)

    expect(daysOfWeek).to.equal(4)
  })

  it('calculates number of weekends before the vacation', () => {
    const wrapper = shallow(<App />)
    const startDate = moment('03-07-2017', 'DD-MM-YYYY').startOf('day')
    const totalDays = wrapper.instance().calcDayInTheBeginning(startDate)

    expect(totalDays).to.equal(2)
  })

  it('calculates number of weekends after the vacation', () => {
    const wrapper = shallow(<App />)
    const endDate = moment('17-07-2017', 'DD-MM-YYYY').startOf('day')
    const totalDays = wrapper.instance().calcDayInTheEnd(endDate)

    expect(totalDays).to.equal(0)
  })

  it('calculates total number of days in the vacation, including weekends before and after', () => {
    const wrapper = shallow(<App />)
    const startDate = moment('03-07-2017', 'DD-MM-YYYY').startOf('day')
    const endDate = moment('17-07-2017', 'DD-MM-YYYY').startOf('day')
    const totalDays = wrapper.instance().calcTotalDays(startDate, endDate, 15)

    expect(totalDays).to.equal(17)
  })

  it('calculates if a day is weekend', () => {
    const wrapper = shallow(<App />)
    const startDate = moment('16-07-2017', 'DD-MM-YYYY').startOf('day')
    const isWeekend = wrapper.instance().isWeekend(startDate.day())

    expect(isWeekend).to.be.true;
  })

});
