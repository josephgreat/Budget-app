// declare all the variables
const loading = document.querySelector("#animation");
const loader = document.querySelector(".load")
const budgetType = document.querySelector(".budget-type");
const currency = document.querySelector(".currency select");
const currencyChange = document.querySelector(".currency-change select");
const currencyType = document.querySelectorAll(".currency-type");
const budgetChosen = document.querySelectorAll(".budget-type ul li a");
const otherInput = document.querySelector(".budget-type ul .others input");
const otherBtn = document.querySelector(".budget-type ul .others button");
const budgetDisplay = document.querySelector(".budget-choosen");
const main = document.querySelector(".container");
const budgetamount = document.querySelector(".budget-amount input");
const expensename = document.querySelector(".expense-name input");
const expenseamount = document.querySelector(".expense-amount input");
const budgetSubmit = document.querySelector(".budget-shade");
const expenseSubmit = document.querySelector(".expense-shade");
const budgetfeedback = document.querySelector(".budget-error-alert");
const expensefeedback = document.querySelector(".expense-error-alert");
const budget = document.querySelector(".budget p");
const expense = document.querySelector(".expense p");
const balance = document.querySelector(".balance p");
const tableBody = document.querySelector("tbody");
const changeBudget = document.querySelector(".change-budget button")
let expenseEditName;
let expenseEditAmount;
let expenseList = [];
let itemId = 0;
let dollar = "&#36;";
let cent = "&#162;";
let pound = "&#163;";
let naria = "&#8358;";
let cedi = "&#x20B5;";
let myCurrency;

document.body.onload = animation();

function animation() {
    setInterval(() =>{
        loading.style.display ="none";
        budgetType.style.display = "block";
    }, 8000);
}
    
for (let i = 0; i < budgetChosen.length; i++) {
    budgetChosen[i].addEventListener("click", () => {
        budgetDisplay.textContent = budgetChosen[i].innerText;
        loader.style.display = "none";
        main.style.display = "block";
        currencyCheck();
    });
}

otherBtn.onclick = () =>{
    budgetDisplay.textContent = otherInput.value;
    loader.style.display = "none";
        main.style.display = "block";
        currencyCheck();
}

function currencyCheck() {
    if (currency.value == "Dollar") {
        myCurrency = dollar;
    }else if(currency.value == "Cedi"){
        myCurrency = cedi;
    }else if(currency.value == "Naria"){
        myCurrency = naria;
    }else if(currency.value == "Pound"){
        myCurrency = pound;
    }else if(currency.value == "Cent"){
        myCurrency = cent;
    }
    currencyChange.value = currency.value;
    for (let i = 0; i < currencyType.length; i++) {
        currencyType[i].innerHTML = myCurrency;  
    }
}

currencyChange.onchange = () => {
    if (currencyChange.value == "Dollar") {
        myCurrency = dollar;
    }else if(currencyChange.value == "Cedi"){
        myCurrency = cedi;
    }else if(currencyChange.value == "Naria"){
        myCurrency = naria;
    }else if(currencyChange.value == "Pound"){
        myCurrency = pound;
    }else if(currencyChange.value == "Cent"){
        myCurrency = cent;
    }
    for (let i = 0; i < currencyType.length; i++) {
        currencyType[i].animate([
            {opacity: "0.2"}, 
            {opacity: "1"}
        ],
        {duration: 500, fill: "forwards"}
        );
        currencyType[i].innerHTML = myCurrency;  
    }

}


