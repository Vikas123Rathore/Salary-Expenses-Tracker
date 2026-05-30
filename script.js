let expenses = []
// Form select
const salaryForm = document.getElementById('salaryForm')

// Input select
const salaryInput = document.getElementById('salaryAmount')

// // Total salary
// const totalSalary = document.getElementById('totalSalary')
// Get salary from localStorage
const savedSalary = localStorage.getItem('salary')

// Check
if (savedSalary) {
  totalSalary.innerText = savedSalary
}
// Form submit event
salaryForm.addEventListener('submit', function (event) {
  // Page refresh stop
  event.preventDefault()

  // Input value
  const salaryValue = salaryInput.value.trim()

  // Empty check
  if (salaryValue === '') {
    alert('Please enter salary')
    return
  }

  // Salary show
  totalSalary.innerText = salaryValue

  localStorage.setItem('salary', salaryValue)
  // // Create li
  // const li = document.createElement('li')

  // // Text add
  // li.innerText = salaryValue

  // // Styling
  // li.className =
  //   'bg-gray-500 text-white px-4 py-2 rounded-md mb-2 cursor-pointer'

  // // Click event
  // li.addEventListener('click', function () {
  //   li.classList.add('text-blue-500')

  //   console.log('Clicked on:', salaryValue)
  // })

  // // Add li into ul
  // expenseList.appendChild(li)

  // Clear input
  salaryInput.value = ''
})

// Expense form select
const expenseForm = document.getElementById('salaryExpenses')
// Expense name input select
const expenseNameInput = document.getElementById('expensesName')
// Expense amount input select
const expenseAmountInput = document.getElementById('expensesAmount')
// UL select
const expenseList = document.getElementById('expenseList')
// form submit event
expenseForm.addEventListener('submit', (event) => {
  // Page refresh stop
  event.preventDefault()
  // Input value
  const expenseName = expenseNameInput.value.trim()
  const expenseAmount = expenseAmountInput.value.trim()
  // Empty check
  if (expenseName === '' || expenseAmount === '') {
    alert('Please enter expense name and amount')
    return
  }
  // Create li
  const li = document.createElement('li')
  // Text add
  li.innerText = `${expenseName}: $${expenseAmount}`
  // Styling
  li.className =
    'bg-gray-500 text-white px-4 py-2 rounded-md mb-2 cursor-pointer hover:bg-gray-700 transition duration-200 list-none'
  // Click event
  li.addEventListener('click', function () {
    li.classList.add('text-blue-500')
    console.log('Clicked on:', expenseName, expenseAmount)
  })
  // Add li into ul
  expenseList.appendChild(li)
  // Clear inputs
  expenseNameInput.value = ''
  expenseAmountInput.value = ''
})
