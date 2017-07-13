import React from 'react'
import PropTypes from 'prop-types'

import './result.css'

const Result = (props) => {
  if (!props.showResult) {
    return null
  }

  return (
    <div className='result'>
      <p>Seu último dias de férias: <strong>{props.endDateMoment}</strong> </p>
      <p>Total de dias contando com finais de semana fora das férias:
        <strong> {props.totalDays}</strong>
      </p>
      <p>Total de dias de semana: <strong>{props.daysOfWeek}</strong></p>
      <p>Total de dias não úteis perdidos nas férias: <strong>{props.daysOfWeekend}</strong></p>
    </div>
  );
}

Result.propTypes = {
  endDateMoment: PropTypes.string,
  totalDays: PropTypes.number,
  daysOfWeek: PropTypes.number,
  daysOfWeekend: PropTypes.number,
  showResult: PropTypes.bool
}

Result.defaultProps = {
  showResult: false,
  endDateMoment: '',
  totalDays: 0,
  daysOfWeek: 0,
  daysOfWeekend: 0
};

export default Result
