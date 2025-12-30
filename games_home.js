// games_home.js - الألعاب التعليمية
const scienceGames = [
    {
        id: 1,
        title: "محاكاة الحركة في خط مستقيم",
        unit: "🔵 الوحدة الأولى: القوى والحركة",
        lesson: "درس: الحركة في اتجاه واحد",
        description: "افهم الفرق بين الحركة المنتظمة والحركة المتسارعة",
        objective: "الطالب يسحب بطاقة سرعة ويضعها على الجسم المتحرك",
        icon: "🎯"
    },
    {
        id: 2,
        title: "اختيار الرسم البياني الصحيح",
        unit: "🔵 الوحدة الأولى: القوى والحركة",
        lesson: "درس: التمثيل البياني للحركة في خط مستقيم",
        description: "ربط نوع الحركة بشكل منحنى (الموقع-الزمن)",
        objective: "اختيار الرسم البياني المناسب لنوع الحركة",
        icon: "📊"
    },
    {
        id: 3,
        title: "صنّف الكمية الفيزيائية",
        unit: "🔵 الوحدة الأولى: القوى والحركة",
        lesson: "درس: الكميات الفيزيائية القياسية والمتجهة",
        description: "التمييز بين الكميات القياسية والمتجهة",
        objective: "سحب البطاقات للصناديق المناسبة",
        icon: "⚖️"
    },
    {
        id: 4,
        title: "تكوين الصورة بالمرايا",
        unit: "🟡 الوحدة الثانية: الطاقة الضوئية",
        lesson: "درس: المرايا (مستوية – مقعرة – محدبة)",
        description: "فهم صفات الصورة في أنواع المرايا المختلفة",
        objective: "تجربة المرايا ورؤية نتائج الصورة",
        icon: "🪞"
    },
    {
        id: 5,
        title: "تجربة العدسات",
        unit: "🟡 الوحدة الثانية: الطاقة الضوئية",
        lesson: "درس: العدسات (مجمعة – مفرقة)",
        description: "تمييز الفرق بين العدسة المجمعة والمفرقة",
        objective: "مقارنة تأثير العدسات على الصورة",
        icon: "🔍"
    },
    {
        id: 6,
        title: "رتّب كواكب المجموعة الشمسية",
        unit: "🟣 الوحدة الثالثة: الكون والنظام الشمسي",
        lesson: "درس: الكون والنظام الشمسي",
        description: "معرفة ترتيب الكواكب بالنسبة للشمس",
        objective: "ترتيب الكواكب بالترتيب الصحيح",
        icon: "🌌"
    },
    {
        id: 7,
        title: "رتّب مراحل الانقسام",
        unit: "🟢 الوحدة الرابعة: التكاثر واستمرار النوع",
        lesson: "درس: الانقسام الخلوي (متساوي – منصف)",
        description: "فهم ترتيب مراحل الانقسام الخلوي",
        objective: "ترتيب مراحل الانقسام بالترتيب الصحيح",
        icon: "🔬"
    },
    {
        id: 8,
        title: "اختار طريقة التكاثر",
        unit: "🟢 الوحدة الرابعة: التكاثر واستمرار النوع",
        lesson: "درس: التكاثر اللاجنسي والتكاثر الجنسي",
        description: "التمييز بين أنواع التكاثر",
        objective: "ربط الكائنات بطريقة التكاثر المناسبة",
        icon: "🌱"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    displayGames();
});

function displayGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    
    if (!gamesContainer) {
        console.error('❌ عنصر الألعاب غير موجود');
        return;
    }
    
    gamesContainer.innerHTML = '';
    
    scienceGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        gameCard.innerHTML = `
            <div class="game-header">
                <div class="game-icon">${game.icon}</div>
                <div class="game-info">
                    <div class="game-title">${game.title}</div>
                    <div class="game-unit">${game.unit}</div>
                </div>
            </div>
            <div class="game-lesson">${game.lesson}</div>
            <div class="game-description">${game.description}</div>
            <div class="game-objective">🎯 ${game.objective}</div>
            <button class="game-play-btn" onclick="playGame(${game.id})">
                ▶ ابدأ اللعبة
            </button>
        `;
        
        gamesContainer.appendChild(gameCard);
    });
}

function playGame(gameId) {
    const game = scienceGames.find(g => g.id === gameId);
    
    if (!game) {
        alert('❌ اللعبة غير متاحة');
        return;
    }
    
    console.log('🎮 محاولة فتح لعبة:', gameId, game.title);
    
    // فقط لعبة 1 جاهزة
    if (gameId === 1) {
        console.log('✅ الانتقال إلى game1_motion.html');
        window.location.href = 'game1_motion.html';
        return;
    }
    
    // باقي الألعاب تحت التطوير
    alert(`🎮 ${game.title}\n\n🔧 جاري التطوير - ستتوفر قريباً!\n\n💡 يمكنك تجربة لعبة محاكاة الحركة أولاً`);
    
    // إضافة نقاط تحفيزية
    if (typeof pointsSystem !== 'undefined') {
        pointsSystem.addPoints(5, `معاينة لعبة: ${game.title}`);
    }
}

function goBack() {
    window.location.href = 'home.html';
}