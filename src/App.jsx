import { useState } from 'react';
import { Globe, Bell, LayoutDashboard, BookOpen, FileText, Library, Settings, Plus, MessageSquare, ArrowLeft, CheckCircle2, Circle, Star, ArrowRight, ShieldCheck, Mail, Share2, Award, Zap, Compass, Monitor } from 'lucide-react';
import confetti from 'canvas-confetti';

// Assets
import leafVideo from './assets/Leaf_And_Sun_Animation_Generation.mp4';
import plantVideo from './assets/Animated_Happy_Potted_Plant_Video.mp4';
import heroImage from './assets/vidyapath_hero_students.png';

const TRANSLATIONS = {
  English: {
    courses: "Courses", library: "Library", mentors: "Mentors",
    newYear: "NEW ACADEMIC YEAR 2024",
    titleLines: ["Where", "Tradition", "Meets Digital", "Excellence"],
    subtitle: "Bridge the gap between timeless academic wisdom and the modern digital landscape. A focused sanctuary for scholars, learners, and dreamers.",
    getStarted: "Get Started", exploreCourses: "Explore Courses", trusted: "TRUSTED BY 20K+ STUDENTS",
    welcomeBack: "Welcome back", masteredConcepts: "You've mastered 3 new concepts in",
    keepPace: "this week. Keep up the scholarly pace!", dailyGoal: "Daily Goal: 80% Complete",
    weekly: "Weekly", yourSubjects: "Your Subjects", viewCurriculum: "View curriculum",
    mastery: "Mastery", modulesCompleted: "Modules Completed", enrollNewSubject: "Enroll in New Subject",
    backHome: "Back to Home", createProfile: "Create Your Profile", joinCommunity: "Join the community of lifelong learners.",
    fullName: "Full Name", enterName: "Enter your full name", className: "Class", selectClass: "Select Class",
    board: "Board", selectBoard: "Select Board", preferredLanguage: "Preferred Language", beginLearning: "Begin Learning",
    studentPortal: "Student Portal", dashboard: "Dashboard", myLearning: "My Learning", assignments: "Assignments",
    settings: "Settings", startStudying: "Start Studying", back: "Back", topics: "Topics",
    generatingCurriculum: "Curriculum generating...", chapterText: "Chapter", startReading: "Start Reading",
    backCurriculum: "Back to Curriculum", markComplete: "Mark Chapter as Complete", chapterComplete: "Chapter Complete! Excellent work.",
    minRead: "min read", aiTeacher: "AI Teacher"
  },
  Hindi: {
    courses: "पाठ्यक्रम", library: "पुस्तकालय", mentors: "मार्गदर्शक",
    newYear: "नया शैक्षणिक वर्ष 2024",
    titleLines: ["जहाँ", "परंपरा", "आधुनिक", "उत्कृष्टता से मिलती है"],
    subtitle: "कालातीत शैक्षणिक ज्ञान और आधुनिक डिजिटल परिदृश्य के बीच की खाई को पाटें। विद्वानों और सीखने वालों के लिए एक केंद्रित अभयारण्य।",
    getStarted: "शुरू करें", exploreCourses: "पाठ्यक्रम खोजें", trusted: "२० हजार+ छात्रों द्वारा विश्वसनीय",
    welcomeBack: "स्वागत है", masteredConcepts: "आपने ३ नई अवधारणाओं में महारत हासिल की है:",
    keepPace: "इस सप्ताह। विद्वत्तापूर्ण गति बनाए रखें!", dailyGoal: "दैनिक लक्ष्य: 80% पूर्ण",
    weekly: "साप्ताहिक", yourSubjects: "आपके विषय", viewCurriculum: "पाठ्यक्रम देखें",
    mastery: "महारत", modulesCompleted: "मॉड्यूल पूर्ण", enrollNewSubject: "नए विषय में नामांकन करें",
    backHome: "होम पर वापस जाएँ", createProfile: "अपनी प्रोफ़ाइल बनाएँ", joinCommunity: "आजीवन सीखने वालों के समुदाय में शामिल हों।",
    fullName: "पूरा नाम", enterName: "अपना पूरा नाम दर्ज करें", className: "कक्षा", selectClass: "कक्षा चुनें",
    board: "बोर्ड", selectBoard: "बोर्ड चुनें", preferredLanguage: "पसंदीदा भाषा", beginLearning: "सीखना शुरू करें",
    studentPortal: "छात्र पोर्टल", dashboard: "डैशबोर्ड", myLearning: "मेरी शिक्षा", assignments: "कार्य",
    settings: "सेटिंग्स", startStudying: "पढ़ाई शुरू करें", back: "वापस", topics: "विषय",
    generatingCurriculum: "पाठ्यक्रम उत्पन्न हो रहा है...", chapterText: "अध्याय", startReading: "पढ़ना शुरू करें",
    backCurriculum: "पाठ्यक्रम पर वापस जाएँ", markComplete: "अध्याय को पूर्ण के रूप में चिह्नित करें", chapterComplete: "अध्याय पूर्ण! उत्कृष्ट कार्य।",
    minRead: "मिनट की पढ़ाई", aiTeacher: "एआई शिक्षक"
  },
  Sanskrit: {
    courses: "पाठ्यक्रमाः", library: "ग्रन्थालयः", mentors: "गुरवः",
    newYear: "नूतन शैक्षिक वर्ष 2024",
    titleLines: ["यत्र", "परम्परा", "आधुनिक", "उत्कर्षेण मिलति"],
    subtitle: "परम्परागत विद्यायाः आधुनिक तन्त्रज्ञानस्य च सेतुः। विदुषां, विद्यार्थिनां च कृते एकं मुख्यं शरणम्।",
    getStarted: "आरम्भं कुर्वन्तु", exploreCourses: "पाठ्यक्रमान् पश्यन्तु", trusted: "२० सहस्रविद्यार्थिभिः विश्वसितम्",
    welcomeBack: "स्वागतम्", masteredConcepts: "भवता ३ नूतनाः अवधारणाः अधीताः:",
    keepPace: "अस्मिन् सप्ताहे। विद्वत्तापूर्णं वेगं धारयतु!", dailyGoal: "दैनिक लक्ष्यम्: 80% पूर्णम्",
    weekly: "साप्ताहिकम्", yourSubjects: "भवतः विषयाः", viewCurriculum: "पाठ्यक्रमं पश्यन्तु",
    mastery: "प्रावीण्यम्", modulesCompleted: "अध्यायाः पूर्णाः", enrollNewSubject: "नूतनविषये पञ्जीकरणं कुर्वन्तु",
    backHome: "मुख्यपृष्ठं प्रति गच्छन्तु", createProfile: "स्वस्य परिचयं रचयन्तु", joinCommunity: "आजीवनं पठतां समुदाये अन्तर्भवन्तु।",
    fullName: "पूर्णनाम", enterName: "स्वस्य पूर्णनाम लिखन्तु", className: "कक्षा", selectClass: "कक्षां चिन्वन्तु",
    board: "मण्डलम्", selectBoard: "मण्डलं चिन्वन्तु", preferredLanguage: "इष्टा भाषा", beginLearning: "अध्ययनम् आरभस्व",
    studentPortal: "छात्र-पुटम्", dashboard: "मुख्यफलकम्", myLearning: "मम शिक्षा", assignments: "कार्याणि",
    settings: "प्रबन्धः", startStudying: "अध्ययनम् आरभस्व", back: "पृष्ठतः", topics: "विषयाः",
    generatingCurriculum: "पाठ्यक्रमः जन्यते...", chapterText: "अध्यायः", startReading: "पठनम् आरभस्व",
    backCurriculum: "पाठ्यक्रमं प्रति गच्छन्तु", markComplete: "अध्यायं पूर्णमिति अङ्कयन्तु", chapterComplete: "अध्यायः पूर्णः! उत्तमं कार्यम्।",
    minRead: "निमेषात्मकमध्ययनम्", aiTeacher: "एआई-गुरुः"
  }
};

