import { useState } from 'react';
import { Globe, Bell, LayoutDashboard, BookOpen, FileText, Library, Settings, Plus, MessageSquare, ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import confetti from 'canvas-confetti';

// ===== DATA =====
const SUBJECTS = [
  { id: "maths", title: 'Mathematics', desc: 'Calculus & Trigonometry Fundamentals', icon: '🧮', iconBg: 'bg-orange-100', iconColor: 'text-orange-500', progress: 85, modules: 12 },
  { id: "science", title: 'Science', desc: 'Organic Chemistry & Particle Physics', icon: '🔬', iconBg: 'bg-green-100', iconColor: 'text-green-500', progress: 64, modules: 9 },
  { id: "social", title: 'Social Studies', desc: 'Modern Indian History & Civics', icon: '🌎', iconBg: 'bg-blue-100', iconColor: 'text-blue-500', progress: 42, modules: 5 },
  { id: "english", title: 'English', desc: 'Poetry, Rhetoric & Advanced Grammar', icon: '📖', iconBg: 'bg-purple-100', iconColor: 'text-purple-500', progress: 91, modules: 18 },
  { id: "hindi", title: 'Hindi', desc: 'Literature & Creative Writing', icon: 'अ', iconBg: 'bg-pink-100', iconColor: 'text-pink-500', progress: 78, modules: 11 }
];

const SCIENCE_CHAPTERS = [
  { id: 1, title: "Nutrition in Plants", topics: 6, done: true },
  { id: 2, title: "Nutrition in Animals", topics: 5, done: true },
  { id: 3, title: "Fibre to Fabric", topics: 4, done: false },
  { id: 4, title: "Heat", topics: 7, done: false },
  { id: 5, title: "Acids, Bases and Salts", topics: 6, done: false }
];

const CHAPTER_1_CONTENT = [
  { type: "text", content: "All living organisms require food. Plants are the only organisms that can prepare their own food. They do this through a process called photosynthesis. In this process, plants use sunlight, water, and carbon dioxide to make glucose — their primary source of energy." },
  { type: "avatar_video", topic: "How Plants Make Food", thumbnail: "https://placehold.co/640x360/F5A623/FFFFFF?text=AI+Teacher+▶", languages: ["English", "Hindi", "Sanskrit"] },
  { type: "text", content: "Photosynthesis takes place mainly in the leaves of plants. Leaves have a green pigment called chlorophyll, which absorbs sunlight. The leaves also have tiny pores called stomata through which carbon dioxide enters the plant." },
  { type: "cartoon_video", topic: "Journey of Water in a Plant", thumbnail: "https://placehold.co/640x480/2E7D52/FFFFFF?text=🎨+Visual+Story+▶", languages: ["English", "Hindi", "Sanskrit"] },
  { type: "text", content: "Plants are called autotrophs because they produce their own food. Animals and humans are called heterotrophs because they depend on plants or other animals for food." }
];

// ===== APP =====
export default function App() {
  const [view, setView] = useState('landing');
  const [profile, setProfile] = useState({ name: '', class: '', board: '', language: 'English' });
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);

  return (
    <div className="min-h-screen bg-[#FCFAEF] font-sans text-gray-900 selection:bg-orange-200">
      {view === 'landing' && <LandingView onComplete={() => setView('dashboard')} profile={profile} setProfile={setProfile} />}
      
      {view === 'dashboard' && (
        <DashboardView 
          profile={profile}
          onSelectSubject={(subj) => {
            setActiveSubject(subj);
            setView('chapterList');
          }} 
        />
      )}

      {view === 'chapterList' && activeSubject && (
        <ChapterListView 
          subject={activeSubject}
          profile={profile}
          onBack={() => setView('dashboard')}
          onSelectChapter={(chap) => {
            setActiveChapter(chap);
            setView('reader');
          }}
        />
      )}

      {view === 'reader' && activeSubject && activeChapter && (
        <ReaderView 
          subject={activeSubject}
          chapter={activeChapter}
          profile={profile}
          onBack={() => setView('chapterList')}
        />
      )}
    </div>
  );
}

// ===== COMPONENTS =====

