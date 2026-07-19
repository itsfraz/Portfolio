export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  iconName: string; // Used to dynamically map icons
  bgGradient: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  description?: string[];
  skills?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
}

export const PROFILE: Profile = {
  name: 'Mohd Faraj Ansari',
  title: 'Full Stack Developer / Software Engineer',
  email: 'faraj.ansari16@gmail.com',
  phone: '+91 6391440016',
  location: 'Kanpur, India',
  github: 'github.com/itsfraz',
  linkedin: 'linkedin.com/in/faraj-ansari/',
  summary: 'Highly motivated and performance-driven Full Stack Developer specializing in the MERN Stack. Proven track record of building accessible, responsive, and pixel-perfect web applications. Expertise in database design, REST API architecture, and state-management modules, paired with a commitment to clean code standards, optimization, and seamless user experiences.'
};

export const EXPERIENCE: Experience[] = [
  {
    title: 'Front-End Engineer',
    company: 'Woodigital Solutions Private Limited',
    duration: 'May 2024 - June 2025',
    location: 'Noida, India',
    description: [
      'Developed responsive UIs using React.js and Tailwind CSS to enhance user experience.',
      'Converted design wireframes into accessible, high-quality web components.',
      'Managed application state via React Hooks/Context API and integrated third-party APIs.',
      'Debugged and tested applications to ensure fast load times and cross-browser compatibility.',
      'Maintained version control and collaborated with back-end teams using Git/GitHub.'
    ],
    skills: ['React.js', 'Tailwind CSS', 'JavaScript (ES6)', 'API Integration', 'Git / GitHub', 'State Management']
  }
];

