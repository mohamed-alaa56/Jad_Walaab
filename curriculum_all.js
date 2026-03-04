// curriculum_all.js - الهيكل الكامل لجميع المواد

window.curriculumAll = window.curriculumAll || {
    '3-prep': {
        subjects: {
            'science': { name: 'العلوم', icon: '🔬' },
            'arabic': { name: 'اللغة العربية', icon: '📖' },
            'math': { name: 'الرياضيات', icon: '➕' },
            'social': { name: 'الدراسات الاجتماعية', icon: '🌍' },
            'english': { name: 'اللغة الإنجليزية', icon: '🔤' }
        },
        units: {
            // ============ العلوم ============
            'science': [
                { id: 'science1', name: 'التفاعلات الكيميائية' },  // اكتب اسم الوحدة الأولى
                { id: 'science2', name: 'الطاقة الكهربية و النشاط الإشعاعي' },  // اكتب اسم الوحدة الثانية
                { id: 'science3', name: 'الجينات الوراثية' },  // اكتب اسم الوحدة الثالثة
                { id: 'science4', name: 'الهرمونات' }   // اكتب اسم الوحدة الرابعة
            ],
            
            // ============ العربي ============
            'arabic': [
                { id: 'arabic1', name: 'لحظات غيرت التاريخ' },   // اكتب اسم الوحدة الأولى
                { id: 'arabic2', name: 'نحو حياة أفضل' },   // اكتب اسم الوحدة الثانية
                { id: 'arabic3', name: 'كن جميلا' },    // اكتب اسم الوحدة الثالثة
                { id: 'arabic4', name: 'النحو' },    // اكتب اسم الوحدة الرابعة
            ],
            
            // ============ الرياضيات ============
            'math': [
                { id: 'math1', name: 'المعادلات' },     // اكتب اسم الوحدة الأولى
                { id: 'math2', name: 'دولال الكسور الجبرية والعمليات عليها' },     // اكتب اسم الوحدة الثانية
                { id: 'math3', name: 'الإحتمال' },      // اكتب اسم الوحدة الثالثة
                { id: 'math4', name: 'الدئرة' },      // اكتب اسم الوحدة الرابعة
                { id: 'math5', name: 'الزوايا والأقواس في الدائرة' }      // اكتب اسم الوحدة الخامسة
            ],
            
            // ============ الدراسات ============
            'social': [
                { id: 'social1', name: 'الموارد والأنشطة الاقتصادية في العالم' },   // اكتب اسم الوحدة الأولى
                { id: 'social2', name: 'نماذج لبعض الدول النامية  والمتقدمة' },   // اكتب اسم الوحدة الثانية
                { id: 'social3', name: 'ثورة يوليو والصراع العربي/الإسرائيلي' },    // اكتب اسم الوحدة الثالثة
                { id: 'social4', name: 'الحياة السياسية وعلاقات مصر الدولية' }     // اكتب اسم الوحدة الرابعة

            ],
            
            // ============ الإنجليزية ============
            'english': [
                { id: 'english7', name: 'Unit 7' },  
                { id: 'english8', name: 'Unit 8' }, 
                { id: 'english9', name: 'Unit 9' },
                { id: 'english10', name: 'Unit 10' },
                { id: 'english11', name: 'Unit 11' },
                { id: 'english12', name: 'Unit 12' }   

                
            ]
        },
        lessons: {
            // ============ العلوم - 4 وحدات × 4 دروس = 16 درس ============
            'science1': [
                { id: 'science_lesson1', name: 'التفاعلات الكيميائية' },  // اكتب اسم الدرس الأول
                { id: 'science_lesson2', name: 'سرعة التفاعلات الكيميائية' },  // اكتب اسم الدرس الثاني
            ],
            'science2': [
                { id: 'science_lesson5', name: 'الخصائص الفيزيائية للتيار الكهربي' },
                { id: 'science_lesson6', name: 'التيار الكهربي والأعمدة الكهربية' },
                { id: 'science_lesson7', name: 'النشاط الإشعاعي والطاقة النووية' },
            ],
            'science3': [
                { id: 'science_lesson8', name: 'المبادئ الأساسية للوراثة' },
            ],
            'science4': [
                { id: 'science_lesson13', name: 'التنظيم الهرموني في الأنسان' },
            ],
            
            // ============ العربي - 3 وحدات × 4 دروس = 12 درس ============
            'arabic1': [
                { id: 'arabic_lesson1', name: 'سفينة نوح عليه السلام' },
                { id: 'arabic_lesson2', name: '' },
                { id: 'arabic_lesson3', name: '' },
                { id: 'arabic_lesson4', name: '' }
            ],
            'arabic2': [
                { id: 'arabic_lesson5', name: '' },
                { id: 'arabic_lesson6', name: '' },
                { id: 'arabic_lesson7', name: '' },
                { id: 'arabic_lesson8', name: '' }
            ],
            'arabic3': [
                { id: 'arabic_lesson9', name: '' },
                { id: 'arabic_lesson10', name: '' },
                { id: 'arabic_lesson11', name: '' },
                { id: 'arabic_lesson12', name: '' }
            ],
            
            // ============ الرياضيات - 3 وحدات × 4 دروس = 12 درس ============
            'math1': [
                { id: 'math_lesson1', name: '' },
                { id: 'math_lesson2', name: '' },
                { id: 'math_lesson3', name: '' },
                { id: 'math_lesson4', name: '' }
            ],
            'math2': [
                { id: 'math_lesson5', name: '' },
                { id: 'math_lesson6', name: '' },
                { id: 'math_lesson7', name: '' },
                { id: 'math_lesson8', name: '' }
            ],
            'math3': [
                { id: 'math_lesson9', name: '' },
                { id: 'math_lesson10', name: '' },
                { id: 'math_lesson11', name: '' },
                { id: 'math_lesson12', name: '' }
            ],
            
            // ============ الدراسات - 3 وحدات × 4 دروس = 12 درس ============
            'social1': [
                { id: 'social_lesson1', name: '' },
                { id: 'social_lesson2', name: '' },
                { id: 'social_lesson3', name: '' },
                { id: 'social_lesson4', name: '' }
            ],
            'social2': [
                { id: 'social_lesson5', name: '' },
                { id: 'social_lesson6', name: '' },
                { id: 'social_lesson7', name: '' },
                { id: 'social_lesson8', name: '' }
            ],
            'social3': [
                { id: 'social_lesson9', name: '' },
                { id: 'social_lesson10', name: '' },
                { id: 'social_lesson11', name: '' },
                { id: 'social_lesson12', name: '' }
            ],
            
            // ============ الإنجليزية - 3 وحدات × 4 دروس = 12 درس ============
            'english1': [
                { id: 'english_lesson1', name: '' },
                { id: 'english_lesson2', name: '' },
                { id: 'english_lesson3', name: '' },
                { id: 'english_lesson4', name: '' }
            ],
            'english2': [
                { id: 'english_lesson5', name: '' },
                { id: 'english_lesson6', name: '' },
                { id: 'english_lesson7', name: '' },
                { id: 'english_lesson8', name: '' }
            ],
            'english3': [
                { id: 'english_lesson9', name: '' },
                { id: 'english_lesson10', name: '' },
                { id: 'english_lesson11', name: '' },
                { id: 'english_lesson12', name: '' }
            ]
        }
    }
};