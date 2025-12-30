// test-questions.js - نظام الأسئلة
let currentQuestionIndex = 0;
let userAnswers = [];
let questions = [];
let timer;
let timeLeft = 30 * 60;

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ صفحة الأسئلة اتحملت');
    loadTestData();
    initializeTest();
    startTimer();
});

// تحميل بيانات الاختبار
function loadTestData() {
    console.log('📥 بدأ تحميل بيانات الاختبار');
    
    const testData = JSON.parse(localStorage.getItem('currentTest'));
    questions = JSON.parse(localStorage.getItem('currentTestQuestions')) || [];
    
    console.log('📊 بيانات الاختبار:', testData);
    console.log('❓ عدد الأسئلة المحملة:', questions.length);
    
    if (!testData || questions.length === 0) {
        console.error('❌ لا توجد بيانات اختبار');
        alert('❌ لا توجد أسئلة للاختبار. الرجاء اختيار اختبار جديد.');
        window.location.href = 'tests.html';
        return;
    }
    
    // تهيئة إجابات المستخدم
    userAnswers = new Array(questions.length).fill(null);
    
    // عرض معلومات الاختبار
    document.getElementById('testSubject').textContent = `المادة: ${getSubjectName(testData.selectedSubject)}`;
    document.getElementById('testLesson').textContent = `الدرس: ${getLessonName(testData)}`;
    document.getElementById('totalQuestions').textContent = questions.length;
}

// تهيئة الاختبار
function initializeTest() {
    if (questions.length > 0) {
        displayQuestion(currentQuestionIndex);
        updateNavigation();
    }
}

// عرض السؤال
function displayQuestion(index) {
    const questionsContainer = document.getElementById('questionsContainer');
    
    if (index < 0 || index >= questions.length) {
        return;
    }
    
    const question = questions[index];
    
    questionsContainer.innerHTML = '';
    
    const questionElement = document.createElement('div');
    questionElement.className = 'question active';
    
    let questionHTML = `
        <div class="question-number">السؤال ${index + 1}</div>
        <div class="question-text">${question.question}</div>
    `;
    
    if (question.type === "true_false") {
        questionHTML += `
            <div class="options">
                <div class="option" onclick="selectTrueFalse(true, ${index})">
                    <input type="radio" name="q${index}" value="true" ${userAnswers[index] === true ? 'checked' : ''}>
                    <label>✅ صح</label>
                </div>
                <div class="option" onclick="selectTrueFalse(false, ${index})">
                    <input type="radio" name="q${index}" value="false" ${userAnswers[index] === false ? 'checked' : ''}>
                    <label>❌ غلط</label>
                </div>
            </div>
        `;
    } else {
        questionHTML += `
            <div class="options">
                ${question.options.map((option, optIndex) => `
                    <div class="option" onclick="selectOption(${optIndex}, ${index})">
                        <input type="radio" name="q${index}" value="${optIndex}" ${userAnswers[index] === optIndex ? 'checked' : ''}>
                        <label>${option}</label>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    questionElement.innerHTML = questionHTML;
    questionsContainer.appendChild(questionElement);
    document.getElementById('currentQuestion').textContent = index + 1;
}

// اختيار إجابة لأسئلة صح/غلط
function selectTrueFalse(answer, questionIndex) {
    userAnswers[questionIndex] = answer;
    updateNavigation();
    
    // تحديث التحديد البصري
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

// اختيار إجابة لأسئلة الاختيار من متعدد
function selectOption(optionIndex, questionIndex) {
    userAnswers[questionIndex] = optionIndex;
    updateNavigation();
    
    // تحديث التحديد البصري
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

// السؤال التالي
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        updateNavigation();
    }
}

// السؤال السابق
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
        updateNavigation();
    }
}

// تحديث أزرار التنقل
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
    if (nextBtn) nextBtn.style.display = currentQuestionIndex < questions.length - 1 ? 'block' : 'none';
    if (submitBtn) submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'block' : 'none';
}

// بدء المؤقت
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}

// تحديث عرض المؤقت
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// تسليم الاختبار
function submitTest() {
    clearInterval(timer);
    
    // حساب النتيجة
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    
    // حفظ النتيجة مع بيانات الإجابات
    const testData = JSON.parse(localStorage.getItem('currentTest'));
    localStorage.setItem('testResult', JSON.stringify({
        score: score,
        total: questions.length,
        percentage: percentage,
        subject: testData.selectedSubject,
        lesson: testData.selectedLesson,
        userAnswers: userAnswers, // حفظ إجابات المستخدم
        questions: questions      // حفظ الأسئلة
    }));
    
    // إضافة النقاط إذا نجح
    if (percentage >= 60) {
        addTestPoints(score, questions.length, getLessonName(testData));
    }
    
    // الانتقال لصفحة النتائج
    window.location.href = 'test-results.html';
}

// حساب النتيجة
function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
        if (question.type === "true_false") {
            if (userAnswers[index] === question.correct) {
                score++;
            }
        } else {
            if (userAnswers[index] === question.correct) {
                score++;
            }
        }
    });
    return score;
}

// إضافة النقاط
function addTestPoints(score, total, lessonName) {
    const percentage = (score / total) * 100;
    let points = 0;
    
    if (percentage >= 80) points = 25;
    else if (percentage >= 60) points = 15;
    else points = 5;
    
    // تحديث النقاط في localStorage
    const currentPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    localStorage.setItem('userPoints', (currentPoints + points).toString());
    
    // تحديث نقاط المستخدم في allUsers
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === currentUser.email) {
            allUsers[i].points = (parseInt(allUsers[i].points) || 0) + points;
            break;
        }
    }
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

// الحصول على اسم المادة
function getSubjectName(subjectId) {
    return 'العلوم';
}

// الحصول على اسم الدرس
function getLessonName(testData) {
    const lessons = {
        'lesson1': 'الحركة في اتجاه واحد',
        'lesson2': 'التمثيل البياني للحركة',
        'lesson3': 'الكميات الفيزيائية',
        'lesson4': 'المرايا',
        'lesson5': 'العدسات',
        'lesson6': 'الكون والنظام الشمسي',
        'lesson7': 'الانقسام الخلوي',
        'lesson8': 'التكاثر واستمرار النوع'
    };
    return lessons[testData.selectedLesson] || 'الدرس';
}

function goBack() {
    if (confirm('هل تريد الخروج من الاختبار؟ سيتم فقدان تقدمك الحالي.')) {
        window.location.href ='tests_complete.html'; 
    }
}
