export const examplePrompts = [
  'Remote frontend internship in tech industry using React',
  'React developers in Delhi with 5+ years of experience',
  'Design internships that allow remote work and stipend',
  'SaaS companies hiring UI engineers in Bengaluru',
  'Profiles with Next.js + TypeScript and fintech exposure',
  'Product designers comfortable with AI co-pilots',
  'HRs looking for MERN developers available immediately'
]

export const trendingPrompts = [
  'React developer in Delhi with fintech background',
  'Frontend engineers who know Tailwind + TypeScript',
  'Remote UI internships with stipend above ₹20k',
  'Profiles open to relocation to Bengaluru',
  'Freshers with React Native shipping experience'
]

export const aiInsights = [
  {
    title: 'Lean towards hybrid teams this week.',
    bullets: [
      'Hybrid roles offer 15% higher stipends than remote-only listings.',
      'Design-focused roles are responding 2x faster when resumes mention AI tools.',
      'Delhi + Bengaluru together cover 68% of open prompts right now.'
    ]
  },
  {
    title: 'Talent pool heatmap shows Delhi running hot.',
    bullets: [
      'Mid-level React devs in NCR move within 18 days on average.',
      'Profiles citing TypeScript and testing stand out in HR shortlists.',
      'Availability signals (notice <= 30d) lift reply rates by 27%.'
    ]
  },
  {
    title: 'Stipend sensitive search detected.',
    bullets: [
      '₹30–35k is the sweet spot for remote internships with React.',
      'Companies pairing mentorship programs close hiring loops 40% faster.',
      'Include “UI polish” keywords for better design-role matches.'
    ]
  }
]

// Generators
const roles = ['Frontend Developer', 'React Intern', 'UI Engineer', 'Product Designer', 'Fullstack Dev', 'MERN Stack Lead', 'Backend Engineer', 'DevOps Engineer']
const companies = ['TechFlow', 'Nebula', 'Orbit', 'Pixel', 'Zenith', 'Apex', 'Nova', 'Pulse', 'Quantum', 'Vertex', 'Echo', 'Flux', 'Gravity', 'Horizon', 'Iris']
const locations = ['Remote', 'Bengaluru', 'Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai', 'Gurugram']
const skillsList = ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Figma', 'Next.js', 'GraphQL', 'AWS', 'Docker', 'Python', 'Go', 'Rust', 'Svelte', 'Vue']

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateJobs(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `job-${i + 1}`,
    title: getRandom(roles),
    company: `${getRandom(companies)} ${['Labs', 'Systems', 'Tech', 'AI', 'Solutions'][Math.floor(Math.random() * 5)]}`,
    location: getRandom(locations),
    salary: `₹${20 + Math.floor(Math.random() * 80)},000 monthly`,
    experience: `${Math.floor(Math.random() * 5)} years`,
    duration: `${1 + Math.floor(Math.random() * 6)} months`,
    mode: Math.random() > 0.5 ? 'Remote' : 'Hybrid',
    applied: Math.floor(Math.random() * 50),
    impressions: 500 + Math.floor(Math.random() * 5000),
    deadline: `${1 + Math.floor(Math.random() * 20)} days left`,
    tags: Array.from({ length: 3 }, () => getRandom(skillsList)),
    industry: ['SaaS', 'Fintech', 'EdTech', 'HealthTech', 'Web3'][Math.floor(Math.random() * 5)]
  }))
}

function generateProfiles(count) {
  const firstNames = ['Aarav', 'Vihaan', 'Aditya', 'Sai', 'Reyansh', 'Diya', 'Ananya', 'Saanvi', 'Myra', 'Zara', 'Ishaan', 'Kabir']
  const lastNames = ['Sharma', 'Verma', 'Singh', 'Patel', 'Gupta', 'Kumar', 'Rao', 'Iyer', 'Mehta', 'Reddy', 'Nair']

  return Array.from({ length: count }, (_, i) => ({
    id: `profile-${i + 1}`,
    name: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
    role: getRandom(roles),
    years: 1 + Math.floor(Math.random() * 10),
    location: getRandom(locations),
    currentCompany: getRandom(companies),
    previousCompany: getRandom(companies),
    college: ['IIT', 'NIT', 'BITS', 'VIT', 'SRM', 'DTU'][Math.floor(Math.random() * 6)],
    availability: Math.random() > 0.7 ? 'Immediate' : '1 month notice',
    lastActive: `${Math.floor(Math.random() * 24)}h ago`,
    highlights: ['Top performer', 'Open source contributor', 'Hackathon winner', 'Team lead'],
    skills: Array.from({ length: 4 }, () => getRandom(skillsList))
  }))
}

export const jobs = generateJobs(120)
export const profiles = generateProfiles(120)

export default {
  examplePrompts,
  trendingPrompts,
  aiInsights,
  jobs,
  profiles
}
