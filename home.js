// home.js - النسخة المصححة كاملة
let selectedGrade = '';
let selectedSpecificGrade = '';

// عرض بيانات المستخدم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayUserWelcome();
    checkSavedGrade();
    setupOptionsInteractions();
});

// التحقق إذا فيه مرحلة مختارة مسبقاً
function checkSavedGrade() {
    const savedGrade = localStorage.getItem('selectedGrade');
    if (savedGrade) {
        if (savedGrade === '3-prep') {
            selectGrade('3-prep', true);
        } else {
            const savedSpecificGrade = localStorage.getItem('selectedSpecificGrade');
            if (savedSpecificGrade) {
                selectOtherGrade(savedSpecificGrade, true);
            }
        }
    }
}

// اختيار المرحلة الدراسية (الصف الثالث الإعدادي)
function selectGrade(grade, fromStorage = false) {
    selectedGrade = grade;
    selectedSpecificGrade = '3-prep';
    
    if (!fromStorage) {
        localStorage.setItem('selectedGrade', grade);
        localStorage.setItem('selectedSpecificGrade', '3-prep');
    }
    
    // تحديث الخيارات النشطة
    document.querySelectorAll('.grade-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.grade === grade) {
            option.classList.add('active');
        }
    });
    
    // إظهار الخيارات الرئيسية وإخفاء قسم المراحل
    document.getElementById('mainOptions').style.display = 'flex';
    document.getElementById('gradeSection').style.display = 'none';
    document.getElementById('changeGradeBtn').style.display = 'block';
    document.getElementById('otherGrades').style.display = 'none';
    
    // تفعيل أو تعطيل الخيارات حسب المرحلة
    updateOptionsBasedOnGrade();
    displaySelectedGradeName();
}

// إظهار قائمة المراحل الأخرى
function showOtherGrades() {
    document.getElementById('otherGrades').style.display = 'block';
    document.getElementById('mainOptions').style.display = 'none';
    document.getElementById('changeGradeBtn').style.display = 'none';
}

// اختيار مرحلة أخرى محددة
function selectOtherGrade(grade, fromStorage = false) {
    selectedGrade = 'other';
    selectedSpecificGrade = grade;
    
    if (!fromStorage) {
        localStorage.setItem('selectedGrade', 'other');
        localStorage.setItem('selectedSpecificGrade', grade);
    }
    
    // تحديث الخيارات النشطة
    document.querySelectorAll('.grade-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.grade === 'other') {
            option.classList.add('active');
        }
    });
    
    // إظهار الخيارات الرئيسية وإخفاء قسم المراحل
    document.getElementById('mainOptions').style.display = 'flex';
    document.getElementById('gradeSection').style.display = 'none';
    document.getElementById('otherGrades').style.display = 'none';
    document.getElementById('changeGradeBtn').style.display = 'block';
    
    // تفعيل أو تعطيل الخيارات حسب المرحلة
    updateOptionsBasedOnGrade();
    displaySelectedGradeName();
}

// عرض اسم المرحلة المختارة في الترحيب
function displaySelectedGradeName() {
    const gradeNames = {
        '4-primary': 'الصف الرابع الابتدائي',
        '5-primary': 'الصف الخامس الابتدائي', 
        '6-primary': 'الصف السادس الابتدائي',
        '1-prep': 'الصف الأول الإعدادي',
        '2-prep': 'الصف الثاني الإعدادي',
        '1-secondary': 'الصف الأول الثانوي',
        '2-secondary': 'الصف الثاني الثانوي',
        '3-secondary': 'الصف الثالث الثانوي',
        '3-prep': 'الصف الثالث الإعدادي'
    };
    
    const gradeName = gradeNames[selectedSpecificGrade];
    const welcomeSection = document.getElementById('welcomeSection');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const points = localStorage.getItem('userPoints') || '0';
    
    if (currentUser && currentUser.name) {
        welcomeSection.innerHTML = `
            <div class="welcome-message">مرحباً <span class="user-name">${currentUser.name}</span>!</div>
            <div class="points-message">${gradeName} - لديك <span class="user-points">${points}</span> نقطة</div>
        `;
    }
}

