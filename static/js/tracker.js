// Comprehensive Health Tracker JavaScript

// Initialize data from localStorage
let healthData = JSON.parse(localStorage.getItem('healthData')) || {
    meals: [],
    exercises: [],
    water: [],
    weight: [],
    sleep: []
};

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Helper function to get timestamp
function getTimestamp() {
    const now = new Date();
    return now.toLocaleString();
}

// ==================== MEAL TRACKING ====================
function addMeal() {
    const input = document.getElementById('mealInput');
    const mealText = input.value.trim();
    const caloriesInput = document.getElementById('caloriesInput');
    const calories = caloriesInput ? caloriesInput.value.trim() : '';
    
    if (mealText) {
        const meal = {
            id: Date.now(),
            text: mealText,
            calories: calories,
            timestamp: getTimestamp()
        };
        healthData.meals.push(meal);
        saveData();
        input.value = '';
        if (caloriesInput) caloriesInput.value = '';
        displayMeals();
        updateStats();
    } else {
        alert('Please enter meal details');
    }
}

function deleteMeal(id) {
    healthData.meals = healthData.meals.filter(function(meal) { return meal.id !== id; });
    saveData();
    displayMeals();
    updateStats();
}

function displayMeals() {
    const list = document.getElementById('mealsList');
    if (!list) return;
    
    if (healthData.meals.length === 0) {
        list.innerHTML = '<li class="empty-message">No meals logged yet.</li>';
    } else {
        let html = '';
        const reversedMeals = healthData.meals.slice().reverse();
        for (let i = 0; i < reversedMeals.length; i++) {
            const meal = reversedMeals[i];
            html += '<li class="meal-item">';
            html += '<div class="meal-info">';
            html += '<strong>' + escapeHtml(meal.text) + '</strong>';
            if (meal.calories) {
                html += '<span class="calories">' + escapeHtml(meal.calories) + ' cal</span>';
            }
            html += '<span class="timestamp">' + meal.timestamp + '</span>';
            html += '</div>';
            html += '<button class="delete-btn" onclick="deleteMeal(' + meal.id + ')">x</button>';
            html += '</li>';
        }
        list.innerHTML = html;
    }
}

// ==================== EXERCISE TRACKING ====================
function addExercise() {
    const input = document.getElementById('exerciseInput');
    const exerciseText = input.value.trim();
    const durationInput = document.getElementById('durationInput');
    const duration = durationInput ? durationInput.value.trim() : '';
    
    if (exerciseText) {
        const exercise = {
            id: Date.now(),
            text: exerciseText,
            duration: duration,
            timestamp: getTimestamp()
        };
        healthData.exercises.push(exercise);
        saveData();
        input.value = '';
        if (durationInput) durationInput.value = '';
        displayExercises();
        updateStats();
    } else {
        alert('Please enter exercise details');
    }
}

function deleteExercise(id) {
    healthData.exercises = healthData.exercises.filter(function(ex) { return ex.id !== id; });
    saveData();
    displayExercises();
    updateStats();
}

function displayExercises() {
    const list = document.getElementById('exercisesList');
    if (!list) return;
    
    if (healthData.exercises.length === 0) {
        list.innerHTML = '<li class="empty-message">No exercises logged yet.</li>';
    } else {
        let html = '';
        const reversedExercises = healthData.exercises.slice().reverse();
        for (let i = 0; i < reversedExercises.length; i++) {
            const exercise = reversedExercises[i];
            html += '<li class="exercise-item">';
            html += '<div class="exercise-info">';
            html += '<strong>' + escapeHtml(exercise.text) + '</strong>';
            if (exercise.duration) {
                html += '<span class="duration">' + escapeHtml(exercise.duration) + ' min</span>';
            }
            html += '<span class="timestamp">' + exercise.timestamp + '</span>';
            html += '</div>';
            html += '<button class="delete-btn" onclick="deleteExercise(' + exercise.id + ')">x</button>';
            html += '</li>';
        }
        list.innerHTML = html;
    }
}

// ==================== WATER TRACKING ====================
function addWater() {
    const input = document.getElementById('waterInput');
    const amount = input ? input.value.trim() : '1';
    
    if (amount && parseInt(amount) > 0) {
        const waterEntry = {
            id: Date.now(),
            amount: parseInt(amount),
            timestamp: getTimestamp()
        };
        healthData.water.push(waterEntry);
        saveData();
        if (input) input.value = '';
        displayWater();
        updateStats();
    } else {
        alert('Please enter valid amount');
    }
}

function deleteWater(id) {
    healthData.water = healthData.water.filter(function(w) { return w.id !== id; });
    saveData();
    displayWater();
    updateStats();
}

