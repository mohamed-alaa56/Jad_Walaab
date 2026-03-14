class PointsSystem {
    constructor() {
        this.points = parseInt(localStorage.getItem('userPoints')) || 0;
        this.updateDisplay();
    }

    async addPoints(amount, reason) {
        this.points += amount;
        localStorage.setItem('userPoints', this.points);

        await this.updateUserPointsCloud();

        alert(`+${amount} نقطة - ${reason}`);
        this.updateDisplay();
    }

    async updateUserPointsCloud() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const allUsers = await fetchAllUsers();

        let found = false;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].email === currentUser.email) {
                allUsers[i].points = this.points;
                found = true;
                break;
            }
        }

        if (!found) {
            allUsers.push({
                name: currentUser.name,
                email: currentUser.email,
                password: currentUser.password || '',
                points: this.points
            });
        }

        await saveAllUsers(allUsers);
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
