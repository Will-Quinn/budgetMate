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

//button to reset all data
function resetData() {
  window.localStorage.clear();
  document.location.reload(true);
}

//the getData gets called on form submission. it gets the values, checks to see what radio value is selected through a for loop. checks to see if there are already existing entries,
//if there are none, an array is created as well as an entry object, otherwise entries are entered into localStorage in existing entries. this is to get around
//localStorage not allowing you to enter items under the same array etc. the function then reloads the page to show all the updates.
function getData() {
  let inputDescription = document.getElementById("desc");
  let inputValue = document.getElementById("valueNum");
  let radios = document.getElementsByName("radio");
  let radioChecked;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      radioChecked = radios[i].value;
    }
  }
  let existingEntries = JSON.parse(JSON.stringify(getItem("allEntries")));
  if (existingEntries == null) existingEntries = [];
  const entry = {
    date: tableDate,
    radioChecked: radioChecked,
    inputDescription: inputDescription.value,
    inputValue: inputValue.value,
  };
  setItem("entry", JSON.stringify(entry));
  existingEntries.push(entry);
  existingEntries = existingEntries.map((item, index) => ({
    ...item,
    id: index + 1,
  }));
  setItem("allEntries", JSON.stringify(existingEntries));
  document.location.reload(true);
}

//this simply shows the table of entries when the dom content has loaded.
const tableDiv = document.querySelector(".table");
const del = `<button class="actionButtons" id="delBtn" type="button"  onclick="deleteRow(this)">Delete</button>`;
const edit = `<button class="actionButtons" type="button" onclick="updateRow(this)">Update</button>`;
window.addEventListener("DOMContentLoaded", function () {
  const entries = getItem("allEntries");
  let displayData = entries.map(function (item) {
    return `<table>
          <tbody>
          <tr>
              <td class="entryCol">${item.id}</td>
              <td class="dateCol">${item.date}</td>
              <td class="expCol">${item.radioChecked}</td>
              <td class="descCol">${item.inputDescription}</td>
              <td class="valCol">$${item.inputValue}</td>
              <td class="actions">${del}${edit}</td>
          </tr>
          </tbody>
      </table>`;
  });
  displayData = displayData.join("");
  tableDiv.innerHTML = displayData;
});

function updateRow() {
  alert("update");
}

function deleteRow(elm) {
  //added id to table in dom so I could grab a value that uniquely identifies each row on the table. (this is because if I used anything else to identify a row there could be multiple matches.).
  var rowFinder = $(elm).closest("tr").find("td:first-child").text();
  console.log(rowFinder);
  //get allEntries from local storage
  const delEntries = JSON.parse(localStorage.getItem("allEntries"));
  console.log(delEntries);
  //filter retrun a filtered array with all the entries that do not match with the id given from rowfinder
  const filtered = delEntries.filter(function (item) {
    return item.id != rowFinder;
  });
  console.log(filtered);
  //set all the filtered items into local storage thereby "deleting" the row that was filtered out.
  localStorage.setItem("allEntries", JSON.stringify(filtered));
  //reload the page to show new dom and chart
  document.location.reload(true);
}

//this simply takes the data from local storage, does the required calculations to them and updates the chart values with the entry values.
window.addEventListener("DOMContentLoaded", function () {
  let entries = getItem("allEntries");
  const budget = document.getElementById("budgetNum");
  let totalSavings = 0;
  let totalInvestments = 0;
  let totalExpenses = 0;

  var budgetCanvas = document.getElementById("budgetChart");
  Chart.defaults.color = "#00184c";
  var budgetData = {
    labels: ["Savings", "Investments", "Expenses"],
    datasets: [
      {
        data: [1, 1, 1],
        backgroundColor: ["#8ac926", "#ffca3a", "#ff595e"],
      },
    ],
  };

  var pieChart = new Chart(budgetCanvas, {
    type: "doughnut",
    data: budgetData,
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 24,
              family: "Source Sans Pro",
            },
          },
        },
      },
    },
  });
  for (entries of entries) {
    // budget.innerHTML = totalSavings - totalInvestments - totalExpenses;
    if (entries.radioChecked == "savings") {
      totalSavings += parseInt(entries.inputValue);
    } else if (entries.radioChecked == "investment") {
      totalInvestments += parseInt(entries.inputValue);
    } else if (entries.radioChecked == "expense") {
      totalExpenses += parseInt(entries.inputValue);
    }
    let budgetNum = totalSavings - totalInvestments - totalExpenses;
    if (budgetNum < 0) {
      budget.style.color = "#ff595e";
      budget.innerHTML = "&nbsp" + budgetNum + " ⬇";
    } else {
      budget.style.color = "#8ac926";
      budget.innerHTML = "&nbsp" + budgetNum + " ⬆";
    }
  }
  var data = [totalSavings, totalInvestments, totalExpenses];
  pieChart.data.datasets[0].data = data;
  pieChart.update();
});

// }
let tableDate = new Date().toLocaleString().split(",")[0];

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
date.textContent = `${month} ${year}`;

const day = currentDate.getDay();

const budget = document.getElementById("budgetNum");
// budget.innerHTML = totalSavings - totalInvestments - totalExpenses;
