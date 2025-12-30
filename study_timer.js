let timer;
let timeLeft = 0;
let isRunning = false;
let totalTime = 0;

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

function initTimer() {
    setDuration(25);
    
    document.querySelectorAll('.duration-option:not(.custom)').forEach(option => {
        option.addEventListener('click', function() {
            setDuration(parseInt(this.dataset.minutes));
        });
    });
}

function setDuration(minutes) {
    if (isRunning) return;
    
    totalTime = minutes * 60;
    timeLeft = totalTime;
    updateDisplay();
    
    document.querySelectorAll('.duration-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.minutes == minutes) {
            option.classList.add('active');
        }
    });
}

function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    timerDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timeLeft === 0) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            
            const minutes = totalTime / 60;
            let points = 0;
            
            if (minutes <= 25) points = 10;
            else if (minutes <= 45) points = 15;
            else if (minutes <= 60) points = 20;
            else points = 30;
            
            if (typeof pointsSystem !== 'undefined') {
                pointsSystem.addPoints(points, `إنهاء ${minutes} دقيقة مذاكرة`);
            }
            
            alert('🎉 انتهى وقت المذاكرة! أحسنت عملًا!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = totalTime;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function showCustomInput() {
    const customInput = document.getElementById('customInput');
    customInput.style.display = 'flex';
}

function setCustomDuration() {
    const customMinutes = parseInt(document.getElementById('customMinutes').value);
    if (customMinutes && customMinutes > 0 && customMinutes <= 180) {
        setDuration(customMinutes);
        document.getElementById('customInput').style.display = 'none';
        document.getElementById('customMinutes').value = '';
    } else {
        alert('من فضلك أدخل عدد دقائق صحيح بين 1 و 180');
    }
}

function goBack() {
    if (isRunning) {
        if (!confirm('المؤقت قيد التشغيل، هل تريد المغادرة؟')) {
            return;
        }
        pauseTimer();
    }
    window.location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', initTimer);