function TopNav() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="font-bold text-2xl font-serif tracking-tight">VidyaPath</div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <a href="#" className="text-orange-500 border-b-2 border-orange-500 pb-1">Courses</a>
        <a href="#" className="hover:text-gray-900">Library</a>
        <a href="#" className="hover:text-gray-900">Mentors</a>
      </div>
      <div className="flex items-center space-x-5 text-gray-600">
        <Globe className="w-5 h-5 cursor-pointer hover:text-gray-900 transition-colors" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-900 transition-colors" />
        <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden border border-gray-200 cursor-pointer">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
        </div>
      </div>
    </nav>
  );
}

function Sidebar({ activeView, onNavigate }) {
  return (
    <div className="w-[240px] bg-white border-r border-gray-100 flex flex-col hidden md:flex shrink-0 h-[calc(100vh-77px)] sticky top-[77px]">
      <div className="p-6">
        <h2 className="font-serif font-bold text-lg text-gray-900">VidyaPath</h2>
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">Student Portal</p>
      </div>
      
      <div className="flex-1 py-4">
        <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active={activeView === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<BookOpen className="w-5 h-5" />} label="My Learning" active={activeView === 'learning'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<FileText className="w-5 h-5" />} label="Assignments" />
        <NavItem icon={<Library className="w-5 h-5" />} label="Library" />
        <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
      </div>
      
      <div className="p-6">
        <button className="w-full py-3 bg-[#F5A623] text-gray-900 font-bold rounded-lg shadow-sm hover:bg-[#E0931B] transition-colors">
          Start Studying
        </button>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center px-6 py-3 cursor-pointer border-l-4 transition-colors ${
        active 
          ? 'border-orange-400 bg-orange-50 text-orange-600' 
          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

// ===== VIEWS =====

function LandingView({ onComplete, profile, setProfile }) {
  const languages = ['English', 'Hindi', 'Sanskrit'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] relative overflow-hidden">
      <div className="absolute top-20 left-10 w-24 h-24 border-8 border-orange-100 rounded-full opacity-50"></div>
      
      <TopNav />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12 flex flex-col lg:flex-row items-center justify-between z-10">
        <div className="lg:w-1/2 max-w-xl pr-8">
          <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold tracking-wider rounded-full mb-8">
            A MODERN GURUKUL EXPERIENCE
          </div>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-4">
            Where Tradition<br />
            Meets<br />
            <span className="text-amber-700">Digital Excellence.</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 italic">
            "Knowledge is that which liberates. Embark on a journey designed to nurture focus, wisdom, and mastery through our curated digital pathways."
          </p>
          
          <div className="flex space-x-12">
            <div className="flex items-start space-x-3">
              <div className="mt-1 text-green-600">🌱</div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">Organic Learning</h4>
                <p className="text-xs text-gray-500 mt-1">Courses that grow with you.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 text-green-600">🎓</div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">Expert Mentors</h4>
                <p className="text-xs text-gray-500 mt-1">Guidance at every step.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[480px] w-full mt-12 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 relative">
            <h2 className="text-3xl font-serif font-bold text-center mb-2">Create Your Profile</h2>
            <p className="text-center text-gray-500 text-sm mb-8">Join the community of lifelong learners.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Class</label>
                  <select 
                    value={profile.class}
                    onChange={e => setProfile({...profile, class: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 outline-none text-sm text-gray-700 appearance-none"
                  >
                    <option value="">Select Class</option>
                    {[...Array(12)].map((_, i) => <option key={i} value={i+1}>Class {i+1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Board</label>
                  <select 
                    value={profile.board}
                    onChange={e => setProfile({...profile, board: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 outline-none text-sm text-gray-700 appearance-none"
                  >
                    <option value="">Select Board</option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Preferred Language</label>
                <div className="flex space-x-3">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setProfile({...profile, language: lang})}
                      className={`flex-1 py-2.5 rounded-lg text-sm border transition-all ${
                        profile.language === lang 
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
                Begin Learning →
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardView({ profile, onSelectSubject }) {
  const name = profile.name || 'Arjun';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar activeView="dashboard" onNavigate={() => {}} />
        
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="max-w-xl">
              <div className="inline-block px-3 py-1 bg-green-200 text-green-800 text-xs font-medium rounded-full mb-4">
                Daily Goal: 80% Complete
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">Welcome back, {name}!</h1>
              <p className="text-gray-600 text-lg">
                You've mastered 3 new concepts in <span className="font-bold text-green-700">Science</span> this week. Keep up the scholarly pace!
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 flex-shrink-0 relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-green-700" strokeWidth="4" strokeDasharray="72, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">72%</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Weekly</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Your Subjects</h2>
            <button className="text-sm font-medium text-amber-700 hover:text-amber-800 flex items-center">
              View curriculum <span className="ml-1">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUBJECTS.map((sub, i) => (
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
                    <span>Mastery</span>
                    <span>{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-3 overflow-hidden">
                    <div className="bg-green-700 h-2 rounded-full transition-all duration-1000" style={{ width: `${sub.progress}%` }}></div>
                  </div>
                  <div className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
                    {sub.modules} Modules Completed
                  </div>
                </div>
              </div>
            ))}
            
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all min-h-[250px]">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm">Enroll in New Subject</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterListView({ subject, profile, onSelectChapter, onBack }) {
  const chapters = subject.id === 'science' ? SCIENCE_CHAPTERS : [];
  const [activeId, setActiveId] = useState(1);
  const activeChapter = chapters.find(c => c.id === activeId);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView="learning" onNavigate={onBack} />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Chapter Sidebar */}
          <div className="w-80 border-r border-gray-100 bg-white flex flex-col h-[calc(100vh-77px)] shrink-0 overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${subject.iconBg} flex items-center justify-center text-xl`}>
                  {subject.icon}
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">{subject.title}</h2>
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              {chapters.length > 0 ? chapters.map(chap => (
                <div 
                  key={chap.id}
                  onClick={() => setActiveId(chap.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all flex items-center gap-3 ${
                    activeId === chap.id ? 'bg-orange-50 border-orange-200' : 'bg-white border-transparent hover:bg-gray-50'
                  }`}
                >
                  {chap.done ? <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0" />}
                  <div>
                    <div className={`font-medium text-sm ${activeId === chap.id ? 'text-orange-900' : 'text-gray-700'}`}>
                      Ch {chap.id}: {chap.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{chap.topics} Topics</div>
                  </div>
                </div>
              )) : (
                <p className="text-center text-gray-400 text-sm py-10">Curriculum generating...</p>
              )}
            </div>
          </div>

          {/* Chapter Detail Main */}
          <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-[#FAFAF8] flex items-center justify-center">
            {activeChapter && (
              <div className="max-w-2xl w-full bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center">
                <div className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                  Chapter {activeChapter.id}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  {activeChapter.title}
                </h1>
                
                <div className="flex items-center justify-center gap-3 text-gray-500 text-sm mb-10">
                  <span>{activeChapter.topics} Topics</span>
                  <span>•</span>
                  <span>~15 min read</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Globe className="w-4 h-4"/> {profile.language}</span>
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
                  Start Reading →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReaderView({ subject, chapter, profile, onBack }) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.8 } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav />
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-3 text-sm text-gray-500 sticky top-[77px] z-40">
        <button onClick={onBack} className="hover:text-gray-900 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Curriculum
        </button>
        <span>/</span>
        <span>{subject.title}</span>
        <span>/</span>
        <span className="text-gray-900 font-bold">Ch {chapter.id}: {chapter.title}</span>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-12 text-center">
          {chapter.title}
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
                  
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 mb-6 cursor-pointer border border-gray-100">
                    <img src={block.thumbnail} alt={block.topic} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex gap-2">
                    {block.languages.map(lang => (
                      <button 
                        key={lang}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          lang === profile.language 
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
                Mark Chapter as Complete <CheckCircle2 className="w-6 h-6" />
              </button>
            ) : (
              <div className="w-full py-8 bg-green-100 rounded-2xl text-green-800 font-bold text-2xl flex flex-col items-center justify-center gap-2 border border-green-200">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
                <span>Chapter Complete! Excellent work.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
