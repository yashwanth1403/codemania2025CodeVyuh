// Demo data for development and testing

// User data with skills, interests and social links
export const demoUsers = [
  {
    id: "user1",
    clerkId: "user_2NZkH7AhZP9C7x",
    email: "john@example.com",
    name: "John Doe",
    username: "johndoe",
    avatarUrl: "https://i.pravatar.cc/150?u=john",
    profileComplete: true,
    skills: [
      { name: "JavaScript", category: "Development" },
      { name: "React", category: "Development" },
      { name: "UI/UX", category: "Design" },
    ],
    interests: [
      { name: "Web Development", category: "Development" },
      { name: "AI", category: "Technology" },
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/johndoe" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
    ],
    xpPoints: 450,
  },
  {
    id: "user2",
    clerkId: "user_7YTkH9AhFP3C2x",
    email: "jane@example.com",
    name: "Jane Smith",
    username: "janesmith",
    avatarUrl: "https://i.pravatar.cc/150?u=jane",
    profileComplete: true,
    skills: [
      { name: "Python", category: "Development" },
      { name: "Data Analysis", category: "Data Science" },
      { name: "Machine Learning", category: "Data Science" },
    ],
    interests: [
      { name: "Data Science", category: "Technology" },
      { name: "Cloud Computing", category: "Technology" },
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/janesmith" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/janesmith" },
    ],
    xpPoints: 350,
  },
  {
    id: "user3",
    clerkId: "clerk_user3",
    name: "Miguel Rodriguez",
    username: "miguelr",
    email: "miguel@example.com",
    bio: "Backend developer specializing in Python and Django. Interested in data science and machine learning.",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    experienceLevel: "Expert",
    profileComplete: true,
    xpPoints: 890,
    skills: [
      { name: "Python", category: "Programming" },
      { name: "Django", category: "Programming" },
      { name: "PostgreSQL", category: "Programming" },
      { name: "Machine Learning", category: "Science" },
    ],
    interests: [
      { name: "Data Science", category: "Science" },
      { name: "AI", category: "Science" },
      { name: "Cloud Computing", category: "Programming" },
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/miguelr" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/miguelr" },
    ],
  },
];

// Project data
export const demoProjects = [
  {
    id: "project1",
    title: "AI-Powered Learning Assistant",
    description:
      "Building an AI assistant to help students learn programming concepts more effectively through personalized guidance and feedback.",
    createdAt: "2023-09-15T10:30:00Z",
    status: "In Progress",
    members: ["user1", "user2", "user3"],
    tags: ["AI", "Education", "Web Development"],
  },
  {
    id: "project2",
    title: "Sustainable Campus Initiative",
    description:
      "Developing a mobile app to track and reduce campus carbon footprint by monitoring energy usage and suggesting eco-friendly alternatives.",
    createdAt: "2023-09-10T14:20:00Z",
    status: "Recruiting",
    members: ["user4", "user5"],
    tags: ["Mobile", "Sustainability", "Data Visualization"],
  },
  {
    id: "project3",
    title: "AR Campus Tour Guide",
    description:
      "Creating an augmented reality tour guide for prospective students to explore campus facilities and history through their smartphones.",
    createdAt: "2023-09-05T09:15:00Z",
    status: "Planning",
    members: ["user6", "user7", "user8", "user9"],
    tags: ["AR/VR", "Mobile", "UX Design"],
  },
];

