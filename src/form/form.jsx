import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'

import './form.css'

export default class Form extends React.Component {

  handleInitialDate = (event, date) => {
    this.props.handleInitialDateChange(date)
  }

  handleNumberOfDays = (event, value) => {
    this.props.handleNumberOfDaysChange(value)
  }

  calculateResult = (event) => {
    event.preventDefault()
    this.props.calculateResult()
  }


  render() {
    return (
      <form>
        <DatePicker
          className='datepicker'
          hintText='Informe a data inicial de suas férias'
          floatingLabelText='Data Inicial'
          container='inline'
          autoOk
          fullWidth
          firstDayOfWeek={0}
          formatDate={new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          }).format}
          onChange={this.handleInitialDate}
        />
        <br />
        <TextField
          className='numberOfDays'
          fullWidth
          type='number'
          hintText='Quantidade de dias'
          floatingLabelText='Quantos dias de férias?'
          floatingLabelFixed
          onChange={this.handleNumberOfDays}
        />
        <br />
        <RaisedButton className='form-button' onClick={this.calculateResult} primary>Calcular</RaisedButton>
      </form>
    )
  }
}

Form.propTypes = {
  handleNumberOfDaysChange: PropTypes.func.isRequired,
  handleInitialDateChange: PropTypes.func.isRequired,
  calculateResult: PropTypes.func.isRequired
};
