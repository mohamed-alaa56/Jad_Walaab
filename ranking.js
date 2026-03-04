let allUsers = [];

async function loadRanking() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    
    allUsers = await fetchAllUsers();
    
    allUsers.sort((a, b) => b.points - a.points);
    
    displayRanking();
}

function getAllRealUsers() {
    return allUsers;
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
    
    if (allUsers.length > 0) {
        firstPlace.innerHTML = `${allUsers[0].name} <br><small>${allUsers[0].points} نقطة</small>`;
    }
    
    if (allUsers.length > 1) {
        secondPlace.innerHTML = `${allUsers[1].name} <br><small>${allUsers[1].points} نقطة</small>`;
    } else {
        secondPlace.textContent = '-';
    }
    
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