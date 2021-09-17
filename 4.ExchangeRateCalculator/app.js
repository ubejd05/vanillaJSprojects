const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', function (e) {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value
  currencyEl_two.value = temp;
  calculate();
});



// Fetch exhange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://v6.exchangerate-api.com/v6/6421efa0a3444b5de165a50a/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currency_two];

      rateEl.textContent = `1 ${currency_one} = ${rate} ${currency_two}`

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
    })
}

calculate();



