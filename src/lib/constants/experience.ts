import type { Experience } from "../types";

export const EXPERIENCES: Experience[] = [
  {
    company: "Maystro Delivery - (Algiers, Algeria)",
    positions: [
      {
        title: "Mobile Developer (Freelance)",
        year: "Dec 2025 - Jan 2026",
        description: `
- ♦ Developed and integrated the **DZ warehouse management module** for the Winrah delivery app for PDA devices using **Dart (Flutter)**.
- ♦ Implemented complete UI/UX for task management, item lookup, and location-based put-away workflows with reusable widgets (task cards, progress indicators, scanners, dialogs).
- ♦ Built state management using **BLoC pattern** for handling complex task states and real-time updates.
- ♦ Integrated backend APIs for task operations, location management, and product tracking.
- ♦ Delivered production-ready features within a 15-day sprint timeline.
`,
        skills: [
          "Flutter",
          "Dart",
          "BLoC Pattern",
          "State Management",
          "REST API Integration",
          "UI/UX Development",
          "QR Code Scanning",
          "Git",
        ],
      },
    ],
  },

  {
    company: "RetailSpot - (Paris, France)",
    positions: [
      {
        title: "Backend Developer (Freelance)",
        year: "May 2025 - Present",
        description: `
- ♦ Developed a high-performance **AdServer** for retail media remotely, built with **Go (Gin)**.
- ♦ Implemented low-latency, scalable ad delivery and real-time programmatic bidding logic using Go concurrency patterns.
- ♦ Optimized ad response times with in-memory caching strategies and careful resource management.
- ♦ Integrated **OpenRTB** and **Prebid.js** to support programmatic bidding and DSP compatibility.
- ♦ Collaborated in agile sprints with product and engineering teams to deliver production-ready features.
        `,
        skills: [
          "Go",
          "Gin",
          "Concurrency",
          "In-memory caching",
          "OpenRTB",
          "Prebid.js",
          "Low-latency systems",
          "Docker",
          "Git",
          "CI/CD",
          "Monitoring & logging",
        ],
      },
    ],
  },

  {
    company: "Education",
    positions: [
      {
        title: "Engineer's Degree in Computer Science",
        year: "Sep 2022 - Sep 2027 (expected)",
        description: `
- ♦ **Specialization: AI & Data Science** at Ecole Supérieure en Sciences et Technologies de l'Informatique et du Numérique (ESTIN).
- ♦ 5-year engineering program focused on software engineering, AI, and data science. Currently in 4th year.
- ♦ Built a strong foundation in algorithms, data structures, and object-oriented programming.
- ♦ Studied AI, probability & statistics, and random processes relevant to modelling and ML systems.
- ♦ Completed hands-on projects and group work that strengthened system design, teamwork and communication skills.
        `,
        skills: [
          "Artificial Intelligence",
          "Probability & Statistics",
          "Algorithms & Data Structures",
          "OOP (C/C++)",
          "Software Engineering",
          "Databases",
          "Networking",
          "Teamwork",
          "Presentations",
        ],
      },
    ],
  },
];