// Challenge data - formatted to match our Challenge interface
export const demoChallenges = [
  {
    id: "challenge1",
    title: "48-Hour Accessibility Hackathon",
    description:
      "Design and implement a web or mobile solution that addresses a specific accessibility challenge facing students on campus.",
    category: "Development",
    difficulty: "MEDIUM",
    startDate: "2023-10-15T00:00:00Z",
    endDate: "2023-10-17T00:00:00Z",
    deadline: "2023-10-17T23:59:59Z",
    status: "UPCOMING",
    maxParticipants: 5,
    participants: ["user1"],
    xpReward: 200,
    tags: ["Accessibility", "UX", "Rapid Prototyping"],
  },
  {
    id: "challenge2",
    title: "Data Visualization Challenge",
    description:
      "Create an interactive visualization of campus sustainability data to help inform policy decisions and raise awareness.",
    category: "Data Science",
    difficulty: "HARD",
    startDate: "2023-09-20T00:00:00Z",
    endDate: "2023-09-27T00:00:00Z",
    deadline: "2023-09-27T23:59:59Z",
    status: "ACTIVE",
    maxParticipants: 4,
    participants: ["user2", "user3"],
    xpReward: 300,
    tags: ["Data Visualization", "Sustainability", "D3.js"],
  },
  {
    id: "challenge3",
    title: "Microservice Architecture Demo",
    description:
      "Build a simple application using microservice architecture to demonstrate its benefits for scalable campus applications.",
    category: "Development",
    difficulty: "HARD",
    startDate: "2023-10-01T00:00:00Z",
    endDate: "2023-10-08T00:00:00Z",
    deadline: "2023-10-08T23:59:59Z",
    status: "UPCOMING",
    maxParticipants: 6,
    participants: [],
    xpReward: 350,
    tags: ["Microservices", "Cloud", "API Design"],
  },
  {
    id: "challenge4",
    title: "Mobile App Prototype",
    description:
      "Design and prototype a mobile app that helps connect students with similar project interests or complementary skills.",
    category: "Design",
    difficulty: "EASY",
    startDate: "2023-09-15T00:00:00Z",
    endDate: "2023-09-18T00:00:00Z",
    deadline: "2023-09-18T23:59:59Z",
    status: "COMPLETED",
    maxParticipants: 3,
    participants: ["user4", "user5", "user6"],
    xpReward: 150,
    tags: ["UI/UX", "Figma", "Prototyping"],
  },
  {
    id: "challenge5",
    title: "Accessible Web Design Challenge",
    description:
      "Redesign a popular website with a focus on accessibility for users with various disabilities.",
    requirements:
      "Before/after comparisons, accessibility audit results, and implementation",
    category: "Design",
    difficulty: "MEDIUM",
    startDate: "2024-02-15T00:00:00Z",
    endDate: "2024-02-28T23:59:59Z",
    status: "UPCOMING",
    xpReward: 200,
    participants: [],
    tags: ["Accessibility", "UX/UI", "Web Design", "HTML/CSS"],
    maxParticipants: 5,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
    createdAt: "2024-01-15T13:45:00Z",
    updatedAt: "2024-01-15T13:45:00Z",
  },
];

// Match recommendations based on skills and interests
export const demoMatches = [
  {
    userId: "user1",
    matches: [
      {
        matchedUserId: "user3",
        matchScore: 85,
        matchedSkills: ["Programming"],
        matchedInterests: ["AI"],
      },
      {
        matchedUserId: "user2",
        matchScore: 70,
        matchedSkills: ["UI Design", "CSS"],
        matchedInterests: [],
      },
    ],
  },
  {
    userId: "user2",
    matches: [
      {
        matchedUserId: "user1",
        matchScore: 70,
        matchedSkills: ["UI Design"],
        matchedInterests: [],
      },
      {
        matchedUserId: "user3",
        matchScore: 45,
        matchedSkills: [],
        matchedInterests: ["Science"],
      },
    ],
  },
  {
    userId: "user3",
    matches: [
      {
        matchedUserId: "user1",
        matchScore: 85,
        matchedSkills: ["Programming"],
        matchedInterests: ["AI"],
      },
      {
        matchedUserId: "user2",
        matchScore: 45,
        matchedSkills: [],
        matchedInterests: ["Science"],
      },
    ],
  },
];

