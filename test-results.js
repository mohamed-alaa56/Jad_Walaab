// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayResults();
    displayAnswers();
});

// عرض النتائج
function displayResults() {
    const result = JSON.parse(localStorage.getItem('testResult'));
    const questions = JSON.parse(localStorage.getItem('currentTestQuestions')) || [];
    
    if (!result) {
        alert('لا توجد نتائج للعرض');
        window.location.href = 'tests.html';
        return;
    }
    
    const resultCard = document.getElementById('resultCard');
    const percentage = result.percentage;
    
    let icon, title, message, color;
    
    if (percentage >= 80) {
        icon = '🎉';
        title = 'ممتاز!';
        message = 'أداء رائع! احتفظ بهذا المستوى المتميز.';
        color = '#2ecc71';
    } else if (percentage >= 60) {
        icon = '👍';
        title = 'جيد جداً';
        message = 'أداء جيد، يمكنك التحسين بالمزيد من المذاكرة.';
        color = '#3498db';
    } else {
        icon = '💪';
        title = 'حاول مرة أخرى';
        message = 'لا تيأس، المزيد من المذاكرة ستحسن نتيجتك.';
        color = '#e74c3c';
    }
    
    // حساب النقاط المكتسبة
    const pointsEarned = calculatePointsEarned(percentage);
    
    resultCard.innerHTML = `
        <div class="result-icon">${icon}</div>
        <div class="result-title">${title}</div>
        <div class="result-score" style="color: ${color}">${result.score}/${result.total}</div>
        <div class="result-percentage">${percentage.toFixed(1)}%</div>
        <div class="result-message">${message}</div>
        <div class="result-message">${getPerformanceMessage(result.score, result.total)}</div>
        ${pointsEarned > 0 ? `<div class="points-earned">+${pointsEarned} نقطة</div>` : ''}
    `;
}

// عرض الإجابات
function displayAnswers() {
    const result = JSON.parse(localStorage.getItem('testResult'));
    const questions = JSON.parse(localStorage.getItem('currentTestQuestions')) || [];
    
    if (!result || !questions.length) return;
    
    const answersList = document.getElementById('answersList');
    answersList.innerHTML = '';
    
    questions.forEach((question, index) => {
        const userAnswer = result.userAnswers ? result.userAnswers[index] : null;
        const isCorrect = checkAnswer(question, userAnswer);
        
        const answerItem = document.createElement('div');
        answerItem.className = `answer-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        let userAnswerText = getUserAnswerText(question, userAnswer);
        let correctAnswerText = getCorrectAnswerText(question);
        
        answerItem.innerHTML = `
            <div class="question-number">سؤال ${index + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="answer-details">
                <div class="answer-row">
                    <span class="answer-label">إجابتك:</span>
                    <span class="answer-value ${isCorrect ? 'user-answer-correct' : 'user-answer-incorrect'}">
                        ${userAnswerText}
                        ${isCorrect ? ' ✅' : ' ❌'}
                    </span>
                </div>
                ${!isCorrect ? `
                    <div class="answer-row">
                        <span class="answer-label">الإجابة الصحيحة:</span>
                        <span class="answer-value correct-answer">${correctAnswerText} ✅</span>
                    </div>
                ` : ''}
                <div class="explanation">
                    <strong>شرح الإجابة:</strong> ${question.explanation}
                </div>
            </div>
        `;
        
        answersList.appendChild(answerItem);
    });
}

// الحصول على نص إجابة المستخدم
function getUserAnswerText(question, userAnswer) {
    if (userAnswer === null || userAnswer === undefined) {
        return 'لم تجب على هذا السؤال';
    }
    
    if (question.type === "true_false") {
        return userAnswer ? 'صح' : 'غلط';
    } else {
        return question.options[userAnswer] || 'إجابة غير معروفة';
    }
}

// الحصول على نص الإجابة الصحيحة
function getCorrectAnswerText(question) {
    if (question.type === "true_false") {
        return question.correct ? 'صح' : 'غلط';
    } else {
        return question.options[question.correct];
    }
}

// التحقق من صحة الإجابة
function checkAnswer(question, userAnswer) {
    if (userAnswer === null || userAnswer === undefined) return false;
    
    if (question.type === "true_false") {
        return userAnswer === question.correct;
    } else {
        return userAnswer === question.correct;
    }
}

// حساب النقاط المكتسبة
function calculatePointsEarned(percentage) {
    if (percentage >= 80) return 25;
    if (percentage >= 60) return 15;
    return 5;
}

// رسالة الأداء
function getPerformanceMessage(score, total) {
    const percentage = (score / total) * 100;
    
    if (percentage === 100) return '🎯 إجابة مثالية! كل إجاباتك صحيحة.';
    if (percentage >= 90) return '✨ أداء متميز!几乎 جميع إجاباتك صحيحة.';
    if (percentage >= 70) return '👍 جيد جداً! معظم إجاباتك صحيحة.';
    if (percentage >= 50) return '💪 ليس سيئاً! يمكنك التحسن بالمزيد من المذاكرة.';
    return '📚 تحتاج للمزيد من المذاكرة والتركيز.';
}

// تبديل عرض الإجابات
function toggleAnswers() {
    const answersSection = document.getElementById('answersSection');
    const toggleBtn = document.getElementById('toggleAnswersBtn');
    
    if (answersSection.style.display === 'none') {
        answersSection.style.display = 'block';
        toggleBtn.textContent = '🙈 إخفاء الإجابات';
    } else {
        answersSection.style.display = 'none';
        toggleBtn.textContent = '📖 عرض الإجابات';
    }
}

// إعادة الاختبار
function retryTest() {
    window.location.href = 'tests.html';
}

// الذهاب للصفحة الرئيسية
function goHome() {
    window.location.href = 'home.html';
}