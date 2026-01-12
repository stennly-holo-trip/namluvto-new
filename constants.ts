
import { Interpreter, Job, JobStatus } from './types';

export const MOCK_INTERPRETERS: Interpreter[] = [
  {
    id: '1',
    name: 'Jan Novák',
    avatarUrl: 'https://picsum.photos/seed/jan/200',
    bio: 'Profesionální dabér s 10 lety zkušeností v reklamě, dokumentech a audioknihách. Můj hlas je hluboký a uklidňující.',
    tags: ['Hluboký', 'Uklidňující', 'Reklama', 'Muž'],
    rating: 4.9,
    reviews: 125,
    samples: [
      { id: 's1', title: 'Reklamní spot', url: '#', style: 'Reklama' },
      { id: 's2', title: 'Audiokniha (ukázka)', url: '#', style: 'Vyprávění' },
      { id: 's3', title: 'Dokumentární film', url: '#', style: 'Informativní' },
    ],
  },
  {
    id: '2',
    name: 'Eva Dvořáková',
    avatarUrl: 'https://picsum.photos/seed/eva/200',
    bio: 'Energická a všestranná herečka. Specializuji se na animované postavy, e-learning a firemní prezentace. Můj hlas je jasný a energický.',
    tags: ['Energický', 'Jasný', 'Animace', 'Žena'],
    rating: 4.8,
    reviews: 98,
    samples: [
      { id: 's4', title: 'Animovaná postava', url: '#', style: 'Animace' },
      { id: 's5', title: 'E-learning modul', url: '#', style: 'Vzdělávací' },
      { id: 's6', title: 'Telefonní ústředna', url: '#', style: 'IVR' },
    ],
  },
  {
    id: '3',
    name: 'Petr Svoboda',
    avatarUrl: 'https://picsum.photos/seed/petr/200',
    bio: 'Zkušený rozhlasový moderátor s příjemným středním hlasem. Ideální pro podcasty, zpravodajství a delší vyprávění.',
    tags: ['Příjemný', 'Rozhlasový', 'Podcast', 'Muž'],
    rating: 5.0,
    reviews: 210,
    samples: [
      { id: 's7', title: 'Podcast intro', url: '#', style: 'Podcast' },
      { id: 's8', title: 'Zpravodajská reportáž', url: '#', style: 'Zpravodajství' },
    ],
  },
  {
    id: '4',
    name: 'Lucie Černá',
    avatarUrl: 'https://picsum.photos/seed/lucie/200',
    bio: 'Mladý a dynamický hlas, skvělý pro moderní značky, reklamy pro mladé a sociální sítě.',
    tags: ['Dynamický', 'Mladistvý', 'Sociální sítě', 'Žena'],
    rating: 4.7,
    reviews: 75,
    samples: [
      { id: 's9', title: 'Instagram Story Ad', url: '#', style: 'Reklama' },
      { id: 's10', title: 'YouTube video voiceover', url: '#', style: 'Vyprávění' },
    ],
  },
];

export const MOCK_JOBS_CUSTOMER: Job[] = [
    { id: 'c1', title: 'Namluvit reklamní spot pro rádio', customerName: 'Digital Agency s.r.o.', interpreterName: 'Jan Novák', price: 5000, status: JobStatus.Completed, description: 'Krátký 30s spot pro regionální rádio.', deadline: '2023-10-15' },
    { id: 'c2', title: 'Voiceover pro produktové video', customerName: 'Digital Agency s.r.o.', interpreterName: 'Eva Dvořáková', price: 8000, status: JobStatus.InReview, description: 'Dynamický voiceover pro 2 min video.', deadline: '2023-10-25' },
    { id: 'c3', title: 'Nahrát úvodní znělku podcastu', customerName: 'Digital Agency s.r.o.', price: 2500, status: JobStatus.Open, description: 'Hledáme příjemný hlas pro náš nový podcast.', deadline: '2023-11-01' },
];

export const MOCK_JOBS_INTERPRETER: Job[] = [
    { id: 'i1', title: 'Voiceover pro produktové video', customerName: 'E-shop ProVšechny', interpreterName: 'Eva Dvořáková', price: 8000, status: JobStatus.InReview, description: 'Dynamický voiceover pro 2 min video.', deadline: '2023-10-25' },
    { id: 'i2', title: 'E-learning kurz o marketingu', customerName: 'Vzdělávací Institut', interpreterName: 'Eva Dvořáková', price: 15000, status: JobStatus.InProgress, description: 'Namluvení 10 modulů e-learningového kurzu.', deadline: '2023-11-10' },
];

export const MOCK_PUBLIC_JOBS: Job[] = [
    { id: 'p1', title: 'Hledáme hlas pro audioknihu (fantasy)', customerName: 'Vydavatelství Příběh', price: 25000, status: JobStatus.Open, description: 'Hledáme vypravěče pro fantasy román o rozsahu 10 hodin. Požadujeme schopnost rozlišit více postav.', deadline: '2023-11-30' },
    { id: 'p2', title: 'Namluvení IVR pro call centrum', customerName: 'Tech Solutions a.s.', price: 6000, status: JobStatus.Open, description: 'Potřebujeme profesionální a srozumitelný hlas pro naši telefonní ústřednu.', deadline: '2023-11-05' },
];
