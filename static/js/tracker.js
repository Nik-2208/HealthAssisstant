// Tracker JavaScript for local storage functionality

// Initialize arrays from localStorage or empty arrays
let meals = JSON.parse(localStorage.getItem('meals')) || [];
let exercises = JSON.parse(localStorage.getItem('exercises')) || [];

// Function to add a meal
function addMeal() {
    const input = document.getElementById('mealInput');
    const mealText = input.value.trim();
    
    if (mealText) {
        meals.push(mealText);
        localStorage.setItem('meals', JSON.stringify(meals));
        input.value = '';
        displayMeals();
    } else {
        alert('Please enter meal details');
    }
}

// Function to add an exercise
function addExercise() {
    const input = document.getElementById('exerciseInput');
    const exerciseText = input.value.trim();
    
    if (exerciseText) {
        exercises.push(exerciseText);
        localStorage.setItem('exercises', JSON.stringify(exercises));
        input.value = '';
        displayExercises();
    } else {
        alert('Please enter exercise details');
    }
}

// Function to display meals
function displayMeals() {
    const list = document.getElementById('mealsList');
    if (!list) return;
    
    if (meals.length === 0) {
        list.innerHTML = '<li>No meals logged yet.</li>';
    } else {
        list.innerHTML = meals.map(meal => `<li>${escapeHtml(meal)}</li>`).join('');
    }
}

// Function to display exercises
function displayExercises() {
    const list = document.getElementById('exercisesList');
    if (!list) return;
    
    if (exercises.length === 0) {
        list.innerHTML = '<li>No exercises logged yet.</li>';
    } else {
        list.innerHTML = exercises.map(exercise => `<li>${escapeHtml(exercise)}</li>`).join('');
    }
}

// Function to clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all logged data?')) {
        meals = [];
        exercises = [];
        localStorage.removeItem('meals');
        localStorage.removeItem('exercises');
        displayMeals();
        displayExercises();
    }
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize display on page load
document.addEventListener('DOMContentLoaded', function() {
    displayMeals();
    displayExercises();
});

