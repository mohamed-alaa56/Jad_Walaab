// tests.js - نظام الاختبارات المصغر للعلوم فقط
const curriculumData = {
    '3-prep': {
        subjects: {
            'science': { name: 'العلوم', icon: '🔬' }
        },
        units: {
            'science': [
                { id: 'science1', name: 'الوحدة الأولى: القوى والحركة' },
                { id: 'science2', name: 'الوحدة الثانية: الطاقة الضوئية' },
                { id: 'science3', name: 'الوحدة الثالثة: الكون والنظام الشمسي' },
                { id: 'science4', name: 'الوحدة الرابعة: التكاثر واستمرار النوع' }
            ]
        },
        lessons: {
            'science1': [
                { id: 'lesson1', name: 'الحركة في اتجاه واحد' },
                { id: 'lesson2', name: 'التمثيل البياني للحركة في خط مستقيم' },
                { id: 'lesson3', name: 'الكميات الفيزيائية القياسية والمتجهة' }
            ],
            'science2': [
                { id: 'lesson4', name: 'المرايا' },
                { id: 'lesson5', name: 'العدسات' }
            ],
            'science3': [
                { id: 'lesson6', name: 'الكون والنظام الشمسي' }
            ],
            'science4': [
                { id: 'lesson7', name: 'الانقسام الخلوي' },
                { id: 'lesson8', name: 'التكاثر اللاجنسي والتكاثر الجنسي' }
            ]
        }
    }
};

// بيانات الاختبار (التعريف المكرر هنا أُزيل لأن testData يُعرَّف لاحقًا مع حقول إضافية)

// الأسئلة الحقيقية (نفس الأسئلة من tests_ai.js)
const realQuestions = {
    // ... (نفس الأسئلة من tests_ai.js)
    // سأقوم بتبسيط هذا الملف بحيث يشير إلى tests_ai.js
};

// بيانات الاختبار
let testData = {
    currentStep: 1,
    selectedSubject: '',
    selectedUnit: '',
    selectedLesson: '',
    selectedQuestionsCount: 0,
    currentGrade: '',
    selectedArabicSection: ''
};

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadCurrentGrade();
    initializeTest();
});

// تحميل المرحلة الحالية
function loadCurrentGrade() {
    const savedGrade = localStorage.getItem('selectedSpecificGrade');
    testData.currentGrade = savedGrade || '3-prep';
}

// تهيئة الاختبار
function initializeTest() {
    displaySubjects();
    updateNavigation();
}

