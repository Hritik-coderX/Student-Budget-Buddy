let monthlyBudget = 5000;
let totalSpent = 1050;

// Store new expenses
let expenses = [];

// Get elements from HTML
const budgetText = document.getElementById("monthlyBudget");
const spentText = document.getElementById("totalSpent");
const remainingText = document.getElementById("moneyRemaining");
const percentageText = document.getElementById("spentPercentage");

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expensename");
const expenseAmount = document.getElementById("amount");
const expenseCategory = document.getElementById("category");
const expenseList = document.getElementById("expenseList");

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budget");

// Elements for monthly budget progress
const progressBar = document.getElementById("budgetProgressBar");
const progressText = document.getElementById("progressPercentage");
const spentProgressText = document.getElementById("spentProgressText");


// Display amount in rupees
function showMoney(amount) {
    return "₹" + amount.toLocaleString("en-IN", {
        maximumFractionDigits: 2
    });
}


// Update all budget details
function updateBudget() {
    let remaining = monthlyBudget - totalSpent;
    let percentage = 0;

    if (monthlyBudget > 0) {
        percentage = (totalSpent / monthlyBudget) * 100;
    }

    budgetText.textContent = showMoney(monthlyBudget);
    spentText.textContent = showMoney(totalSpent);
    remainingText.textContent = showMoney(remaining);

    percentageText.textContent =
        percentage.toFixed(1) + "% of your budget";

    // Update the progress bar
    progressBar.value = Math.min(percentage, 100);

    progressText.textContent = percentage.toFixed(1) + "%";
    spentProgressText.textContent = showMoney(totalSpent) + " spent";
}


// Add a new expense
function addExpense(name, amount, category) {
    let expense = {
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    totalSpent = totalSpent + amount;

    // Create a new expense item
    let expenseItem = document.createElement("article");

    let nameHeading = document.createElement("h3");
    nameHeading.textContent = expense.name;

    let categoryText = document.createElement("p");
    categoryText.textContent = expense.category;

    let amountText = document.createElement("p");
    amountText.textContent = "-" + showMoney(expense.amount);

    expenseItem.appendChild(nameHeading);
    expenseItem.appendChild(categoryText);
    expenseItem.appendChild(amountText);

    // Show the latest expense first
    expenseList.prepend(expenseItem);

    // Update the budget details
    updateBudget();
}


// Handle the Add Expense form
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = expenseName.value.trim();
    let amount = Number(expenseAmount.value);
    let category = expenseCategory.value;

    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    addExpense(name, amount, category);

    // Clear the form after adding the expense
    expenseForm.reset();
});


// Handle the Update Budget form
budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let newBudget = Number(budgetInput.value);

    if (!Number.isFinite(newBudget) || newBudget <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    monthlyBudget = newBudget;

    // Update the budget on the page
    updateBudget();

    alert("Monthly budget updated!");
});


// Show correct values when the page opens
updateBudget();