function update() {
        expensename.value = "";
        expenseamount.value = "";
        budgetamount.value = "";
    }
    
    // add event listeners
    budgetSubmit.addEventListener("click", () => {
        if (budgetamount.value == "" ||  budgetamount.value < 0 ) {
            budgetfeedback.classList.add("show-error");
            budgetfeedback.innerHTML = "<p> Value cannot be negative or invalid";
            setTimeout(() => {
                budgetfeedback.classList.remove("show-error");
            }, 4000);
            budget.innerHTML = myCurrency + "0";
        }
       else{
        budget.innerHTML = `${myCurrency}${budgetamount.value}`;
        // myExpenses();
        showBalance();
        update();
        }
    
    });
    
    expenseSubmit.addEventListener("click", () => {
        if (expenseamount.value == "" ||  expenseamount.value < 0 ||  expensename.value == "" ) {
            expensefeedback.classList.add("show-error");
            expensefeedback.innerHTML = "<p> Value cannot be negative or invalid";
            setTimeout(() => {
                expensefeedback.classList.remove("show-error");
            }, 4000);
            expense.innerHTML =  myCurrency + "0";
        }else{
        // expense.textContent = `$${totalExpense()}`;
        myExpenses();
    update();
        }
    });
    
    // expenses
    function myExpenses() {
        let tablerow = document.createElement("tr");
        let expensevalue = document.createElement("td") ;
        let expensecost = document.createElement("td");
        let editDelete = document.createElement("td");
        let edit = document.createElement("button");
        let remove  = document.createElement("button");
        edit.setAttribute("class", "edit");
        edit.innerHTML = "&#9999;";
        editDelete.appendChild(edit);
        remove.setAttribute("class", "remove");
        remove.innerHTML = "&#128686;";
        editDelete.appendChild(remove);

        for (let i = 0; i < expenseList.length + 1; i++) {
            tablerow.setAttribute("id", i);
            console.log(tablerow);   
         } 
    
        
        expenseEditName = expensevalue.innerHTML = `${expensename.value}`;
        expenseEditAmount = expensecost.innerHTML = myCurrency + `${expenseamount.value}`;
    
           
        
        tablerow.appendChild(expensevalue);
        tablerow.appendChild(expensecost);
        tablerow.appendChild(editDelete);
    
        tableBody.appendChild(tablerow);
        
        let amount = parseInt(expenseamount.value);
        let expenses = {
            id: itemId,
            title: expensename.value,
            amount: amount,
        } 
       
        
        expenseList.push(expenses);
        if (expenseList.length == []) {
            itemId = 0 * itemId;
        }else{itemId++;}

        totalExpense();
        showBalance();

        edit.onmouseenter = () => {
            edit.innerHTML = "&#9998;";
            edit.style.transition = "4s";
        }
    
        edit.onmouseout = () => {
            edit.innerHTML = "&#9999;";
            edit.style.transition = "4s";
            
        }
        edit.addEventListener("click", (e) => {
            let edited = expenseList.filter((item) => {
                return item.id === parseInt(tablerow.id);
                
            });
            let newList = expenseList.filter((item) => {
                return item.id !== parseInt(tablerow.id);
            }); 
            expenseList = newList;
            expensename.value = edited[0].title;
            expenseamount.value = edited[0].amount;
            tableBody.removeChild(tablerow);
            totalExpense();
            showBalance();
    
    
        });
    
        remove.addEventListener("click", () => {
            let deleted = expenseList.filter((item) => {
                return item.id === parseInt(tablerow.id);
                
            });
            let newList = expenseList.filter((item) => {
                return item.id !== parseInt(tablerow.id);
            });
    
            expenseList = newList;
            tableBody.removeChild(tablerow);

            if (expenseList.length == []) {
                itemId = 0 * itemId;
            }else{itemId++;}
    
            totalExpense();
            showBalance();
        });
    
    }
    
    function totalExpense() {
    let total = 0
        if(expenseList.length > 0){
            total = expenseList.reduce(function(previous, current){
                previous += current.amount; 
                return previous;
                console.log(prevoius);
            }, 0);
        }
        expense.innerHTML = `${myCurrency}${total}`;
        return total;
    }
    
    // balance
    function showBalance() {
        let balanceTotal;
        balance.innerHTML = myCurrency + `${parseInt(budget.textContent.slice(1)) - parseInt(expense.textContent.slice(1))}`;
        balanceTotal = parseInt(balance.textContent.slice(1));
        if (balanceTotal < 0) {
            balance.style.color = "var(--expense-color)";
        } else if(balanceTotal == 0){
            balance.style.color = "#777";   
        }else if(balanceTotal > 0){
            balance.style.color = "var(--balance-color)";   
        }
    }