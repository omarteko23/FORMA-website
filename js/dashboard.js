// ================= البيانات من localStorage =================
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// عرض بيانات المستخدم
const userInfo = document.getElementById("userInfo");
if (userInfo) {
    userInfo.innerHTML = `
        <h2>👋 Welcome ${user.name}</h2>
        <p>Age: ${user.age}</p>
        <p>Gender: ${user.gender}</p>
    `;
}

const welcomeText = document.getElementById("welcomeText");
if (welcomeText) {
    welcomeText.innerHTML = `👋 Hello, ${user.name}`;
}

// ================= التنقل بين الأقسام =================
function showSection(sectionId) {
    // إخفاء كل الأقسام
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // إظهار القسم المطلوب
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// ================= فتح وقفل القائمة الجانبية =================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// ================= قفل القائمة على الموبايل بعد الضغط =================
function closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }
}

// ================= لو اتغير حجم الشاشة =================
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }
});

// ================= Calories =================
function manualCalories() {
    const w = document.getElementById('c_weight')?.value;
    const h = document.getElementById('c_height')?.value;
    const a = document.getElementById('c_age')?.value;
    const g = document.getElementById('c_gender')?.value;
    const goal = document.getElementById('c_goal')?.value;
    const act = document.getElementById('c_activity')?.value;

    if (!w || !h || !a || !g || !goal || !act) {
        alert('Please fill all fields');
        return;
    }

    let bmr = g === 'female' 
        ? (10 * w + 6.25 * h - 5 * a - 161) 
        : (10 * w + 6.25 * h - 5 * a + 5);

    const activityMap = { low: 1.2, light: 1.375, moderate: 1.55, high: 1.725 };
    let cal = bmr * activityMap[act];

    if (goal === 'lose') cal -= 300;
    if (goal === 'gain') cal += 300;

    const result = document.getElementById('calorieResult');
    if (result) {
        result.innerText = Math.round(cal) + ' kcal/day';
    }
}

// ================= Protein =================
function manualProtein() {
    const w = document.getElementById('p_weight')?.value;
    const goal = document.getElementById('p_goal')?.value;

    if (!w || !goal) {
        alert('Please fill all fields');
        return;
    }

    let p = goal === 'gain' ? w * 2.2 :
            goal === 'lose' ? w * 2 :
            w * 1.8;

    const result = document.getElementById('proteinResult');
    if (result) {
        result.innerText = p.toFixed(1) + ' g/day';
    }
}

// ================= Workout =================
function generateWorkout() {
    const goal = document.getElementById('w_goal')?.value;
    const days = document.getElementById('w_days')?.value;

    if (!goal || !days) {
        alert('Please fill all fields');
        return;
    }

    let plan = '';

    if (goal === 'gain') {
        plan = `💪 GAIN PLAN (${days} days/week)
        
Push Day: Chest + Shoulders + Triceps
Pull Day: Back + Biceps
Leg Day: Squats + Deadlifts

3 sets × 10-12 reps`;
    } else if (goal === 'lose') {
        plan = `🔥 LOSE WEIGHT PLAN (${days} days/week)

30 min Cardio + Full Body Circuit
Push Ups, Squats, Lunges, Plank

3 sets × 15 reps
Rest 30 seconds`;
    } else {
        plan = `⚖️ MAINTAIN PLAN (${days} days/week)

Upper/Lower split
Cardio 20 min
3 sets × 12 reps`;
    }

    const result = document.getElementById('workoutResult');
    if (result) {
        result.innerText = plan;
    }
}

// ================= Meal =================
function generateMeal() {
    const cal = document.getElementById('m_cal')?.value;
    const pro = document.getElementById('m_pro')?.value;

    if (!cal || !pro) {
        alert('Please fill all fields');
        return;
    }

    const mealPlan = `🥗 MEAL PLAN

Breakfast: 3 Eggs + Oats (25g protein)
Lunch: 200g Chicken + Rice (45g protein)
Dinner: Fish/Salad (30g protein)
Snack: Greek Yogurt (15g protein)

🎯 Target: ${cal} kcal / ${pro}g protein`;

    const result = document.getElementById('mealResult');
    if (result) {
        result.innerText = mealPlan;
    }
}

// ================= Dark Mode =================
function toggleDarkMode() {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
    } else {
        localStorage.setItem('mode', 'light');
    }
}

// ================= Logout =================
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// ================= تشغيل الوضع المحفوظ =================
window.onload = () => {
    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark');
    }
};
