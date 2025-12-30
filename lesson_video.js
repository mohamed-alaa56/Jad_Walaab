// lesson_video.js
document.addEventListener('DOMContentLoaded', function() {
    loadLessonVideo();
});

function loadLessonVideo() {
    // جلب بيانات الدرس من التخزين
    const lessonData = localStorage.getItem('currentLesson');
    
    if (!lessonData) {
        alert('❌ لا يوجد درس محدد');
        goBackToLessons();
        return;
    }
    
    try {
        const lesson = JSON.parse(lessonData);
        
        // عرض معلومات الدرس
        document.getElementById('lessonTitle').textContent = lesson.title;
        document.getElementById('lessonUnit').textContent = lesson.unit;
        document.getElementById('lessonTeacher').textContent = lesson.teacher;
        document.getElementById('lessonDescription').textContent = lesson.description;
        
        // تحميل الفيديو
        if (lesson.videoId) {
            const embedUrl = `https://www.youtube.com/embed/${lesson.videoId}?autoplay=1&rel=0&modestbranding=1`;
            document.getElementById('youtubePlayer').src = embedUrl;
        } else {
            document.getElementById('youtubePlayer').innerHTML = `
                <div style="text-align: center; padding: 50px; color: white;">
                    <div style="font-size: 48px;">📹</div>
                    <div style="font-size: 20px; margin-top: 20px;">الفيديو غير متاح</div>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('خطأ في تحميل الدرس:', error);
        alert('❌ حدث خطأ في تحميل الدرس');
        goBackToLessons();
    }
}

function markAsWatched() {
    alert('✅ تم تسجيل مشاهدة الدرس!');
    
    // إضافة نقاط للمستخدم
    if (typeof pointsSystem !== 'undefined') {
        pointsSystem.addPoints(10, 'مشاهدة درس');
    }
    
    // العودة للدروس بعد 1 ثانية
    setTimeout(() => {
        goBackToLessons();
    }, 1000);
}

function goBackToLessons() {
    window.location.href = 'lessons.html';
}

function goHome() {
    window.location.href = 'home.html';
}