function displayWater() {
    const list = document.getElementById('waterList');
    if (!list) return;
    
    const today = new Date().toDateString();
    let todayGlasses = 0;
    for (let i = 0; i < healthData.water.length; i++) {
        const wDate = new Date(healthData.water[i].timestamp).toDateString();
        if (wDate === today) {
            todayGlasses += healthData.water[i].amount;
        }
    }
    
    let html = '<li class="water-summary">';
    html += '<div class="water-count">';
    html += '<span class="glass-icon">D</span>';
    html += '<span class="count">' + todayGlasses + ' / 8 glasses today</span>';
    html += '</div>';
    html += '</li>';
    
    if (healthData.water.length > 0) {
        const recentWater = healthData.water.slice(-5).reverse();
        for (let i = 0; i < recentWater.length; i++) {
            const w = recentWater[i];
            html += '<li class="water-item">';
            html += '<span>' + w.amount + ' glass' + (w.amount > 1 ? 'es' : '') + '</span>';
            html += '<span class="timestamp">' + w.timestamp + '</span>';
            html += '<button class="delete-btn" onclick="deleteWater(' + w.id + ')">x</button>';
            html += '</li>';
        }
    }
    
    list.innerHTML = html;
}

// ==================== WEIGHT TRACKING ====================
function addWeight() {
    const input = document.getElementById('weightInput');
    const weight = input ? input.value.trim() : '';
    
    if (weight && parseFloat(weight) > 0) {
        const weightEntry = {
            id: Date.now(),
            weight: parseFloat(weight),
            timestamp: getTimestamp()
        };
        healthData.weight.push(weightEntry);
        saveData();
        if (input) input.value = '';
        displayWeight();
        calculateBMI();
    } else {
        alert('Please enter valid weight');
    }
}

function deleteWeight(id) {
    healthData.weight = healthData.weight.filter(function(w) { return w.id !== id; });
    saveData();
    displayWeight();
    calculateBMI();
}

function displayWeight() {
    const list = document.getElementById('weightList');
    if (!list) return;
    
    if (healthData.weight.length === 0) {
        list.innerHTML = '<li class="empty-message">No weight logged yet.</li>';
    } else {
        const latestWeight = healthData.weight[healthData.weight.length - 1];
        let html = '<li class="weight-current">';
        html += '<strong>Current: ' + latestWeight.weight + ' kg</strong>';
        html += '<span class="timestamp">' + latestWeight.timestamp + '</span>';
        html += '</li>';
        
        const recentWeight = healthData.weight.slice(-4).reverse();
        for (let i = 1; i < recentWeight.length; i++) {
            const w = recentWeight[i];
            html += '<li class="weight-item">';
            html += '<span>' + w.weight + ' kg</span>';
            html += '<span class="timestamp">' + w.timestamp + '</span>';
            html += '<button class="delete-btn" onclick="deleteWeight(' + w.id + ')">x</button>';
            html += '</li>';
        }
        list.innerHTML = html;
    }
}

// ==================== SLEEP TRACKING ====================
function addSleep() {
    const hoursInput = document.getElementById('sleepInput');
    const hours = hoursInput ? hoursInput.value.trim() : '';
    
    if (hours && parseFloat(hours) > 0) {
        const sleepEntry = {
            id: Date.now(),
            hours: parseFloat(hours),
            timestamp: getTimestamp()
        };
        healthData.sleep.push(sleepEntry);
        saveData();
        if (hoursInput) hoursInput.value = '';
        displaySleep();
        updateStats();
    } else {
        alert('Please enter valid hours');
    }
}

function deleteSleep(id) {
    healthData.sleep = healthData.sleep.filter(function(s) { return s.id !== id; });
    saveData();
    displaySleep();
    updateStats();
}

function displaySleep() {
    const list = document.getElementById('sleepList');
    if (!list) return;
    
    const today = new Date().toDateString();
    let todaySleep = [];
    for (let i = 0; i < healthData.sleep.length; i++) {
        const sDate = new Date(healthData.sleep[i].timestamp).toDateString();
        if (sDate === today) {
            todaySleep.push(healthData.sleep[i]);
        }
    }
    
    if (todaySleep.length > 0) {
        const latestSleep = todaySleep[todaySleep.length - 1];
        let html = '<li class="sleep-today">';
        html += '<span class="sleep-icon">Z</span>';
        html += '<strong>' + latestSleep.hours + ' hours today</strong>';
        html += '</li>';
        list.innerHTML = html;
    } else if (healthData.sleep.length === 0) {
        list.innerHTML = '<li class="empty-message">No sleep logged yet.</li>';
    } else {
        const recentSleep = healthData.sleep.slice(-4).reverse();
        let html = '';
        for (let i = 0; i < recentSleep.length; i++) {
            const s = recentSleep[i];
            html += '<li class="sleep-item">';
            html += '<span>' + s.hours + ' hours</span>';
            html += '<span class="timestamp">' + s.timestamp + '</span>';
            html += '<button class="delete-btn" onclick="deleteSleep(' + s.id + ')">x</button>';
            html += '</li>';
        }
        list.innerHTML = html;
    }
}

