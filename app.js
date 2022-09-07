var budgetCanvas = document.getElementById("budgetChart");

Chart.defaults.font.family = "Lato";
Chart.defaults.font.size = 18;
Chart.defaults.color = "black";

var budgetData = {
    labels: [
        "Savings",
        "Investments",
        "Expenses",
    ],
    datasets: [
        {
            data: [1,1,1],
            backgroundColor: [
                "#8ac926",
                "#ffca3a",
                "#ff595e",
            ]
        }]
};

var pieChart = new Chart(budgetCanvas, {
  type: 'doughnut',
  data: budgetData
});

window.ondoc

function handleFormSubmit(event) {
  event.preventDefault();
  
  const data = new FormData(event.target);
  
  const formJSON = Object.fromEntries(data.entries());

  var value = formJSON.valueNum;
  var desc = formJSON.text;
  var expense = formJSON.etype;
  alert(JSON.stringify(value));
  alert(JSON.stringify(desc));
  alert(JSON.stringify(expense)); 
  alert(JSON.stringify(formJSON));
}

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);


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