// عرض المواد (العلوم فقط)
function displaySubjects() {
    const subjectsGrid = document.getElementById('subjectsGrid');
    const gradeData = curriculumData[testData.currentGrade];
    
    if (!gradeData) {
        subjectsGrid.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">لا توجد مواد لهذه المرحلة</div>';
        return;
    }
    
    subjectsGrid.innerHTML = '';
    
    Object.entries(gradeData.subjects).forEach(([key, subject]) => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.onclick = () => selectSubject(key, subject.name);
        
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
    
    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    displayUnits(subjectId);
    document.querySelector('.next-btn').disabled = false;
}

// عرض الوحدات
function displayUnits(subjectId) {
    const unitsList = document.getElementById('unitsList');
    const gradeData = curriculumData[testData.currentGrade];
    
    if (subjectId !== 'science') {
        unitsList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">جاري التطوير</div>';
        return;
    }
    
    const units = gradeData.units[subjectId];
    
    if (!units || units.length === 0) {
        unitsList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">لا توجد وحدات لهذه المادة</div>';
        return;
    }
    
    unitsList.innerHTML = '';
    
    units.forEach(unit => {
        const unitItem = document.createElement('div');
        unitItem.className = 'unit-item';
        unitItem.onclick = () => selectUnit(unit.id, unit.name);
        
        unitItem.innerHTML = `
            <div class="unit-name">${unit.name}</div>
        `;
        
        unitsList.appendChild(unitItem);
    });
}

// اختيار الوحدة
function selectUnit(unitId, unitName) {
    testData.selectedUnit = unitId;
    
    document.querySelectorAll('.unit-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    displayLessons(unitId);
    document.querySelector('.next-btn').disabled = false;
}

// عرض الدروس
function displayLessons(unitId) {
    const lessonsList = document.getElementById('lessonsList');
    const gradeData = curriculumData[testData.currentGrade];
    const lessons = gradeData.lessons[unitId];
    
    if (!lessons || lessons.length === 0) {
        lessonsList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">لا توجد دروس لهذه الوحدة</div>';
        return;
    }
    
    lessonsList.innerHTML = '';
    
    lessons.forEach(lesson => {
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';
        lessonItem.onclick = () => selectLesson(lesson.id, lesson.name);
        
        lessonItem.innerHTML = `
            <div class="lesson-name">${lesson.name}</div>
        `;
        
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
    
    document.querySelector('.next-btn').disabled = false;
}

// اختيار عدد الأسئلة
function selectQuestionsCount(count) {
    testData.selectedQuestionsCount = count;
    
    document.querySelectorAll('.questions-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    document.querySelector('.next-btn').disabled = false;
}

// التالي
function nextStep() {
    if (testData.currentStep < 5) {
        testData.currentStep++;
        updateSteps();
        updateNavigation();
    }
}

// السابق
function previousStep() {
    if (testData.currentStep > 1) {
        testData.currentStep--;
        updateSteps();
        updateNavigation();
    }
}

// تحديث الخطوات
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

// تحديث الملخص
function updateSummary() {
    const gradeData = curriculumData[testData.currentGrade];
    const subjectName = gradeData.subjects[testData.selectedSubject]?.name || '-';
    
    let unitName = '-';
    const units = gradeData.units[testData.selectedSubject];
    if (units) {
        const unit = units.find(u => u.id === testData.selectedUnit);
        unitName = unit ? unit.name : '-';
    }
    
    let lessonName = '-';
    const lessons = gradeData.lessons[testData.selectedUnit];
    if (lessons) {
        const lesson = lessons.find(l => l.id === testData.selectedLesson);
        lessonName = lesson ? lesson.name : '-';
    }
    
    let points = 0;
    if (testData.selectedQuestionsCount === 10) points = 20;
    else if (testData.selectedQuestionsCount === 20) points = 40;
    else if (testData.selectedQuestionsCount === 30) points = 60;
    
    document.getElementById('summarySubject').textContent = subjectName;
    document.getElementById('summaryUnit').textContent = unitName;
    document.getElementById('summaryLesson').textContent = lessonName;
    document.getElementById('summaryQuestions').textContent = testData.selectedQuestionsCount;
    document.getElementById('summaryPoints').textContent = `${points} نقطة`;
}

// تحديث أزرار التنقل
function updateNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    prevBtn.disabled = testData.currentStep === 1;
    
    if (testData.currentStep === 5) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
        nextBtn.disabled = !isStepComplete(testData.currentStep);
    }
}

// التحقق من اكتمال الخطوة
function isStepComplete(step) {
    switch(step) {
        case 1: return testData.selectedSubject !== '';
        case 2: return testData.selectedUnit !== '';
        case 3: return testData.selectedLesson !== '';
        case 4: return testData.selectedQuestionsCount !== 0;
        default: return true;
    }
}

// بدء الاختبار - التوجه إلى النظام الجديد
function startAITest() {
    // إخفاء زر البدء وإظهار التحميل
    document.querySelector('.start-test-btn').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    
    try {
        // حفظ البيانات الأساسية
        localStorage.setItem('currentTest', JSON.stringify(testData));
        
        // الانتقال لصفحة الأسئلة (سيتم توليد الأسئلة هناك)
        setTimeout(() => {
            window.location.href = 'test-questions.html';
        }, 1500);
        
    } catch (error) {
        console.error('فشل بدء الاختبار:', error);
        alert('❌ حدث خطأ في تحضير الاختبار');
        document.querySelector('.start-test-btn').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }
}

// توليد الأسئلة الاحتياطية (لم تعد تستخدم)
function generateEnhancedMockQuestions(count) {
    return []; // تم التعطيل لأننا نستخدم الأسئلة الحقيقية
}

// استخدام الأسئلة الاحتياطية (لم تعد تستخدم)
function useBackupQuestions() {
    alert('⚠️ جاري استخدام الأسئلة الاحتياطية');
    // ... (تم التعطيل)
}