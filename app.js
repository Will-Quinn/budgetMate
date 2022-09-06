
//chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


//set initial values for the chart fields, these need to be updated as data is entered.
  var totalSavings = 1;
  var totalInvestments = 1;
  var totalExpenses = 1;
//copy/pasted code of google chart.js to initialise a pie chart, I can edit this how I want.
function drawChart() {
var data = google.visualization.arrayToDataTable([
  //chart labels and the values they need to hold. these will be held in variables so I can dynamically change them.
  ['budget', 'amount'],
  ['Savings',totalSavings],
  ['Investments',totalInvestments],
  ['Expenses',totalExpenses]
]);
//these are the options to change visuals of the chart
var options = {
  //piehole only able to be used on 2d chart.
  pieHole: 0.4,
  colors: ['green', 'gold', 'red'],
  backgroundColor: 'none',
  //these sets the chart to show values not percentages
  pieSliceText: 'value',
  'width':600,
  'height':500,
  legendTextStyle: { color: '#FFF' },
  titleTextStyle: { color: '#FFF' },
  hAxis: {
    color: '#FFF',
  }
};

var chart = new google.visualization.PieChart(document.getElementById('myChart'));
  chart.draw(data, options);
}

//array of months, we use this to get set the number value of month to a text value as it is 0 indexed, you can use it to find a month text value in an array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//select date element
const date = document.querySelector(".date");

//grab the current date using new Date();
let currentDate = new Date();

//use .getMonth(); on currentDate which is holding the full current date. this will just grab the month number
const monthsNum = currentDate.getMonth();
// month = months arrays index which corresponds to the .getmonth value.
const month = months[monthsNum];
//gets the year value (2022) from the current date.
const year = currentDate.getFullYear();
//we set the text content of the date element with a template literal just containing ${month} ${year} variables.
date.textContent = `${month} ${year}`

const day = currentDate.getDay();

const budget = document.getElementById('budgetNum');
budget.innerHTML = totalSavings - totalInvestments - totalExpenses;