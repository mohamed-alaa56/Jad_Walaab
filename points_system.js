class PointsSystem {
    constructor() {
        this.points = parseInt(localStorage.getItem('userPoints')) || 0;
        this.updateDisplay();
    }

    async addPoints(amount, reason) {
        this.points += amount;
        localStorage.setItem('userPoints', this.points);
        
        // تحديث في localStorage
        this.updateUserPoints();
        
        // تحديث في السحابة (الأهم)
        await this.updateUserPointsCloud();
        
        alert(`+${amount} نقطة - ${reason}`);
        this.updateDisplay();
        
        // تحديث الترتيب لو الصفحة مفتوحة
        if (typeof loadRanking === 'function') {
            loadRanking(true);
        }
    }

    updateUserPoints() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].email === currentUser.email) {
                allUsers[i].points = this.points;
                break;
            }
        }
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }

    async updateUserPointsCloud() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        // جلب المستخدمين من السحابة
        const allUsers = await fetchAllUsers();
        
        let userFound = false;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].email === currentUser.email) {
                allUsers[i].points = this.points; // تحديث النقاط
                userFound = true;
                break;
            }
        }
        
        // لو المستخدم مش موجود في السحابة، نضيفه
        if (!userFound) {
            allUsers.push({
                name: currentUser.name,
                email: currentUser.email,
                password: currentUser.password,
                points: this.points
            });
        }
        
        // حفظ في السحابة
        await saveAllUsers(allUsers);
        console.log('✅ تم تحديث النقاط في السحابة:', this.points);
    }

    updateDisplay() {
        const pointsElements = document.querySelectorAll('#userPoints, .user-points');
        pointsElements.forEach(el => {
            el.textContent = this.points;
        });
    }
}

const pointsSystem = new PointsSystem();
