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
                { id: 'science1', name: 'الوحدة الأولى: القوى والحركة' },
                { id: 'science2', name: 'الوحدة الثانية: الطاقة الضوئية' },
                { id: 'science3', name: 'الوحدة الثالثة: الكون والنظام الشمسي' },
                { id: 'science4', name: 'الوحدة الرابعة: التكاثر واستمرار النوع' }
            ],
            
            // ============ العربي - القراءة ============
            'arabic_reading': [
                { id: 'arabic1', name: 'الوحدة الأولى: هيا نتواصل!' },
                { id: 'arabic2', name: 'الوحدة الثانية: رحمة ومحبة' },
                { id: 'arabic3', name: 'الوحدة الثالثة: طريق العلم' }
            ],
            
            // ============ العربي - النحو ============
            'arabic_grammar': [
                { id: 'grammar1', name: 'النحو' }
            ],
            
            // ============ الرياضيات - الجبر والإحصاء ============
            'math_algebra': [
                { id: 'math1', name: 'الوحدة الأولى: العلاقات والدوال' },
                { id: 'math2', name: 'الوحدة الثانية: النسبة والتناسب' },
                { id: 'math3', name: 'الوحدة الثالثة: الإحصاء' }
            ],
            
            // ============ الرياضيات - حساب المثلثات والهندسة ============
            'math_geometry': [
                { id: 'math4', name: 'الوحدة الرابعة: حساب المثلثات' },
                { id: 'math5', name: 'الوحدة الخامسة: الهندسة التحليلية' }
            ],
            
            // ============ الدراسات - الجغرافيا ============
            'social_geography': [
                { id: 'geo1', name: 'الوحدة الأولى: الجغرافيا الطبيعية للعالم' },
                { id: 'geo2', name: 'الوحدة الثانية: جغرافية سكان العالم' }
            ],
            
            // ============ الدراسات - التاريخ ============
            'social_history': [
                { id: 'history1', name: 'الوحدة الثالثة: مصر تحت الحكم العثماني' },
                { id: 'history2', name: 'الوحدة الرابعة: مصر والزحف الاستعماري' }
            ],
            
            // ============ الإنجليزية - الوحدات ============
            'english_units': [
                { id: 'eng1', name: 'Unit 1: Personal Identity' },
                { id: 'eng2', name: 'Unit 2: Communication with Family' },
                { id: 'eng3', name: 'Unit 3: Artificial Intelligence' },
                { id: 'eng4', name: 'Unit 4: Screen Time' },
                { id: 'eng5', name: 'Unit 5: Design Thinking' },
                { id: 'eng6', name: 'Unit 6: Why Do We Like Stories?' }
            ],
            
            // ============ الإنجليزية - القصة ============
            'english_story': [
                { id: 'story1', name: 'القصة' }
            ]
        },
        lessons: {
            // ============ العلوم ============
            'science1': [
                { id: 'science_lesson1', name: 'الحركة في اتجاه واحد' },
                { id: 'science_lesson2', name: 'التمثيل البياني للحركة في خط مستقيم' },
                { id: 'science_lesson3', name: 'الكميات الفيزيائية القياسية والمتجهة' }
            ],
            'science2': [
                { id: 'science_lesson4', name: 'المرايا' },
                { id: 'science_lesson5', name: 'العدسات' }
            ],
            'science3': [
                { id: 'science_lesson6', name: 'الكون والنظام الشمسي' }
            ],
            'science4': [
                { id: 'science_lesson7', name: 'الانقسام الخلوي' },
                { id: 'science_lesson8', name: 'التكاثر اللاجنسي والتكاثر الجنسي' }
            ],
            
            // ============ العربي - القراءة ============
            'arabic1': [
                { id: 'arabic_lesson1', name: 'عباد الرحمن' },
                { id: 'arabic_lesson2', name: 'كن جميلاً' },
                { id: 'arabic_lesson3', name: 'قصة أثر' }
            ],
            'arabic2': [
                { id: 'arabic_lesson4', name: 'رحمة ومحبة' },
                { id: 'arabic_lesson5', name: 'سميرة موسى' },
                { id: 'arabic_lesson6', name: 'آيات العلم' },
                { id: 'arabic_lesson7', name: 'طريق النور' }
            ],
            'arabic3': [
                { id: 'arabic_lesson8', name: 'فضل العلم' },
                { id: 'arabic_lesson9', name: 'زراعة الفضاء' },
                { id: 'arabic_lesson10', name: 'الكتاب' }
            ],
            
            // ============ العربي - النحو ============
            'grammar1': [
                { id: 'arabic_lesson11', name: 'المنادى' },
                { id: 'arabic_lesson12', name: 'البدل' },
                { id: 'arabic_lesson13', name: 'أسلوب المدح والذم' }
            ],
            
            // ============ الرياضيات - الجبر والإحصاء ============
            'math1': [
                { id: 'math_lesson1', name: 'حاصل الضرب الديكارتي' },
                { id: 'math_lesson2', name: 'العلاقة - الدالة (التطبيق)' },
                { id: 'math_lesson3', name: 'التعبير الرمزي عن الدالة - دوال كثيرات الحدود' },
                { id: 'math_lesson4', name: 'دراسة بعض دوال كثيرات الحدود' }
            ],
            'math2': [
                { id: 'math_lesson5', name: 'النسبة والتناسب' },
                { id: 'math_lesson6', name: 'تابع خواص التناسب' },
                { id: 'math_lesson7', name: 'التناسب المتسلسل' },
                { id: 'math_lesson8', name: 'التغير الطردي والتغير العكسي' }
            ],
            'math3': [
                { id: 'math_lesson9', name: 'جمع البيانات' },
                { id: 'math_lesson10', name: 'التشتت' }
            ],
            
            // ============ الرياضيات - حساب المثلثات والهندسة ============
            'math4': [
                { id: 'math_lesson11', name: 'النسب المثلثية الأساسية للزاوية الحادة' },
                { id: 'math_lesson12', name: 'النسب المثلثية الأساسية لبعض الزوايا' }
            ],
            'math5': [
                { id: 'math_lesson13', name: 'البعد بين نقطتين' },
                { id: 'math_lesson14', name: 'إحداثيات منتصف قطعة مستقيمة' },
                { id: 'math_lesson15', name: 'ميل الخط المستقيم' },
                { id: 'math_lesson16', name: 'معادلة الخط المستقيم بمعلومية ميله وطول الجزء المقطوع' }
            ],
            
            // ============ الدراسات - الجغرافيا ============
            'geo1': [
                { id: 'social_lesson1', name: 'قارات العالم (الموقع والمساحة)' },
                { id: 'social_lesson2', name: 'تضاريس العالم' },
                { id: 'social_lesson3', name: 'المناخ والنبات الطبيعي في العالم' }
            ],
            'geo2': [
                { id: 'social_lesson4', name: 'السلالات البشرية في العالم' },
                { id: 'social_lesson5', name: 'توزيع السكان في العالم' },
                { id: 'social_lesson6', name: 'خصائص سكان العالم' }
            ],
            
            // ============ الدراسات - التاريخ ============
            'history1': [
                { id: 'social_lesson7', name: 'مصر بين المماليك والعثمانيين' },
                { id: 'social_lesson8', name: 'الحملة الفرنسية على مصر (1798م-1801م)' },
                { id: 'social_lesson9', name: 'ثورة الشعب المصري وتولية محمد علي' },
                { id: 'social_lesson10', name: 'محمد علي وبناء الدولة الحديثة' }
            ],
            'history2': [
                { id: 'social_lesson11', name: 'خلفاء محمد علي وازدياد النفوذ الأجنبي' },
                { id: 'social_lesson12', name: 'الحركة الوطنية والثورة العرابية' },
                { id: 'social_lesson13', name: 'الكفاح الوطني ضد الاحتلال البريطاني' },
                { id: 'social_lesson14', name: 'مصر من الحماية البريطانية حتى ثورة يوليو 1952م' }
            ],
            
            // ============ الإنجليزية - الوحدات ============
            'eng1': [
                { id: 'english_lesson1', name: 'Lessons 1 & 2' },
                { id: 'english_lesson2', name: 'Lesson 3' },
                { id: 'english_lesson3', name: 'Lessons 5 & 6' }
            ],
            'eng2': [
                { id: 'english_lesson4', name: 'Lessons 1 & 2' },
                { id: 'english_lesson5', name: 'Lesson 3' },
                { id: 'english_lesson6', name: 'Lessons 5 & 6' }
            ],
            'eng3': [
                { id: 'english_lesson7', name: 'Lessons 1 & 2' },
                { id: 'english_lesson8', name: 'Lesson 3' },
                { id: 'english_lesson9', name: 'Lessons 5 & 6' }
            ],
            'eng4': [
                { id: 'english_lesson10', name: 'Lesson 3' },
                { id: 'english_lesson11', name: 'Lessons 5 & 6' }
            ],
            'eng5': [
                { id: 'english_lesson12', name: 'Lessons 1 & 2' },
                { id: 'english_lesson13', name: 'Lesson 3' },
                { id: 'english_lesson14', name: 'Lessons 5 & 6' }
            ],
            'eng6': [
                { id: 'english_lesson15', name: 'Lessons 1 & 2' },
                { id: 'english_lesson16', name: 'Lesson 3' },
                { id: 'english_lesson17', name: 'Lessons 5 & 6' }
            ],
            
            // ============ الإنجليزية - القصة ============
            'story1': [
                { id: 'english_lesson18', name: 'Chapter 1: A New Challenge' },
                { id: 'english_lesson19', name: 'Chapter 2: Taking Initiative' },
                { id: 'english_lesson20', name: 'Chapter 3: Facing Problems' },
                { id: 'english_lesson21', name: 'Chapter 4: Growing Success' },
                { id: 'english_lesson22', name: 'Chapter 5' },
                { id: 'english_lesson23', name: 'Chapter 6: Looking Forward' }
            ]
        }
    }
};

// 📍 المنطقة التي ستعدلها: يمكنك إضافة/تعديل أي درس هنا
// 📝 طريقة التعديل: 
// 1. ابحث عن المادة والوحدة
// 2. أضف أو عدل أي درس داخل المصفوفة
// 3. التنسيق: { id: 'id_فريد', name: 'اسم الدرس' }

