let allUsers = [];
let lastFetchTime = 0;
const CACHE_TIME = 10000; // 10 ثواني

async function loadRanking(forceRefresh = false) {
    const now = Date.now();
    
    if (!forceRefresh && now - lastFetchTime < CACHE_TIME && allUsers.length > 0) {
        displayRanking();
        return;
    }
    
    allUsers = await fetchAllUsers();
    lastFetchTime = now;
    
    // ترتيب تنازلي
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
    
    let currentRank = 1;
    let previousPoints = -1;
    let sameRankCount = 0;
    
    allUsers.forEach((user, index) => {
        // حساب الرتبة الصحيحة
        let userRank;
        if (user.points === previousPoints) {
            sameRankCount++;
            userRank = currentRank;
        } else {
            currentRank = currentRank + sameRankCount + 1;
            sameRankCount = 0;
            userRank = currentRank;
            previousPoints = user.points;
        }
        
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        if (currentUser && user.email === currentUser.email) {
            userItem.classList.add('current-user');
        }
        
        userItem.innerHTML = `
            <div class="user-info">
                <div class="user-rank">${userRank}</div>
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

function startAutoRefresh() {
    loadRanking();
    setInterval(() => {
        loadRanking(true);
    }, 30000);
}

document.addEventListener('DOMContentLoaded', function() {
    startAutoRefresh();
});
