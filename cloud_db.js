// cloud_db.js - تخزين سحابي فوري
console.log('✅ cloud_db.js اتحمل');

const BIN_ID = '67c77cf8acd3cb34a8f1ebf7';
const API_KEY = '$2a$10$k9UgE6kJycIvmQvVZ1UFku2y3Kak7oSh4NFknhd0NSxOoaFJlFCBq';

async function fetchAllUsers() {
    console.log('🔄 بنجلب المستخدمين من السحابة...');
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const data = await response.json();
        console.log('✅ تم الجلب:', data.record.users);
        return data.record.users || [];
    } catch (error) {
        console.error('❌ خطأ في الجلب:', error);
        return JSON.parse(localStorage.getItem('allUsers')) || [];
    }
}

async function saveAllUsers(users) {
    console.log('🔄 بنحفظ المستخدمين في السحابة...', users);
    try {
        await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ users: users })
        });
        console.log('✅ تم الحفظ');
        return true;
    } catch (error) {
        console.error('❌ خطأ في الحفظ:', error);
        localStorage.setItem('allUsers', JSON.stringify(users));
        return false;
    }
}

async function initCloud() {
    console.log('🔄 تهيئة السحابة...');
    const users = await fetchAllUsers();
    if (users.length === 0) {
        const localUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        if (localUsers.length > 0) {
            console.log('📤 بنرفع المستخدمين المحليين للسحابة');
            await saveAllUsers(localUsers);
        }
    }
}
