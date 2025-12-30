// tests_complete.js - نظام الاختبارات المتكامل - النسخة المصححة

let testData = {
    currentStep: 1,
    selectedSubject: '',
    selectedCategory: '',
    selectedUnit: '',
    selectedLesson: '',
    selectedQuestionsCount: 0,
    currentGrade: '3-prep'
};

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ صفحة الاختبارات اتحملت');
    initializeTest();
});

// تهيئة الاختبار
function initializeTest() {
    loadCurrentGrade();
    displaySubjects();
    updateNavigation();
}

// تحميل المرحلة الحالية
function loadCurrentGrade() {
    const savedGrade = localStorage.getItem('selectedSpecificGrade');
    if (savedGrade) testData.currentGrade = savedGrade;
}

// ==================== عرض المواد ====================
function displaySubjects() {
    const subjectsGrid = document.getElementById('subjectsGrid');
    if (!subjectsGrid) return;
    
    subjectsGrid.innerHTML = '';
    
    // تحقق من وجود البيانات
    if (!window.curriculumAll) {
        console.error('❌ البيانات غير موجودة! تأكد من تحميل curriculum_all.js');
        subjectsGrid.innerHTML = '<div style="text-align:center; padding:40px; color:#666">جاري تحميل البيانات...</div>';
        return;
    }
    
    const curriculum = window.curriculumAll[testData.currentGrade];
    if (!curriculum || !curriculum.subjects) {
        console.error('❌ لا توجد مواد لهذه المرحلة');
        subjectsGrid.innerHTML = '<div style="text-align:center; padding:40px; color:#666">لا توجد مواد متاحة</div>';
        return;
    }
    
    Object.entries(curriculum.subjects).forEach(([key, subject]) => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.onclick = function() {
            selectSubject(key, subject.name);
        };
        
        subjectCard.innerHTML = `
            <div class="subject-icon">${subject.icon}</div>
            <div class="subject-name">${subject.name}</div>
        `;
        
        subjectsGrid.appendChild(subjectCard);
    });
}

// اختيار المادة
function selectSubject(subjectId, subjectName) {
    testData.selectedSubject = subjectId;
    
    // إزالة التحديد القديم
    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // تحديد البطاقة المختارة
    event.currentTarget.classList.add('selected');
    
    // عرض التصنيفات حسب المادة
    displayCategories(subjectId);
    document.getElementById('nextBtn').disabled = false;
}

// عرض التصنيفات
function displayCategories(subjectId) {
    const unitsList = document.getElementById('unitsList');
    unitsList.innerHTML = '';
    
    // إذا كانت مادة عادية
    if (['science', 'social', 'english'].includes(subjectId)) {
        displayUnits(subjectId);
        return;
    }
    
    // للعربي
    if (subjectId === 'arabic') {
        const categories = [
            { id: 'arabic_reading', name: 'القراءة والنصوص', icon: '📚' },
            { id: 'arabic_grammar', name: 'النحو', icon: '✍️' }
        ];
        
        categories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'unit-item';
            categoryItem.onclick = function() {
                testData.selectedCategory = category.id;
                selectCategory(category.id);
            };
            
            categoryItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="font-size: 24px;">${category.icon}</div>
                    <div>${category.name}</div>
                </div>
            `;
            
            unitsList.appendChild(categoryItem);
        });
    }
    
    // للرياضيات
    else if (subjectId === 'math') {
        const categories = [
            { id: 'math_algebra', name: 'الجبر والإحصاء', icon: '📊' },
            { id: 'math_geometry', name: 'حساب المثلثات والهندسة', icon: '📐' }
        ];
        
        categories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'unit-item';
            categoryItem.onclick = function() {
                testData.selectedCategory = category.id;
                selectCategory(category.id);
            };
            
            categoryItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="font-size: 24px;">${category.icon}</div>
                    <div>${category.name}</div>
                </div>
            `;
            
            unitsList.appendChild(categoryItem);
        });
    }
}

