import { useState } from 'react';
import { Globe, Bell, LayoutDashboard, BookOpen, FileText, Library, Settings, Plus, MessageSquare, ArrowLeft, CheckCircle2, Circle, Star, ArrowRight, ShieldCheck, Mail, Share2, Award, Zap, Compass, Monitor, Video, Send, Loader2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import axios from 'axios';

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
  { type: "avatar_video", topic: "How Plants Make Food", video: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://placehold.co/640x360/F5A623/FFFFFF?text=AI+Teacher+▶", languages: ["English", "Hindi", "Sanskrit"] },
  { type: "text", content: "Photosynthesis takes place mainly in the leaves of plants. Leaves have a green pigment called chlorophyll, which absorbs sunlight. The leaves also have tiny pores called stomata through which carbon dioxide enters the plant." },
  { type: "cartoon_video", topic: "Journey of Water in a Plant", video: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://placehold.co/640x480/2E7D52/FFFFFF?text=🎨+Visual+Story+▶", languages: ["English", "Hindi", "Sanskrit"] },
  { type: "text", content: "Plants are called autotrophs because they produce their own food. Animals and humans are called heterotrophs because they depend on plants or other animals for food." }
];

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
      {view === 'landing' && <FullLandingView onGetStarted={() => navigateTo('registration')} />}
      
      {view === 'registration' && <RegistrationView onComplete={() => navigateTo('dashboard')} profile={profile} setProfile={setProfile} />}
      
      {view === 'dashboard' && (
        <DashboardView 
          profile={profile}
          onSelectSubject={(subj) => {
            setActiveSubject(subj);
            navigateTo('chapterList');
          }} 
        />
      )}

      {view === 'chapterList' && activeSubject && (
        <ChapterListView 
          subject={activeSubject}
          profile={profile}
          onBack={() => navigateTo('dashboard')}
          onSelectChapter={(chap) => {
            setActiveChapter(chap);
            navigateTo('reader');
          }}
        />
      )}

      {view === 'reader' && activeSubject && activeChapter && (
        <ReaderView 
          subject={activeSubject}
          chapter={activeChapter}
          profile={profile}
          onBack={() => navigateTo('chapterList')}
        />
      )}

      {view === 'aiteacher' && (
        <AITeacherView 
          profile={profile}
          onBack={() => navigateTo('dashboard')}
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

// ===== VIEWS =====

function FullLandingView({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <TopNav />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 pr-12 mb-16 lg:mb-0">
          <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold tracking-wider rounded-full mb-8">
            NEW ACADEMIC YEAR 2024
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
            Where <span className="text-[#F5A623]">Tradition</span> Meets Digital <span className="relative inline-block border-b-4 border-green-600">Excellence</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            Bridge the gap between timeless academic wisdom and the modern digital landscape. A focused sanctuary for scholars, learners, and dreamers.
          </p>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onGetStarted}
              className="px-8 py-3.5 bg-[#F5A623] hover:bg-[#E0931B] text-gray-900 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              Get Started
            </button>
            <button className="px-8 py-3.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-bold text-lg rounded-lg shadow-sm transition-all">
              Explore Courses
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
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TRUSTED BY 20K+ STUDENTS</div>
            </div>
          </div>
          
          <div className="w-full max-w-[500px] aspect-square bg-[#224A51] rounded-2xl relative overflow-hidden shadow-2xl flex items-center justify-center p-8">
            {/* Abstract mock UI graphic matching screenshot */}
            <div className="w-full h-full border border-white/20 rounded-xl relative">
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                 <div className="w-32 h-32 rounded-full border-2 border-[#4A7D86] flex items-center justify-center relative">
                    <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                       <Monitor className="w-8 h-8 text-white opacity-50" />
                    </div>
                    <div className="absolute -top-10 left-1/2 w-8 h-8 bg-white/10 rounded-full"></div>
                    <div className="absolute top-1/2 -left-10 w-8 h-8 bg-white/10 rounded-full"></div>
                 </div>
               </div>
               <div className="absolute bottom-8 right-8 px-6 py-2 bg-[#0D2428] text-white font-bold tracking-widest text-sm rounded-lg border border-white/10">
                 SAFE FOR WORK
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-center text-xs font-bold tracking-widest text-gray-400 uppercase mb-8">Our Academic Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            <div className="flex items-center space-x-2"><BookOpen className="w-6 h-6"/> <span className="font-serif text-xl font-bold">Stanford</span></div>
            <div className="flex items-center space-x-2"><ShieldCheck className="w-6 h-6"/> <span className="font-serif text-xl font-bold">Oxford</span></div>
            <div className="flex items-center space-x-2"><Award className="w-6 h-6"/> <span className="font-serif text-xl font-bold">Heritage</span></div>
            <div className="flex items-center space-x-2"><Library className="w-6 h-6"/> <span className="font-serif text-xl font-bold">Library</span></div>
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] relative overflow-hidden">
      <div className="absolute top-20 left-10 w-24 h-24 border-8 border-orange-100 rounded-full opacity-50"></div>
      
      <TopNav />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12 flex flex-col lg:flex-row items-center justify-center z-10">
        
        <div className="w-full max-w-md">
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </button>
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
        <NavItem icon={<Video className="w-5 h-5" />} label="AI Teacher" active={activeView === 'aiteacher'} onClick={() => onNavigate('aiteacher')} />
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

function DashboardView({ profile, onSelectSubject }) {
  const name = profile.name || 'Arjun';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar activeView="dashboard" onNavigate={(v) => { if (v === 'aiteacher') window.scrollTo(0, 0); else {} }} />
        
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

function AITeacherView({ profile, onBack }) {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState(profile.language || "English");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doubt, setDoubt] = useState("");
  const [doubtAnswer, setDoubtAnswer] = useState(null);
  const [doubtLoading, setDoubtLoading] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(false);

  const generateVideo = async (difficulty = "standard") => {
    if (!subject || !topic) return alert("Please select a subject and topic");
    setLoading(true);
    setVideoData(null);
    setDoubtAnswer(null);
    try {
      const res = await axios.post("http://localhost:8000/api/generate-video", {
        topic: `${subject} - ${topic}`,
        language: language,
        difficulty: difficulty
      });
      setVideoData(res.data);
    } catch (e) {
      alert("Failed to generate video: " + e.message);
    }
    setLoading(false);
  };

  const askDoubt = async () => {
    if (!doubt) return;
    setDoubtLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/ask-doubt", {
        topic: `${subject} - ${topic}`,
        language: language,
        question: doubt
      });
      setDoubtAnswer(res.data.answer);
    } catch (e) {
      alert("Failed to get answer: " + e.message);
    }
    setDoubtLoading(false);
    setDoubt("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar activeView="aiteacher" onNavigate={onBack} />
        
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">AI Teacher Studio</h1>
                <p className="text-gray-500">Learn with a personalized AI guide.</p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setInteractiveMode(false)}
                  className={`px-6 py-2 font-bold rounded-lg transition-colors ${!interactiveMode ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Topic Video
                </button>
                <button 
                  onClick={() => setInteractiveMode(true)}
                  className={`px-6 py-2 font-bold rounded-lg transition-colors flex items-center gap-2 ${interactiveMode ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" /> Live Interactive
                </button>
              </div>
            </div>

            {interactiveMode ? (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 h-[600px] flex flex-col">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4 flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <Monitor className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">Live D-ID Teacher</h3>
                    <p className="text-sm text-blue-800 mt-1">
                      You are now connected to the real-time AI Agent. Click "Start" on the video player below to begin a live voice conversation!
                    </p>
                  </div>
                </div>
                <iframe 
                  src="https://studio.d-id.com/agents/share?id=v2_agt_6H2TaOEB&utm_source=copy&key=Y2tfaEoyWTVVYnk0YWNraXUteF9IcENZ" 
                  className="w-full flex-1 rounded-xl border-none"
                  allow="camera; microphone"
                  title="D-ID AI Agent"
                ></iframe>
              </div>
            ) : (
              <>
                {/* Controls */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                      <select 
                        value={subject} onChange={e => setSubject(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-400"
                      >
                        <option value="">Select Subject</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>Social Studies</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Topic</label>
                      <input 
                        type="text" value={topic} onChange={e => setTopic(e.target.value)}
                        placeholder="e.g. Photosynthesis"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                      <select 
                        value={language} onChange={e => setLanguage(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-400"
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Sanskrit</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => generateVideo("standard")}
                    disabled={loading}
                    className="w-full py-4 bg-[#F5A623] hover:bg-[#E0931B] text-gray-900 font-bold rounded-xl shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Video className="w-5 h-5" />}
                    {loading ? "Generating Teacher Video..." : "Watch Topic Video"}
                  </button>
                </div>

                {/* Video Player */}
                {videoData && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="aspect-video bg-black relative flex items-center justify-center">
                      {videoData.status === "generating" ? (
                        <div className="text-white text-center">
                          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-orange-500" />
                          <p>Rendering AI Video via Tavus...</p>
                          <p className="text-xs text-gray-400 mt-2">ID: {videoData.video_id}</p>
                        </div>
                      ) : (
                        <video controls src={videoData.video_url} className="w-full h-full object-cover">
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                    
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Generated Script</h3>
                      <p className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-orange-200 pl-4">
                        "{videoData.script}"
                      </p>
                      
                      <div className="mt-6 flex justify-end">
                        <button 
                          onClick={() => generateVideo("simplified")}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" /> Explain Again (Simplified)
                        </button>
                      </div>
                    </div>

                    {/* Doubt Section */}
                    <div className="p-6 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-500" /> Have a doubt?
                      </h3>
                      
                      <div className="flex gap-3 mb-4">
                        <input 
                          type="text" 
                          value={doubt}
                          onChange={e => setDoubt(e.target.value)}
                          placeholder="Ask the AI teacher a question..."
                          className="flex-1 p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-400"
                          onKeyDown={e => e.key === 'Enter' && askDoubt()}
                        />
                        <button 
                          onClick={askDoubt}
                          disabled={doubtLoading}
                          className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm disabled:opacity-50 flex items-center gap-2"
                        >
                          {doubtLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                      </div>

                      {doubtAnswer && (
                        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-xs">🎓</span>
                            </div>
                            <span className="font-bold text-sm text-blue-900">AI Teacher Response</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{doubtAnswer}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
