// let expenses = JSON.parse(localStorage.getItem('expenses')) || []
// let totalSalary = 0
// // Form select
// const salaryForm = document.getElementById('salaryForm')

// // Input select
// const salaryInput = document.getElementById('salaryAmount')

// // // Total salary
// const totalSalary = document.getElementById('totalSalary')
// // Get salary from localStorage
// const savedSalary = localStorage.getItem('salary')

// // Check
// if (savedSalary) {
//   totalSalary.innerText = savedSalary
// }
// // Form submit event
// salaryForm.addEventListener('submit', function (event) {
//   // Page refresh stop
//   event.preventDefault()

//   // Input value
//   const salaryValue = salaryInput.value.trim()

//   // Empty check
//   if (salaryValue === '') {
//     alert('Please enter salary')
//     return
//   }

//   // Salary show
//   totalSalary.innerText = salaryValue

//   localStorage.setItem('salary', salaryValue)

//   salaryInput.value = ''
// })

// // Expense form select
// const expenseForm = document.getElementById('salaryExpenses')

// // Expense name input
// const expenseNameInput = document.getElementById('expensesName')

// // Expense amount input
// const expenseAmountInput = document.getElementById('expenseAmount')

// // UL
// const expenseList = document.getElementById('expenseList')

// // Render function
// function renderExpenses() {
//   // Old UI clear
//   expenseList.innerHTML = ''

//   // Loop through array
//   expenses.forEach(function (expense, index) {
//     // Create li
//     const li = document.createElement('li')

//     // Styling
//     li.className =
//       'bg-gray-500 text-white px-4 py-2 rounded-md mb-2 flex justify-between items-center hover:bg-gray-700 transition duration-200'

//     // Expense text
//     li.innerText = `${expense.name}: $${expense.amount}`

//     // Delete button
//     const deleteBtn = document.createElement('button')

//     deleteBtn.innerText = 'Delete'

//     deleteBtn.className = 'bg-red-500 px-3 py-1 rounded cursor-pointer'

//     // Delete event
//     deleteBtn.addEventListener('click', function () {
//       // Remove from array
//       expenses.splice(index, 1)

//       // Update localStorage
//       localStorage.setItem('expenses', JSON.stringify(expenses))

//       // Re-render UI
//       renderExpenses()
//     })

//     // Add delete button into li
//     li.appendChild(deleteBtn)

//     // Add li into ul
//     expenseList.appendChild(li)
//   })
// }

// // Form submit
// expenseForm.addEventListener('submit', (event) => {
//   // Stop refresh
//   event.preventDefault()

//   // Input values
//   const expenseName = expenseNameInput.value.trim()

//   const expenseAmount = expenseAmountInput.value.trim()

//   // Empty check
//   if (expenseName === '' || expenseAmount === '') {
//     alert('Please enter expense name and amount')

//     return
//   }

//   // Add expense into array
//   expenses.push({
//     name: expenseName,
//     amount: expenseAmount,
//   })

//   // Save into localStorage
//   localStorage.setItem('expenses', JSON.stringify(expenses))

//   // Render UI
//   renderExpenses()

//   // Clear inputs
//   expenseNameInput.value = ''

//   expenseAmountInput.value = ''
// })

// // Initial render on page load
// renderExpenses()

// const ctx = document.getElementById('myChart')

// new Chart(ctx, {
//   type: 'doughnut',

//   data: {
//     labels: ['Salary', 'Expenses', 'Remaining'],

//     datasets: [
//       {
//         label: 'Expenses',

//         data: [5000, 12000, 3000],

//         borderWidth: 1,
//       },
//     ],
//   },

//   options: {
//     responsive: true,
//   },
// })
// =======================
// LOCAL STORAGE
// =======================

let expenses = JSON.parse(localStorage.getItem('expenses')) || []

let salary = Number(localStorage.getItem('salary')) || 0

// =======================
// SELECT ELEMENTS
// =======================

const salaryForm = document.getElementById('salaryForm')

const salaryInput = document.getElementById('salaryAmount')

const totalSalaryEl = document.getElementById('totalSalary')