// تحديث الخيارات المتاحة حسب المرحلة
function updateOptionsBasedOnGrade() {
    const gamesOption = document.getElementById('gamesOption');
    const lessonsOption = document.getElementById('lessonsOption');
    const testsOption = document.getElementById('testsOption');
    
    if (selectedGrade === '3-prep') {
        // الصف الثالث الإعدادي - كل الخيارات متاحة
        gamesOption.classList.remove('disabled');
        lessonsOption.classList.remove('disabled');
        testsOption.classList.remove('disabled');
        
        // تحديث نصوص الخيارات
        updateOptionsText();
    } else {
        // المراحل الأخرى - المذاكرة والترتيب فقط
        gamesOption.classList.add('disabled');
        lessonsOption.classList.add('disabled');
        testsOption.classList.add('disabled');
    }
}

// تحديث نصوص الخيارات
function updateOptionsText() {
    const gamesOption = document.getElementById('gamesOption');
    const lessonsOption = document.getElementById('lessonsOption');
    const testsOption = document.getElementById('testsOption');
    
    if (gamesOption) {
        gamesOption.querySelector('.option-title').textContent = 'الألعاب';
        gamesOption.querySelector('.option-desc').textContent = 'تعلم من خلال الألعاب';
    }
    
    if (lessonsOption) {
        lessonsOption.querySelector('.option-title').textContent = 'الدروس';
        lessonsOption.querySelector('.option-desc').textContent = 'الوصول إلى الدروس التعليمية';
    }
    
    if (testsOption) {
        testsOption.querySelector('.option-title').textContent = 'الاختبارات';
        testsOption.querySelector('.option-desc').textContent = 'اختبارات تفاعلية في جميع المواد';
    }
}

// دالة لعرض الترحيب واسم المستخدم والنقاط
function displayUserWelcome() {
    const welcomeSection = document.getElementById('welcomeSection');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const points = localStorage.getItem('userPoints') || '0';
    
    if (currentUser && currentUser.name) {
        welcomeSection.innerHTML = `
            <div class="welcome-message">مرحباً <span class="user-name">${currentUser.name}</span>!</div>
            <div class="points-message">لديك <span class="user-points">${points}</span> نقطة</div>
        `;
    } else {
        welcomeSection.innerHTML = `
            <div class="welcome-message">مرحباً!</div>
            <div class="points-message">لديك <span class="user-points">0</span> نقطة</div>
        `;
    }
}

// إعداد التفاعلات
function setupOptionsInteractions() {
    const options = document.querySelectorAll('.option:not(.disabled)');
    
    options.forEach(option => {
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ✅✅✅ الدالة المصححة - اختيار خيار ✅✅✅
function handleOptionClick(optionType) {
    // الحصول على العنصر الذي تم النقر عليه
    const element = event.target.closest('.option');
    
    if (!element) {
        console.error('❌ العنصر غير موجود');
        return;
    }
    
    // إذا الخيار معطل، ماينفعش نضغط عليه
    if (element.classList.contains('disabled')) {
        alert('⛔ هذا الخيار غير متاح لمرحلتك الدراسية');
        return;
    }
    
    // إزالة النبض من جميع الخيارات
    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
        opt.classList.remove('pulse');
    });
    
    element.classList.add('pulse');
    
    switch(optionType) {
        case 'study':
            window.location.href = 'study_timer.html';
            break;
            
       
        case 'tests':
            if (selectedGrade === '3-prep') {
                window.location.href = 'tests_complete.html';
            } else {
                alert('⛔ الاختبارات غير متاحة لمرحلتك الدراسية');
            }
            break;
            
        case 'ranking':
            window.location.href = 'ranking.html';
            break;
    }
    
    setTimeout(() => {
        if (element) {
            element.classList.remove('pulse');
        }
    }, 3000);
}

// دالة لتغيير المرحلة
function changeGrade() {
    document.getElementById('mainOptions').style.display = 'none';
    document.getElementById('gradeSection').style.display = 'block';
    document.getElementById('changeGradeBtn').style.display = 'none';
    document.getElementById('otherGrades').style.display = 'none';
    selectedGrade = '';
    selectedSpecificGrade = '';
    localStorage.removeItem('selectedGrade');
    localStorage.removeItem('selectedSpecificGrade');
}
function openLessonsPage() {
    if (selectedGrade === '3-prep') {
        window.location.href = 'lessons.html';
    } else {
        alert('⛔ الدروس غير متاحة لمرحلتك الدراسية');
    }
}                
// أضف في نهاية الملف (قبل آخر }):
function openGamesPage() {
    if (selectedGrade === '3-prep') {
        window.location.href = 'games_home.html';
    } else {
        alert('⛔ الألعاب غير متاحة لمرحلتك الدراسية');
    }
}