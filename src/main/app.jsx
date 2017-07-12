import React from 'react'
import moment from 'moment'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


import './custom.css'
import Result from '../result/result'
import Form from '../form/form'

injectTapEventPlugin()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { initialDate: '',  numberOfDays: '', endDateMoment: '', showResult: false }
  }

  calcEndDate(initialDateMoment, numberOfDays) {
    return initialDateMoment.clone().add(numberOfDays - 1, 'day')
  }

  calcDaysOfWeek(initialDateMoment, endDate) {
    let countDaysOfWeek = 0
    let curDate = initialDateMoment.clone();

    while (curDate <= endDate) {
        let day = curDate.day();
        if(!this.isWeekend(day)) {
           countDaysOfWeek++;
        }

        curDate = curDate.add(1, 'day');
    }

    return countDaysOfWeek
  }

  calcWeekends(numberOfDays, numberDaysOfWeek) {
    return numberOfDays - numberDaysOfWeek
  }

  calcTotalDays(initialDateMoment, endDateMoment, numberOfDays) {
    let totalDays = numberOfDays

    totalDays += this.calcDayInTheBeginning(initialDateMoment);
    totalDays += this.calcDayInTheEnd(endDateMoment);

    return totalDays
  }

  calcDayInTheBeginning(initialDateMoment) {
    if(initialDateMoment.day() == 1) {
      return 2
    } else if (initialDateMoment.day() == 0){
      return 1
    }
    return 0
  }

  calcDayInTheEnd(endDate) {
    if(endDate.day() == 5) {
      return 2
    } else if (endDate.day() == 6){
      return 1
    }
    return 0
  }

  isWeekend(dayOfWeek) {
    return (dayOfWeek == 6) || (dayOfWeek == 0);
  }

  handleInitialDate = (value) => {
    this.setState({ initialDate: value })
  }

  handleNumberOfDays = (value) => {
    this.setState({ numberOfDays: parseInt(value) })
  }

  calculateResult = () => {
    const initialDateMoment = moment(this.state.initialDate).startOf('day')
    const endDateMoment = this.calcEndDate(initialDateMoment, this.state.numberOfDays)
    const daysOfWeek = this.calcDaysOfWeek(initialDateMoment, endDateMoment)
    const daysOfWeekend = this.calcWeekends(this.state.numberOfDays, daysOfWeek)
    const totalDays = this.calcTotalDays(initialDateMoment,
      endDateMoment, this.state.numberOfDays)

    this.setState({
      initialDateMoment: initialDateMoment.format('DD/MM/YYYY'),
      endDateMoment: endDateMoment.format('DD/MM/YYYY'),
      daysOfWeek,
      daysOfWeekend,
      totalDays,
      showResult: true
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className='container'>
          <h1>Decida qual o melhor dia para tirar suas férias!</h1>
          <Form handleInitialDateChange={this.handleInitialDate}
                handleNumberOfDaysChange={this.handleNumberOfDays}
                calculateResult={this.calculateResult}/>
          <Result
            showResult={this.state.showResult}
            endDateMoment={this.state.endDateMoment}
            totalDays={this.state.totalDays}
            daysOfWeek={this.state.daysOfWeek}
            daysOfWeekend={this.state.daysOfWeekend} />
        </div>
      </MuiThemeProvider>
    )
  }
}
