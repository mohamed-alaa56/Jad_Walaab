class PointsSystem {
    constructor() {
        this.points = parseInt(localStorage.getItem('userPoints')) || 0;
        this.updateDisplay();
    }

    addPoints(amount, reason) {
        this.points += amount;
        localStorage.setItem('userPoints', this.points);
        
        // تحديث النقاط في allUsers
        this.updateUserPoints();
        
        alert(`+${amount} نقطة - ${reason}`);
        this.updateDisplay();
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

    updateDisplay() {
        const pointsElements = document.querySelectorAll('#userPoints, .user-points');
        pointsElements.forEach(el => {
            el.textContent = this.points;
        });
    }
}

const pointsSystem = new PointsSystem();