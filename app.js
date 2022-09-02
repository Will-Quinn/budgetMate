//chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


//set initial values for the chart fields, these need to be updated as data is entered.
const totalSavings = 5;
const totalInvestments = 10;
const totalExpenses = 20;



function drawChart() {
var data = google.visualization.arrayToDataTable([
  ['budget', 'amount'],
  ['Savings',totalSavings],
  ['Investments',totalInvestments],
  ['Expenses',totalExpenses]
]);
var options = {
  is3D:true,
  colors: ['green', 'gold', 'red'],
  backgroundColor: 'grey',
  pieSliceText: 'value'
};

var chart = new google.visualization.PieChart(document.getElementById('myChart'));
  chart.draw(data, options);
}
