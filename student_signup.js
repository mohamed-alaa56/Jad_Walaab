document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const pass = document.getElementById("signupPass").value;
    const confirm = document.getElementById("signupConfirm").value;

    if (!name || !email || !pass) {
        alert("من فضلك املأ كل البيانات");
        return;
    }

    if (pass !== confirm) {
        alert("كلمة المرور غير متطابقة");
        return;
    }

    // جلب كل المستخدمين من السحابة
    let allUsers = await fetchAllUsers();
    
    // التأكد من عدم تكرار الإيميل
    for (let user of allUsers) {
        if (user.email === email) {
            alert("هذا الحساب موجود بالفعل");
            return;
        }
    }

    // إنشاء مستخدم جديد
    const newUser = {
        name: name,
        email: email,
        password: pass,
        points: 0
    };

    allUsers.push(newUser);
    
    // حفظ في السحابة
    await saveAllUsers(allUsers);
    
    // حفظ محلياً للاستخدام
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('userPoints', '0');

    alert("تم إنشاء الحساب بنجاح!");
    window.location.href = "student_login.html";
});