import React from 'react'

export default props => {
  if(!props.showResult) {
    return null
  }

  return (
    <div>
      <p>Seu último dias de férias: <strong>{props.endDateMoment}</strong> </p>
      <p>Total de dias contando com finais de semana fora das férias: <strong>{props.totalDays}</strong></p>
      <p>Total de dias de semana: <strong>{props.daysOfWeek}</strong></p>
      <p>Total de dias não úteis perdidos nas férias: <strong>{props.daysOfWeekend}</strong></p>
    </div>
  );
}
