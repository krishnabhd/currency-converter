const API_URL = 'https://api.frankfurter.dev/v1/latest?base=$USD&symbols=$INR';
const flg = "https://flagsapi.com/BE/flat/64.png";


const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.querySelector('.msg h3');

for (const code in countryList) {
    const option = document.createElement("option");
    option.value = countryList[code].toLowerCase();
    option.textContent = code;
    fromCurrency.appendChild(option);
}

for (const code in countryList) {
    const option = document.createElement("option");
    option.value = countryList[code].toLowerCase();
    option.textContent = code;
    toCurrency.appendChild(option);
}

const setDefaultOption = (select, currencyCode) => {
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].textContent === currencyCode) {
            select.selectedIndex = i;
            break;
        }
    }
};

setDefaultOption(fromCurrency, "USD");
setDefaultOption(toCurrency, "INR");

const fromImg = document.querySelector("#fromImg");
const toImg = document.querySelector("#toImg");

const updateFlag = (imgElement, selectElement) => {
    const countryCode = selectElement.value.toUpperCase();
    imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

updateFlag(fromImg, fromCurrency);
updateFlag(toImg, toCurrency);

fromCurrency.addEventListener("change", function () {
    updateFlag(fromImg, fromCurrency);
});

toCurrency.addEventListener("change", function () {
    updateFlag(toImg, toCurrency);
});

const convert = async () => {
    console.log("Getting data...");

    const fromCode = fromCurrency.options[fromCurrency.selectedIndex].textContent.trim();
    const toCode = toCurrency.options[toCurrency.selectedIndex].textContent.trim();
    let amount = Number(amountInput.value);
    
    if (!Number.isFinite(amount) || amount < 0) {
    resultText.textContent = "Enter a valid amount (0 or more).";
    return;
  }
    if (!amount || amount < 0) {
        amount = 1;
    }
    

    const URL = `https://api.frankfurter.dev/v1/latest?base=${fromCode}&symbols=${toCode}`;

    console.log("Selected from:", fromCode);
    console.log("Selected to:", toCode);
    console.log("URL:", URL);

    try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const data = await res.json();
        const convertedRate = data.rates[toCode];
        const convertedAmount = amount * convertedRate;

        resultText.textContent = `${amount} ${fromCode} = ${convertedAmount.toFixed(2)} ${toCode}`;
        console.log(data);
        console.log("Rate:", convertedRate);
    } catch (err) {
        console.log("Error:", err);
        resultText.textContent = "Something went wrong!";
    }
};

convertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    convert();
});


