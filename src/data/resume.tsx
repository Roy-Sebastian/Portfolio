import { Icons } from '@/components/icons';
import { Docker } from '@/components/ui/svgs/docker';
import { Golang } from '@/components/ui/svgs/golang';
import { Laravel } from '@/components/ui/svgs/laravel';
import { NextjsIconDark } from '@/components/ui/svgs/nextjsIconDark';
import { Nodejs } from '@/components/ui/svgs/nodejs';
import { Postgresql } from '@/components/ui/svgs/postgresql';
import { ReactLight } from '@/components/ui/svgs/reactLight';
import { Typescript } from '@/components/ui/svgs/typescript';
import { HomeIcon } from 'lucide-react';

export const DATA = {
  name: 'Roy Sebastian Surbakti',
  initials: 'RS',
  url: 'https://portfolio-m691v501o-sebastian-604c.vercel.app',
  location: 'Indonesia',
  locationLink: '#',
  description:
    'Fresh Graduate Software Developer with an interest in backend and web development. I enjoy building applications, REST APIs, and learning new technologies.',
  summary:
    'Informatics Engineering graduate with a GPA of 3.39/4.00. Focused on Software Development, particularly web and backend development. Experienced in using React.js, Node.js, Express.js, PostgreSQL, and Laravel to build applications and REST APIs, including database management, authentication, and frontend-backend integration. Currently learning Golang to strengthen backend development capabilities. Highly curious, adaptive to new technologies, and accustomed to self-directed learning. Interested in contributing as a Software Developer/Software Engineer in building software solutions for real-world needs.',
  avatarUrl: '/me.png',

  skills: [
    { name: 'React', icon: ReactLight },
    { name: 'Next.js', icon: NextjsIconDark },
    { name: 'TypeScript', icon: Typescript },
    { name: 'Node.js', icon: Nodejs },
    { name: 'Go', icon: Golang },
    { name: 'PostgreSQL', icon: Postgresql },
    { name: 'Laravel', icon: Laravel },
    // { name: 'Docker', icon: Docker },
  ],

  navbar: [{ href: '/', icon: HomeIcon, label: 'Home' }],

  contact: {
    email: 'roysurbakti23@gmail.com',
    tel: '',
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/Roy-Sebastian',
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/roy-sebastian-surbakti/',
        icon: Icons.linkedin,
        navbar: true,
      },

      email: {
        name: 'Send Email',
        url: 'mailto:roysurbakti23@gmail.com',
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: 'PT Riau Andalan Pulp And Paper',
      href: 'https://www.aprilasia.com/id/',
      badges: [],
      location: 'Pangkalan Kerinci, Riau',
      title: 'Software Developer Intern',
      logoUrl: '/rapp.jpg',
      start: 'June 2025',
      end: 'August 2025',
      description:
        'Completed a Software Developer internship at PT Riau Andalan Pulp and Paper (RAPP), part of APRIL Group, focusing on the topic "Web-Based IT Developer Task Management Information System using Modified Waterfall Method".\n• Conducted software testing on internal web applications to support the developer team.\n• Involved in full-stack development using Node.js, Express.js, and React.js, including database schema design, REST API creation, and JWT authentication implementation.\n• Assisted in data migration using SQL Server Migration Assistant.',
    },
  ],

  organization: [
    {
      company: 'INFEST HMIF - Institut Teknologi Sumatera',
      href: 'https://www.instagram.com/infest.hmif/',
      badges: [],
      location: 'Lampung, Indonesia',
      title: 'Sub Head of Operations - Logistics Division',
      logoUrl: '/infest.jpg',
      start: 'Mar 2024',
      end: 'Aug 2024',
      description:
        'INFEST HMIF (Informatics Festival) is an event series celebrating the anniversary of the Informatics Engineering Study Program at ITERA, organized by HMIF. This event serves as a platform to strengthen relationships between students, lecturers, and alumni.\n• Efficiently managed the distribution and placement of logistics across various event locations.\n• Coordinated with cross-functional divisions to ensure equipment availability and smooth event operations.\n• Responsible for providing and managing primary and backup equipment for peak events and competitions.\n• Successfully led the logistics team to support the seamless execution of the entire INFEST HMIF event series.',
    },
  ],

  education: [
    {
      school: 'Institut Teknologi Sumatera',
      href: 'https://www.itera.ac.id/',
      degree: "Bachelor's Degree in Informatics Engineering (GPA: 3.39 / 4.00)",
      logoUrl: '/itera.png',
      start: '2022',
      end: '2026',
      description:
        '• Relevant Coursework: Algorithms & Programming I & II, Software Engineering Fundamentals, Databases, Object-Oriented Programming, Data Structures & Algorithms, Selected Topics in Informatics, Web Programming, Database Management, Information Systems, Advanced Web Programming, Advanced Information Systems, IT Project Management, Mobile Application Development.',
    },
  ],

  projects: [
    {
      title: 'Todo REST API with Go — Authentication, Redis & PostgreSQL',
      href: 'https://github.com/Roy-Sebastian/Todo-Management-REST-API---Go-PostgreSQL-Redis-Authentication',
      dates: '2026 - Now',
      active: true,
      description:
        'A web-based todo list application developed to help manage tasks, track progress, and stay organized.',
      technologies: ['Golang', 'Gin', 'GORM', 'PostgreSQL'],
      links: [
        {
          type: 'Source',
          href: 'https://github.com/Roy-Sebastian/GO-crud-gin',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '',
      images: [],
      video: '',
    },
    {
      title: "Ron's Guest House",
      href: '',
      dates: '2025 - 2026',
      active: true,
      description:
        'A web-based accommodation management system developed to help manage reservations, rooms, guests, transactions, revenue, expenses, and operational reports.',
      technologies: [
        'Node.js',
        'Express.js',
        'React.js',
        'Next.js',
        'PostgreSQL',
        'Midtrans',
      ],
      links: [],
      image: '/rons1.png',
      images: [
        '/rons1.png',
        '/rons2.png',
        '/rons3.png',
        '/rons4.png',
        '/rons5.png',
        '/rons6.png',
        '/rons7.png',
        '/rons8.png',
      ],
      video: '',
    },
    
    {
      title: 'PERN Stack Todo Application',
      href: 'https://github.com/Roy-Sebastian/belajar-PERN',
      dates: '2026',
      active: true,
      description:
        'A web-based todo list application developed to help manage tasks, track progress, and stay organized.',
      technologies: [
        'Node.js',
        'Express.js',
        'React.js',
        'PostgreSQL',
        
      ],
      links: [
        {
          type: 'Source',
          href: 'https://github.com/Roy-Sebastian/belajar-PERN',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '',
      images: [],
      video: '',
    },
    {
      title: 'BWA Course - Apotik',
      href: 'https://github.com/Roy-Sebastian/apotik',
      dates: '2025',
      active: true,
      description:
        'A web-based pharmacy management system built with Laravel 11 and Spatie User Roles to handle medicine inventory, user permissions, transactions, and sales reporting.',
      technologies: [
        'Laravel',
        'PHP',
        'Spatie',
        'Tailwind',
        'PostgreSQL',
      ],
      links: [
        {
          type: 'Source',
          href: 'https://github.com/Roy-Sebastian/apotik',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '/apotik1.png',
      images: [
        '/apotik1.png',
        '/apotik2.png',
        '/apotik3.png',
        '/apotik4.png',
        '/apotik5.png',
      ],
      video: '',
    },
    {
      title: 'SDN Lematang',
      href: '',
      dates: '2024',
      active: true,
      description:
        'A web-based school information system developed to manage profile, academic activities, announcements, school events, and organizational structure.',
      technologies: [
        'Node.js',
        'Express.js',
        'React.js',
        'Next.js',
        'PostgreSQL',
      ],
      links: [],
      image: '/sdn1.png',
      images: [
        '/sdn1.png',
        '/sdn2.png',
        '/sdn3.png',
        '/sdn4.png',
        '/sdn5.png',
        '/sdn6.png',
        '/sdn7.png',
      ],
      video: '',
    },
  ],

  certificates: [
    {
      title: 'Belajar Back-End Pemula dengan JavaScript',
      issuer: 'Dicoding Indonesia',
      date: 'Desember 2024',
      credentialId: '98XW5105LPM3',
      credentialUrl: 'https://dicoding.com/certificates/98XW5105LPM3',
      images: [
        '/Sertifikat/dicoding backend_page-0001.jpg',
        '/Sertifikat/dicoding backend_page-0002.jpg',
      ],
    },
    {
      title: 'Belajar Dasar Pemrograman JavaScript',
      issuer: 'Dicoding Indonesia',
      date: 'Desember 2024',
      credentialId: 'L4PQ5LENOZO1',
      credentialUrl: 'https://dicoding.com/certificates/L4PQ5LENOZO1',
      images: [
        '/Sertifikat/dicoding js_page-0001.jpg',
        '/Sertifikat/dicoding js_page-0002.jpg',
        '/Sertifikat/dicoding js_page-0003.jpg',
      ],
    },
    {
      title: 'Laravel 11 & Spatie User Roles: Bikin Website Apotek Online',
      issuer: 'BuildWithAngga',
      date: 'Juli 2025',
      credentialId: 'uRfcvVbKMp',
      credentialUrl: '#',
      images: ['/Sertifikat/laravel apotik_page-0001.jpg'],
    },
    {
      title: 'Fundamental Course — Intro to Software Engineering',
      issuer: 'RevoU',
      date: 'July 2023',
      credentialId: '',
      credentialUrl: '#',
      images: ['/Sertifikat/revoU.jpg'],
    },
  ],
} as const;
