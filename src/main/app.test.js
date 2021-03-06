import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import moment from 'moment'

import App from './app'
import Result from '../result/result'

describe('<App />', () => {
  it('renders <Result /> component', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().calculateResult()

    expect(wrapper.find(Result)).to.have.length(1)
  })

  it('sets initial Date on the state', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().handleInitialDate('25-07-2017')
    wrapper.update()

    expect(wrapper.state('initialDate')).to.equal('25-07-2017');
  })

  it('sets initial number of days on the state', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().handleNumberOfDays('10')
    wrapper.update()

    expect(wrapper.state('numberOfDays')).to.equal(10);
  })


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

  describe('calculates number of weekends before the vacation', () => {
    const wrapper = shallow(<App />)

    it('when the first day is monday', () => {
      const startDate = moment('03-07-2017', 'DD-MM-YYYY').startOf('day')
      const totalDays = wrapper.instance().calcDayInTheBeginning(startDate)

      expect(totalDays).to.equal(2)
    })

    it('when the first day is sunday', () => {
      const startDate = moment('23-07-2017', 'DD-MM-YYYY').startOf('day')
      const totalDays = wrapper.instance().calcDayInTheBeginning(startDate)

      expect(totalDays).to.equal(1)
    })

    it('when the first day is saturday', () => {
      const startDate = moment('01-07-2017', 'DD-MM-YYYY').startOf('day')
      const totalDays = wrapper.instance().calcDayInTheBeginning(startDate)

      expect(totalDays).to.equal(0)
    })
  })

  describe('calculates number of weekends after the vacation', () => {
    const wrapper = shallow(<App />)

    it('when the last day is friday', () => {
      const endDate = moment('14-07-2017', 'DD-MM-YYYY').startOf('day')
      const totalDays = wrapper.instance().calcDayInTheEnd(endDate)

      expect(totalDays).to.equal(2)
    })

    it('when the last day is saturday', () => {
      const endDate = moment('15-07-2017', 'DD-MM-YYYY').startOf('day')
      const totalDays = wrapper.instance().calcDayInTheEnd(endDate)

      expect(totalDays).to.equal(1)
    })

    it('when the last day is sunday', () => {
      const endDate = moment('16-07-2017', 'DD-MM-YYYY').startOf('day')
      const totalDays = wrapper.instance().calcDayInTheEnd(endDate)

      expect(totalDays).to.equal(0)
    })
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

    expect(wrapper.instance().isWeekend(startDate.day())).to.be.true
  })
})
