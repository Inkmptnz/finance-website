//localStorage.clear();
let expenseSum = 0;
//selectors
const expenseInput = document.querySelector(".expens-input");
const expenseButton = document.querySelector(".expense-button");
const expenseList = document.querySelector(".expense-list");
const reseteButton = document.querySelector(".resete");
//event listener
document.addEventListener("DOMContentLoaded", getLocalData());
expenseButton.addEventListener("click", addExpense);
reseteButton.addEventListener("click", resete);
expenseList.addEventListener("click", deleteCheck);

//functions
function addExpense(event) {
	if (expenseInput.value != 0) {
		const input = expenseInput.value;
		//prevent reload
		event.preventDefault();
		//create div for expense field
		const expenseDiv = document.createElement("div");
		expenseDiv.classList.add("expense");
		//create Li
		const newExpense = document.createElement("li");

		//li- structor: 5 | € | Reason/TextInput
		const numberExpenseSpan = document.createElement("span");
		const euroSymbolSpan = document.createElement("span");
		const reasonExpenseSpan = document.createElement("span");

		//adding Spans to Li
		newExpense.appendChild(numberExpenseSpan);
		newExpense.appendChild(euroSymbolSpan);
		newExpense.appendChild(reasonExpenseSpan);

		let numberExpense = input;
		let reasonExpense = "";
		//to check if there is a char other then "," or "."
		let numberExpenseWithoutKomma = numberExpense.replace(/,/g, "");
		let numberExpenseWithoutKommaDot = numberExpenseWithoutKomma.replace(".", "");

		if (input.indexOf(" ") != -1) {
			console.log("reason");
			//wenn leerzeichen
			numberExpense = input.substring(0, input.indexOf(" ")).replace(/,/g, ".");
			let numberExpenseWithoutKommaDotSpace = numberExpenseWithoutKommaDot.substring(0, numberExpenseWithoutKommaDot.indexOf(" "));
			if (numberExpenseWithoutKommaDotSpace.match(/^\d+$/) == null) {
				expenseInput.value = "";
				return;
			}
			reasonExpense = input.substring(input.indexOf(" ") + 1, input.length);
		} else {
			if (numberExpenseWithoutKommaDot.match(/^\d+$/) != null) {
				numberExpense = input.replace(/,/g, ".");
			} else {
				expenseInput.value = "";
				return;
			}
		}

		//saving to local storage
		saveToLocal(numberExpense, reasonExpense);

		//Update sum
		expenseSum += Number(numberExpense);
		document.getElementById("expense-sum").innerText = expenseSum;

		//set span value
		numberExpenseSpan.innerText = numberExpense;
		euroSymbolSpan.innerText = "€ ";
		reasonExpenseSpan.innerText = reasonExpense;

		newExpense.classList.add("expense-item");
		//add it to Div
		expenseDiv.appendChild(newExpense);

		//delete Expense
		const deleteButton = document.createElement("button");
		deleteButton.innerHTML = "X";
		deleteButton.classList.add("delete-btn");
		//add it
		expenseDiv.appendChild(deleteButton);

		//add everthing in
		expenseList.appendChild(expenseDiv);

		//clear Inputfield
		expenseInput.value = "";
	}
}

function deleteCheck(e) {
	const item = e.target;
	//delete expense
	if (item.classList[0] === "delete-btn") {
		const expense = item.parentElement;
		expense.classList.add("fall");

		expense_value_child = expense.childNodes[0];
		expense_value = expense_value_child.childNodes[0].innerText;
		expenseSum -= Number(expense_value);

		document.getElementById("expense-sum").innerHTML = expenseSum;

		removeLocalExpenses(expense);
		expense.addEventListener("transitionend", function () {
			expense.remove();
		});
	}
}

function saveToLocal(expense, reason) {
	let localExpenseSum;
	let localExpenseList;
	let localReasonList;

	//expenseList
	if (localStorage.getItem("localExpenseList") === null) {
		localExpenseList = [];
	} else {
		localExpenseList = JSON.parse(localStorage.getItem("localExpenseList"));
	}
	//reasonList
	if (localStorage.getItem("localReasonList") === null) {
		localReasonList = [];
	} else {
		localReasonList = JSON.parse(localStorage.getItem("localReasonList"));
	}
	//get ExpenseSum from local or initalize ExpenseSum
	if (localStorage.getItem("localExpenseSum") === null) {
		localExpenseSum = 0;
	} else {
		let expenseString = localStorage.getItem("localExpenseSum");
		localExpenseSum = Number(expenseString.replace(/,/g, "."));
	}

	localExpenseList.push(expense);
	localReasonList.push(reason);
	localExpenseSum = Number(localExpenseSum) + Number(expense);

	localStorage.setItem("localExpenseSum", JSON.stringify(localExpenseSum));
	localStorage.setItem("localReasonList", JSON.stringify(localReasonList));
	localStorage.setItem("localExpenseList", JSON.stringify(localExpenseList));
}

