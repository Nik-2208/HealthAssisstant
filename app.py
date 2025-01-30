from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Store meals and exercises in memory (this can be replaced with a database later)
meals = []
exercises = []

# Route for homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for track health page
@app.route('/track_health', methods=['GET', 'POST'])
def track_health():
    if request.method == 'POST':
        # Handling meal form submission
        if 'meal_details' in request.form:
            meal_details = request.form['meal_details']
            meals.append(meal_details)
        
        # Handling exercise form submission
        elif 'exercise_details' in request.form:
            exercise_details = request.form['exercise_details']
            exercises.append(exercise_details)

    # Pass meals and exercises to the template for rendering
    return render_template('track_health.html', meals=meals, exercises=exercises)

# Route for health tips page
@app.route('/health_tips')
def health_tips():
    return render_template('health_tips.html')

if __name__ == '__main__':
    app.run(debug=True)
