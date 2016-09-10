function calcVacation() {
  var initialDate = moment(document.getElementById('initialDate').value).startOf('day');
  var qtdDays =  parseInt(document.getElementById('numberOfDays').value);
  var numberOfDays = qtdDays - 1;
  var endDate = initialDate.clone().add(numberOfDays, 'day');

  var daysOfWeek = countDaysOfWeek(initialDate, endDate);
  var weekends = qtdDays - daysOfWeek;
  qtdDays = calculateTotalDays(qtdDays);

  function calculateTotalDays(qtdDays) {
    var totalDays = qtdDays;
    if(initialDate.day() == 1) {
      totalDays += 2;
    } else if (initialDate.day() == 5){
      totalDays += 1;
    }

    if(endDate.day() == 5) {
      totalDays += 2;
    } else if (endDate.day() == 6){
      totalDays += 1;
    }
    return totalDays;
  }

  function isWeekend(dayOfWeek) {
    return (dayOfWeek == 6) || (dayOfWeek == 0);
  }

  function countDaysOfWeek(initialDate, endDate) {
    var countDaysOfWeek = 0;
    var curDate = initialDate.clone();

    while (curDate <= endDate) {
        var day = curDate.day();
        if(!isWeekend(day)) {
           countDaysOfWeek++;
        }

        curDate = curDate.add(1, 'day');
    }

    return countDaysOfWeek;
  }


  document.getElementById('result').innerHTML = '<p>Seu ultimo dias de ferias: ' + endDate.format('DD/MM/YYYY') + '</p>'
   + '<p>Total Dias contando com finais de semana fora das ferias: ' + qtdDays + '</p>'
   + '<p>Total Dias de Semana: ' + daysOfWeek + '</p>'
   + '<p>Total Finais de Semana perdidos nas ferias: ' + weekends + '</p>';
}
