import { useState } from 'react';
import { Globe, Bell, LayoutDashboard, BookOpen, FileText, Library, Settings, Plus, MessageSquare, ArrowLeft, CheckCircle2, Circle, Star, ArrowRight, ShieldCheck, Mail, Share2, Award, Zap, Compass, Monitor, Video, Send, Loader2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

// Assets
import leafVideo from './assets/Leaf_And_Sun_Animation_Generation.mp4';
import plantVideo from './assets/Animated_Happy_Potted_Plant_Video.mp4';


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
    courses: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ«", library: "αñ¬αÑüαñ╕αÑìαññαñòαñ╛αñ▓αñ»", mentors: "αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñò",
    newYear: "αñ¿αñ»αñ╛ αñ╢αÑêαñòαÑìαñ╖αñúαñ┐αñò αñ╡αñ░αÑìαñ╖ 2024",
    titleLines: ["αñ£αñ╣αñ╛αñü", "αñ¬αñ░αñéαñ¬αñ░αñ╛", "αñåαñºαÑüαñ¿αñ┐αñò", "αñëαññαÑìαñòαÑâαñ╖αÑìαñƒαññαñ╛ αñ╕αÑç αñ«αñ┐αñ▓αññαÑÇ αñ╣αÑê"],
    subtitle: "αñòαñ╛αñ▓αñ╛αññαÑÇαññ αñ╢αÑêαñòαÑìαñ╖αñúαñ┐αñò αñ£αÑìαñ₧αñ╛αñ¿ αñöαñ░ αñåαñºαÑüαñ¿αñ┐αñò αñíαñ┐αñ£αñ┐αñƒαñ▓ αñ¬αñ░αñ┐αñªαÑâαñ╢αÑìαñ» αñòαÑç αñ¼αÑÇαñÜ αñòαÑÇ αñûαñ╛αñê αñòαÑï αñ¬αñ╛αñƒαÑçαñéαÑñ αñ╡αñ┐αñªαÑìαñ╡αñ╛αñ¿αÑïαñé αñöαñ░ αñ╕αÑÇαñûαñ¿αÑç αñ╡αñ╛αñ▓αÑïαñé αñòαÑç αñ▓αñ┐αñÅ αñÅαñò αñòαÑçαñéαñªαÑìαñ░αñ┐αññ αñàαñ¡αñ»αñ╛αñ░αñúαÑìαñ»αÑñ",
    getStarted: "αñ╢αÑüαñ░αÑé αñòαñ░αÑçαñé", exploreCourses: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ« αñûαÑïαñ£αÑçαñé", trusted: "αÑ¿αÑª αñ╣αñ£αñ╛αñ░+ αñ¢αñ╛αññαÑìαñ░αÑïαñé αñªαÑìαñ╡αñ╛αñ░αñ╛ αñ╡αñ┐αñ╢αÑìαñ╡αñ╕αñ¿αÑÇαñ»",
    welcomeBack: "αñ╕αÑìαñ╡αñ╛αñùαññ αñ╣αÑê", masteredConcepts: "αñåαñ¬αñ¿αÑç αÑ⌐ αñ¿αñê αñàαñ╡αñºαñ╛αñ░αñúαñ╛αñôαñé αñ«αÑçαñé αñ«αñ╣αñ╛αñ░αññ αñ╣αñ╛αñ╕αñ┐αñ▓ αñòαÑÇ αñ╣αÑê:",
    keepPace: "αñçαñ╕ αñ╕αñ¬αÑìαññαñ╛αñ╣αÑñ αñ╡αñ┐αñªαÑìαñ╡αññαÑìαññαñ╛αñ¬αÑéαñ░αÑìαñú αñùαññαñ┐ αñ¼αñ¿αñ╛αñÅ αñ░αñûαÑçαñé!", dailyGoal: "αñªαÑêαñ¿αñ┐αñò αñ▓αñòαÑìαñ╖αÑìαñ»: 80% αñ¬αÑéαñ░αÑìαñú",
    weekly: "αñ╕αñ╛αñ¬αÑìαññαñ╛αñ╣αñ┐αñò", yourSubjects: "αñåαñ¬αñòαÑç αñ╡αñ┐αñ╖αñ»", viewCurriculum: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ« αñªαÑçαñûαÑçαñé",
    mastery: "αñ«αñ╣αñ╛αñ░αññ", modulesCompleted: "αñ«αÑëαñíαÑìαñ»αÑéαñ▓ αñ¬αÑéαñ░αÑìαñú", enrollNewSubject: "αñ¿αñÅ αñ╡αñ┐αñ╖αñ» αñ«αÑçαñé αñ¿αñ╛αñ«αñ╛αñéαñòαñ¿ αñòαñ░αÑçαñé",
    backHome: "αñ╣αÑïαñ« αñ¬αñ░ αñ╡αñ╛αñ¬αñ╕ αñ£αñ╛αñÅαñü", createProfile: "αñàαñ¬αñ¿αÑÇ αñ¬αÑìαñ░αÑïαñ½αñ╝αñ╛αñçαñ▓ αñ¼αñ¿αñ╛αñÅαñü", joinCommunity: "αñåαñ£αÑÇαñ╡αñ¿ αñ╕αÑÇαñûαñ¿αÑç αñ╡αñ╛αñ▓αÑïαñé αñòαÑç αñ╕αñ«αÑüαñªαñ╛αñ» αñ«αÑçαñé αñ╢αñ╛αñ«αñ┐αñ▓ αñ╣αÑïαñéαÑñ",
    fullName: "αñ¬αÑéαñ░αñ╛ αñ¿αñ╛αñ«", enterName: "αñàαñ¬αñ¿αñ╛ αñ¬αÑéαñ░αñ╛ αñ¿αñ╛αñ« αñªαñ░αÑìαñ£ αñòαñ░αÑçαñé", className: "αñòαñòαÑìαñ╖αñ╛", selectClass: "αñòαñòαÑìαñ╖αñ╛ αñÜαÑüαñ¿αÑçαñé",
    board: "αñ¼αÑïαñ░αÑìαñí", selectBoard: "αñ¼αÑïαñ░αÑìαñí αñÜαÑüαñ¿αÑçαñé", preferredLanguage: "αñ¬αñ╕αñéαñªαÑÇαñªαñ╛ αñ¡αñ╛αñ╖αñ╛", beginLearning: "αñ╕αÑÇαñûαñ¿αñ╛ αñ╢αÑüαñ░αÑé αñòαñ░αÑçαñé",
    studentPortal: "αñ¢αñ╛αññαÑìαñ░ αñ¬αÑïαñ░αÑìαñƒαñ▓", dashboard: "αñíαÑêαñ╢αñ¼αÑïαñ░αÑìαñí", myLearning: "αñ«αÑçαñ░αÑÇ αñ╢αñ┐αñòαÑìαñ╖αñ╛", assignments: "αñòαñ╛αñ░αÑìαñ»",
    settings: "αñ╕αÑçαñƒαñ┐αñéαñùαÑìαñ╕", startStudying: "αñ¬αñóαñ╝αñ╛αñê αñ╢αÑüαñ░αÑé αñòαñ░αÑçαñé", back: "αñ╡αñ╛αñ¬αñ╕", topics: "αñ╡αñ┐αñ╖αñ»",
    generatingCurriculum: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ« αñëαññαÑìαñ¬αñ¿αÑìαñ¿ αñ╣αÑï αñ░αñ╣αñ╛ αñ╣αÑê...", chapterText: "αñàαñºαÑìαñ»αñ╛αñ»", startReading: "αñ¬αñóαñ╝αñ¿αñ╛ αñ╢αÑüαñ░αÑé αñòαñ░αÑçαñé",
    backCurriculum: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ« αñ¬αñ░ αñ╡αñ╛αñ¬αñ╕ αñ£αñ╛αñÅαñü", markComplete: "αñàαñºαÑìαñ»αñ╛αñ» αñòαÑï αñ¬αÑéαñ░αÑìαñú αñòαÑç αñ░αÑéαñ¬ αñ«αÑçαñé αñÜαñ┐αñ╣αÑìαñ¿αñ┐αññ αñòαñ░αÑçαñé", chapterComplete: "αñàαñºαÑìαñ»αñ╛αñ» αñ¬αÑéαñ░αÑìαñú! αñëαññαÑìαñòαÑâαñ╖αÑìαñƒ αñòαñ╛αñ░αÑìαñ»αÑñ",
    minRead: "αñ«αñ┐αñ¿αñƒ αñòαÑÇ αñ¬αñóαñ╝αñ╛αñê", aiTeacher: "αñÅαñåαñê αñ╢αñ┐αñòαÑìαñ╖αñò"
  },
  Sanskrit: {
    courses: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ«αñ╛αñâ", library: "αñùαÑìαñ░αñ¿αÑìαñÑαñ╛αñ▓αñ»αñâ", mentors: "αñùαÑüαñ░αñ╡αñâ",
    newYear: "αñ¿αÑéαññαñ¿ αñ╢αÑêαñòαÑìαñ╖αñ┐αñò αñ╡αñ░αÑìαñ╖ 2024",
    titleLines: ["αñ»αññαÑìαñ░", "αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛", "αñåαñºαÑüαñ¿αñ┐αñò", "αñëαññαÑìαñòαñ░αÑìαñ╖αÑçαñú αñ«αñ┐αñ▓αññαñ┐"],
    subtitle: "αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñùαññ αñ╡αñ┐αñªαÑìαñ»αñ╛αñ»αñ╛αñâ αñåαñºαÑüαñ¿αñ┐αñò αññαñ¿αÑìαññαÑìαñ░αñ£αÑìαñ₧αñ╛αñ¿αñ╕αÑìαñ» αñÜ αñ╕αÑçαññαÑüαñâαÑñ αñ╡αñ┐αñªαÑüαñ╖αñ╛αñé, αñ╡αñ┐αñªαÑìαñ»αñ╛αñ░αÑìαñÑαñ┐αñ¿αñ╛αñé αñÜ αñòαÑâαññαÑç αñÅαñòαñé αñ«αÑüαñûαÑìαñ»αñé αñ╢αñ░αñúαñ«αÑìαÑñ",
    getStarted: "αñåαñ░αñ«αÑìαñ¡αñé αñòαÑüαñ░αÑìαñ╡αñ¿αÑìαññαÑü", exploreCourses: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ«αñ╛αñ¿αÑì αñ¬αñ╢αÑìαñ»αñ¿αÑìαññαÑü", trusted: "αÑ¿αÑª αñ╕αñ╣αñ╕αÑìαñ░αñ╡αñ┐αñªαÑìαñ»αñ╛αñ░αÑìαñÑαñ┐αñ¡αñ┐αñâ αñ╡αñ┐αñ╢αÑìαñ╡αñ╕αñ┐αññαñ«αÑì",
    welcomeBack: "αñ╕αÑìαñ╡αñ╛αñùαññαñ«αÑì", masteredConcepts: "αñ¡αñ╡αññαñ╛ αÑ⌐ αñ¿αÑéαññαñ¿αñ╛αñâ αñàαñ╡αñºαñ╛αñ░αñúαñ╛αñâ αñàαñºαÑÇαññαñ╛αñâ:",
    keepPace: "αñàαñ╕αÑìαñ«αñ┐αñ¿αÑì αñ╕αñ¬αÑìαññαñ╛αñ╣αÑçαÑñ αñ╡αñ┐αñªαÑìαñ╡αññαÑìαññαñ╛αñ¬αÑéαñ░αÑìαñúαñé αñ╡αÑçαñùαñé αñºαñ╛αñ░αñ»αññαÑü!", dailyGoal: "αñªαÑêαñ¿αñ┐αñò αñ▓αñòαÑìαñ╖αÑìαñ»αñ«αÑì: 80% αñ¬αÑéαñ░αÑìαñúαñ«αÑì",
    weekly: "αñ╕αñ╛αñ¬αÑìαññαñ╛αñ╣αñ┐αñòαñ«αÑì", yourSubjects: "αñ¡αñ╡αññαñâ αñ╡αñ┐αñ╖αñ»αñ╛αñâ", viewCurriculum: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ«αñé αñ¬αñ╢αÑìαñ»αñ¿αÑìαññαÑü",
    mastery: "αñ¬αÑìαñ░αñ╛αñ╡αÑÇαñúαÑìαñ»αñ«αÑì", modulesCompleted: "αñàαñºαÑìαñ»αñ╛αñ»αñ╛αñâ αñ¬αÑéαñ░αÑìαñúαñ╛αñâ", enrollNewSubject: "αñ¿αÑéαññαñ¿αñ╡αñ┐αñ╖αñ»αÑç αñ¬αñ₧αÑìαñ£αÑÇαñòαñ░αñúαñé αñòαÑüαñ░αÑìαñ╡αñ¿αÑìαññαÑü",
    backHome: "αñ«αÑüαñûαÑìαñ»αñ¬αÑâαñ╖αÑìαñáαñé αñ¬αÑìαñ░αññαñ┐ αñùαñÜαÑìαñ¢αñ¿αÑìαññαÑü", createProfile: "αñ╕αÑìαñ╡αñ╕αÑìαñ» αñ¬αñ░αñ┐αñÜαñ»αñé αñ░αñÜαñ»αñ¿αÑìαññαÑü", joinCommunity: "αñåαñ£αÑÇαñ╡αñ¿αñé αñ¬αñáαññαñ╛αñé αñ╕αñ«αÑüαñªαñ╛αñ»αÑç αñàαñ¿αÑìαññαñ░αÑìαñ¡αñ╡αñ¿αÑìαññαÑüαÑñ",
    fullName: "αñ¬αÑéαñ░αÑìαñúαñ¿αñ╛αñ«", enterName: "αñ╕αÑìαñ╡αñ╕αÑìαñ» αñ¬αÑéαñ░αÑìαñúαñ¿αñ╛αñ« αñ▓αñ┐αñûαñ¿αÑìαññαÑü", className: "αñòαñòαÑìαñ╖αñ╛", selectClass: "αñòαñòαÑìαñ╖αñ╛αñé αñÜαñ┐αñ¿αÑìαñ╡αñ¿αÑìαññαÑü",
    board: "αñ«αñúαÑìαñíαñ▓αñ«αÑì", selectBoard: "αñ«αñúαÑìαñíαñ▓αñé αñÜαñ┐αñ¿αÑìαñ╡αñ¿αÑìαññαÑü", preferredLanguage: "αñçαñ╖αÑìαñƒαñ╛ αñ¡αñ╛αñ╖αñ╛", beginLearning: "αñàαñºαÑìαñ»αñ»αñ¿αñ«αÑì αñåαñ░αñ¡αñ╕αÑìαñ╡",
    studentPortal: "αñ¢αñ╛αññαÑìαñ░-αñ¬αÑüαñƒαñ«αÑì", dashboard: "αñ«αÑüαñûαÑìαñ»αñ½αñ▓αñòαñ«αÑì", myLearning: "αñ«αñ« αñ╢αñ┐αñòαÑìαñ╖αñ╛", assignments: "αñòαñ╛αñ░αÑìαñ»αñ╛αñúαñ┐",
    settings: "αñ¬αÑìαñ░αñ¼αñ¿αÑìαñºαñâ", startStudying: "αñàαñºαÑìαñ»αñ»αñ¿αñ«αÑì αñåαñ░αñ¡αñ╕αÑìαñ╡", back: "αñ¬αÑâαñ╖αÑìαñáαññαñâ", topics: "αñ╡αñ┐αñ╖αñ»αñ╛αñâ",
    generatingCurriculum: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ«αñâ αñ£αñ¿αÑìαñ»αññαÑç...", chapterText: "αñàαñºαÑìαñ»αñ╛αñ»αñâ", startReading: "αñ¬αñáαñ¿αñ«αÑì αñåαñ░αñ¡αñ╕αÑìαñ╡",
    backCurriculum: "αñ¬αñ╛αñáαÑìαñ»αñòαÑìαñ░αñ«αñé αñ¬αÑìαñ░αññαñ┐ αñùαñÜαÑìαñ¢αñ¿αÑìαññαÑü", markComplete: "αñàαñºαÑìαñ»αñ╛αñ»αñé αñ¬αÑéαñ░αÑìαñúαñ«αñ┐αññαñ┐ αñàαñÖαÑìαñòαñ»αñ¿αÑìαññαÑü", chapterComplete: "αñàαñºαÑìαñ»αñ╛αñ»αñâ αñ¬αÑéαñ░αÑìαñúαñâ! αñëαññαÑìαññαñ«αñé αñòαñ╛αñ░αÑìαñ»αñ«αÑìαÑñ",
    minRead: "αñ¿αñ┐αñ«αÑçαñ╖αñ╛αññαÑìαñ«αñòαñ«αñºαÑìαñ»αñ»αñ¿αñ«αÑì", aiTeacher: "αñÅαñåαñê-αñùαÑüαñ░αÑüαñâ"
  }
};

