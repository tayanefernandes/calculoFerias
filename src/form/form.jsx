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

  setDates = (event) => {
    event.preventDefault()
    this.props.setDates()
  }

  render() {
    return (
      <form>
        <DatePicker hintText="Informe a data inicial de suas férias"
          floatingLabelText="Data Inicial"
          container="inline"
          onChange={this.handleInitialDate}/>
        <br/>
        <TextField
          type="number"
          hintText="Quantidade de dias"
          floatingLabelText="Quantos dias de férias?"
          floatingLabelFixed={true}
          onChange={this.props.handleNumberOfDaysChange}
        />
        <br/>
        <RaisedButton onClick={this.setDates} primary={true}>Calcular</RaisedButton>
      </form>
    )
  }
}
