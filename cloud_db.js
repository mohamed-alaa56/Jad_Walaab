// cloud_db.js - تخزين سحابي فوري

const BIN_ID = '69a850b4d0ea881f40ee817c';
const ACCESS_KEY = '$2a$10$X9TTeZOVpS4xUEf7o9Q9rOzYHT0bEY87vzlQ7RAUpPbAspNtUqer2';

// دالة لجلب كل المستخدمين
async function fetchAllUsers() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Access-Key': ACCESS_KEY
            }
        });
        const data = await response.json();
        return data.record.users || [];
    } catch (error) {
        console.log('خطأ في الجلب، بنستخدم المحلي', error);
        return JSON.parse(localStorage.getItem('allUsers')) || [];
    }
}

// دالة لحفظ كل المستخدمين
async function saveAllUsers(users) {
    try {
        await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Key': ACCESS_KEY
            },
            body: JSON.stringify({ users: users })
        });
        return true;
    } catch (error) {
        console.log('خطأ في الحفظ، بنخزن محلياً', error);
        localStorage.setItem('allUsers', JSON.stringify(users));
        return false;
    }
}

// تهيئة أول مرة
async function initCloud() {
    const users = await fetchAllUsers();
    if (users.length === 0) {
        const localUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        if (localUsers.length > 0) {
            await saveAllUsers(localUsers);
        }
    }
}
