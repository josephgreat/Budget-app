// declare all the variables
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
let expenseEditName;
let expenseEditAmount;
let expenseList = [];
let itemId = 0

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
        budget.textContent = "$0";
    }
   else{
    budget.textContent = `$${budgetamount.value}`;
    showBalance();
    }

});

expenseSubmit.addEventListener("click", () => {
    if (expenseamount.value == "" ||  expenseamount.value < 0 ||  expensename.value == "" ) {
        expensefeedback.classList.add("show-error");
        expensefeedback.innerHTML = "<p> Value cannot be negative or invalid";
        setTimeout(() => {
            expensefeedback.classList.remove("show-error");
        }, 4000);
        expense.textContent = "$0";
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
    remove.innerHTML = "&#10062;";
    editDelete.appendChild(remove);

    edit.onmouseenter = () => {
        edit.innerHTML = "&#9998;";
        edit.style.transition = "4s";
    }

    edit.onmouseout = () => {
        edit.innerHTML = "&#9999;";
        edit.style.transition = "4s";
        
    }

    
    expenseEditName = expensevalue.innerHTML = `&#9755; ${expensename.value}`;
    expenseEditAmount = expensecost.textContent = `$${expenseamount.value}`;

    for (let i = 0; i < expenseList.length + 1; i++) {
       tablerow.setAttribute("id", i);
       console.log(tablerow);   
    }

    edit.addEventListener("click", (e) => {
        let edited = expenseList.filter((item) => {
            return item.id === parseInt(tablerow.id);
            
        });
        let newList = expenseList.filter((item) => {
            return item.id !== parseInt(tablerow.id);
        });

        expenseList = newList;

        
        console.log(edited);
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

        totalExpense();
        showBalance();

    });

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
    itemId++;
    expenseList.push(expenses);

   console.log(totalExpense());
    totalExpense();
    showBalance();
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
    expense.textContent = `$${total}`;
    return total;
}

// balance
function showBalance() {
    let balanceTotal;
    balance.textContent = `$${parseInt(budget.textContent.slice(1)) - parseInt(expense.textContent.slice(1))}`;
    balanceTotal = parseInt(balance.textContent.slice(1));
    if (balanceTotal < 0) {
        balance.style.color = "var(--expense-color)";
    } else if(balanceTotal == 0){
        balance.style.color = "#777";   
    }else if(balanceTotal > 0){
        balance.style.color = "var(--balance-color)";   
    }
}