// Badges for gamification
export const demoBadges = [
  {
    id: "badge1",
    name: "Profile Pioneer",
    description: "Completed profile setup with all details",
    imageUrl: "https://img.icons8.com/fluency/96/000000/prize.png",
    category: "Onboarding",
  },
  {
    id: "badge2",
    name: "Skill Master",
    description: "Added 10+ skills to profile",
    imageUrl: "https://img.icons8.com/fluency/96/000000/prize.png",
    category: "Profile",
  },
  {
    id: "badge3",
    name: "Social Butterfly",
    description: "Connected all social accounts",
    imageUrl: "https://img.icons8.com/fluency/96/000000/prize.png",
    category: "Profile",
  },
  {
    id: "badge4",
    name: "Challenge Accepted",
    description: "Joined your first challenge",
    imageUrl: "https://img.icons8.com/fluency/96/000000/prize.png",
    category: "Participation",
  },
  {
    id: "badge5",
    name: "Team Player",
    description: "Collaborated in 3+ projects",
    imageUrl: "https://img.icons8.com/fluency/96/000000/prize.png",
    category: "Collaboration",
  },
];

// User earned badges
export const demoUserBadges = [
  {
    userId: "user1",
    badgeId: "badge1",
    earnedAt: "2023-08-15T10:30:00Z",
  },
  {
    userId: "user1",
    badgeId: "badge4",
    earnedAt: "2023-09-20T14:45:00Z",
  },
  {
    userId: "user2",
    badgeId: "badge1",
    earnedAt: "2023-07-12T09:15:00Z",
  },
  {
    userId: "user2",
    badgeId: "badge2",
    earnedAt: "2023-07-15T16:20:00Z",
  },
  {
    userId: "user2",
    badgeId: "badge3",
    earnedAt: "2023-07-18T11:10:00Z",
  },
  {
    userId: "user3",
    badgeId: "badge1",
    earnedAt: "2023-08-01T08:45:00Z",
  },
  {
    userId: "user3",
    badgeId: "badge5",
    earnedAt: "2023-10-05T17:30:00Z",
  },
];

// Demo skills data
export const demoSkills = [
  { name: "JavaScript", category: "Development" },
  { name: "Python", category: "Development" },
  { name: "React", category: "Development" },
  { name: "Node.js", category: "Development" },
  { name: "Express", category: "Development" },
  { name: "MongoDB", category: "Database" },
  { name: "SQL", category: "Database" },
  { name: "UI Design", category: "Design" },
  { name: "UX Research", category: "Design" },
  { name: "Figma", category: "Design" },
  { name: "Data Analysis", category: "Data Science" },
  { name: "Machine Learning", category: "Data Science" },
  { name: "Statistical Modeling", category: "Data Science" },
  { name: "Content Strategy", category: "Marketing" },
  { name: "SEO", category: "Marketing" },
  { name: "Social Media", category: "Marketing" },
  { name: "Project Management", category: "Business" },
  { name: "Agile/Scrum", category: "Business" },
  { name: "Technical Writing", category: "Communication" },
  { name: "Public Speaking", category: "Communication" },
];

// Demo interests data
export const demoInterests = [
  { name: "Web Development", category: "Development" },
  { name: "Mobile Development", category: "Development" },
  { name: "UI/UX Design", category: "Design" },
  { name: "Data Science", category: "Technology" },
  { name: "Machine Learning", category: "Technology" },
  { name: "Artificial Intelligence", category: "Technology" },
  { name: "Blockchain", category: "Technology" },
  { name: "Cybersecurity", category: "Technology" },
  { name: "Cloud Computing", category: "Technology" },
  { name: "Internet of Things", category: "Technology" },
  { name: "Robotics", category: "Engineering" },
  { name: "Sustainable Technology", category: "Engineering" },
  { name: "Digital Marketing", category: "Business" },
  { name: "Entrepreneurship", category: "Business" },
  { name: "Project Management", category: "Business" },
  { name: "Education Technology", category: "Education" },
  { name: "Accessibility", category: "Social Impact" },
  { name: "Open Source", category: "Community" },
  { name: "Game Development", category: "Entertainment" },
  { name: "AR/VR", category: "Entertainment" },
];
