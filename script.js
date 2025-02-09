// Variables
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let closebtn = document.querySelector(".close");
let taskArea = document.querySelector(".textArea-cont");
let amountInput = document.querySelector(".amount-input"); 
let currencyInput = document.querySelector(".currency-input"); // Currency input added
let colors = ["rgb(145, 147, 245)", "rgb(98, 230, 241)", "rgb(237, 248, 85)", "rgb(255, 44, 44)"];
let addBtnFlag = false;
let removeBtnFlag = false;
let filterBoxColors = document.querySelectorAll(".color");

let mainCont = document.querySelector(".main-cont");
let totalExpenseCont = document.querySelector(".total-expense");
let allPriorityColors = document.querySelectorAll(".priority-color");
let modalTaskColor = colors[0]; 

let ticketsArr = JSON.parse(localStorage.getItem("apptickets")) || [];
let selectedCurrency = "INR"; 

// API Key and Exchange Rate Fetching
const apiKey = "10d4ba711b5c025b5a664456"; 
const exchangeRates = {}; 

// Function to fetch exchange rates
async function fetchExchangeRates() {
    try {
        let response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`);
        let data = await response.json();
        exchangeRates["USD"] = data.conversion_rates.USD;
        exchangeRates["EUR"] = data.conversion_rates.EUR;
        exchangeRates["GBP"] = data.conversion_rates.GBP;
        exchangeRates["INR"] = 1; 

        updateTotalExpense();
    } catch (error) {
        console.log("Error fetching exchange rates:", error);
    }
}


function updateTotalExpense() {
    let totalInINR = ticketsArr.reduce((sum, ticket) => {
        let amountInINR = ticket.amount / exchangeRates[ticket.currency]; // Convert to INR
        return sum + amountInINR;
    }, 0);

    let totalUSD = (totalInINR * exchangeRates["USD"]).toFixed(2);
    let totalEUR = (totalInINR * exchangeRates["EUR"]).toFixed(2);
    let totalGBP = (totalInINR * exchangeRates["GBP"]).toFixed(2);

    totalExpenseCont.innerHTML = `
        Total Expense:<br>
        ₹${totalInINR.toFixed(2)} | $${totalUSD} | €${totalEUR} | £${totalGBP}`;
}



function init() {
    if (ticketsArr.length > 0) {
        ticketsArr.forEach(ticket => {
            createTicket(ticket.ticketColor, ticket.ticketTask, ticket.amount, ticket.dateTime, ticket.ticketId, ticket.currency);
        });
    }
    fetchExchangeRates(); 
}

init();


addBtn.addEventListener("click", function () {
    addBtnFlag = !addBtnFlag;
    modalCont.style.display = addBtnFlag ? "flex" : "none";
});


removeBtn.addEventListener("click", function () {
    removeBtnFlag = !removeBtnFlag;
    if (removeBtnFlag) {
        alert("Delete button activated");
    }  
    removeBtn.style.color = removeBtnFlag ? "red" : "white";
});

closebtn.addEventListener('click', function() {
    modalCont.style.display = "none";
});


allPriorityColors.forEach(function (colorElem) {
    colorElem.addEventListener("click", function () {
        allPriorityColors.forEach(function (priorityColor) {
            priorityColor.classList.remove("active");
        });
        colorElem.classList.add("active");

        modalTaskColor = window.getComputedStyle(colorElem).backgroundColor; // Ensure correct color fetching
    });
});

//Create a new ticket
function createTicket(taskColor, task, amount, dateTime, id, currency) {
    const ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color" style="background-color:${taskColor}"></div>
        <div class="ticket-id" style="display: none">${id}</div>
        <div class="task-area">${task}</div>
        <div class="ticket-amount">${currency} ${amount}</div>
        <div class="ticket-date">${dateTime}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>`;

    mainCont.appendChild(ticketCont);
    handleRemoval(ticketCont);
    handleColor(ticketCont);
    handleLock(ticketCont);
}

//Remove ticket & update total expense
function handleRemoval(ticket) {
    ticket.addEventListener("click", function () {
        if (removeBtnFlag) {
            let id = ticket.querySelector('.ticket-id').innerText;
            let tktIndex = ticketsArr.findIndex(ticket => ticket.ticketId === id);

            if (tktIndex !== -1) {
                ticketsArr.splice(tktIndex, 1);
                updateTotalExpense();
                updateLocalStorage();
            }
            ticket.remove();
        }
    });
}

//Change ticket priority color
function handleColor(ticket) {
    const ticketColorBand = ticket.querySelector(".ticket-color");
    ticketColorBand.addEventListener("click", function () {
        let id = ticket.querySelector('.ticket-id').innerText;
        let currentColor = ticketColorBand.style.backgroundColor;
        let tktIndex = ticketsArr.findIndex(ticket => ticket.ticketId === id);
        
        let newColorIdx = (colors.indexOf(currentColor) + 1) % colors.length;
        let newColor = colors[newColorIdx];

        ticketColorBand.style.backgroundColor = newColor;
        ticketsArr[tktIndex].ticketColor = newColor;
        updateLocalStorage();
    });
}

// **Lock/unlock editing**
function handleLock(ticket) {
    const ticketLockContainer = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockContainer.children[0];
    let taskArea = ticket.querySelector(".task-area");

    ticketLock.addEventListener("click", function () {
        let id = ticket.querySelector('.ticket-id').innerText;
        let tktIndex = ticketsArr.findIndex(ticket => ticket.ticketId === id);

        if (ticketLock.classList.contains("fa-lock")) {
            ticketLock.classList.replace("fa-lock", "fa-lock-open");
            taskArea.setAttribute("contenteditable", "true");
        } else {
            ticketLock.classList.replace("fa-lock-open", "fa-lock");
            taskArea.setAttribute("contenteditable", "false");
            ticketsArr[tktIndex].ticketTask = taskArea.innerText;
            updateLocalStorage();
        }
    });
}

// Handle new ticket creation
document.querySelector(".add-expense").addEventListener("click", function () {
    const task = taskArea.value.trim();
    const amount = parseFloat(amountInput.value);
    const currency = currencyInput.value.trim();

    if (!task || isNaN(amount) || amount <= 0 || !currency) {
        alert("Please enter a valid expense description, amount, and currency.");
        return;
    }

    const id = shortid();
    const dateTime = new Date().toLocaleString();

    createTicket(modalTaskColor, task, amount, dateTime, id, currency); 
    modalCont.style.display = "none";
    addBtnFlag = false;
    taskArea.value = "";
    amountInput.value = "";

    ticketsArr.push({ ticketColor: modalTaskColor, ticketTask: task, amount: amount, dateTime: dateTime, ticketId: id, currency: currency });
    updateTotalExpense();

    updateLocalStorage();
});

//Filter tickets by color
filterBoxColors.forEach(function (color) {
  color.addEventListener("click", function () {
    let selectedColor = window.getComputedStyle(color).backgroundColor;
    let allTickets = document.querySelectorAll(".ticket-cont");

    allTickets.forEach(function (ticket) {
      let ticketColor = ticket.querySelector(".ticket-color").style.backgroundColor;

      if (ticketColor === selectedColor) {
        ticket.style.display = "block";
      } else {
        ticket.style.display = "none";
      }
    });
  });
});

//Update local storage
function updateLocalStorage() {
    localStorage.setItem("apptickets", JSON.stringify(ticketsArr));
}
