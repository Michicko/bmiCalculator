const english = document.getElementById('english');
const metric = document.getElementById('metric');
const metricForm = document.getElementById('metric-form');
const englishForm = document.getElementById('english-form');
const inInput = document.getElementById('height-input-in');
const cmInput = document.getElementById('height-input-cm');
const lbsInput = document.getElementById('weight-input-lbs');
const kgInput = document.getElementById('weight-input-kg');
const result = document.getElementById('result');
const loading = document.querySelector('.img-div');
const guides = document.querySelector('.guides');

// Event Listeners
english.addEventListener('click', () => {
    displayForm(true, false, 'eng');
});

metric.addEventListener('click', () => {
    displayForm(false, true, 'met');
});
// english form
englishForm.addEventListener('submit', calculateEnglish);
metricForm.addEventListener('submit', calculateMetric);


// display form english | metric
function displayForm(eng, met, choice) {
    eng = eng === true ? 'block' : 'none';
    met = met === true ? 'block' : 'none';
    chosen = choice === 'eng' ? metric.classList.remove('active') : english.classList.remove('active')
    choice = choice === 'eng' ?
        english.classList += ' active' : metric.classList += ' active';
    result.style.display = 'none';
    englishForm.style.display = eng;
    metricForm.style.display = met;
}

// calculate BMI
function calculateEnglish(e) {
    const loc = document.querySelector('.eng-error');
    let weight = parseInt(lbsInput.value);
    let height = parseInt(inInput.value);
    let bmi = ((weight * 703) / (Math.pow(height, 2))).toFixed(2);

    if (isNaN(bmi)) {
        setAlert('please check your numbers', loc);
        setTimeout(() => {
            removeError(loc);
        }, 2000)
    } else {
        populateDom(bmi);
    }
    e.preventDefault();
}

// calculate metic
function calculateMetric(e) {
    const loc = document.querySelector('.met-error');
    let weight = parseInt(kgInput.value);
    let height = (parseInt(cmInput.value) / 100);
    let bmi = ((weight) / Math.pow(height, 2)).toFixed(2);

    if (isNaN(bmi)) {
        setAlert('please check your numbers', loc);
         setTimeout(() => {
             removeError(loc);
         }, 2000)
    } else {
        populateDom(bmi);
    }
    e.preventDefault();
}

// populate DOM
function populateDom(bmi) {
    loading.style.display = 'block';
    result.style.display = 'none';
    guides.style.display = 'none';
    setTimeout(() => {
        loading.style.display = 'none';
        guides.style.display = 'flex';
        displayRes(bmi);
    }, 2000);
    clearFields();
}

// display result
function displayRes(bmi) {
    let html = `
        <h4>${bmi} kg/m<sup>2</sup></h4>
        `;
    result.innerHTML = html;
    result.style.display = 'block';
    setColor(bmi);
}

// set alert
function setAlert(msg, loc) {
    const p = document.createElement('p');
    p.className = 'error';
    p.appendChild(document.createTextNode(msg));
    loc.appendChild(p);
}

// remove alert
function removeError(loc) {
    if (loc) {
        loc.firstElementChild.remove();
    }
}

// set result color
function setColor(bmi) {
    if (bmi <= 18.5) {
        // underweight
        result.classList = 'underweight';
    } else if (bmi > 18.5 && bmi <= 24.9) {
        // normal show green
        result.classList = 'normal';
    } else if (bmi > 24.9 && bmi <= 29.9) {
        // show red danger
        result.classList = 'overweight';
    } else if (bmi > 30.0) {
        // show danger overweight red
        result.classList = 'overweight';
    }
}

// clear fields
function clearFields() {
    document.getElementById('height-input-in').value = '';
    document.getElementById('height-input-cm').value = '';
    document.getElementById('weight-input-lbs').value = '';
    document.getElementById('weight-input-kg').value = '';
}