// ===== DATA =====
const getData = (lang) => {
  if (lang === 'Hindi') {
    return {
      SUBJECTS: [
        { id: "maths", title: 'गणित', desc: 'कैलकुलस और त्रिकोणमिति मूल बातें', icon: '🧮', iconBg: 'bg-orange-100', iconColor: 'text-orange-500', progress: 85, modules: 12 },
        { id: "science", title: 'विज्ञान', desc: 'कार्बनिक रसायन और कण भौतिकी', icon: '🔬', iconBg: 'bg-green-100', iconColor: 'text-green-500', progress: 64, modules: 9 },
        { id: "social", title: 'सामाजिक विज्ञान', desc: 'आधुनिक भारतीय इतिहास और नागरिक शास्त्र', icon: '🌎', iconBg: 'bg-blue-100', iconColor: 'text-blue-500', progress: 42, modules: 5 },
        { id: "english", title: 'अंग्रेज़ी', desc: 'कविता, अलंकार और उन्नत व्याकरण', icon: '📖', iconBg: 'bg-purple-100', iconColor: 'text-purple-500', progress: 91, modules: 18 },
        { id: "hindi", title: 'हिन्दी', desc: 'साहित्य और रचनात्मक लेखन', icon: 'अ', iconBg: 'bg-pink-100', iconColor: 'text-pink-500', progress: 78, modules: 11 }
      ],
      SCIENCE_CHAPTERS: [
        { id: 1, title: "पौधों में पोषण", topics: 6, done: true },
        { id: 2, title: "प्राणियों में पोषण", topics: 5, done: true },
        { id: 3, title: "रेशों से वस्त्र तक", topics: 4, done: false },
        { id: 4, title: "ऊष्मा", topics: 7, done: false },
        { id: 5, title: "अम्ल, क्षारक और लवण", topics: 6, done: false }
      ],
      CHAPTER_1_CONTENT: [
        { type: "text", content: "सभी सजीवों को भोजन की आवश्यकता होती है। पौधे ही एकमात्र ऐसे जीव हैं जो अपना भोजन स्वयं बना सकते हैं। वे ऐसा प्रकाश संश्लेषण नामक प्रक्रिया के माध्यम से करते हैं। इस प्रक्रिया में, पौधे सूर्य के प्रकाश, पानी और कार्बन डाइऑक्साइड का उपयोग करके ग्लूकोज बनाते हैं — जो उनकी ऊर्जा का प्राथमिक स्रोत है।" },
        { type: "avatar_video", topic: "पौधे अपना भोजन कैसे बनाते हैं", video: leafVideo, thumbnail: "https://placehold.co/640x360/F5A623/FFFFFF?text=AI+Teacher+▶", languages: ["English", "Hindi", "Sanskrit"] },
        { type: "text", content: "प्रकाश संश्लेषण मुख्य रूप से पौधों की पत्तियों में होता है। पत्तियों में क्लोरोफिल नामक एक हरा वर्णक होता है, जो सूर्य के प्रकाश को अवशोषित करता है। पत्तियों में रंध्र नामक छोटे छिद्र भी होते हैं जिनके माध्यम से कार्बन डाइऑक्साइड पौधे में प्रवेश करती है।" },
        { type: "cartoon_video", topic: "पौधे में पानी की यात्रा", video: plantVideo, thumbnail: "https://placehold.co/640x480/2E7D52/FFFFFF?text=🎨+Visual+Story+▶", languages: ["English", "Hindi", "Sanskrit"] },
        { type: "text", content: "पौधों को स्वपोषी कहा जाता है क्योंकि वे अपना भोजन स्वयं बनाते हैं। जानवरों और मनुष्यों को विषमपोषी कहा जाता है क्योंकि वे भोजन के लिए पौधों या अन्य जानवरों पर निर्भर होते हैं।" }
      ]
    };
  }

  if (lang === 'Sanskrit') {
    return {
      SUBJECTS: [
        { id: "maths", title: 'गणितम्', desc: 'कलनम् त्रिकोणमितिः च', icon: '🧮', iconBg: 'bg-orange-100', iconColor: 'text-orange-500', progress: 85, modules: 12 },
        { id: "science", title: 'विज्ञानम्', desc: 'सेंद्रिय रसायनं कणभौतिकी च', icon: '🔬', iconBg: 'bg-green-100', iconColor: 'text-green-500', progress: 64, modules: 9 },
        { id: "social", title: 'समाजविज्ञानम्', desc: 'आधुनिक भारतीय इतिहासः नागरिकशास्त्रं च', icon: '🌎', iconBg: 'bg-blue-100', iconColor: 'text-blue-500', progress: 42, modules: 5 },
        { id: "english", title: 'आंग्लभाषा', desc: 'काव्यं, अलङ्कारः उन्नतव्याकरणं च', icon: '📖', iconBg: 'bg-purple-100', iconColor: 'text-purple-500', progress: 91, modules: 18 },
        { id: "hindi", title: 'हिन्दी', desc: 'साहित्यं रचनात्मकं लेखनं च', icon: 'अ', iconBg: 'bg-pink-100', iconColor: 'text-pink-500', progress: 78, modules: 11 }
      ],
      SCIENCE_CHAPTERS: [
        { id: 1, title: "पादपेषु पोषणम्", topics: 6, done: true },
        { id: 2, title: "जन्तुषु पोषणम्", topics: 5, done: true },
        { id: 3, title: "तन्तुतः वस्त्रपर्यन्तम्", topics: 4, done: false },
        { id: 4, title: "ऊष्मा", topics: 7, done: false },
        { id: 5, title: "अम्लः, क्षारः लवणानि च", topics: 6, done: false }
      ],
      CHAPTER_1_CONTENT: [
        { type: "text", content: "सर्वेभ्यः जीवेभ्यः आहारस्य आवश्यकता भवति। पादपाः एव स्वभोजनं स्वयं निर्मातुं समर्थाः सन्ति। ते प्रकाशसंश्लेषण-प्रक्रियाद्वारा एतत् कुर्वन्ति। अत्र पादपाः सूर्यातपस्य, जलस्य, ಅङ्गारद्विप्रजारकस्य (Carbon dioxide) च साहाय्येन स्वस्य मुख्योर्जाम् 'ग्लूकोज' निर्मान्ति।" },
        { type: "avatar_video", topic: "पादपाः कथं स्वभोजनं कुर्वन्ति", video: leafVideo, thumbnail: "https://placehold.co/640x360/F5A623/FFFFFF?text=AI+Teacher+▶", languages: ["English", "Hindi", "Sanskrit"] },
        { type: "text", content: "प्रकाशसंश्लेषणं मुख्यतया पादपानां पर्णेषु भवति। पर्णेषु 'हरितकी' (Chlorophyll) इति हरितवर्णकः भवति, यः सूर्यातपं गृह्णाति। पर्णेषु सूक्ष्माणि छिद्राणि अपि सन्ति, यैः अङ्गारद्विप्रजारकः पादपस्य अन्तः प्रविशति।" },
        { type: "cartoon_video", topic: "पादपे जलस्य यात्रा", video: plantVideo, thumbnail: "https://placehold.co/640x480/2E7D52/FFFFFF?text=🎨+Visual+Story+▶", languages: ["English", "Hindi", "Sanskrit"] },
        { type: "text", content: "पादपाः 'स्वपोषिणः' इति कथ्यन्ते यतोहि ते स्वभोजनं स्वयं निर्मान्ति। पशवः मानवाः च 'परपोषिणः' इति कथ्यन्ते यतोहि ते आहाराय अन्येषु पादपेषु जंतुषु वा आश्रिताः भवन्ति।" }
      ]
    };
  }

  // Fallback to English
  return {
    SUBJECTS: [
      { id: "maths", title: 'Mathematics', desc: 'Calculus & Trigonometry Fundamentals', icon: '🧮', iconBg: 'bg-orange-100', iconColor: 'text-orange-500', progress: 85, modules: 12 },
      { id: "science", title: 'Science', desc: 'Organic Chemistry & Particle Physics', icon: '🔬', iconBg: 'bg-green-100', iconColor: 'text-green-500', progress: 64, modules: 9 },
      { id: "social", title: 'Social Studies', desc: 'Modern Indian History & Civics', icon: '🌎', iconBg: 'bg-blue-100', iconColor: 'text-blue-500', progress: 42, modules: 5 },
      { id: "english", title: 'English', desc: 'Poetry, Rhetoric & Advanced Grammar', icon: '📖', iconBg: 'bg-purple-100', iconColor: 'text-purple-500', progress: 91, modules: 18 },
      { id: "hindi", title: 'Hindi', desc: 'Literature & Creative Writing', icon: 'अ', iconBg: 'bg-pink-100', iconColor: 'text-pink-500', progress: 78, modules: 11 }
    ],
    SCIENCE_CHAPTERS: [
      { id: 1, title: "Nutrition in Plants", topics: 6, done: true },
      { id: 2, title: "Nutrition in Animals", topics: 5, done: true },
      { id: 3, title: "Fibre to Fabric", topics: 4, done: false },
      { id: 4, title: "Heat", topics: 7, done: false },
      { id: 5, title: "Acids, Bases and Salts", topics: 6, done: false }
    ],
    CHAPTER_1_CONTENT: [
      { type: "text", content: "All living organisms require food. Plants are the only organisms that can prepare their own food. They do this through a process called photosynthesis. In this process, plants use sunlight, water, and carbon dioxide to make glucose — their primary source of energy." },
      { type: "avatar_video", topic: "How Plants Make Food", video: leafVideo, thumbnail: "https://placehold.co/640x360/F5A623/FFFFFF?text=AI+Teacher+▶", languages: ["English", "Hindi", "Sanskrit"] },
      { type: "text", content: "Photosynthesis takes place mainly in the leaves of plants. Leaves have a green pigment called chlorophyll, which absorbs sunlight. The leaves also have tiny pores called stomata through which carbon dioxide enters the plant." },
      { type: "cartoon_video", topic: "Journey of Water in a Plant", video: plantVideo, thumbnail: "https://placehold.co/640x480/2E7D52/FFFFFF?text=🎨+Visual+Story+▶", languages: ["English", "Hindi", "Sanskrit"] },
      { type: "text", content: "Plants are called autotrophs because they produce their own food. Animals and humans are called heterotrophs because they depend on plants or other animals for food." }
    ]
  };
};

