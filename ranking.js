// بيانات المستخدمين الحقيقية
let allUsers = [];

// تحميل بيانات الترتيب من الحسابات الحقيقية
function loadRanking() {
    // جلب بيانات المستخدم الحالي
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    
    // جلب جميع الحسابات الحقيقية
    allUsers = getAllRealUsers();
    
    // إضافة المستخدم الحالي إذا مش موجود
    if (currentUser && !allUsers.some(user => user.email === currentUser.email)) {
        allUsers.push({
            name: currentUser.name,
            email: currentUser.email,
            points: currentPoints
        });
    }
    
    // ترتيب المستخدمين من الأعلى نقاطاً للأقل
    allUsers.sort((a, b) => b.points - a.points);
    
    // عرض البيانات
    displayRanking();
}

// جلب جميع المستخدمين الحقيقيين من التخزين
function getAllRealUsers() {
    const users = [];
    
    const allAccounts = JSON.parse(localStorage.getItem('allUsers')) || [];
    
    // إذا مفيش حسابات، نرجع مصفوفة فاضية
    if (allAccounts.length === 0) {
        return users;
    }
    
    allAccounts.forEach(account => {
        let userPoints = account.points || 0;
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.email === account.email) {
            const currentPoints = parseInt(localStorage.getItem('userPoints'));
            if (!isNaN(currentPoints)) {
                userPoints = currentPoints;
            }
        }
        
        users.push({
            name: account.name,
            email: account.email,
            points: userPoints
        });
    });
    
    return users;
}

// عرض الترتيب
function displayRanking() {
    // عرض المراكز الأولى
    displayTopThree();
    
    // عرض قائمة جميع المستخدمين
    displayAllUsers();
}

// عرض المراكز الثلاثة الأولى
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
    const firstPlacePoints = allUsers[0].points;
    const firstPlaceUsers = allUsers.filter(user => user.points === firstPlacePoints);
    
    if (firstPlaceUsers.length === 1) {
        firstPlace.innerHTML = `${allUsers[0].name} <br><small>${allUsers[0].points} نقطة</small>`;
    } else {
        const names = firstPlaceUsers.map(user => user.name).join('، ');
        firstPlace.innerHTML = `${names} <br><small>${firstPlacePoints} نقطة</small>`;
    }
    
    // المركز الثاني
    if (allUsers.length > 1) {
        let secondPlaceIndex = firstPlaceUsers.length;
        if (secondPlaceIndex < allUsers.length) {
            const secondPlacePoints = allUsers[secondPlaceIndex].points;
            const secondPlaceUsers = allUsers.filter(user => user.points === secondPlacePoints);
            
            if (secondPlaceUsers.length === 1) {
                secondPlace.innerHTML = `${allUsers[secondPlaceIndex].name} <br><small>${secondPlacePoints} نقطة</small>`;
            } else {
                const names = secondPlaceUsers.map(user => user.name).join('، ');
                secondPlace.innerHTML = `${names} <br><small>${secondPlacePoints} نقطة</small>`;
            }
        } else {
            secondPlace.textContent = '-';
        }
    } else {
        secondPlace.textContent = '-';
    }
    
    // المركز الثالث
    if (allUsers.length > 2) {
        let thirdPlaceIndex = firstPlaceUsers.length;
        if (allUsers.length > firstPlaceUsers.length) {
            const secondPlacePoints = allUsers[thirdPlaceIndex].points;
            const secondPlaceUsers = allUsers.filter(user => user.points === secondPlacePoints);
            thirdPlaceIndex += secondPlaceUsers.length;
        }
        
        if (thirdPlaceIndex < allUsers.length) {
            const thirdPlacePoints = allUsers[thirdPlaceIndex].points;
            const thirdPlaceUsers = allUsers.filter(user => user.points === thirdPlacePoints);
            
            if (thirdPlaceUsers.length === 1) {
                thirdPlace.innerHTML = `${allUsers[thirdPlaceIndex].name} <br><small>${thirdPlacePoints} نقطة</small>`;
            } else {
                const names = thirdPlaceUsers.map(user => user.name).join('، ');
                thirdPlace.innerHTML = `${names} <br><small>${thirdPlacePoints} نقطة</small>`;
            }
        } else {
            thirdPlace.textContent = '-';
        }
    } else {
        thirdPlace.textContent = '-';
    }
}

// عرض جميع المستخدمين
function displayAllUsers() {
    const rankingList = document.getElementById('rankingList');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    rankingList.innerHTML = '';
    
    if (allUsers.length === 0) {
        rankingList.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
                لا يوجد لاعبين مسجلين بعد
            </div>
        `;
        return;
    }
    
    let currentRank = 1;
    let previousPoints = -1;
    let sameRankCount = 0;
    
    allUsers.forEach((user, index) => {
        // تحديد الرتبة
        let userRank;
        if (user.points === previousPoints) {
            // نفس نقاط المستخدم السابق - نفس الرتبة
            sameRankCount++;
            userRank = currentRank;
        } else {
            // نقاط مختلفة - رتبة جديدة
            currentRank = currentRank + sameRankCount + 1;
            sameRankCount = 0;
            userRank = currentRank;
            previousPoints = user.points;
        }
        
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        // إذا كان المستخدم الحالي، نضيف كلاس مميز
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

// الرجوع للصفحة الرئيسية
function goBack() {
    window.location.href = 'home.html';
}

// تحديث الترتيب كل 5 ثواني
function startAutoRefresh() {
    setInterval(() => {
        loadRanking();
    }, 5000);
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    loadRanking();
    startAutoRefresh();
});