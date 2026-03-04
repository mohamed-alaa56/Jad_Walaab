// questions_template.js - قالب الأسئلة لكل درس (30 سؤال)

window.allQuestions = {
    // ============ نموذج للدرس الأول من كل مادة ============
    
    'science_lesson1': [ // اكتب اسم الدرس
        // === 20 سؤال اختيار من متعدد ===
        {
            id: 1,
            question: 'اكتب نص السؤال الأول هنا', // مكان كتابتك
            type: 'multiple_choice',
            options: [
                'اكتب الإجابة الأولى هنا',   // ملاحظة: الإجابة الأولى
                'اكتب الإجابة الثانية هنا',  // ملاحظة: الإجابة الثانية
                'اكتب الإجابة الثالثة هنا',  // ملاحظة: الإجابة الثالثة
                'اكتب الإجابة الرابعة هنا'   // ملاحظة: الإجابة الرابعة
            ],
            correct: 0, // ملاحظة: 0 = الإجابة الأولى، 1 = الثانية، 2 = الثالثة، 3 = الرابعة
            explanation: 'اكتب شرح الإجابة هنا' // مكان كتابتك
        },
        {
            id: 2,
            question: 'اكتب نص السؤال الثاني هنا',
            type: 'multiple_choice',
            options: ['', '', '', ''], // اكتب الاختيارات
            correct: 1, // حدد الرقم الصحيح
            explanation: ''
        },
        {
            id: 3,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 2,
            explanation: ''
        },
        {
            id: 4,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 3,
            explanation: ''
        },
        {
            id: 5,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 0,
            explanation: ''
        },
        {
            id: 6,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 1,
            explanation: ''
        },
        {
            id: 7,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 2,
            explanation: ''
        },
        {
            id: 8,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 3,
            explanation: ''
        },
        {
            id: 9,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 0,
            explanation: ''
        },
        {
            id: 10,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 1,
            explanation: ''
        },
        {
            id: 11,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 2,
            explanation: ''
        },
        {
            id: 12,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 3,
            explanation: ''
        },
        {
            id: 13,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 0,
            explanation: ''
        },
        {
            id: 14,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 1,
            explanation: ''
        },
        {
            id: 15,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 2,
            explanation: ''
        },
        {
            id: 16,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 3,
            explanation: ''
        },
        {
            id: 17,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 0,
            explanation: ''
        },
        {
            id: 18,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 1,
            explanation: ''
        },
        {
            id: 19,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 2,
            explanation: ''
        },
        {
            id: 20,
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correct: 3,
            explanation: ''
        },
        
        // === 10 أسئلة صح وخطأ ===
        {
            id: 21,
            question: 'اكتب نص السؤال صح/خطأ الأول هنا',
            type: 'true_false',
            correct: true, // ملاحظة: true = صح، false = خطأ
            explanation: 'اكتب شرح الإجابة هنا'
        },
        {
            id: 22,
            question: '',
            type: 'true_false',
            correct: false,
            explanation: ''
        },
        {
            id: 23,
            question: '',
            type: 'true_false',
            correct: true,
            explanation: ''
        },
        {
            id: 24,
            question: '',
            type: 'true_false',
            correct: false,
            explanation: ''
        },
        {
            id: 25,
            question: '',
            type: 'true_false',
            correct: true,
            explanation: ''
        },
        {
            id: 26,
            question: '',
            type: 'true_false',
            correct: false,
            explanation: ''
        },
        {
            id: 27,
            question: '',
            type: 'true_false',
            correct: true,
            explanation: ''
        },
        {
            id: 28,
            question: '',
            type: 'true_false',
            correct: false,
            explanation: ''
        },
        {
            id: 29,
            question: '',
            type: 'true_false',
            correct: true,
            explanation: ''
        },
        {
            id: 30,
            question: '',
            type: 'true_false',
            correct: false,
            explanation: ''
        }
    ],
    
    // ============ باقي الدروس ============
    // يمكنك نسخ النموذج أعلاه وتعديله لكل درس
    
    'science_lesson2': [ // اكتب اسم الدرس الثاني
        // ... نفس القالب أعلاه (30 سؤال)
    ],
    
    'science_lesson3': [ // اكتب اسم الدرس الثالث
        // ... نفس القالب أعلاه (30 سؤال)
    ],
    
    'science_lesson4': [ // اكتب اسم الدرس الرابع
        // ... نفس القالب أعلاه (30 سؤال)
    ],
    
    // ... وهكذا لباقي الدروس (64 درس إجمالاً)
    // 1. العلوم: 16 درس
    // 2. العربي: 12 درس  
    // 3. الرياضيات: 12 درس
    // 4. الدراسات: 12 درس
    // 5. الإنجليزية: 12 درس
    // المجموع: 64 درس × 30 سؤال = 1920 سؤال
};

console.log('✅ قاعدة بيانات الأسئلة محملة - ' + 
    Object.keys(window.allQuestions).length + ' درس متاح');