const totalExpensesEl = document.getElementById('totalExpenses')

const remainingBalanceEl = document.getElementById('remainingBalance')

const expenseForm = document.getElementById('salaryExpenses')

const expenseNameInput = document.getElementById('expensesName')

const expenseAmountInput = document.getElementById('expenseAmount')

const expenseList = document.getElementById('expenseList')

// =======================
// CHART
// =======================

const ctx = document.getElementById('myChart')

let expenseChart

function updateChart(totalExpenses, remainingBalance) {
  // Destroy old chart
  if (expenseChart) {
    expenseChart.destroy()
  }

  // Create new chart
  expenseChart = new Chart(ctx, {
    type: 'doughnut',

    data: {
      labels: ['Expenses', 'Remaining'],

      datasets: [
        {
          label: 'Finance',

          data: [totalExpenses, remainingBalance],

          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,
    },
  })
}

// =======================
// UPDATE SUMMARY
// =======================

function updateSummary() {
  // Total Expenses
  const totalExpenses = expenses.reduce(function (total, expense) {
    return total + Number(expense.amount)
  }, 0)

  // Remaining Balance
  const remainingBalance = salary - totalExpenses

  // Update DOM
  totalSalaryEl.innerText = `₹${salary}`

  totalExpensesEl.innerText = `₹${totalExpenses}`

  remainingBalanceEl.innerText = `₹${remainingBalance}`

  // Warning Logic
  if (salary > 0 && remainingBalance < salary * 0.1) {
    remainingBalanceEl.classList.add('text-red-500')
  } else {
    remainingBalanceEl.classList.remove('text-red-500')
  }

  // Update Chart
  updateChart(totalExpenses, remainingBalance)
}

// =======================
// SALARY FORM
// =======================

if (salary > 0) {
  totalSalaryEl.innerText = `₹${salary}`
}

salaryForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const salaryValue = Number(salaryInput.value.trim())

  // Validation
  if (salaryValue <= 0) {
    alert('Please enter valid salary')

    return
  }

  // Save salary
  salary = salaryValue

  localStorage.setItem('salary', salary)

  // Update UI
  updateSummary()

  // Clear input
  salaryInput.value = ''
})

// =======================
// RENDER EXPENSES
// =======================

function renderExpenses() {
  // Clear old list
  expenseList.innerHTML = ''

  // Loop
  expenses.forEach(function (expense, index) {
    // Create li
    const li = document.createElement('li')

    // Styling
    li.className =
      'bg-gray-500 text-white px-4 py-2 rounded-md mb-2 flex justify-between items-center hover:bg-gray-700 transition duration-200'

    // Create text
    const expenseText = document.createElement('span')

    expenseText.innerText = `${expense.name}: ₹${expense.amount}`

    // Delete button
    const deleteBtn = document.createElement('button')

    deleteBtn.innerText = 'Delete'

    deleteBtn.className = 'bg-red-500 px-3 py-1 rounded cursor-pointer'

    // Delete event
    deleteBtn.addEventListener('click', function () {
      // Remove expense
      expenses.splice(index, 1)

      // Save updated array
      localStorage.setItem('expenses', JSON.stringify(expenses))

      // Re-render
      renderExpenses()

      updateSummary()
    })

    // Append
    li.appendChild(expenseText)

    li.appendChild(deleteBtn)

    expenseList.appendChild(li)
  })

  // Update calculations
  updateSummary()
}

// =======================
// EXPENSE FORM
// =======================

expenseForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const expenseName = expenseNameInput.value.trim()

  const expenseAmount = Number(expenseAmountInput.value.trim())

  // Validation
  if (expenseName === '' || expenseAmount <= 0) {
    alert('Please enter valid data')

    return
  }

  // Push expense
  expenses.push({
    name: expenseName,

    amount: expenseAmount,
  })

  // Save
  localStorage.setItem('expenses', JSON.stringify(expenses))

  // Render
  renderExpenses()

  // Clear inputs
  expenseNameInput.value = ''

  expenseAmountInput.value = ''
})

// =======================
// INITIAL LOAD
// =======================

renderExpenses()

updateSummary()
