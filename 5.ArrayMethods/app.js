const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaresBtn = document.getElementById('show-millionares');
const sortBtn = document.getElementById('sort');
const calculatWealthBtn = document.getElementById('calculate-wealth');

getRandomUser();
getRandomUser();
getRandomUser();

let data = [];


// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaresBtn.addEventListener('click', showMillionares);
calculatWealthBtn.addEventListener('click', calculateWealth);



// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json();

  const user = data.results[0];

  const newUser =  {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`

    main.appendChild(element)
  });
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc+=user.money), 0)
  
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl)

}

// Sort users by richest
function sortByRichest() {
  data.sort((a,b) => b.money - a.money)
  
  updateDOM();
}


// Double everyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 }
  })
  
  updateDOM();
}

// Filter only millionares
function showMillionares() {
  data = data.filter((user) => user.money >= 1000000);

  updateDOM();
}


// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}




