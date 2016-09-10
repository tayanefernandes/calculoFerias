function calcVacation() {
  var initialDate = moment(document.getElementById('initialDate').value);
  var numberOfDays = (document.getElementById('numberOfDays').value) - 1;
  var endDate = initialDate.clone().add(numberOfDays, 'day');
  var qtdDias = endDate.diff(initialDate, 'days') + 1;

  var count = 0
  var curDate = initialDate.clone();

  while (curDate <= endDate) {
      var dayOfWeek = curDate.day();
      var isWeekend = (dayOfWeek == 6) || (dayOfWeek == 0);
      if(!isWeekend) {
         count++;
      }

      curDate = curDate.add(1, 'day');
      if(curDate.isSame(endDate)) {
          console.log('igual');
      }
  }

  var weekends = qtdDias - count;

  console.log(initialDate.day());


  console.log(endDate.weekday());
  if(initialDate.day() == 1) {
    qtdDias += 2;
  } else if (initialDate.day() == 5){
    qtdDias += 1;
  }

  if(endDate.day() == 5) {
    qtdDias += 2;
  } else if (endDate.day() == 6){
    qtdDias += 1;
  }


  document.getElementById('result').innerHTML = '<p>Seu ultimo dias de ferias: ' + endDate.format('DD/MM/YYYY') + '</p>'
   + '<p>Total Dias contando com finais de semana fora das ferias: ' + qtdDias + '</p>'
   + '<p>Total Dias de Semana: ' + count + '</p>'
   + '<p>Total Finais de Semana perdidos nas ferias: ' + weekends + '</p>';
}