// ==================== BMI CALCULATOR ====================
function calculateBMI() {
    const heightInput = document.getElementById('heightInput');
    const height = heightInput ? heightInput.value.trim() : '';
    
    const bmiDisplay = document.getElementById('bmiResult');
    if (!bmiDisplay) return;
    
    if (healthData.weight.length === 0 || !height || parseFloat(height) <= 0) {
        bmiDisplay.innerHTML = '<p class="bmi-placeholder">Enter height and log weight to calculate BMI</p>';
        return;
    }
    
    const weight = healthData.weight[healthData.weight.length - 1].weight;
    const heightM = parseFloat(height) / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    
    var category = '';
    var color = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#f39c12';
    } else if (bmi < 25) {
        category = 'Normal';
        color = '#27ae60';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#e67e22';
    } else {
        category = 'Obese';
        color = '#e74c3c';
    }
    
    bmiDisplay.innerHTML = '<div class="bmi-value" style="color: ' + color + '">BMI: ' + bmi + '</div>' +
        '<div class="bmi-category" style="color: ' + color + '">' + category + '</div>';
}

// ==================== STATS & SUMMARY ====================
function updateStats() {
    const statsContainer = document.getElementById('statsSummary');
    if (!statsContainer) return;
    
    // Calculate today's stats
    const today = new Date().toDateString();
    
    let todayMeals = [];
    for (let i = 0; i < healthData.meals.length; i++) {
        if (new Date(healthData.meals[i].timestamp).toDateString() === today) {
            todayMeals.push(healthData.meals[i]);
        }
    }
    
    let totalCalories = 0;
    for (let i = 0; i < todayMeals.length; i++) {
        totalCalories += parseInt(todayMeals[i].calories) || 0;
    }
    
    let todayExercises = [];
    for (let i = 0; i < healthData.exercises.length; i++) {
        if (new Date(healthData.exercises[i].timestamp).toDateString() === today) {
            todayExercises.push(healthData.exercises[i]);
        }
    }
    
    let todayWater = 0;
    for (let i = 0; i < healthData.water.length; i++) {
        if (new Date(healthData.water[i].timestamp).toDateString() === today) {
            todayWater += healthData.water[i].amount;
        }
    }
    
    let todaySleepData = [];
    for (let i = 0; i < healthData.sleep.length; i++) {
        if (new Date(healthData.sleep[i].timestamp).toDateString() === today) {
            todaySleepData.push(healthData.sleep[i]);
        }
    }
    
    let avgSleep = 0;
    if (todaySleepData.length > 0) {
        let sleepSum = 0;
        for (let i = 0; i < todaySleepData.length; i++) {
            sleepSum += todaySleepData[i].hours;
        }
        avgSleep = (sleepSum / todaySleepData.length).toFixed(1);
    }
    
    statsContainer.innerHTML = 
        '<div class="stat-card">' +
            '<span class="stat-icon">M</span>' +
            '<div class="stat-info">' +
                '<span class="stat-value">' + todayMeals.length + '</span>' +
                '<span class="stat-label">Meals</span>' +
            '</div>' +
        '</div>' +
        '<div class="stat-card">' +
            '<span class="stat-icon">C</span>' +
            '<div class="stat-info">' +
                '<span class="stat-value">' + totalCalories + '</span>' +
                '<span class="stat-label">Calories</span>' +
            '</div>' +
        '</div>' +
        '<div class="stat-card">' +
            '<span class="stat-icon">W</span>' +
            '<div class="stat-info">' +
                '<span class="stat-value">' + todayWater + '/8</span>' +
                '<span class="stat-label">Water</span>' +
            '</div>' +
        '</div>' +
        '<div class="stat-card">' +
            '<span class="stat-icon">E</span>' +
            '<div class="stat-info">' +
                '<span class="stat-value">' + todayExercises.length + '</span>' +
                '<span class="stat-label">Exercises</span>' +
            '</div>' +
        '</div>' +
        '<div class="stat-card">' +
            '<span class="stat-icon">S</span>' +
            '<div class="stat-info">' +
                '<span class="stat-value">' + avgSleep + 'h</span>' +
                '<span class="stat-label">Sleep Avg</span>' +
            '</div>' +
        '</div>';
}

// ==================== DATA MANAGEMENT ====================
function saveData() {
    localStorage.setItem('healthData', JSON.stringify(healthData));
}

function clearAllData() {
    if (confirm('Are you sure you want to clear ALL health data? This cannot be undone.')) {
        healthData = {
            meals: [],
            exercises: [],
            water: [],
            weight: [],
            sleep: []
        };
        saveData();
        displayMeals();
        displayExercises();
        displayWater();
        displayWeight();
        displaySleep();
        updateStats();
        var bmiDisplay = document.getElementById('bmiResult');
        if (bmiDisplay) bmiDisplay.innerHTML = '';
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    displayMeals();
    displayExercises();
    displayWater();
    displayWeight();
    displaySleep();
    updateStats();
    calculateBMI();
});

// Handle Enter key for inputs
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (e.target.id === 'mealInput') addMeal();
        if (e.target.id === 'exerciseInput') addExercise();
        if (e.target.id === 'waterInput') addWater();
        if (e.target.id === 'weightInput') addWeight();
        if (e.target.id === 'sleepInput') addSleep();
    }
});