function getLocalData() {
	let localExpenseSum;
	let localExpenseList;
	let localReasonList;

	if (localStorage.getItem("localExpenseList") === null) {
		localExpenseList = [];
	} else {
		localExpenseList = JSON.parse(localStorage.getItem("localExpenseList"));
	}
	//reasonList
	if (localStorage.getItem("localReasonList") === null) {
		localReasonList = [];
	} else {
		localReasonList = JSON.parse(localStorage.getItem("localReasonList"));
	}
	//get ExpenseSum from local or initalize ExpenseSum
	if (localStorage.getItem("localExpenseSum") === null) {
		localExpenseSum = 0;
	} else {
		let expenseString = localStorage.getItem("localExpenseSum");
		localExpenseSum = Number(expenseString.replace(/,/g, "."));
	}

	for (let i = 0; i < localExpenseList.length; i++) {
		expense = localExpenseList[i];
		reason = localReasonList[i];

		//create div for expense field
		const expenseDiv = document.createElement("div");
		expenseDiv.classList.add("expense");
		//create Li
		const newExpense = document.createElement("li");

		//li- structor: 5 | € | Reason/TextInput
		const numberExpenseSpan = document.createElement("span");
		const euroSymbolSpan = document.createElement("span");
		const reasonExpenseSpan = document.createElement("span");

		//adding Spans to Li
		newExpense.appendChild(numberExpenseSpan);
		newExpense.appendChild(euroSymbolSpan);
		newExpense.appendChild(reasonExpenseSpan);

		//set span value
		numberExpenseSpan.innerText = expense;
		euroSymbolSpan.innerText = "€ ";
		reasonExpenseSpan.innerText = reason;

		newExpense.classList.add("expense-item");
		//add it to Div
		expenseDiv.appendChild(newExpense);

		//delete Expense
		const deleteButton = document.createElement("button");
		deleteButton.innerHTML = "X";
		deleteButton.classList.add("delete-btn");

		//add everthing in
		expenseDiv.appendChild(deleteButton);
		expenseList.appendChild(expenseDiv);

		//clear Inputfield
		expenseInput.value = "";
	}
	//bring ExpenseSum to screen
	expenseSum = localExpenseSum;
	document.getElementById("expense-sum").innerText = localExpenseSum;
}

function removeLocalExpenses(expenseDiv) {
	let localExpenseSum;
	let localExpenseList;
	let localReasonList;

	//expenseList
	if (localStorage.getItem("localExpenseList") === null) {
		localExpenseList = [];
	} else {
		localExpenseList = JSON.parse(localStorage.getItem("localExpenseList"));
	}
	//reasonList
	if (localStorage.getItem("localReasonList") === null) {
		localReasonList = [];
	} else {
		localReasonList = JSON.parse(localStorage.getItem("localReasonList"));
	}
	//get ExpenseSum from local or initalize ExpenseSum
	if (localStorage.getItem("localExpenseSum") === null) {
		localExpenseSum = 0;
	} else {
		let expenseString = localStorage.getItem("localExpenseSum");
		localExpenseSum = Number(expenseString.replace(/,/g, "."));
	}
	//Number Expense
	expense = expenseDiv.childNodes[0];

	expenseNumber = Number(expense.childNodes[0].innerText);
	expenseReason = expense.childNodes[2].innerText;

	expenseIndex = localExpenseList.indexOf(String(expenseNumber));

	localExpenseList.splice(expenseIndex, 1);
	localReasonList.splice(expenseIndex, 1);
	localExpenseSum -= expenseNumber;

	localStorage.setItem("localExpenseList", JSON.stringify(localExpenseList));
	localStorage.setItem("localReasonList", JSON.stringify(localReasonList));
	localStorage.setItem("localExpenseSum", JSON.stringify(localExpenseSum));
}

function resete() {
	localStorage.clear();
	expenseList.remove();
}
