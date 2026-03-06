let allUsers = [];

async function loadRanking() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    
    allUsers = await fetchAllUsers();
    
    // ترتيب المستخدمين من الأعلى نقاطاً للأقل
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
    
    // ترتيب المستخدمين (مضمون إنه مرتب)
    const sorted = [...allUsers].sort((a, b) => b.points - a.points);
    
    // المركز الأول (أعلى نقاط)
    if (sorted.length > 0) {
        const topPoints = sorted[0].points;
        const topUsers = sorted.filter(user => user.points === topPoints);
        
        if (topUsers.length === 1) {
            firstPlace.innerHTML = `${topUsers[0].name} <br><small>${topUsers[0].points} نقطة</small>`;
        } else {
            const names = topUsers.map(u => u.name).join('، ');
            firstPlace.innerHTML = `${names} <br><small>${topPoints} نقطة</small>`;
        }
    }
    
    // المركز الثاني (أول واحد بعد اللي في المركز الأول)
    if (sorted.length > 0) {
        const topPoints = sorted[0].points;
        const remaining = sorted.filter(user => user.points < topPoints);
        
        if (remaining.length > 0) {
            const secondPoints = remaining[0].points;
            const secondUsers = remaining.filter(user => user.points === secondPoints);
            
            if (secondUsers.length === 1) {
                secondPlace.innerHTML = `${secondUsers[0].name} <br><small>${secondUsers[0].points} نقطة</small>`;
            } else {
                const names = secondUsers.map(u => u.name).join('، ');
                secondPlace.innerHTML = `${names} <br><small>${secondPoints} نقطة</small>`;
            }
        } else {
            secondPlace.textContent = '-';
        }
    }
    
    // المركز الثالث (أول واحد بعد اللي في المركز الثاني)
    if (sorted.length > 0) {
        const topPoints = sorted[0].points;
        const remaining1 = sorted.filter(user => user.points < topPoints);
        
        if (remaining1.length > 0) {
            const secondPoints = remaining1[0].points;
            const remaining2 = remaining1.filter(user => user.points < secondPoints);
            
            if (remaining2.length > 0) {
                const thirdPoints = remaining2[0].points;
                const thirdUsers = remaining2.filter(user => user.points === thirdPoints);
                
                if (thirdUsers.length === 1) {
                    thirdPlace.innerHTML = `${thirdUsers[0].name} <br><small>${thirdUsers[0].points} نقطة</small>`;
                } else {
                    const names = thirdUsers.map(u => u.name).join('، ');
                    thirdPlace.innerHTML = `${names} <br><small>${thirdPoints} نقطة</small>`;
                }
            } else {
                thirdPlace.textContent = '-';
            }
        } else {
            thirdPlace.textContent = '-';
        }
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
    
    // ترتيب المستخدمين من الأعلى نقاطاً للأقل
    const sorted = [...allUsers].sort((a, b) => b.points - a.points);
    
    let currentRank = 1;
    let previousPoints = -1;
    
    sorted.forEach((user, index) => {
        // تحديد الرتبة
        if (user.points !== previousPoints) {
            currentRank = index + 1;
            previousPoints = user.points;
        }
        
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        if (currentUser && user.email === currentUser.email) {
            userItem.classList.add('current-user');
        }
        
        userItem.innerHTML = `
            <div class="user-info">
                <div class="user-rank">${currentRank}</div>
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
