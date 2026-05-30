let expenses = JSON.parse(localStorage.getItem('expenses')) || []

let salary = Number(localStorage.getItem('salary')) || 0

let currentCurrency = 'INR'
let exchangeRate = 1

// ELEMENTS

const salaryForm = document.getElementById('salaryForm')
const salaryInput = document.getElementById('salaryAmount')

const totalSalaryEl = document.getElementById('totalSalary')
const totalExpensesEl = document.getElementById('totalExpenses')
const remainingBalanceEl = document.getElementById('remainingBalance')

const expenseForm = document.getElementById('salaryExpenses')
const expenseNameInput = document.getElementById('expensesName')
const expenseAmountInput = document.getElementById('expenseAmount')

const expenseList = document.getElementById('expenseList')

const currencySelect = document.getElementById('currencySelect')

const downloadPdfBtn = document.getElementById('downloadPdf')

const ctx = document.getElementById('myChart')

const salaryError = document.getElementById('salaryError')

const expenseError = document.getElementById('expenseError')

// CHART

let expenseChart

function updateChart(totalExpenses, remainingBalance) {
  if (expenseChart) {
    expenseChart.destroy()
  }

  expenseChart = new Chart(ctx, {
    type: 'doughnut',

    data: {
      labels: ['Expenses', 'Remaining Balance'],

      datasets: [
        {
          data: [totalExpenses, remainingBalance],

          backgroundColor: ['#ef4444', '#22c55e'],

          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
}

// SUMMARY

function updateSummary() {
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + Number(expense.amount)
  }, 0)

  const remainingBalance = salary - totalExpenses

  const convertedSalary = salary * exchangeRate

  const convertedExpenses = totalExpenses * exchangeRate

  const convertedBalance = remainingBalance * exchangeRate

  totalSalaryEl.innerText = `${currentCurrency} ${convertedSalary.toFixed(2)}`

  totalExpensesEl.innerText = `${currentCurrency} ${convertedExpenses.toFixed(2)}`

  remainingBalanceEl.innerText = `${currentCurrency} ${convertedBalance.toFixed(2)}`

  // Threshold Alert

  if (salary > 0 && remainingBalance < salary * 0.1) {
    remainingBalanceEl.classList.add('text-red-500')
  } else {
    remainingBalanceEl.classList.remove('text-red-500')
  }

  updateChart(convertedExpenses, convertedBalance)
}

// RENDER EXPENSES

function renderExpenses() {
  expenseList.innerHTML = ''

  expenses.forEach((expense, index) => {
    const li = document.createElement('li')

    li.className =
      'bg-gray-500 text-white px-4 py-2 rounded-md mb-2 flex justify-between items-center'

    const text = document.createElement('span')

    text.innerText = `${expense.name}: ${currentCurrency} ${(expense.amount * exchangeRate).toFixed(2)}`

    const deleteBtn = document.createElement('button')

    deleteBtn.innerText = 'Delete'

    deleteBtn.className = 'bg-red-500 px-3 py-1 rounded cursor-pointer'

    deleteBtn.addEventListener('click', () => {
      expenses.splice(index, 1)

      localStorage.setItem('expenses', JSON.stringify(expenses))

      renderExpenses()

      updateSummary()
    })

    li.appendChild(text)

    li.appendChild(deleteBtn)

    expenseList.appendChild(li)
  })
}

// SALARY FORM

salaryForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const salaryValue = Number(salaryInput.value)

  salaryError.innerText = ''

  if (salaryInput.value.trim() === '') {
    salaryError.innerText = 'Salary is required'
    return
  }

  if (salaryValue <= 0) {
    salaryError.innerText = 'Salary must be greater than 0'
    return
  }

  salary = salaryValue

  localStorage.setItem('salary', salary)
  salaryError.innerText = ''
  salaryInput.value = ''

  updateSummary()
})

// expense form

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const expenseName = expenseNameInput.value.trim()

  const expenseAmount = Number(expenseAmountInput.value)

  expenseError.innerText = ''

  if (expenseName === '') {
    expenseError.innerText = 'Expense name is required'
    return
  }

  if (expenseAmountInput.value.trim() === '') {
    expenseError.innerText = 'Expense amount is required'
    return
  }

  if (expenseAmount <= 0) {
    expenseError.innerText = 'Amount must be greater than 0'
    return
  }

  expenses.push({
    name: expenseName,
    amount: expenseAmount,
  })

  localStorage.setItem('expenses', JSON.stringify(expenses))
  expenseError.innerText = ''
  expenseNameInput.value = ''

  expenseAmountInput.value = ''

  renderExpenses()

  updateSummary()
})

// PDF DOWNLOAD

downloadPdfBtn.addEventListener('click', generatePDF)

function generatePDF() {
  const { jsPDF } = window.jspdf

  const doc = new jsPDF()

  const totalExpenses = expenses.reduce((total, expense) => {
    return total + Number(expense.amount)
  }, 0)

  const remainingBalance = salary - totalExpenses

  doc.setFontSize(20)

  doc.text('Cash Flow Report', 20, 20)

  doc.setFontSize(12)

  doc.text(`Salary: ₹${salary}`, 20, 40)

  doc.text(`Total Expenses: ₹${totalExpenses}`, 20, 50)

  doc.text(`Remaining Balance: ₹${remainingBalance}`, 20, 60)

  doc.setFontSize(16)

  doc.text('Expense List', 20, 80)

  let y = 95

  expenses.forEach((expense, index) => {
    doc.text(`${index + 1}. ${expense.name} - ₹${expense.amount}`, 20, y)

    y += 10
  })

  if (expenses.length === 0) {
    doc.text('No expenses found', 20, y)
  }

  doc.save('CashFlowReport.pdf')
}

// CURRENCY CONVERTER

async function fetchCurrency(currency) {
  if (currency === 'INR') {
    currentCurrency = 'INR'

    exchangeRate = 1

    renderExpenses()

    updateSummary()

    return
  }

  try {
    const response = await fetch(
      'https://v6.exchangerate-api.com/v6/41f8746b1f5ee206f63d475d/latest/INR',
    )

    const data = await response.json()

    exchangeRate = data.conversion_rates[currency]

    currentCurrency = currency

    renderExpenses()

    updateSummary()
  } catch (error) {
    console.log(error)

    alert('Currency conversion failed')
  }
}

currencySelect.addEventListener('change', function () {
  fetchCurrency(this.value)
})

renderExpenses()

updateSummary()