// ===== APP =====
export default function App() {
  const [view, setView] = useState('landing');
  const [profile, setProfile] = useState({ name: '', class: '', board: '', language: 'English' });
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);

  const navigateTo = (newView) => {
    window.scrollTo(0, 0);
    setView(newView);
  };

  return (
    <div className="min-h-screen bg-[#FCFAEF] font-sans text-gray-900 selection:bg-orange-200">
      {view === 'landing' && <FullLandingView onGetStarted={() => navigateTo('registration')} profile={profile} setProfile={setProfile} />}

      {view === 'registration' && <RegistrationView onComplete={() => navigateTo('dashboard')} profile={profile} setProfile={setProfile} />}

      {view === 'dashboard' && (
        <DashboardView
          profile={profile}
          setProfile={setProfile}
          onSelectSubject={(subj) => {
            setActiveSubject(subj);
            navigateTo('chapterList');
          }}
          onNavigate={navigateTo}
        />
      )}

      {view === 'chapterList' && activeSubject && (
        <ChapterListView
          subject={activeSubject}
          profile={profile}
          setProfile={setProfile}
          onBack={() => navigateTo('dashboard')}
          onNavigate={navigateTo}
          onSelectChapter={(chap) => {
            setActiveChapter(chap);
            navigateTo('reader');
          }}
        />
      )}

      {view === 'aiteacher' && (
        <AITeacherView
          profile={profile}
          setProfile={setProfile}
          onNavigate={navigateTo}
        />
      )}

      {view === 'reader' && activeSubject && activeChapter && (
        <ReaderView
          subject={activeSubject}
          chapter={activeChapter}
          profile={profile}
          setProfile={setProfile}
          onBack={() => navigateTo('chapterList')}
        />
      )}
    </div>
  );
}

