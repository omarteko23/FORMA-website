// ================= البيانات من localStorage =================
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// عرض بيانات المستخدم في الصفحة الرئيسية
document.getElementById("userInfo").innerHTML = `
    <h2>👋 Welcome ${user.name}</h2>
    <p>Age: ${user.age}</p>
    <p>Gender: ${user.gender}</p>
`;

// عرض رسالة الترحيب في التوب بار
if (document.getElementById("welcomeText")) {
    document.getElementById("welcomeText").innerHTML = `👋 Hello, ${user.name}`;
}

// ================= التنقل بين الأقسام =================
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

// ================= إغلاق القائمة على الموبايل بعد الضغط =================
function closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.remove("open");
        }
    }
}

// ================= فتح وقفل القائمة الجانبية =================
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

// ================= لو اتغير حجم الشاشة =================
window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.remove("open");
        }
    }
});

// ================= Calories Calculator =================
function manualCalories() {
    const w = document.getElementById("c_weight")?.value;
    const h = document.getElementById("c_height")?.value;
    const a = document.getElementById("c_age")?.value;
    const g = document.getElementById("c_gender")?.value;
    const goal = document.getElementById("c_goal")?.value;
    const act = document.getElementById("c_activity")?.value;

    if (!w || !h || !a || !g || !goal || !act) {
        alert("Please fill all fields");
        return;
    }

    let bmr = g === "female"
        ? (10 * w + 6.25 * h - 5 * a - 161)
        : (10 * w + 6.25 * h - 5 * a + 5);

    const activityMap = { low: 1.2, light: 1.375, moderate: 1.55, high: 1.725 };
    let cal = bmr * activityMap[act];

    if (goal === "lose") cal -= 300;
    if (goal === "gain") cal += 300;

    const result = document.getElementById("calorieResult");
    if (result) {
        result.innerText = Math.round(cal) + " kcal/day";
    }
}

// ================= Protein Calculator =================
function manualProtein() {
    const w = document.getElementById("p_weight")?.value;
    const goal = document.getElementById("p_goal")?.value;

    if (!w || !goal) {
        alert("Please fill all fields");
        return;
    }

    let p = goal === "gain" ? w * 2.2 :
            goal === "lose" ? w * 2 :
            w * 1.8;

    const result = document.getElementById("proteinResult");
    if (result) {
        result.innerText = p.toFixed(1) + " g/day";
    }
}

// ================= Workout Generator =================
function generateWorkout() {
    const goal = document.getElementById("w_goal")?.value;
    const days = document.getElementById("w_days")?.value;

    if (!goal || !days) {
        alert("Please fill all fields");
        return;
    }

    let plan = "";

    if (goal === "gain") {
        plan = `
🏋️ GAIN WORKOUT PLAN (${days} days/week)

🔥 Push Day:
• Bench Press: 3 × 10
• Shoulder Press: 3 × 12
• Triceps Dips: 3 × 12

💪 Pull Day:
• Pull Ups: 3 × 8
• Barbell Rows: 3 × 10
• Bicep Curls: 3 × 12

🦵 Leg Day:
• Squats: 3 × 10
• Deadlifts: 3 × 8
• Leg Press: 3 × 12
        `;
    } else if (goal === "lose") {
        plan = `
🔥 LOSE WEIGHT PLAN (${days} days/week)

🏃‍♂️ Cardio (30 min):
• Running or Cycling

💪 Full Body Circuit:
• Push Ups: 3 × 15
• Bodyweight Squats: 3 × 20
• Lunges: 3 × 12 each leg
• Plank: 3 × 30 sec

🥗 Rest between sets: 30-45 sec
        `;
    } else {
        plan = `
⚖️ MAINTAIN PLAN (${days} days/week)

🏋️ Upper Body:
• Push Ups: 3 × 12
• Pull Ups: 3 × 8
• Dips: 3 × 10

🦵 Lower Body:
• Squats: 3 × 12
• Lunges: 3 × 10 each leg

❤️ Cardio: 20 min light running
        `;
    }

    const result = document.getElementById("workoutResult");
    if (result) {
        result.innerText = plan;
    }
}

// ================= Meal Generator =================
function generateMeal() {
    const cal = document.getElementById("m_cal")?.value;
    const pro = document.getElementById("m_pro")?.value;

    if (!cal || !pro) {
        alert("Please fill Calories and Protein");
        return;
    }

    const mealPlan = `
🥗 YOUR MEAL PLAN

🌅 Breakfast:
• 3 Eggs + Oats with milk
• Protein: 25g | Calories: ~350

🌞 Lunch:
• 200g Chicken Breast + Rice + Veggies
• Protein: 45g | Calories: ~550

🌙 Dinner:
• 150g Fish or Tofu + Salad
• Protein: 30g | Calories: ~400

🍎 Snack:
• Greek Yogurt + Nuts
• Protein: 15g | Calories: ~250

━━━━━━━━━━━━━━━━━━━━
🎯 TARGETS:
• Calories: ${cal} kcal/day
• Protein: ${pro}g/day
    `;

    const result = document.getElementById("mealResult");
    if (result) {
        result.innerText = mealPlan;
    }
}

// ================= Dark Mode =================
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
}

// ================= Logout =================
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// ================= تشغيل الوضع المحفوظ عند تحميل الصفحة =================
window.onload = () => {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark");
    }
};
