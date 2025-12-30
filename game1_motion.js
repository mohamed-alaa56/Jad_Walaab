// game1_motion.js - النسخة النهائية بدون نار
let selectedSpeed = '';
let isAnimating = false;
let points = 0;
let currentSpeed = 0;
let animationInterval;
let isReturning = false;

document.addEventListener('DOMContentLoaded', function() {
    loadPoints();
    updateSpeedIndicator(0);
    
    // تهيئة الأصوات
    setupAudio();
});

function setupAudio() {
    const sounds = ['carStartSound', 'carAccelerateSound', 'carSlowSound', 'carStopSound'];
    sounds.forEach(soundId => {
        const audio = document.getElementById(soundId);
        if (audio) {
            audio.volume = 0.2;
            audio.muted = true;
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
                audio.muted = false;
            }).catch(e => {
                console.log('Audio setup error:', e);
                audio.muted = false;
            });
        }
    });
}

function playSound(soundId) {
    try {
        const audio = document.getElementById(soundId);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Sound play error:', e));
        }
    } catch (e) {
        console.log('Sound error:', e);
    }
}

function selectSpeed(speedType) {
    if (isAnimating) return;
    
    selectedSpeed = speedType;
    
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.getElementById(speedType + 'Card').classList.add('selected');
    document.getElementById('playBtn').disabled = false;
    
    const speedName = getSpeedName(speedType);
    document.getElementById('result').textContent = `✅ اخترت: ${speedName}`;
    document.getElementById('result').className = 'result';
    
    updateExplanation(speedType);
}

function getSpeedName(speedType) {
    const names = {
        'constant': 'سرعة ثابتة (حركة منتظمة)',
        'increasing': 'سرعة متزايدة (حركة متسارعة)', 
        'decreasing': 'سرعة متناقصة (حركة متباطئة)'
    };
    return names[speedType] || 'غير معروف';
}

function updateExplanation(speedType) {
    const explanations = {
        'constant': '💡 في الحركة المنتظمة: يقطع الجسم مسافات متساوية في أزمنة متساوية (التسارع = صفر)',
        'increasing': '💡 في الحركة المتسارعة: تزداد السرعة مع الزمن (التسارع موجب)',
        'decreasing': '💡 في الحركة المتباطئة: تنقص السرعة مع الزمن (التسارع سالب)'
    };
    document.getElementById('explanation').textContent = explanations[speedType] || '';
}

function startMotion() {
    if (!selectedSpeed || isAnimating) return;
    
    isAnimating = true;
    isReturning = false;
    const carContainer = document.getElementById('carContainer');
    const road = document.getElementById('road');
    const roadWidth = road.offsetWidth;
    const carWidth = 50;
    const playBtn = document.getElementById('playBtn');
    
    playBtn.disabled = true;
    playBtn.textContent = '⏳ المحاكاة جارية...';
    
    // إعادة تعيين موضع السيارة
    carContainer.style.transition = 'none';
    carContainer.style.left = '50px';
    currentSpeed = 0;
    updateSpeedIndicator(0);
    
    // تشغيل صوت بداية المحرك
    playSound('carStartSound');
    
    setTimeout(() => {
        if (selectedSpeed === 'constant') {
            animateConstantSpeed(carContainer, roadWidth, carWidth);
        } else if (selectedSpeed === 'increasing') {
            animateIncreasingSpeed(carContainer, roadWidth, carWidth);
        } else if (selectedSpeed === 'decreasing') {
            animateDecreasingSpeed(carContainer, roadWidth, carWidth);
        }
    }, 300);
}

function animateConstantSpeed(carContainer, roadWidth, carWidth) {
    const duration = 4;
    const targetPosition = roadWidth - carWidth - 60;
    
    // تحرك بسرعة ثابتة
    carContainer.style.transition = `left ${duration}s linear`;
    carContainer.style.left = targetPosition + 'px';
    
    // تحديث مؤشر السرعة
    currentSpeed = 60;
    updateSpeedIndicator(currentSpeed);
    
    // تشغيل صوت محرك ثابت
    playSound('carSlowSound');
    
    setTimeout(() => {
        // عند الوصول للنهاية
        playSound('carStopSound');
        setTimeout(() => {
            autoReturnToStart(carContainer, 50, 3);
        }, 800);
    }, duration * 1000);
}

function animateIncreasingSpeed(carContainer, roadWidth, carWidth) {
    const duration = 5;
    const steps = 25;
    const stepDuration = duration / steps;
    const targetPosition = roadWidth - carWidth - 60;
    
    let currentLeft = 50;
    let step = 0;
    
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
        if (step >= steps) {
            clearInterval(animationInterval);
            playSound('carStopSound');
            setTimeout(() => {
                autoReturnToStart(carContainer, 50, 4);
            }, 800);
            return;
        }
        
        // زيادة التسارع مع الوقت
        const progress = step / steps;
        const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        currentLeft = 50 + (targetPosition - 50) * easeInOutCubic;
        
        // تحديث موضع السيارة
        carContainer.style.transition = `left ${stepDuration}s linear`;
        carContainer.style.left = currentLeft + 'px';
        
        // تحديث مؤشر السرعة
        currentSpeed = 30 + (progress * 170);
        updateSpeedIndicator(currentSpeed);
        
        // تشغيل صوت التسارع
        if (step % 4 === 0) {
            playSound('carAccelerateSound');
        }
        
        step++;
    }, stepDuration * 1000);
}