export const EDUCATION: Education[] = [
  {
    degree: 'Master in Computer Applications (MCA)',
    institution: 'Dr. Virendra Swarup Institute of Computer Studies',
    duration: '2022 - 2024',
    location: 'Kanpur, India',
    description: [
      'Specialized in Advanced Software Engineering, Cloud Computing, Database Administration, and Full-Stack Architectures.',
      'Developed end-to-end web applications as part of curriculum milestones.'
    ],
    skills: ['MERN Stack', 'RDBMS / SQL', 'Object-Oriented Programming', 'Data Structures & Algorithms']
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Allenhouse Business School',
    duration: '2018 - 2021',
    location: 'Kanpur, India',
    description: [
      'Gained rigorous grounding in core Computer Science concepts including Operating Systems, Networking, Java, and Web Development.'
    ],
    skills: ['Core Java', 'C / C++', 'HTML5 / CSS3', 'JavaScript', 'SQL Fundamentals']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Echo Chat App',
    description: 'A real-time, highly-interactive social networking application enabling secure communication. Designed and implemented instant messaging, real-time connection status tracking, and group chat rooms using Socket.io. Configured an optimized MongoDB schema with indexing for fast message retrievals. Integrated robust JSON Web Token (JWT) based authentication and custom route guards, resulting in a secure, responsive, and low-latency user communication portal.',
    tags: ['React', 'NodeJs', 'FullStack'],
    iconName: 'Users',
    bgGradient: 'bg-gradient-to-br from-gray-900 to-gray-800',
    githubUrl: 'https://github.com/itsfraz/FriendApp',
    liveUrl: 'https://echo-chat-app-six.vercel.app/login'
  },
  {
    id: 2,
    title: 'Pearl Hotel',
    description: 'A comprehensive, enterprise-level hospitality booking application. Features secure user accounts, dynamic search filters for room availability, and an interactive reservation calendar. Fully integrated Razorpay payment gateway with Webhook verification for secure financial transactions. Developed a robust administrator dashboard providing real-time data analytics, room status updates, user management controls, and transactional reporting tools.',
    tags: ['React', 'NodeJs', 'MongoDB', 'FullStack'],
    iconName: 'Hotel',
    bgGradient: 'bg-gradient-to-br from-[#2b5876] to-[#4e4376]',
    githubUrl: 'https://github.com/itsfraz/Pearl-Hotel.git',
    liveUrl: 'https://pearl-hotel-eight.vercel.app/'
  },
  {
    id: 3,
    title: 'Habit Tracker',
    description: 'A full-stack self-productivity web application designed to encourage consistent habit building. Features interactive user dashboard showing current streaks, dynamic SVG-based analytics charts, and gamified reward feedback systems. Engineered a robust backend API to log daily check-ins, compute streak persistence metrics on the fly, and store temporal data in MongoDB with automated aggregation pipelines.',
    tags: ['React', 'NodeJs', 'MongoDB', 'FullStack'],
    iconName: 'CheckCircle',
    bgGradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    githubUrl: 'https://github.com/itsfraz/Habit-tracker-app.git',
    liveUrl: 'https://habit-tracker-app-seven-xi.vercel.app/'
  },
  {
    id: 4,
    title: 'Wizard Diary',
    description: 'An interactive AI-powered "magic diary" wrapping a real-time LLM chat experience in an immersive, physically-animated book UI.',
    tags: ['React', 'JavaScript', 'Animation'],
    iconName: 'BookOpen',
    bgGradient: 'bg-gradient-to-br from-[#1f1c2c] to-[#928dab]',
    liveUrl: 'https://wizard-diary.vercel.app/'
  },
  {
    id: 5,
    title: 'Multi Project',
    description: 'High-performance interactive 3D application with advanced UI/UX and seamless animations.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    iconName: 'Box',
    bgGradient: 'bg-[radial-gradient(circle_at_center,_#2b32b2,_#1488cc)]',
    liveUrl: 'https://app-all-in-one.netlify.app/'
  },
  {
    id: 6,
    title: 'BlackJack Edition',
    description: 'A premium BlackJack game featuring 3D animations, sound effects, and a realistic casino atmosphere.',
    tags: ['React', 'Tailwind'],
    iconName: 'Dice5',
    bgGradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#dc2f02]',
    liveUrl: 'https://blackjackgamepro.onrender.com'
  },
  {
    id: 7,
    title: 'Gate Keeper App',
    description: 'A digital logbook application to monitor and record visitor entries and exits for building security.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    iconName: 'Shield',
    bgGradient: 'bg-gradient-to-br from-[#11998e] to-[#38ef7d]',
    liveUrl: 'https://itsfraz.github.io/People-Entry-Counter/'
  },
  {
    id: 8,
    title: 'Rahi Equestrian',
    description: 'A commercial website for an equestrian product manufacturer, featuring product catalogs and inquiry forms.',
    tags: ['Bootstrap', 'JQuery', 'JavaScript'],
    iconName: 'Horse',
    bgGradient: 'bg-gradient-to-r from-[#f83600] to-[#f9d423]',
    liveUrl: 'https://rahiequestrian.netlify.app/'
  },
  {
    id: 9,
    title: 'Multi-Game Hub',
    description: 'A collection of 4 classic browser games in one portal. Features 2048, Snake, and more.',
    tags: ['JavaScript', 'Game'],
    iconName: 'Gamepad2',
    bgGradient: 'bg-gradient-to-br from-[#d4fc79] to-[#96e6a1]',
    liveUrl: 'https://gamehai.netlify.app/'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Full Stack Web Development Certification',
    issuer: 'Udemy / Online Academy',
    date: '2024',
    credentialId: 'UC-xxxxxx',
    link: '#'
  },
  {
    title: 'AWS Certified Cloud Practitioner (In Progress)',
    issuer: 'Amazon Web Services',
    date: 'Expected 2026',
    credentialId: '',
    link: '#'
  }
];

export const SKILLS = {
  frontend: [
    { name: 'React.js / Redux Toolkit', percentage: 65 },
    { name: 'JavaScript (ES6+) / TypeScript', percentage: 75 },
    { name: 'HTML5 / CSS3 / Tailwind CSS', percentage: 85 },
    { name: 'Responsive UI Design & UX Principles', percentage: 80 }
  ],
  backend: [
    { name: 'Node.js / Express.js', percentage: 50 },
    { name: 'REST APIs Development', percentage: 95 },
    { name: 'Relational Databases & SQL', percentage: 60 },
    { name: 'MongoDB / NoSQL Concepts', percentage: 65 }
  ],
  tools: [
    'Git & Distributed Version Control',
    'Postman API Testing',
    'VS Code Power-user',
    'AWS Cloud (Deployments)',
    'Figma (UI Design Integration)',
    'Docker (Basic Containerization)'
  ]
};
