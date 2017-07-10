import React from 'react'
import moment from 'moment'

import './custom.css'
import Result from './result'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { initialDate: '',  numberOfDays: '', endDateMoment: '', showResult: false }

    this.handleInitialDateChange = this.handleInitialDateChange.bind(this)
    this.handleNumberOfDaysChange = this.handleNumberOfDaysChange.bind(this)
    this.calcVacation = this.calcVacation.bind(this)
  }

  calcVacation(event) {
    event.preventDefault();
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
    } else if (initialDateMoment.day() == 5){
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

  handleInitialDateChange(event) {
      this.setState({ initialDate: event.target.value })
  }

  handleNumberOfDaysChange(event) {
      this.setState({ numberOfDays: parseInt(event.target.value) })
  }

  render() {
    return (
      <div className='container'>
        <form>
          <h1>Calcule o melhor dia para suas férias</h1>
          <label htmlFor="initialDate">Data Inicial</label>
          <input type="date" id="initialDate" value={this.state.initialDate} onChange={this.handleInitialDateChange} />
          <br/>
          <label htmlFor="numberOfDays">Quantos dias de ferias?</label>
          <input type="number" id="numberOfDays" value={this.state.numberOfDays} onChange={this.handleNumberOfDaysChange} />
          <br/>
          <button onClick={this.calcVacation}>Calcular</button>
        </form>
        <Result
          showResult={this.state.showResult}
          endDateMoment={this.state.endDateMoment}
          totalDays={this.state.totalDays}
          daysOfWeek={this.state.daysOfWeek}
          daysOfWeekend={this.state.daysOfWeekend} />
      </div>
    )
  }
}
