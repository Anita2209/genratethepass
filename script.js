const resultEl = document.getElementById('result22');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generator');
const clipboardEl = document.getElementById('clipboard');
const toggleVisibilityEl = document.getElementById('toggleVisibility');
const strengthBar = document.getElementById('strength-bar');
const strengthFeedback = document.getElementById('strength-feedback');
const toast = document.getElementById('toast');
const themeSwitcher = document.getElementById('themeSwitcher');

const randomFunc = {
    lower: getRandomLowerCase,
    upper: getRandomUpperCase,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    resultEl.innerText = password;
    calculateStrength(password);
});

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    showToast('Password copied to clipboard');
});

toggleVisibilityEl.addEventListener('click', () => {
    if (resultEl.style.webkitTextSecurity === 'disc') {
        resultEl.style.webkitTextSecurity = 'none';
        toggleVisibilityEl.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        resultEl.style.webkitTextSecurity = 'disc';
        toggleVisibilityEl.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
});

themeSwitcher.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i++) {
        const funcName = typesArr[Math.floor(Math.random() * typesArr.length)];
        generatedPassword += randomFunc[Object.keys(funcName)[0]]();
    }

    return generatedPassword;
}

function getRandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function calculateStrength(password) {
    let strength = 0;
    let feedback = '';

    const length = password.length;
    if (length >= 12) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(){}[\]=<>/,.]/.test(password)) strength += 1;

    const strengthPercentage = (strength / 5) * 100;

    // Debugging info
    console.log('Password:', password);
    console.log('Length:', length);
    console.log('Strength Score:', strength);
    console.log('Strength Percentage:', strengthPercentage);

    strengthBar.style.width = `${strengthPercentage}%`;

    if (strengthPercentage < 50) {
        strengthBar.style.backgroundColor = '#ff4d4d'; // Red
        feedback = 'Weak: Add uppercase letters, symbols, or numbers';
    } else if (strengthPercentage < 70) {
        strengthBar.style.backgroundColor = '#ffcc00'; // Orange
        feedback = 'Medium: Add more symbols or increase length';
    } else {
        strengthBar.style.backgroundColor = '#4caf50'; // Green
        feedback = 'Strong: Good job!';
    }

    strengthFeedback.innerText = feedback;
}

function showToast(message) {
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}











