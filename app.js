var budgetCanvas = document.getElementById("budgetChart");
Chart.defaults.color = "#00184c";

var budgetData = {
    labels: [
        "Savings",
        "Investments",
        "Expenses",
    ],
    datasets: [
        {
            data: [1,2,3],
            backgroundColor: [
                "#8ac926",
                "#ffca3a",
                "#ff595e",
            ]
        }]
};

var pieChart = new Chart(budgetCanvas, {
  type: 'doughnut',
  data: budgetData,
  options: {
      plugins: {
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      size: 24,
                      family: 'Source Sans Pro', 
                  }
              }
          }
      }
  }  

});
//function to set an item in local storage, just call like this setItem("entryData",JSON.stringify(entryArray)); for example
const setItem = (key, item) => {
    localStorage.setItem(key, item);
};
//function to get an item from local storage. just enter the key you gave the item.
const getItem = (key) => {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
};

//the get data function gets the form entries using getElementById for the text/number values, for the radio value,
//I had to select all the elements with the name radio, then loop through where type === radio and that element was checked (selected)

//these would be that values that get passed in to the entry object.
//the entry object would then be pushed into an array and then assigned an id depening on the array index.

//the array is then set in localstorage with the setItem function
//the item is console logged using getItem to retrieve it from local storage to confirm its been stored

function getData(){
    let inputDescription = document.getElementById("desc");
    let inputValue = document.getElementById("valueNum");
    let radios = document.getElementsByName("radio");
    let radioChecked;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].type === "radio" && radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            radioChecked = radios[i].value;       
        }
    }
    const entry={
       "date":tableDate,
        "radioChecked":radioChecked,
        "inputDescription":inputDescription.value,
        "inputValue":inputValue.value,
    };
    let entryArray = [];
    entryArray.push(entry);
    entryArray = entryArray.map((item, index) => ({ ...item, "id": index + 1 }))
    storeData(entryArray);
}  
function storeData(data){
    setItem("entryData",JSON.stringify(data));
    const item = getItem("entryData");

    const parsedEntry = JSON.parse(JSON.stringify(item));
    console.log(parsedEntry);
}
// function updateGraph(){
//     const item = getItem("entryData");
//     if(item.radioChecked == "savings"){
//         totalSavings += item.inputValue;
//         //alert(totalSavings);
//     }else if (type == "Investment" ){
//         totalInvestments = value;
//         //alert(totalInvestments);
//     } else if (type == "Expense"){
//         totalExpenses  = value;
//         //alert(totalExpenses);
//     }
//     preventDefault();
// }

// function updateTable(){

// }
let tableDate = new Date().toLocaleString().split(',')[0];

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


