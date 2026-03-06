let allUsers = [];

async function loadRanking() {
    console.log('🔄 تحميل الترتيب...');
    
    allUsers = await fetchAllUsers();
    console.log('✅ المستخدمين من السحابة:', allUsers);
    
    // ترتيب المستخدمين من الأعلى نقاطاً للأقل
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
    
    // المركز الأول
    if (allUsers.length > 0) {
        firstPlace.innerHTML = `${allUsers[0].name} <br><small>${allUsers[0].points} نقطة</small>`;
    }
    
    // المركز الثاني
    if (allUsers.length > 1) {
        secondPlace.innerHTML = `${allUsers[1].name} <br><small>${allUsers[1].points} نقطة</small>`;
    } else {
        secondPlace.textContent = '-';
    }
    
    // المركز الثالث
    if (allUsers.length > 2) {
        thirdPlace.innerHTML = `${allUsers[2].name} <br><small>${allUsers[2].points} نقطة</small>`;
    } else {
        thirdPlace.textContent = '-';
    }
}

function displayAllUsers() {
    const rankingList = document.getElementById('rankingList');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    rankingList.innerHTML = '';
    
    if (allUsers.length === 0) {
        rankingList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">لا يوجد لاعبين مسجلين بعد</div>';
        return;
    }
    
    // عرض كل المستخدمين بأرقامهم من 1 لـ N
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

function startAutoRefresh() {
    setInterval(() => {
        loadRanking();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadRanking();
    startAutoRefresh();
});