// اختيار التصنيف
function selectCategory(categoryId) {
    document.querySelectorAll('.unit-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    displayUnits(categoryId);
}

// عرض الوحدات
function displayUnits(categoryId) {
    const unitsList = document.getElementById('unitsList');
    const curriculum = window.curriculumAll[testData.currentGrade];
    
    let unitsKey = categoryId;
    if (!unitsKey) {
        unitsKey = testData.selectedSubject;
    }
    
    const units = curriculum.units[unitsKey];
    if (!units || units.length === 0) {
        unitsList.innerHTML = '<div style="text-align:center; padding:20px; color:#666">لا توجد وحدات</div>';
        return;
    }
    
    unitsList.innerHTML = '';
    
    units.forEach(unit => {
        const unitItem = document.createElement('div');
        unitItem.className = 'unit-item';
        unitItem.onclick = function() {
            selectUnit(unit.id, unitsKey);
        };
        
        unitItem.innerHTML = `<div class="unit-name">${unit.name}</div>`;
        unitsList.appendChild(unitItem);
    });
}

// اختيار الوحدة
function selectUnit(unitId, category) {
    testData.selectedUnit = unitId;
    
    document.querySelectorAll('.unit-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    displayLessons(unitId, category);
    document.getElementById('nextBtn').disabled = false;
}

// عرض الدروس
function displayLessons(unitId, category) {
    const lessonsList = document.getElementById('lessonsList');
    const curriculum = window.curriculumAll[testData.currentGrade];
    const lessons = curriculum.lessons[unitId];
    
    if (!lessons || lessons.length === 0) {
        lessonsList.innerHTML = '<div style="text-align:center; padding:20px; color:#666">لا توجد دروس</div>';
        return;
    }
    
    lessonsList.innerHTML = '';
    
    lessons.forEach(lesson => {
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';
        lessonItem.onclick = function() {
            selectLesson(lesson.id, lesson.name);
        };
        
        lessonItem.innerHTML = `<div class="lesson-name">${lesson.name}</div>`;
        lessonsList.appendChild(lessonItem);
    });
}

// اختيار الدرس
function selectLesson(lessonId, lessonName) {
    testData.selectedLesson = lessonId;
    
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    document.getElementById('nextBtn').disabled = false;
}

// ==================== عدد الأسئلة ====================
function selectQuestionsCount(count) {
    testData.selectedQuestionsCount = count;
    
    document.querySelectorAll('.questions-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    document.getElementById('nextBtn').disabled = false;
}

// ==================== التنقل ====================
function nextStep() {
    if (testData.currentStep < 5) {
        testData.currentStep++;
        updateSteps();
        updateNavigation();
    }
}

function previousStep() {
    if (testData.currentStep > 1) {
        testData.currentStep--;
        updateSteps();
        updateNavigation();
    }
}

function updateSteps() {
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    document.getElementById(`step${testData.currentStep}`).classList.add('active');
    document.getElementById(`step${testData.currentStep}Content`).classList.add('active');
    
    if (testData.currentStep === 5) {
        updateSummary();
    }
}

function updateSummary() {
    const curriculum = window.curriculumAll[testData.currentGrade];
    
    // اسم المادة
    const subjectName = curriculum.subjects[testData.selectedSubject]?.name || '-';
    
    // اسم الوحدة
    let unitName = '-';
    let unitsKey = testData.selectedCategory || testData.selectedSubject;
    const units = curriculum.units[unitsKey];
    if (units) {
        const unit = units.find(u => u.id === testData.selectedUnit);
        unitName = unit ? unit.name : '-';
    }
    
    // اسم الدرس
    let lessonName = '-';
    const lessons = curriculum.lessons[testData.selectedUnit];
    if (lessons) {
        const lesson = lessons.find(l => l.id === testData.selectedLesson);
        lessonName = lesson ? lesson.name : '-';
    }
    
    // النقاط
    let points = 0;
    if (testData.selectedQuestionsCount === 10) points = 20;
    else if (testData.selectedQuestionsCount === 20) points = 40;
    else if (testData.selectedQuestionsCount === 30) points = 60;
    
    // تحديث الواجهة
    document.getElementById('summarySubject').textContent = subjectName;
    document.getElementById('summaryUnit').textContent = unitName;
    document.getElementById('summaryLesson').textContent = lessonName;
    document.getElementById('summaryQuestions').textContent = testData.selectedQuestionsCount;
    document.getElementById('summaryPoints').textContent = `${points} نقطة`;
}

function updateNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = testData.currentStep === 1;
    
    if (testData.currentStep === 5) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
        nextBtn.disabled = !isStepComplete(testData.currentStep);
    }
}

function isStepComplete(step) {
    switch(step) {
        case 1: return testData.selectedSubject !== '';
        case 2: 
            if (['arabic', 'math'].includes(testData.selectedSubject)) {
                return testData.selectedCategory !== '';
            }
            return testData.selectedUnit !== '';
        case 3: return testData.selectedLesson !== '';
        case 4: return testData.selectedQuestionsCount !== 0;
        default: return true;
    }
}

// ==================== بدء الاختبار ====================
function startAITest() {
    console.log('🚀 بدء الاختبار...');
    
    document.querySelector('.start-test-btn').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    
    try {
        const questions = generateQuestions();
        
        if (questions.length === 0) {
            alert('❌ لا توجد أسئلة متاحة لهذا الدرس');
            resetStartButton();
            return;
        }
        
        localStorage.setItem('currentTestQuestions', JSON.stringify(questions));
        localStorage.setItem('currentTest', JSON.stringify(testData));
        
        setTimeout(() => {
            window.location.href = 'test-questions.html';
        }, 1500);
        
    } catch (error) {
        console.error('❌ خطأ في بدء الاختبار:', error);
        alert('❌ حدث خطأ في تحضير الاختبار');
        resetStartButton();
    }
}

function resetStartButton() {
    document.querySelector('.start-test-btn').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
}

// توليد الأسئلة
function generateQuestions() {
    const lessonId = testData.selectedLesson;
    const count = testData.selectedQuestionsCount;
    
    if (!window.allQuestions || !window.allQuestions[lessonId]) {
        console.warn('⚠️ لا توجد أسئلة لهذا الدرس:', lessonId);
        
        const lessonName = getLessonName(lessonId);
        alert(`⏳ درس "${lessonName}" قيد التطوير\nسيتم إضافته قريباً!`);
        
        resetStartButton();
        return [];
    }
    
    const lessonQuestions = window.allQuestions[lessonId];
    
    if (lessonQuestions.length === 0) {
        alert('📝 الدرس موجود لكن الأسئلة قيد الإعداد');
        return [];
    }
    
    const availableQuestions = [...lessonQuestions];
    const questions = [];
    
    for (let i = 0; i < count; i++) {
        const originalIndex = i % availableQuestions.length;
        const question = { ...availableQuestions[originalIndex] };
        question.id = i + 1;
        questions.push(question);
    }
    
    console.log(`✅ تم توليد ${questions.length} سؤال للدرس: ${lessonId}`);
    return questions;
}

// دالة مساعدة للحصول على اسم الدرس
function getLessonName(lessonId) {
    const lessonNames = {
        'science_lesson1': 'الحركة في اتجاه واحد',
        'science_lesson2': 'التمثيل البياني للحركة',
        'science_lesson3': 'الكميات الفيزيائية',
        'science_lesson4': 'المرايا',
        'science_lesson5': 'العدسات',
        'science_lesson6': 'الكون والنظام الشمسي',
        'science_lesson7': 'الانقسام الخلوي',
        'science_lesson8': 'التكاثر واستمرار النوع',
        'arabic_lesson1': 'عباد الرحمن',
        'arabic_lesson11': 'المنادى'
    };
    
    return lessonNames[lessonId] || 'الدرس';
}

// ==================== دالة الرجوع ====================
function goBack() {
    if (confirm('هل تريد الخروج من الاختبار؟ سيتم فقدان تقدمك الحالي.')) {
        window.location.href ='tests_complete.html'; 
    }
}
function goBack() {
    window.location.href = 'home.html';
}