function animateDecreasingSpeed(carContainer, roadWidth, carWidth) {
    const duration = 5;
    const steps = 25;
    const stepDuration = duration / steps;
    const targetPosition = roadWidth - carWidth - 60;
    
    let currentLeft = 50;
    let step = 0;
    
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
        if (step >= steps) {
            clearInterval(animationInterval);
            playSound('carStopSound');
            setTimeout(() => {
                autoReturnToStart(carContainer, 50, 3);
            }, 800);
            return;
        }
        
        // تقليل السرعة مع الوقت
        const progress = step / steps;
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        currentLeft = 50 + (targetPosition - 50) * easeOutCubic;
        
        // تحديث موضع السيارة
        carContainer.style.transition = `left ${stepDuration}s linear`;
        carContainer.style.left = currentLeft + 'px';
        
        // تحديث مؤشر السرعة
        currentSpeed = 180 - (progress * 160);
        updateSpeedIndicator(currentSpeed);
        
        step++;
    }, stepDuration * 1000);
}

function autoReturnToStart(carContainer, startPosition, returnDuration) {
    isReturning = true;
    
    // العودة للنقطة البداية
    carContainer.style.transition = `left ${returnDuration}s ease-in-out`;
    carContainer.style.left = startPosition + 'px';
    
    // إعادة تعيين السرعة
    currentSpeed = 0;
    updateSpeedIndicator(currentSpeed);
    
    setTimeout(() => {
        isReturning = false;
        isAnimating = false;
        
        const playBtn = document.getElementById('playBtn');
        playBtn.disabled = false;
        playBtn.textContent = '▶ تشغيل المحاكاة';
        
        checkResult();
    }, returnDuration * 1000);
}

function updateSpeedIndicator(speed) {
    const speedFill = document.getElementById('speedFill');
    const speedValue = document.getElementById('speedValue');
    
    const percentage = Math.min(100, (speed / 200) * 100);
    speedFill.style.width = percentage + '%';
    
    // تحديث لون المؤشر حسب السرعة
    if (speed < 50) {
        speedFill.style.background = '#2ecc71';
        speedValue.style.color = '#2ecc71';
    } else if (speed < 120) {
        speedFill.style.background = '#f1c40f';
        speedValue.style.color = '#f1c40f';
    } else {
        speedFill.style.background = '#e74c3c';
        speedValue.style.color = '#e74c3c';
    }
    
    speedValue.textContent = Math.round(speed) + ' كم/س';
}

function checkResult() {
    let message = '';
    let isCorrect = false;
    let explanation = '';
    
    switch(selectedSpeed) {
        case 'constant':
            message = '✅ ممتاز! حركة منتظمة - السرعة ثابتة طوال الوقت';
            explanation = 'في الحركة المنتظمة: السرعة ثابتة - يقطع الجسم مسافات متساوية في أزمنة متساوية';
            isCorrect = true;
            break;
            
        case 'increasing':
            message = '✅ رائع! حركة متسارعة - السرعة ازدادت تدريجيًا';
            explanation = 'في الحركة المتسارعة: التسارع موجب - السرعة تزداد مع الزمن';
            isCorrect = true;
            break;
            
        case 'decreasing':
            message = '✅ إبداعي! حركة متباطئة - السرعة تناقصت تدريجيًا';
            explanation = 'في الحركة المتباطئة: التسارع سالب - السرعة تنقص مع الزمن';
            isCorrect = true;
            break;
    }
    
    const result = document.getElementById('result');
    result.textContent = message;
    result.className = isCorrect ? 'result success' : 'result error';
    
    const finalExplanation = document.getElementById('explanation');
    finalExplanation.textContent = '💡 ' + explanation;
    
    if (isCorrect) {
        addPoints(5);
    }
}

function addPoints(amount) {
    points += amount;
    updatePointsDisplay();
    
    if (typeof pointsSystem !== 'undefined') {
        pointsSystem.addPoints(amount, 'إكمال لعبة الحركة بنجاح');
    }
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('points');
    pointsElement.textContent = points;
    
    pointsElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        pointsElement.style.transform = 'scale(1)';
    }, 300);
    
    localStorage.setItem('game1_points', points.toString());
}

function loadPoints() {
    const savedPoints = localStorage.getItem('game1_points');
    if (savedPoints) {
        points = parseInt(savedPoints);
        updatePointsDisplay();
    }
}

function resetGame() {
    selectedSpeed = '';
    isAnimating = false;
    isReturning = false;
    currentSpeed = 0;
    
    clearInterval(animationInterval);
    
    const carContainer = document.getElementById('carContainer');
    const playBtn = document.getElementById('playBtn');
    
    carContainer.style.transition = 'left 0.5s ease';
    carContainer.style.left = '50px';
    
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
    });
    
    playBtn.disabled = true;
    playBtn.textContent = '▶ تشغيل المحاكاة';
    
    updateSpeedIndicator(0);
    
    document.getElementById('result').textContent = 'اختر سرعة واضغط تشغيل';
    document.getElementById('result').className = 'result';
    document.getElementById('explanation').textContent = '💡 في الحركة المنتظمة: يقطع الجسم مسافات متساوية في أزمنة متساوية';
}

// ✅ دالة الرجوع الأساسية
function goBack() {
    window.location.href = 'games_home.html';
}

// دالة إضافية للرجوع للرئيسية
function goHome() {
    window.location.href = 'home.html';
}