//UI Variables
let description = document.getElementById('description')
let amount      = document.getElementById('amount')
let date        = document.getElementById('date')
let IncBtn      = document.querySelector('.incBtn')
let ExpBtn      = document.querySelector('.expBtn')
let Balance     = document.getElementById('Balance')
let incomeSum   = document.getElementById('incomeSum')
let expenseSum  = document.getElementById('expenseSum')
const addIncToList = document.getElementById('addIncToList')
const addExpToList = document.getElementById('addExpToList')
let showError = document.getElementById('ShowError')


//Input values Class
class Transaction {
    constructor(id, des, amount, date) {
        this.des = des;
        this.amount = amount;
        this.date   = date;
        this.id = id
    }
}

//UI Class

class UI {
    static displayItems() {
        if(LS.getIncomes() == []){
            incomeSum.innerText = 0
        }else{
            addIncToList.innerHTML = LS.displayIncomes()
          
        }

        if(LS.getExpenses() == []){
            expenseSum.innerText = 0
        }else{
            addExpToList.innerHTML = LS.displayExpenses()
        }
       
        UI.calculateTotalExpense()
        UI.calculateTotalIncome()
        UI.calculateBalance()

    }
    static addTransaction(id, des, amt, date) {
        let htmlItem = ''
        htmlItem = `
                <tr>
                <td>${des}</td>
                <td class="text-success alnright">${amt}</td>
                <td class="text-success alnright">${date}</td>
                <td class="alnright"><a href="#" class="delete-list text-warning"><i class="fa fa-remove"></i></a></td>
                <td style="display: none">${id}</td>
                </tr>`

        return htmlItem
    }
    static removeTransaction(item) {
        item.remove()
    }
    static calculateBalance() {
        Balance.innerText = UI.calculateTotalIncome() - UI.calculateTotalExpense()
    }
    static calculateTotalIncome() {
        let incomes = Array.from(addIncToList.children)
        let tIncomes = 0
        incomes.forEach(item => tIncomes += Number(item.children[1].innerText))

        incomeSum.innerText = tIncomes
        return tIncomes

    }
    static calculateTotalExpense() {
        let expenses = Array.from(addExpToList.children)
        let tExpenses = 0
        expenses.forEach(item => tExpenses += Number(item.children[1].innerText))


        expenseSum.innerText = tExpenses
        return tExpenses
        //+expenseSum.innerText + +amount.value
    }
    static clearValues() {
        IncBtn.checked = false;
        ExpBtn.checked = false;
        description.value = '';
        amount.value = '';
        date.value = '';
    }

}
class LS {
    static getIncomes() {
        let incomes;
        if (localStorage.getItem('incomes') === null) {
            incomes = []
        } else {
            incomes = JSON.parse(localStorage.getItem('incomes'))
        }
        return incomes
    }
    static getExpenses() {
        let expenses;
        if (localStorage.getItem('expenses') === null) {
            expenses = []
        } else {
            expenses = JSON.parse(localStorage.getItem('expenses'))
        }
        return expenses
    }
    static displayIncomes() {
        const incomes = LS.getIncomes();
       let htmlList = ''
        incomes.forEach(income => {
            //Add Transaction  to UI
            htmlList += UI.addTransaction(income.id, income.des, income.amount, income.date)
        })

        return htmlList
    }
    static displayExpenses() {
        const expenses = LS.getExpenses();
        let htmlList = ''
        expenses.forEach(expense => {

            //Add Expense to UI
            htmlList += UI.addTransaction(expense.id, expense.des, expense.amount, expense.date)
        })

        return htmlList
    }
    static addIncometoLS(income) {
        const incomes = LS.getIncomes();
        incomes.push(income)
        localStorage.setItem('incomes', JSON.stringify(incomes))
    }
    static addExpensetoLS(expense) {
        const expenses = LS.getExpenses();
        expenses.push(expense)
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }
    static removeIncome(id) {
        const incomes = LS.getIncomes();
        incomes.forEach(function (item, index) {
            if (item.id == id) {
                incomes.splice(index, 1);
            }
        });
        localStorage.setItem('incomes', JSON.stringify(incomes))
    }
    static removeExpense(id) {
        const expenses = LS.getExpenses();
        expenses.forEach(function (item, index) {
            if (item.id == id) {
                expenses.splice(index, 1);
            }
        });
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }
}

//Events & Handlers

//Refresh an Load
window.onload = UI.displayItems()

//Add Transaction Event
document.getElementById('button').addEventListener('click', addTransactions)

function addTransactions() {
    
    //instansiat transaction
    //event.timeStamp Get the number of milliseconds since this document was loaded:
    let id = event.timeStamp;
    id = id.toFixed()
    const transaction = new Transaction(id, description.value, amount.value, date.value)

    
    //add to UI
    let listItem = ''

    if (description.value === '') {
        alert('Please fill Description')
        // showError.style.display = ''
    } else if (amount.value === '') {
        alert('please fill amount')
    } else if (!IncBtn.checked && !ExpBtn.checked) {
        alert('please select income or expense')
    } else {

        listItem = UI.addTransaction(transaction.id, transaction.des, transaction.amount, transaction.date)

    }

    if (IncBtn.checked == true) {
        addIncToList.innerHTML += listItem;
        UI.calculateTotalIncome()
        // Add to LS
        LS.addIncometoLS(transaction)
    } else if (ExpBtn.checked == true) {
        addExpToList.innerHTML += listItem;
        UI.calculateTotalExpense()
        // Add to LS
        LS.addExpensetoLS(transaction)
    }
    
    //Hide the Error
    

    //Change Balance
    UI.calculateBalance()

    //Clear UI Values
    UI.clearValues()

}

//income or expense
IncBtn.addEventListener('click', (e) => {

    e.target.checked = true;
    ExpBtn.checked = false;

})

ExpBtn.addEventListener('click', (e) => {

    e.target.checked = true;
    IncBtn.checked = false;

})

//Remove Item events
//remove income
addIncToList.addEventListener('click', e =>{

    if(e.target.parentElement.classList.contains('delete-list')){
        //Define target
        let tr =  e.target.parentElement.parentElement.parentElement
        console.log(tr)
        //Define id
        let id = Number(tr.children[4].innerText)
        console.log(id)
         //Remove from UI
        UI.removeTransaction(tr)
         //Remove from LS
        LS.removeIncome(id)
        //Calculate the totals
        UI.calculateTotalExpense()
        UI.calculateTotalIncome()
        UI.calculateBalance()
    }
   })

   //remove income
   addExpToList.addEventListener('click', e =>{

    if(e.target.parentElement.classList.contains('delete-list')){
        //Define target
        let tr =  e.target.parentElement.parentElement.parentElement
        console.log(tr)
        //Define id
        let id = Number(tr.children[4].innerText)
        console.log(id)
         //Remove from UI
        UI.removeTransaction(tr)
         //Remove from LS
        LS.removeExpense(id)
        //Calculate the totals
        UI.calculateTotalExpense()
        UI.calculateTotalIncome()
        UI.calculateBalance()
    }
   })

