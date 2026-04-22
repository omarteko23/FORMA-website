const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// عرض بيانات المستخدم
document.getElementById("userInfo").innerHTML = `
<h2> Welcome ${user.name}</h2>
<p>Age: ${user.age}</p>
<p>Gender: ${user.gender}</p>
`;

// التنقل
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

// ================= Calories =================
function manualCalories() {
    const w = +c_weight.value;
    const h = +c_height.value;
    const a = +c_age.value;
    const g = c_gender.value;
    const goal = c_goal.value;
    const act = c_activity.value;

    if (!w || !h || !a) {
        alert("Fill all fields");
        return;
    }

    let bmr = g === "female"
        ? (10*w + 6.25*h - 5*a - 161)
        : (10*w + 6.25*h - 5*a + 5);

    const map = { low:1.2, light:1.375, moderate:1.55, high:1.725 };
    let cal = bmr * map[act];

    if (goal === "lose") cal -= 300;
    if (goal === "gain") cal += 300;

    calorieResult.innerText = Math.round(cal) + " kcal/day";
}

// ================= Protein =================
function manualProtein() {
    const w = +p_weight.value;
    const goal = p_goal.value;

    if (!w) return alert("Enter weight");

    let p = goal === "gain" ? w*2.2 :
            goal === "lose" ? w*2 :
            w*1.8;

    proteinResult.innerText = p.toFixed(1) + " g/day";
}

// ================= Workout =================
function generateWorkout() {
    const goal = w_goal.value;
    const days = +w_days.value;

    let plan = "";

    if (goal === "gain") {
        plan = `
 Push Day:
Chest + Shoulders + Triceps
3 sets × 10 reps

 Pull Day:
Back + Biceps
3 sets × 10 reps

Legs:
3 sets × 12 reps
        `;
    }

    else if (goal === "lose") {
        plan = `
 Full Body + Cardio
30 min cardio
Light weights
        `;
    }

    else {
        plan = `
 Balanced:
Upper / Lower split
+ cardio
        `;
    }

    workoutResult.innerText = plan;
}

// ================= Meal =================
function generateMeal() {
    const cal = +m_cal.value;
    const pro = +m_pro.value;

    mealResult.innerText = `
 Breakfast:
Eggs + Oats

 Lunch:
Chicken + Rice

 Dinner:
Protein + Veggies

 Target:
${cal} kcal / ${pro}g protein
    `;
}

// ================= Logout =================
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
}

// تشغيل الوضع المحفوظ
window.onload = () => {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark");
    }
};
