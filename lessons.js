// lessons.js - النسخة النهائية
document.addEventListener('DOMContentLoaded', function() {
    loadLessons();
});

function loadLessons() {
    const lessonsList = document.getElementById('lessonsList');
    
    setTimeout(() => {
        if (!window.scienceVideos || Object.keys(window.scienceVideos).length === 0) {
            showErrorMessage();
            return;
        }
        
        displayLessons();
    }, 300);
}

function showErrorMessage() {
    const lessonsList = document.getElementById('lessonsList');
    lessonsList.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #666;">
            <div style="font-size: 48px;">😕</div>
            <div style="font-size: 18px; margin-top: 20px;">لا توجد دروس متاحة حالياً</div>
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 10px; cursor: pointer;">
                إعادة تحميل
            </button>
        </div>
    `;
}

function displayLessons() {
    const lessonsList = document.getElementById('lessonsList');
    lessonsList.innerHTML = '';
    
    let hasAvailableLessons = false;
    
    Object.entries(window.scienceVideos).forEach(([lessonId, lesson]) => {
        if (!lesson.videoUrl || lesson.videoUrl.trim() === '') {
            return;
        }
        
        hasAvailableLessons = true;
        
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';
        lessonItem.onclick = () => openLesson(lessonId);
        
        lessonItem.innerHTML = `
            <div class="lesson-thumbnail">${lesson.thumbnail}</div>
            <div class="lesson-info">
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-meta">
                    <span class="lesson-unit">${lesson.unit}</span>
                    <span class="lesson-teacher">👨‍🏫 ${lesson.teacher}</span>
                </div>
                <div class="lesson-description">${lesson.description}</div>
            </div>
        `;
        
        lessonsList.appendChild(lessonItem);
    });
    
    if (!hasAvailableLessons) {
        lessonsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <div style="font-size: 48px;">📚</div>
                <div style="font-size: 18px; margin-top: 20px;">جاري إعداد الدروس</div>
                <div style="margin-top: 10px; color: #888;">سيتم رفع الدروس قريباً</div>
            </div>
        `;
    }
}

function openLesson(lessonId) {
    const lesson = window.scienceVideos[lessonId];
    if (!lesson || !lesson.videoUrl) {
        alert('⛔ هذا الدرس غير متاح حالياً');
        return;
    }
    
    // استخراج ID الفيديو من رابط اليوتيوب
    const videoId = extractYouTubeId(lesson.videoUrl);
    
    if (!videoId) {
        alert('❌ رابط الفيديو غير صالح');
        return;
    }
    
    // حفظ بيانات الدرس
    localStorage.setItem('currentLesson', JSON.stringify({
        id: lessonId,
        title: lesson.title,
        unit: lesson.unit,
        description: lesson.description,
        teacher: lesson.teacher,
        videoId: videoId
    }));
    
    // الانتقال لصفحة الفيديو
    window.location.href = 'lesson_video.html';
}

function extractYouTubeId(url) {
    let videoId = '';
    
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    else if (url.includes('youtube.com/watch?v=')) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v');
    }
    
    return videoId;
}

function goBack() {
    window.location.href = 'home.html';
}