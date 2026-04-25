import { useState } from 'react';
import { Globe, Bell, LayoutDashboard, BookOpen, FileText, Library, Settings, Plus, MessageSquare } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing');
  const [profile, setProfile] = useState({ name: '', class: '', board: '', language: 'English' });

  return (
    <div className="min-h-screen bg-[#FCFAEF] font-sans text-gray-900">
      {view === 'landing' ? (
        <LandingView onComplete={() => setView('dashboard')} profile={profile} setProfile={setProfile} />
      ) : (
        <DashboardView />
      )}
    </div>
  );
}

function TopNav() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
      <div className="font-bold text-2xl font-serif tracking-tight">VidyaPath</div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <a href="#" className="text-orange-500 border-b-2 border-orange-500 pb-1">Courses</a>
        <a href="#" className="hover:text-gray-900">Library</a>
        <a href="#" className="hover:text-gray-900">Mentors</a>
      </div>
      <div className="flex items-center space-x-5 text-gray-600">
        <Globe className="w-5 h-5 cursor-pointer" />
        <Bell className="w-5 h-5 cursor-pointer" />
        <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden border border-gray-200">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
        </div>
      </div>
    </nav>
  );
}

function LandingView({ onComplete, profile, setProfile }) {
  const languages = ['English', 'Hindi', 'Sanskrit'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] relative overflow-hidden">
      {/* Background decorative circles */}
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
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Class</label>
                  <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 outline-none text-sm text-gray-700 appearance-none">
                    <option>Select Class</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Board</label>
                  <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border-transparent focus:bg-white focus:border-gray-300 outline-none text-sm text-gray-700 appearance-none">
                    <option>Select Board</option>
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
              
              <p className="text-center text-[10px] text-gray-400 mt-4 font-medium">
                By continuing, you agree to the <a href="#" className="underline">Terms of Study</a> and <a href="#" className="underline">Ethical Conduct</a>.
              </p>
            </form>
          </div>
        </div>
        
      </main>
    </div>
  );
}

function DashboardView() {
  const subjects = [
    {
      title: 'Mathematics',
      desc: 'Calculus & Trigonometry Fundamentals',
      icon: '🧮',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      progress: 85,
      modules: 12
    },
    {
      title: 'Science',
      desc: 'Organic Chemistry & Particle Physics',
      icon: '🔬',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      progress: 64,
      modules: 9
    },
    {
      title: 'Social Studies',
      desc: 'Modern Indian History & Civics',
      icon: '🌎',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      progress: 42,
      modules: 5
    },
    {
      title: 'English',
      desc: 'Poetry, Rhetoric & Advanced Grammar',
      icon: '📖',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      progress: 91,
      modules: 18
    },
    {
      title: 'Hindi',
      desc: 'Literature & Creative Writing',
      icon: 'अ',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-500',
      progress: 78,
      modules: 11
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[240px] bg-white border-r border-gray-100 flex flex-col hidden md:flex">
          <div className="p-6">
            <h2 className="font-serif font-bold text-lg text-gray-900">VidyaPath</h2>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">Student Portal</p>
          </div>
          
          <div className="flex-1 py-4">
            <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
            <NavItem icon={<BookOpen className="w-5 h-5" />} label="My Learning" />
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

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="max-w-xl">
              <div className="inline-block px-3 py-1 bg-green-200 text-green-800 text-xs font-medium rounded-full mb-4">
                Daily Goal: 80% Complete
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">Welcome back, Arjun!</h1>
              <p className="text-gray-600 text-lg">
                You've mastered 3 new concepts in <span className="font-bold text-green-700">Science</span> this week. Keep up the scholarly pace!
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 flex-shrink-0 relative w-32 h-32 flex items-center justify-center">
              {/* Circular Progress Mock */}
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

          {/* Subjects Grid */}
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Your Subjects</h2>
            <a href="#" className="text-sm font-medium text-amber-700 hover:text-amber-800 flex items-center">
              View curriculum <span className="ml-1">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((sub, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
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
                    <div className="bg-green-700 h-2 rounded-full" style={{ width: `${sub.progress}%` }}></div>
                  </div>
                  <div className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
                    {sub.modules} Modules Completed
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Subject Card */}
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all min-h-[250px]">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm">Enroll in New Subject</span>
            </div>
          </div>
          
          {/* Chat Icon Bottom Right */}
          <div className="fixed bottom-8 right-8 w-14 h-14 bg-amber-700 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-amber-800 transition-colors">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex items-center px-6 py-3 cursor-pointer border-l-4 ${active ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
      <div className="mr-3">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}
