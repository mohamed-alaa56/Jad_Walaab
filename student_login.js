document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("loginName").value;
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;

    if (!name || !email || !pass) {
        alert("من فضلك املأ كل البيانات");
        return;
    }

    // جلب المستخدمين من السحابة
    const allUsers = await fetchAllUsers();
    let foundUser = null;

    for (let user of allUsers) {
        if (user.email === email && user.password === pass && user.name === name) {
            foundUser = user;
            break;
        }
    }

    if (!foundUser) {
        alert("البيانات غير صحيحة");
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    localStorage.setItem('userPoints', foundUser.points.toString());

    window.location.href = "home.html";
});