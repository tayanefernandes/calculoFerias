import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Result from './result'

describe('<Result />', () => {
  it('renders <div /> with paragraphs when showResult prop is true', () => {
    const wrapper = shallow(<Result showResult />)
    expect(wrapper.find('div')).to.have.length(1)
    expect(wrapper.find('p')).to.have.length(4)
  })

  it('does not render <div /> when prop is false', () => {
    const wrapper = shallow(<Result showResult={false} />)
    expect(wrapper.find('div')).to.have.length(0)
  })
})
