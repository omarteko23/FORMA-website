// ================= REGISTER =================
function register(event) {
    event.preventDefault();

    const user = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        age: Number(document.getElementById("age").value),
        gender: document.querySelector('input[name="gender"]:checked')?.value
    };

    // ✅ Validation أقوى
    if (!user.name || !user.email || !user.password || !user.gender) {
        showMessage("Please fill all required fields ❌", "error");
        return;
    }

    if (user.password.length < 6) {
        showMessage("Password must be at least 6 characters ⚠️", "error");
        return;
    }

    // حفظ البيانات
    localStorage.setItem("user", JSON.stringify(user));

    showMessage("Account created successfully", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1200);
}


// ================= LOGIN =================
function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        showMessage("No account found ❌", "error");
        return;
    }

    if (user.email === email && user.password === password) {
        showMessage("Login Success", "success");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        showMessage("Invalid credentials ❌", "error");
    }
}


// ================= MESSAGE UI =================
function showMessage(text, type) {
    let box = document.getElementById("msgBox");

    if (!box) {
        box = document.createElement("div");
        box.id = "msgBox";
        document.body.appendChild(box);
    }

    box.innerText = text;
    box.className = "msg " + type;

    setTimeout(() => {
        box.style.opacity = "0";
    }, 2000);
}
