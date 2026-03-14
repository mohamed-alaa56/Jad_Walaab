class PointsSystem {
    constructor() {
        this.points = parseInt(localStorage.getItem('userPoints')) || 0;
        this.updateDisplay();
    }

    async addPoints(amount, reason) {
        this.points += amount;
        localStorage.setItem('userPoints', this.points);
        
        // تحديث في السحابة
        await this.updateUserPointsCloud();
        
        alert(`+${amount} نقطة - ${reason}`);
        this.updateDisplay();
    }

    async updateUserPointsCloud() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        // جلب كل المستخدمين من السحابة
        const allUsers = await fetchAllUsers();
        
        // البحث عن المستخدم الحالي وتحديث نقاطه
        let found = false;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].email === currentUser.email) {
                allUsers[i].points = this.points;
                found = true;
                break;
            }
        }
        
        // لو المستخدم مش موجود في السحابة (مثلاً قديم)، نضيفه
        if (!found) {
            allUsers.push({
                name: currentUser.name,
                email: currentUser.email,
                password: currentUser.password || '',
                points: this.points
            });
        }
        
        // حفظ في السحابة
        await saveAllUsers(allUsers);
        
        // تحديث في localStorage
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }

    updateDisplay() {
        const pointsElements = document.querySelectorAll('#userPoints, .user-points');
        pointsElements.forEach(el => {
            el.textContent = this.points;
        });
    }
}

const pointsSystem = new PointsSystem();
