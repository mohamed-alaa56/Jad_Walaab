// cloud_db.js - تخزين سحابي فوري

const BIN_ID = '67c77cf8acd3cb34a8f1ebf7';
const ACCESS_KEY = '$2a$10$k9UgE6kJycIvMqVvZ1UFku2y3Kak7oSh4NFknhd0NSx00aFJLFcBq';

// دالة لجلب كل المستخدمين
async function fetchAllUsers() {
    console.log('🔄 بجيب المستخدمين من السحابة...');
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Access-Key': ACCESS_KEY
            }
        });
        const data = await response.json();
        console.log('✅ المستخدمين اللي في السحابة:', data.record.users);
        return data.record.users || [];
    } catch (error) {
        console.log('❌ خطأ في الجلب من السحابة، بنستخدم المحلي', error);
        const localUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        console.log('💾 المستخدمين المحليين:', localUsers);
        return localUsers;
    }
}

// دالة لحفظ كل المستخدمين
async function saveAllUsers(users) {
    console.log('🔄 بحاول احفظ في السحابة:', users);
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Key': ACCESS_KEY
            },
            body: JSON.stringify({ users: users })
        });
        console.log('✅ تم الحفظ في السحابة');
        return true;
    } catch (error) {
        console.log('❌ خطأ في الحفظ في السحابة، بنخزن محلياً', error);
        localStorage.setItem('allUsers', JSON.stringify(users));
        return false;
    }
}

// تهيئة أول مرة
async function initCloud() {
    console.log('🚀 بدأنا تهيئة السحابة...');
    const users = await fetchAllUsers();
    if (users.length === 0) {
        console.log('📦 السحابة فاضية، بنجيب المستخدمين المحليين');
        const localUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        if (localUsers.length > 0) {
            console.log('☁️ بنرفع المستخدمين المحليين للسحابة');
            await saveAllUsers(localUsers);
        } else {
            console.log('😴 مفيش مستخدمين محليين ولا في السحابة');
        }
    } else {
        console.log('🎉 السحابة فيها مستخدمين، تمام');
    }
}
