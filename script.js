let transactions = [];

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const text = document.getElementById('text').value.trim();
  const amount = parseFloat(document.getElementById('amount').value.trim());

  // Check if text is empty or amount is not a number
  if (text === '' || isNaN(amount)) {
    alert('Please provide valid text and amount.');
    return;
  }

  const transaction = {
    text: text,
    amount: amount
  };

  transactions.push(transaction);

  displayHistory();
  calculateBalance();

  // Clear form after adding transaction
  form.reset();
});

function displayHistory() {
  const historyContainer = document.querySelector('.history');
  historyContainer.innerHTML = ''; // Clear previous entries

  transactions.forEach(transaction => {
    const historyItem = document.createElement('p');
    historyItem.textContent = `${transaction.text}: ₹${transaction.amount.toFixed(2)}`;
    historyContainer.appendChild(historyItem);
  });
}

function calculateBalance() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(transaction => {
    if (transaction.amount > 0) {
      totalIncome += transaction.amount;
    } else {
      totalExpense += Math.abs(transaction.amount); // Convert negative values to positive
    }
  });

  const balance = totalIncome - totalExpense;

  const incomeDisplay = document.querySelector('.income');
  incomeDisplay.textContent = `Income: ₹${totalIncome.toFixed(2)}`; // Format to 2 decimal places

  const expenseDisplay = document.querySelector('.expense');
  expenseDisplay.textContent = `Expense: ₹${totalExpense.toFixed(2)}`;

  const balanceDisplay = document.querySelector('.balance');
  balanceDisplay.textContent =`Balance: ₹${balance.toFixed(2)}`; // Display the calculated balance
}