// ===== DATA =====
const getData = (lang) => {
  if (lang === 'Hindi') {
    return {
      SUBJECTS: [
        { id: "maths", title: 'αñùαñúαñ┐αññ', desc: 'αñòαÑêαñ▓αñòαÑüαñ▓αñ╕ αñöαñ░ αññαÑìαñ░αñ┐αñòαÑïαñúαñ«αñ┐αññαñ┐ αñ«αÑéαñ▓ αñ¼αñ╛αññαÑçαñé', icon: '≡ƒº«', iconBg: 'bg-orange-100', iconColor: 'text-orange-500', progress: 85, modules: 12 },
        { id: "science", title: 'αñ╡αñ┐αñ£αÑìαñ₧αñ╛αñ¿', desc: 'αñòαñ╛αñ░αÑìαñ¼αñ¿αñ┐αñò αñ░αñ╕αñ╛αñ»αñ¿ αñöαñ░ αñòαñú αñ¡αÑîαññαñ┐αñòαÑÇ', icon: '≡ƒö¼', iconBg: 'bg-green-100', iconColor: 'text-green-500', progress: 64, modules: 9 },
        { id: "social", title: 'αñ╕αñ╛αñ«αñ╛αñ£αñ┐αñò αñ╡αñ┐αñ£αÑìαñ₧αñ╛αñ¿', desc: 'αñåαñºαÑüαñ¿αñ┐αñò αñ¡αñ╛αñ░αññαÑÇαñ» αñçαññαñ┐αñ╣αñ╛αñ╕ αñöαñ░ αñ¿αñ╛αñùαñ░αñ┐αñò αñ╢αñ╛αñ╕αÑìαññαÑìαñ░', icon: '≡ƒîÄ', iconBg: 'bg-blue-100', iconColor: 'text-blue-500', progress: 42, modules: 5 },
        { id: "english", title: 'αñàαñéαñùαÑìαñ░αÑçαñ£αñ╝αÑÇ', desc: 'αñòαñ╡αñ┐αññαñ╛, αñàαñ▓αñéαñòαñ╛αñ░ αñöαñ░ αñëαñ¿αÑìαñ¿αññ αñ╡αÑìαñ»αñ╛αñòαñ░αñú', icon: '≡ƒôû', iconBg: 'bg-purple-100', iconColor: 'text-purple-500', progress: 91, modules: 18 },
        { id: "hindi", title: 'αñ╣αñ┐αñ¿αÑìαñªαÑÇ', desc: 'αñ╕αñ╛αñ╣αñ┐αññαÑìαñ» αñöαñ░ αñ░αñÜαñ¿αñ╛αññαÑìαñ«αñò αñ▓αÑçαñûαñ¿', icon: 'αñà', iconBg: 'bg-pink-100', iconColor: 'text-pink-500', progress: 78, modules: 11 }
      ],
      SCIENCE_CHAPTERS: [
        { id: 1, title: "αñ¬αÑîαñºαÑïαñé αñ«αÑçαñé αñ¬αÑïαñ╖αñú", topics: 6, done: true },
        { id: 2, title: "αñ¬αÑìαñ░αñ╛αñúαñ┐αñ»αÑïαñé αñ«αÑçαñé αñ¬αÑïαñ╖αñú", topics: 5, done: true },
        { id: 3, title: "αñ░αÑçαñ╢αÑïαñé αñ╕αÑç αñ╡αñ╕αÑìαññαÑìαñ░ αññαñò", topics: 4, done: false },
        { id: 4, title: "αñèαñ╖αÑìαñ«αñ╛", topics: 7, done: false },
        { id: 5, title: "αñàαñ«αÑìαñ▓, αñòαÑìαñ╖αñ╛αñ░αñò αñöαñ░ αñ▓αñ╡αñú", topics: 6, done: false }
      ],
      CHAPTER_1_CONTENT: [
        { type: "text", content: "αñ╕αñ¡αÑÇ αñ╕αñ£αÑÇαñ╡αÑïαñé αñòαÑï αñ¡αÑïαñ£αñ¿ αñòαÑÇ αñåαñ╡αñ╢αÑìαñ»αñòαññαñ╛ αñ╣αÑïαññαÑÇ αñ╣αÑêαÑñ αñ¬αÑîαñºαÑç αñ╣αÑÇ αñÅαñòαñ«αñ╛αññαÑìαñ░ αñÉαñ╕αÑç αñ£αÑÇαñ╡ αñ╣αÑêαñé αñ£αÑï αñàαñ¬αñ¿αñ╛ αñ¡αÑïαñ£αñ¿ αñ╕αÑìαñ╡αñ»αñé αñ¼αñ¿αñ╛ αñ╕αñòαññαÑç αñ╣αÑêαñéαÑñ αñ╡αÑç αñÉαñ╕αñ╛ αñ¬αÑìαñ░αñòαñ╛αñ╢ αñ╕αñéαñ╢αÑìαñ▓αÑçαñ╖αñú αñ¿αñ╛αñ«αñò αñ¬αÑìαñ░αñòαÑìαñ░αñ┐αñ»αñ╛ αñòαÑç αñ«αñ╛αñºαÑìαñ»αñ« αñ╕αÑç αñòαñ░αññαÑç αñ╣αÑêαñéαÑñ αñçαñ╕ αñ¬αÑìαñ░αñòαÑìαñ░αñ┐αñ»αñ╛ αñ«αÑçαñé, αñ¬αÑîαñºαÑç αñ╕αÑéαñ░αÑìαñ» αñòαÑç αñ¬αÑìαñ░αñòαñ╛αñ╢, αñ¬αñ╛αñ¿αÑÇ αñöαñ░ αñòαñ╛αñ░αÑìαñ¼αñ¿ αñíαñ╛αñçαñæαñòαÑìαñ╕αñ╛αñçαñí αñòαñ╛ αñëαñ¬αñ»αÑïαñù αñòαñ░αñòαÑç αñùαÑìαñ▓αÑéαñòαÑïαñ£ αñ¼αñ¿αñ╛αññαÑç αñ╣αÑêαñé ΓÇö αñ£αÑï αñëαñ¿αñòαÑÇ αñèαñ░αÑìαñ£αñ╛ αñòαñ╛ αñ¬αÑìαñ░αñ╛αñÑαñ«αñ┐αñò αñ╕αÑìαñ░αÑïαññ αñ╣αÑêαÑñ" },
        { type: "avatar_video", topic: "αñ¬αÑîαñºαÑç αñàαñ¬αñ¿αñ╛ αñ¡αÑïαñ£αñ¿ αñòαÑêαñ╕αÑç αñ¼αñ¿αñ╛αññαÑç αñ╣αÑêαñé", video: leafVideo, thumbnail: "https://placehold.co/640x360/F5A623/FFFFFF?text=AI+Teacher+Γû╢", languages: ["English", "Hindi", "Sanskrit"] },
        { type: "text", content: "αñ¬αÑìαñ░αñòαñ╛αñ╢ αñ╕αñéαñ╢αÑìαñ▓αÑçαñ╖αñú αñ«αÑüαñûαÑìαñ» αñ░αÑéαñ¬ αñ╕αÑç αñ¬αÑîαñºαÑïαñé αñòαÑÇ αñ¬αññαÑìαññαñ┐αñ»αÑïαñé αñ«αÑçαñé αñ╣αÑïαññαñ╛ αñ╣αÑêαÑñ αñ¬αññαÑìαññαñ┐αñ»αÑïαñé αñ«αÑçαñé αñòαÑìαñ▓αÑïαñ░αÑïαñ½αñ┐αñ▓ αñ¿αñ╛αñ«αñò αñÅαñò αñ╣αñ░αñ╛ αñ╡αñ░αÑìαñúαñò αñ╣αÑïαññαñ╛ αñ╣αÑê, αñ£αÑï αñ╕αÑéαñ░αÑìαñ» αñòαÑç αñ¬αÑìαñ░αñòαñ╛αñ╢ αñòαÑï αñàαñ╡αñ╢αÑïαñ╖αñ┐αññ αñòαñ░αññαñ╛ αñ╣αÑêαÑñ αñ¬αññαÑìαññαñ┐αñ»αÑïαñé αñ«αÑçαñé αñ░αñéαñºαÑìαñ░ αñ¿αñ╛αñ«αñò αñ¢αÑïαñƒαÑç αñ¢αñ┐αñªαÑìαñ░ αñ¡αÑÇ αñ╣αÑïαññαÑç αñ╣αÑêαñé αñ£αñ┐αñ¿αñòαÑç αñ«αñ╛αñºαÑìαñ»αñ« αñ╕αÑç αñòαñ╛αñ░αÑìαñ¼αñ¿ αñíαñ╛αñçαñæαñòαÑìαñ╕αñ╛αñçαñí αñ¬αÑîαñºαÑç αñ«αÑçαñé αñ¬αÑìαñ░αñ╡αÑçαñ╢ αñòαñ░αññαÑÇ αñ╣αÑêαÑñ" },
        { type: "cartoon_video", topic: "αñ¬αÑîαñºαÑç αñ«αÑçαñé αñ¬αñ╛αñ¿αÑÇ αñòαÑÇ αñ»αñ╛αññαÑìαñ░αñ╛", video: plantVideo, thumbnail: "https://placehold.co/640x480/2E7D52/FFFFFF?text=≡ƒÄ¿+Visual+Story+Γû╢", languages: ["English", "Hindi", "Sanskrit"] },
        { type: "text", content: "αñ¬αÑîαñºαÑïαñé αñòαÑï αñ╕αÑìαñ╡αñ¬αÑïαñ╖αÑÇ αñòαñ╣αñ╛ αñ£αñ╛αññαñ╛ αñ╣αÑê αñòαÑìαñ»αÑïαñéαñòαñ┐ αñ╡αÑç αñàαñ¬αñ¿αñ╛ αñ¡αÑïαñ£αñ¿ αñ╕αÑìαñ╡αñ»αñé αñ¼αñ¿αñ╛αññαÑç αñ╣αÑêαñéαÑñ αñ£αñ╛αñ¿αñ╡αñ░αÑïαñé αñöαñ░ αñ«αñ¿αÑüαñ╖αÑìαñ»αÑïαñé αñòαÑï αñ╡αñ┐αñ╖αñ«αñ¬αÑïαñ╖αÑÇ αñòαñ╣αñ╛ αñ£αñ╛αññαñ╛ αñ╣αÑê αñòαÑìαñ»αÑïαñéαñòαñ┐ αñ╡αÑç αñ¡αÑïαñ£αñ¿ αñòαÑç αñ▓αñ┐αñÅ αñ¬αÑîαñºαÑïαñé αñ»αñ╛ αñàαñ¿αÑìαñ» αñ£αñ╛αñ¿αñ╡αñ░αÑïαñé αñ¬αñ░ αñ¿αñ┐αñ░αÑìαñ¡αñ░ αñ╣αÑïαññαÑç αñ╣αÑêαñéαÑñ" }
      ]
    };
  }

  if (lang === 'Sanskrit') {
    return {
      SUBJECTS: [
        { id: "maths", title: 'αñùαñúαñ┐αññαñ«αÑì', desc: 'αñòαñ▓αñ¿αñ«αÑì αññαÑìαñ░αñ┐αñòαÑïαñúαñ«αñ┐αññαñ┐αñâ αñÜ', icon: '≡ƒº«', iconBg: 'bg-orange-100', iconColor: 'text-orange-500', progress: 85, modules: 12 },
        { id: "science", title: 'αñ╡αñ┐αñ£αÑìαñ₧αñ╛αñ¿αñ«αÑì', desc: 'αñ╕αÑçαñéαñªαÑìαñ░αñ┐αñ» αñ░αñ╕αñ╛αñ»αñ¿αñé αñòαñúαñ¡αÑîαññαñ┐αñòαÑÇ αñÜ', icon: '≡ƒö¼', iconBg: 'bg-green-100', iconColor: 'text-green-500', progress: 64, modules: 9 },
        { id: "social", title: 'αñ╕αñ«αñ╛αñ£αñ╡αñ┐αñ£αÑìαñ₧αñ╛αñ¿αñ«αÑì', desc: 'αñåαñºαÑüαñ¿αñ┐αñò αñ¡αñ╛αñ░αññαÑÇαñ» αñçαññαñ┐αñ╣αñ╛αñ╕αñâ αñ¿αñ╛αñùαñ░αñ┐αñòαñ╢αñ╛αñ╕αÑìαññαÑìαñ░αñé αñÜ', icon: '≡ƒîÄ', iconBg: 'bg-blue-100', iconColor: 'text-blue-500', progress: 42, modules: 5 },
        { id: "english", title: 'αñåαñéαñùαÑìαñ▓αñ¡αñ╛αñ╖αñ╛', desc: 'αñòαñ╛αñ╡αÑìαñ»αñé, αñàαñ▓αñÖαÑìαñòαñ╛αñ░αñâ αñëαñ¿αÑìαñ¿αññαñ╡αÑìαñ»αñ╛αñòαñ░αñúαñé αñÜ', icon: '≡ƒôû', iconBg: 'bg-purple-100', iconColor: 'text-purple-500', progress: 91, modules: 18 },
        { id: "hindi", title: 'αñ╣αñ┐αñ¿αÑìαñªαÑÇ', desc: 'αñ╕αñ╛αñ╣αñ┐αññαÑìαñ»αñé αñ░αñÜαñ¿αñ╛αññαÑìαñ«αñòαñé αñ▓αÑçαñûαñ¿αñé αñÜ', icon: 'αñà', iconBg: 'bg-pink-100', iconColor: 'text-pink-500', progress: 78, modules: 11 }
      ],
      SCIENCE_CHAPTERS: [
        { id: 1, title: "αñ¬αñ╛αñªαñ¬αÑçαñ╖αÑü αñ¬αÑïαñ╖αñúαñ«αÑì", topics: 6, done: true },
        { id: 2, title: "αñ£αñ¿αÑìαññαÑüαñ╖αÑü αñ¬αÑïαñ╖αñúαñ«αÑì", topics: 5, done: true },
        { id: 3, title: "αññαñ¿αÑìαññαÑüαññαñâ αñ╡αñ╕αÑìαññαÑìαñ░αñ¬αñ░αÑìαñ»αñ¿αÑìαññαñ«αÑì", topics: 4, done: false },
        { id: 4, title: "αñèαñ╖αÑìαñ«αñ╛", topics: 7, done: false },
        { id: 5, title: "αñàαñ«αÑìαñ▓αñâ, αñòαÑìαñ╖αñ╛αñ░αñâ αñ▓αñ╡αñúαñ╛αñ¿αñ┐ αñÜ", topics: 6, done: false }
      ],
      CHAPTER_1_CONTENT: [
        { type: "text", content: "αñ╕αñ░αÑìαñ╡αÑçαñ¡αÑìαñ»αñâ αñ£αÑÇαñ╡αÑçαñ¡αÑìαñ»αñâ αñåαñ╣αñ╛αñ░αñ╕αÑìαñ» αñåαñ╡αñ╢αÑìαñ»αñòαññαñ╛ αñ¡αñ╡αññαñ┐αÑñ αñ¬αñ╛αñªαñ¬αñ╛αñâ αñÅαñ╡ αñ╕αÑìαñ╡αñ¡αÑïαñ£αñ¿αñé αñ╕αÑìαñ╡αñ»αñé αñ¿αñ┐αñ░αÑìαñ«αñ╛αññαÑüαñé αñ╕αñ«αñ░αÑìαñÑαñ╛αñâ αñ╕αñ¿αÑìαññαñ┐αÑñ αññαÑç αñ¬αÑìαñ░αñòαñ╛αñ╢αñ╕αñéαñ╢αÑìαñ▓αÑçαñ╖αñú-αñ¬αÑìαñ░αñòαÑìαñ░αñ┐αñ»αñ╛αñªαÑìαñ╡αñ╛αñ░αñ╛ αñÅαññαññαÑì αñòαÑüαñ░αÑìαñ╡αñ¿αÑìαññαñ┐αÑñ αñàαññαÑìαñ░ αñ¬αñ╛αñªαñ¬αñ╛αñâ αñ╕αÑéαñ░αÑìαñ»αñ╛αññαñ¬αñ╕αÑìαñ», αñ£αñ▓αñ╕αÑìαñ», α▓àαñÖαÑìαñùαñ╛αñ░αñªαÑìαñ╡αñ┐αñ¬αÑìαñ░αñ£αñ╛αñ░αñòαñ╕αÑìαñ» (Carbon dioxide) αñÜ αñ╕αñ╛αñ╣αñ╛αñ»αÑìαñ»αÑçαñ¿ αñ╕αÑìαñ╡αñ╕αÑìαñ» αñ«αÑüαñûαÑìαñ»αÑïαñ░αÑìαñ£αñ╛αñ«αÑì 'αñùαÑìαñ▓αÑéαñòαÑïαñ£' αñ¿αñ┐αñ░αÑìαñ«αñ╛αñ¿αÑìαññαñ┐αÑñ" },
        { type: "avatar_video", topic: "αñ¬αñ╛αñªαñ¬αñ╛αñâ αñòαñÑαñé αñ╕αÑìαñ╡αñ¡αÑïαñ£αñ¿αñé αñòαÑüαñ░αÑìαñ╡αñ¿αÑìαññαñ┐", video: leafVideo, thumbnail: "https://placehold.co/640x360/F5A623/FFFFFF?text=AI+Teacher+Γû╢", languages: ["English", "Hindi", "Sanskrit"] },
        { type: "text", content: "αñ¬αÑìαñ░αñòαñ╛αñ╢αñ╕αñéαñ╢αÑìαñ▓αÑçαñ╖αñúαñé αñ«αÑüαñûαÑìαñ»αññαñ»αñ╛ αñ¬αñ╛αñªαñ¬αñ╛αñ¿αñ╛αñé αñ¬αñ░αÑìαñúαÑçαñ╖αÑü αñ¡αñ╡αññαñ┐αÑñ αñ¬αñ░αÑìαñúαÑçαñ╖αÑü 'αñ╣αñ░αñ┐αññαñòαÑÇ' (Chlorophyll) αñçαññαñ┐ αñ╣αñ░αñ┐αññαñ╡αñ░αÑìαñúαñòαñâ αñ¡αñ╡αññαñ┐, αñ»αñâ αñ╕αÑéαñ░αÑìαñ»αñ╛αññαñ¬αñé αñùαÑâαñ╣αÑìαñúαñ╛αññαñ┐αÑñ αñ¬αñ░αÑìαñúαÑçαñ╖αÑü αñ╕αÑéαñòαÑìαñ╖αÑìαñ«αñ╛αñúαñ┐ αñ¢αñ┐αñªαÑìαñ░αñ╛αñúαñ┐ αñàαñ¬αñ┐ αñ╕αñ¿αÑìαññαñ┐, αñ»αÑêαñâ αñàαñÖαÑìαñùαñ╛αñ░αñªαÑìαñ╡αñ┐αñ¬αÑìαñ░αñ£αñ╛αñ░αñòαñâ αñ¬αñ╛αñªαñ¬αñ╕αÑìαñ» αñàαñ¿αÑìαññαñâ αñ¬αÑìαñ░αñ╡αñ┐αñ╢αññαñ┐αÑñ" },
        { type: "cartoon_video", topic: "αñ¬αñ╛αñªαñ¬αÑç αñ£αñ▓αñ╕αÑìαñ» αñ»αñ╛αññαÑìαñ░αñ╛", video: plantVideo, thumbnail: "https://placehold.co/640x480/2E7D52/FFFFFF?text=≡ƒÄ¿+Visual+Story+Γû╢", languages: ["English", "Hindi", "Sanskrit"] },
        { type: "text", content: "αñ¬αñ╛αñªαñ¬αñ╛αñâ 'αñ╕αÑìαñ╡αñ¬αÑïαñ╖αñ┐αñúαñâ' αñçαññαñ┐ αñòαñÑαÑìαñ»αñ¿αÑìαññαÑç αñ»αññαÑïαñ╣αñ┐ αññαÑç αñ╕αÑìαñ╡αñ¡αÑïαñ£αñ¿αñé αñ╕αÑìαñ╡αñ»αñé αñ¿αñ┐αñ░αÑìαñ«αñ╛αñ¿αÑìαññαñ┐αÑñ αñ¬αñ╢αñ╡αñâ αñ«αñ╛αñ¿αñ╡αñ╛αñâ αñÜ 'αñ¬αñ░αñ¬αÑïαñ╖αñ┐αñúαñâ' αñçαññαñ┐ αñòαñÑαÑìαñ»αñ¿αÑìαññαÑç αñ»αññαÑïαñ╣αñ┐ αññαÑç αñåαñ╣αñ╛αñ░αñ╛αñ» αñàαñ¿αÑìαñ»αÑçαñ╖αÑü αñ¬αñ╛αñªαñ¬αÑçαñ╖αÑü αñ£αñéαññαÑüαñ╖αÑü αñ╡αñ╛ αñåαñ╢αÑìαñ░αñ┐αññαñ╛αñâ αñ¡αñ╡αñ¿αÑìαññαñ┐αÑñ" }
      ]
    };
  }

  // Fallback to English
  return {
    SUBJECTS: [
      { id: "maths", title: 'Mathematics', desc: 'Calculus & Trigonometry Fundamentals', icon: '≡ƒº«', iconBg: 'bg-orange-100', iconColor: 'text-orange-500', progress: 85, modules: 12 },
      { id: "science", title: 'Science', desc: 'Organic Chemistry & Particle Physics', icon: '≡ƒö¼', iconBg: 'bg-green-100', iconColor: 'text-green-500', progress: 64, modules: 9 },
      { id: "social", title: 'Social Studies', desc: 'Modern Indian History & Civics', icon: '≡ƒîÄ', iconBg: 'bg-blue-100', iconColor: 'text-blue-500', progress: 42, modules: 5 },
      { id: "english", title: 'English', desc: 'Poetry, Rhetoric & Advanced Grammar', icon: '≡ƒôû', iconBg: 'bg-purple-100', iconColor: 'text-purple-500', progress: 91, modules: 18 },
      { id: "hindi", title: 'Hindi', desc: 'Literature & Creative Writing', icon: 'αñà', iconBg: 'bg-pink-100', iconColor: 'text-pink-500', progress: 78, modules: 11 }
    ],
    SCIENCE_CHAPTERS: [
      { id: 1, title: "Nutrition in Plants", topics: 6, done: true },
      { id: 2, title: "Nutrition in Animals", topics: 5, done: true },
      { id: 3, title: "Fibre to Fabric", topics: 4, done: false },
      { id: 4, title: "Heat", topics: 7, done: false },
      { id: 5, title: "Acids, Bases and Salts", topics: 6, done: false }
    ],
    CHAPTER_1_CONTENT: [
      { type: "text", content: "All living organisms require food. Plants are the only organisms that can prepare their own food. They do this through a process called photosynthesis. In this process, plants use sunlight, water, and carbon dioxide to make glucose ΓÇö their primary source of energy." },
      { type: "avatar_video", topic: "How Plants Make Food", video: leafVideo, thumbnail: "https://placehold.co/640x360/F5A623/FFFFFF?text=AI+Teacher+Γû╢", languages: ["English", "Hindi", "Sanskrit"] },
      { type: "text", content: "Photosynthesis takes place mainly in the leaves of plants. Leaves have a green pigment called chlorophyll, which absorbs sunlight. The leaves also have tiny pores called stomata through which carbon dioxide enters the plant." },
      { type: "cartoon_video", topic: "Journey of Water in a Plant", video: plantVideo, thumbnail: "https://placehold.co/640x480/2E7D52/FFFFFF?text=≡ƒÄ¿+Visual+Story+Γû╢", languages: ["English", "Hindi", "Sanskrit"] },
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
          onNavigate={navigateTo}
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
          onNavigate={navigateTo}
        />
      )}

      {view === 'aiteacher' && (
        <AITeacherView 
          profile={profile}
          onBack={() => navigateTo('dashboard')}
          onNavigate={navigateTo}
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
        <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active={activeView === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<BookOpen className="w-5 h-5" />} label="My Learning" active={activeView === 'learning'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<FileText className="w-5 h-5" />} label="Assignments" />
        <NavItem icon={<Library className="w-5 h-5" />} label="Library" />
        <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
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

function DashboardView({ profile, onSelectSubject }) {
  const name = profile.name || 'Arjun';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav profile={profile} setProfile={setProfile} />
      <div className="flex flex-1">
        <Sidebar activeView="dashboard" onNavigate={() => {}} />
        
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

function ChapterListView({ subject, profile, onSelectChapter, onBack }) {
  const chapters = subject.id === 'science' ? SCIENCE_CHAPTERS : [];
  const [activeId, setActiveId] = useState(1);
  const activeChapter = chapters.find(c => c.id === activeId);

  const language = profile?.language || 'English';
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <TopNav profile={profile} setProfile={setProfile} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView="learning" onNavigate={onBack} />
        
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

function ReaderView({ subject, chapter, profile, onBack }) {
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

