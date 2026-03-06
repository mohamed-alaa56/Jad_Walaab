let allUsers = [];
let lastFetchTime = 0;
const CACHE_TIME = 10000; // 10 ثواني

async function loadRanking(forceRefresh = false) {
    const now = Date.now();
    
    // لو جبنا البيانات من أقل من 10 ثواني، نستخدم القديمة
    if (!forceRefresh && now - lastFetchTime < CACHE_TIME && allUsers.length > 0) {
        displayRanking();
        return;
    }
    
    // جلب البيانات الجديدة
    allUsers = await fetchAllUsers();
    lastFetchTime = now;
    
    allUsers.sort((a, b) => b.points - a.points);
    displayRanking();
}

function displayRanking() {
    displayTopThree();
    displayAllUsers();
}

function displayTopThree() {
    const firstPlace = document.getElementById('firstPlace');
    const secondPlace = document.getElementById('secondPlace');
    const thirdPlace = document.getElementById('thirdPlace');
    
    if (allUsers.length === 0) {
        firstPlace.textContent = 'لا يوجد لاعبين بعد';
        secondPlace.textContent = '-';
        thirdPlace.textContent = '-';
        return;
    }
    
    firstPlace.innerHTML = allUsers[0] ? `${allUsers[0].name} <br><small>${allUsers[0].points} نقطة</small>` : '-';
    secondPlace.innerHTML = allUsers[1] ? `${allUsers[1].name} <br><small>${allUsers[1].points} نقطة</small>` : '-';
    thirdPlace.innerHTML = allUsers[2] ? `${allUsers[2].name} <br><small>${allUsers[2].points} نقطة</small>` : '-';
}

function displayAllUsers() {
    const rankingList = document.getElementById('rankingList');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    rankingList.innerHTML = '';
    
    if (allUsers.length === 0) {
        rankingList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">لا يوجد لاعبين مسجلين بعد</div>';
        return;
    }
    
    allUsers.forEach((user, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        if (currentUser && user.email === currentUser.email) {
            userItem.classList.add('current-user');
        }
        
        userItem.innerHTML = `
            <div class="user-info">
                <div class="user-rank">${index + 1}</div>
                <div class="user-name">${user.name}</div>
            </div>
            <div class="user-points">${user.points} نقطة</div>
        `;
        
        rankingList.appendChild(userItem);
    });
}

function goBack() {
    window.location.href = 'home.html';
}

// تحديث الترتيب كل 30 ثانية
function startAutoRefresh() {
    loadRanking(); // أول مرة
    setInterval(() => {
        loadRanking(true); // تحديث قوي
    }, 30000);
}

document.addEventListener('DOMContentLoaded', function() {
    startAutoRefresh();
});
