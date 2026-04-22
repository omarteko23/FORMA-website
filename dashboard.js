// ================= لما الصفحة تتحمل بالكامل =================
document.addEventListener("DOMContentLoaded", function() {

    // جلب بيانات المستخدم
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "login.html";
        return;
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

    // تشغيل الوضع الداكن المحفوظ
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark");
    }

});

// ================= التنقل بين الأقسام =================
function showSection(id) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.classList.remove("active"));
    
    const activeSection = document.getElementById(id);
    if (activeSection) {
        activeSection.classList.add("active");
    }
    
    // قفل القائمة على الموبايل
    closeSidebarOnMobile();
}

// ================= فتح وقفل القائمة =================
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

// ================= قفل القائمة على الموبايل =================
function closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.remove("open");
        }
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

// ================= Calories =================
function manualCalories() {
    const w = document.getElementById("c_weight")?.value;
    const h = document.getElementById("c_height")?.value;
    const a = document.getElementById("c_age")?.value;
    const g = document.getElementById("c_gender")?.value;
    const goal = document.getElementById("c_goal")?.value;
    const act = document.getElementById("c_activity")?.value;

    if (!w || !h || !a || !g || !goal || !act) {
        alert("Fill all fields");
        return;
    }

    let bmr = g === "female" ? (10*w + 6.25*h - 5*a - 161) : (10*w + 6.25*h - 5*a + 5);
    const map = { low:1.2, light:1.375, moderate:1.55, high:1.725 };
    let cal = bmr * map[act];

    if (goal === "lose") cal -= 300;
    if (goal === "gain") cal += 300;

    const result = document.getElementById("calorieResult");
    if (result) result.innerText = Math.round(cal) + " kcal/day";
}

// ================= Protein =================
function manualProtein() {
    const w = document.getElementById("p_weight")?.value;
    const goal = document.getElementById("p_goal")?.value;

    if (!w || !goal) {
        alert("Enter weight and goal");
        return;
    }

    let p = goal === "gain" ? w*2.2 : goal === "lose" ? w*2 : w*1.8;
    const result = document.getElementById("proteinResult");
    if (result) result.innerText = p.toFixed(1) + " g/day";
}

// ================= Workout =================
function generateWorkout() {
    const goal = document.getElementById("w_goal")?.value;
    const days = document.getElementById("w_days")?.value;

    if (!goal || !days) {
        alert("Fill days and goal");
        return;
    }

    let plan = goal === "gain" ? "Push/Pull/Legs - 3 sets x 10 reps" :
               goal === "lose" ? "Cardio + Full Body Circuit" :
               "Upper/Lower split + cardio";

    const result = document.getElementById("workoutResult");
    if (result) result.innerText = plan;
}

// ================= Meal =================
function generateMeal() {
    const cal = document.getElementById("m_cal")?.value;
    const pro = document.getElementById("m_pro")?.value;

    if (!cal || !pro) {
        alert("Fill calories and protein");
        return;
    }

    const result = document.getElementById("mealResult");
    if (result) result.innerText = `Breakfast: Eggs + Oats\nLunch: Chicken + Rice\nDinner: Protein + Veggies\nTarget: ${cal} kcal / ${pro}g protein`;
}

// ================= Dark Mode =================
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("mode", document.body.classList.contains("dark") ? "dark" : "light");
}

// ================= Logout =================
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
