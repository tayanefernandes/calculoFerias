import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

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
        <DatePicker className="datepicker"
          hintText="Informe a data inicial de suas férias"
          floatingLabelText="Data Inicial"
          container="inline"
          fullWidth={true}
          onChange={this.handleInitialDate}/>
        <br/>
        <TextField className='numberOfDays'
          fullWidth={true}
          type="number"
          hintText="Quantidade de dias"
          floatingLabelText="Quantos dias de férias?"
          floatingLabelFixed={true}
          onChange={this.handleNumberOfDays}
        />
        <br/>
        <RaisedButton className="form-button" onClick={this.calculateResult} primary={true}>Calcular</RaisedButton>
      </form>
    )
  }
}