// ===== COMPONENTS =====

function TopNav({ profile, setProfile }) {
  const language = profile?.language || 'English';
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="font-bold text-2xl font-serif tracking-tight">VidyaPath</div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <a href="#" className="text-orange-500 border-b-2 border-orange-500 pb-1">{t.courses}</a>
        <a href="#" className="hover:text-gray-900">{t.library}</a>
        <a href="#" className="hover:text-gray-900">{t.mentors}</a>
      </div>
      <div className="flex items-center space-x-5 text-gray-600">
        <div className="relative group cursor-pointer inline-block pt-1 pb-1">
          <Globe className="w-5 h-5 hover:text-gray-900 transition-colors relative z-10" />
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            {['English', 'Hindi', 'Sanskrit'].map(lang => (
              <div
                key={lang}
                onClick={() => setProfile && setProfile({ ...profile, language: lang })}
                className={`px-4 py-3 text-sm cursor-pointer hover:bg-orange-50 ${language === lang ? 'font-bold text-orange-600 bg-orange-50/50' : 'text-gray-700'}`}
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-900 transition-colors" />
        <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden border border-gray-200 cursor-pointer">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
        </div>
      </div>
    </nav>
  );
}

// ===== VIEWS =====

function FullLandingView({ onGetStarted, profile, setProfile }) {
  const language = profile?.language || 'English';
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <TopNav profile={profile} setProfile={setProfile} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 pr-12 mb-16 lg:mb-0">
          <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold tracking-wider rounded-full mb-8">
            {t.newYear}
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
            {t.titleLines[0]} <span className="text-[#F5A623]">{t.titleLines[1]}</span> {t.titleLines[2]} <span className="relative inline-block border-b-4 border-green-600">{t.titleLines[3]}</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            {t.subtitle}
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={onGetStarted}
              className="px-8 py-3.5 bg-[#F5A623] hover:bg-[#E0931B] text-gray-900 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              {t.getStarted}
            </button>
            <button className="px-8 py-3.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-bold text-lg rounded-lg shadow-sm transition-all hidden sm:block">
              {t.exploreCourses}
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 relative flex justify-end">
          <div className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-3 z-20 border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-green-600 fill-current" />
            </div>
            <div>
              <div className="font-bold text-gray-900">4.9/5</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.trusted}</div>
            </div>
          </div>

          <div className="w-full max-w-[500px] aspect-square rounded-2xl relative overflow-hidden shadow-2xl">
            <img src={heroImage} alt="Students studying together" className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-center text-xs font-bold tracking-widest text-gray-400 uppercase mb-8">Our Academic Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            <div className="flex items-center space-x-2"><BookOpen className="w-6 h-6" /> <span className="font-serif text-xl font-bold">Stanford</span></div>
            <div className="flex items-center space-x-2"><ShieldCheck className="w-6 h-6" /> <span className="font-serif text-xl font-bold">Oxford</span></div>
            <div className="flex items-center space-x-2"><Award className="w-6 h-6" /> <span className="font-serif text-xl font-bold">Heritage</span></div>
            <div className="flex items-center space-x-2"><Library className="w-6 h-6" /> <span className="font-serif text-xl font-bold">Library</span></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 inline-block relative">
            Why VidyaPath?
            <div className="absolute -bottom-3 left-1/4 right-1/4 h-1 bg-[#F5A623]"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
              <Award className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Mentors</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Learn from leading scholars and industry practitioners who provide personalized guidance tailored to your academic journey. Our mentors are selected for both their knowledge and their empathy.
            </p>
            <div className="mt-auto flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-200"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-green-200"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-200"></div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">+400 active mentors</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Compass className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Organic Learning</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Our curriculum flows naturally, mimicking the way the human brain acquires knowledge through discovery.
            </p>
          </div>

          <div className="bg-[#FAF9F5] rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col">
            <div className="w-10 h-10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Linear Paths</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Clear, structured roadmaps that ensure you never feel lost in the sea of information.
            </p>
          </div>

          <div className="lg:col-span-3 bg-[#1A1A2E] rounded-2xl p-8 lg:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
            <div className="md:w-1/2 relative z-10">
              <h3 className="text-2xl font-serif font-bold text-[#F5A623] mb-4">Distraction-Free Focus</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md">
                A tactile, paper-like interface designed to reduce digital eye strain and keep your attention where it belongs: on your studies. No pop-ups, no noise. Just pure learning.
              </p>
              <button className="text-[#F5A623] font-bold text-sm tracking-wider flex items-center hover:text-white transition-colors">
                LEARN MORE <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end relative z-10 w-full">
              <div className="w-full max-w-sm aspect-[4/3] bg-black/50 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden relative">
                <div className="w-48 h-48 rounded-full border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-blue-400/50 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-300 shadow-[0_0_20px_rgba(147,197,253,0.8)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 py-12 mb-24">
        <div className="bg-gradient-to-br from-[#D4AF37] to-[#B58500] rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Ready to start your scholarly journey?</h2>
            <p className="text-gray-800 text-lg mb-10 opacity-90">
              Join thousands of students who have rediscovered the joy of deep, focused learning with VidyaPath.
            </p>
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-[#1A1A2E] hover:bg-black text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Enroll Now for Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F0EEE6] py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between">
          <div className="max-w-xs mb-10 md:mb-0">
            <h4 className="font-serif font-bold text-xl text-gray-900 mb-4">VidyaPath</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Empowering students through the harmony of traditional pedagogy and modern technological tools.
            </p>
          </div>

          <div className="flex gap-16 md:gap-32">
            <div>
              <h5 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-6">Platform</h5>
              <div className="space-y-4 text-sm text-gray-700">
                <div><a href="#" className="hover:text-black">All Courses</a></div>
                <div><a href="#" className="hover:text-black">Mentorship</a></div>
                <div><a href="#" className="hover:text-black">Library</a></div>
                <div><a href="#" className="hover:text-black">Scholarships</a></div>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-6">Connect</h5>
              <div className="flex space-x-4 text-gray-700">
                <Globe className="w-5 h-5 cursor-pointer hover:text-black" />
                <Mail className="w-5 h-5 cursor-pointer hover:text-black" />
                <Share2 className="w-5 h-5 cursor-pointer hover:text-black" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-gray-300 text-center text-xs text-gray-500">
          © 2024 VidyaPath Education. All rights reserved. Built for the modern scholar.
        </div>
      </footer>
    </div>
  );
}

function RegistrationView({ onComplete, profile, setProfile }) {
  const languages = ['English', 'Hindi', 'Sanskrit'];
  const language = profile?.language || 'English';
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] relative overflow-hidden">
      <div className="absolute top-20 left-10 w-24 h-24 border-8 border-orange-100 rounded-full opacity-50"></div>

      <TopNav profile={profile} setProfile={setProfile} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12 flex flex-col lg:flex-row items-center justify-center z-10">

        <div className="w-full max-w-md">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> {t.backHome}
          </button>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 relative">
            <h2 className="text-3xl font-serif font-bold text-center mb-2">{t.createProfile}</h2>
            <p className="text-center text-gray-500 text-sm mb-8">{t.joinCommunity}</p>

            <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">{t.fullName}</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                  placeholder={t.enterName}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">{t.className}</label>
                  <select
                    value={profile.class}
                    onChange={e => setProfile({ ...profile, class: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 outline-none text-sm text-gray-700 appearance-none"
                  >
                    <option value="">{t.selectClass}</option>
                    {[...Array(12)].map((_, i) => <option key={i} value={i + 1}>{t.className} {i + 1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">{t.board}</label>
                  <select
                    value={profile.board}
                    onChange={e => setProfile({ ...profile, board: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 outline-none text-sm text-gray-700 appearance-none"
                  >
                    <option value="">{t.selectBoard}</option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">{t.preferredLanguage}</label>
                <div className="flex space-x-3">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setProfile({ ...profile, language: lang })}
                      className={`flex-1 py-2.5 rounded-lg text-sm border transition-all ${profile.language === lang
                        ? 'border-orange-400 bg-orange-50 text-orange-800 font-medium'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#F5A623] hover:bg-[#E0931B] text-gray-900 font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
              >
                {t.beginLearning} →
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function Sidebar({ activeView, onNavigate, profile }) {
  const language = profile?.language || 'English';
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  return (
    <div className="w-[240px] bg-white border-r border-gray-100 flex flex-col hidden md:flex shrink-0 h-[calc(100vh-77px)] sticky top-[77px]">
      <div className="p-6">
        <h2 className="font-serif font-bold text-lg text-gray-900">VidyaPath</h2>
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">{t.studentPortal}</p>
      </div>

      <div className="flex-1 py-4">
        <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label={t.dashboard} active={activeView === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem
          icon={<Monitor className="w-5 h-5" />}
          label={t.aiTeacher}
          active={activeView === 'aiteacher'}
          onClick={() => onNavigate('aiteacher')}
        />
        <NavItem icon={<BookOpen className="w-5 h-5" />} label={t.myLearning} active={activeView === 'learning'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<FileText className="w-5 h-5" />} label={t.assignments} />
        <NavItem icon={<Library className="w-5 h-5" />} label={t.library} />
        <NavItem icon={<Settings className="w-5 h-5" />} label={t.settings} />
      </div>

      <div className="p-6">
        <button className="w-full py-3 bg-[#F5A623] text-gray-900 font-bold rounded-lg shadow-sm hover:bg-[#E0931B] transition-colors">
          {t.startStudying}
        </button>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-6 py-3 cursor-pointer border-l-4 transition-colors ${active
        ? 'border-orange-400 bg-orange-50 text-orange-600'
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'
        }`}
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

function DashboardView({ profile, setProfile, onSelectSubject, onNavigate }) {
  const name = profile.name || (profile?.language === 'Hindi' ? 'अर्जुन' : profile?.language === 'Sanskrit' ? 'अर्जुनः' : 'Arjun');
  const language = profile?.language || 'English';
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav profile={profile} setProfile={setProfile} />
      <div className="flex flex-1">
        <Sidebar activeView="dashboard" onNavigate={onNavigate} profile={profile} />

        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="max-w-xl">
              <div className="inline-block px-3 py-1 bg-green-200 text-green-800 text-xs font-medium rounded-full mb-4">
                {t.dailyGoal}
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">{t.welcomeBack}, {name}!</h1>
              <p className="text-gray-600 text-lg">
                {t.masteredConcepts} <span className="font-bold text-green-700">Science</span> {t.keepPace}
              </p>
            </div>

            <div className="mt-6 md:mt-0 flex-shrink-0 relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-green-700" strokeWidth="4" strokeDasharray="72, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">72%</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase">{t.weekly}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">{t.yourSubjects}</h2>
            <button className="text-sm font-medium text-amber-700 hover:text-amber-800 flex items-center">
              {t.viewCurriculum} <span className="ml-1">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getData(profile?.language).SUBJECTS.map((sub, i) => (
              <div
                key={i}
                onClick={() => onSelectSubject(sub)}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-lg ${sub.iconBg} flex items-center justify-center text-xl mb-4`}>
                  {sub.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{sub.title}</h3>
                <p className="text-sm text-gray-500 mb-8 min-h-[40px]">{sub.desc}</p>

                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>{t.mastery}</span>
                    <span>{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-3 overflow-hidden">
                    <div className="bg-green-700 h-2 rounded-full transition-all duration-1000" style={{ width: `${sub.progress}%` }}></div>
                  </div>
                  <div className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
                    {sub.modules} {t.modulesCompleted}
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all min-h-[250px]">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm">{t.enrollNewSubject}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterListView({ subject, profile, setProfile, onSelectChapter, onBack, onNavigate }) {
  const { SCIENCE_CHAPTERS, SUBJECTS } = getData(profile?.language);
  const localizedSubject = SUBJECTS.find(s => s.id === subject.id) || subject;

  const chapters = subject.id === 'science' ? SCIENCE_CHAPTERS : [];
  const [activeId, setActiveId] = useState(1);
  const activeChapter = chapters.find(c => c.id === activeId);

  const language = profile?.language || 'English';
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav profile={profile} setProfile={setProfile} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView="learning" onNavigate={onNavigate} profile={profile} />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 border-r border-gray-100 bg-white flex flex-col h-[calc(100vh-77px)] shrink-0 overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> {t.back}
              </button>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${localizedSubject.iconBg} flex items-center justify-center text-xl`}>
                  {localizedSubject.icon}
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">{localizedSubject.title}</h2>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {chapters.length > 0 ? chapters.map(chap => (
                <div
                  key={chap.id}
                  onClick={() => setActiveId(chap.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all flex items-center gap-3 ${activeId === chap.id ? 'bg-orange-50 border-orange-200' : 'bg-white border-transparent hover:bg-gray-50'
                    }`}
                >
                  {chap.done ? <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0" />}
                  <div>
                    <div className={`font-medium text-sm ${activeId === chap.id ? 'text-orange-900' : 'text-gray-700'}`}>
                      {t.chapterText} {chap.id}: {chap.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{chap.topics} {t.topics}</div>
                  </div>
                </div>
              )) : (
                <p className="text-center text-gray-400 text-sm py-10">{t.generatingCurriculum}</p>
              )}
            </div>
          </div>

          <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-[#FAFAF8] flex items-center justify-center">
            {activeChapter && (
              <div className="max-w-2xl w-full bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center">
                <div className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                  {t.chapterText} {activeChapter.id}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  {activeChapter.title}
                </h1>

                <div className="flex items-center justify-center gap-3 text-gray-500 text-sm mb-10">
                  <span>{activeChapter.topics} {t.topics}</span>
                  <span>•</span>
                  <span>~15 {t.minRead}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {profile.language}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  {[...Array(activeChapter.topics)].map((_, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                      Topic {i + 1}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectChapter(activeChapter)}
                  className="mx-auto px-8 py-4 bg-[#F5A623] hover:bg-[#E0931B] text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex justify-center items-center gap-3"
                >
                  {t.startReading} →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReaderView({ subject, chapter, profile, setProfile, onBack }) {
  const [completed, setCompleted] = useState(false);

  const language = profile?.language || 'English';
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const { CHAPTER_1_CONTENT, SCIENCE_CHAPTERS, SUBJECTS } = getData(language);
  const localizedSubject = SUBJECTS.find(s => s.id === subject.id) || subject;
  const localizedChapter = SCIENCE_CHAPTERS.find(c => c.id === chapter.id) || chapter;

  const handleComplete = () => {
    setCompleted(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.8 } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav profile={profile} setProfile={setProfile} />

      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-3 text-sm text-gray-500 sticky top-[77px] z-40">
        <button onClick={onBack} className="hover:text-gray-900 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> {t.backCurriculum}
        </button>
        <span>/</span>
        <span>{localizedSubject.title}</span>
        <span>/</span>
        <span className="text-gray-900 font-bold">{t.chapterText} {localizedChapter.id}: {localizedChapter.title}</span>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-12 text-center">
          {localizedChapter.title}
        </h1>

        <div className="space-y-12">
          {CHAPTER_1_CONTENT.map((block, idx) => {
            if (block.type === 'text') {
              return (
                <div key={idx} className="font-serif text-xl leading-relaxed text-gray-800">
                  {block.content}
                </div>
              );
            }

            if (block.type === 'avatar_video' || block.type === 'cartoon_video') {
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                      {block.type === 'avatar_video' ? '🎓 AI Teacher' : '🎨 Visual Story'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{block.topic}</h3>

                  <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 mb-6 border border-gray-100 shadow-inner">
                    {block.video ? (
                      <video
                        src={block.video}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img src={block.thumbnail} alt={block.topic} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <div className="flex gap-2">
                    {block.languages.map(lang => (
                      <button
                        key={lang}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${lang === profile.language
                          ? 'bg-orange-100 text-orange-800 border-orange-200 border'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}

          <div className="pt-12 pb-24">
            {!completed ? (
              <button
                onClick={handleComplete}
                className="w-full py-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-500 hover:text-green-700 font-bold text-xl transition-all flex items-center justify-center gap-3"
              >
                {t.markComplete} <CheckCircle2 className="w-6 h-6" />
              </button>
            ) : (
              <div className="w-full py-8 bg-green-100 rounded-2xl text-green-800 font-bold text-2xl flex flex-col items-center justify-center gap-2 border border-green-200">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
                <span>{t.chapterComplete}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AITeacherView({ profile, setProfile, onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav profile={profile} setProfile={setProfile} />
      <div className="flex flex-1 h-[calc(100vh-77px)] overflow-hidden">
        <Sidebar activeView="aiteacher" onNavigate={onNavigate} profile={profile} />
        <div className="flex-1 flex flex-col w-full h-full overflow-hidden relative bg-[#1e1e2e]">
          <div className="absolute inset-0" style={{ top: '-80px', bottom: '-80px' }}>
            <iframe
              src="https://studio.d-id.com/agents/share?id=v2_agt_DcgBxOYo&utm_source=copy&key=Y2tfZHYyNkduU3hYdGw1RFhZckd2Ykhx"
              style={{ width: '100%', height: 'calc(100% + 160px)', border: 'none' }}
              allow="camera; microphone; display-capture; autoplay"
              title="AI Teacher"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
