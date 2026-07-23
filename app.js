const BASE_URL = "https://open.er-api.com/v6/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");   
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const result = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let select of dropdowns) {
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        updateExchangeRate();
    });
}
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}${fromCurrency.value}`;

    try {
        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rate.");
        }

        let data = await response.json();
        let rate = data.rates[toCurrency.value];
        let finalAmount = amtVal * rate;

        result.innerText = `${amtVal} ${fromCurrency.value} = ${finalAmount.toFixed(2)} ${toCurrency.value}`;

    } catch (error) {
        console.log(error);
        result.innerText = "Unable to fetch exchange rates.";
    }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", e => {
    updateExchangeRate();
  });



