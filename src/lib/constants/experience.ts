import type { Experience } from "../types";

export const EXPERIENCES: Experience[] = [
  {
    company: "RetailSpot - (Paris, France)",
    positions: [
      {
        title: "Backend Developer",
        year: "05.2025 - 12.2025",
        description: `
- ♦ Remote work on a high-performance **AdServer** for retail media, built with **Go (Gin)**.
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
        title: "Engineer’s Degree in Computer Science — Specialization: AI & Data Science | Ecole Supérieure en Sciences et Technologies de l’Informatique et du Numérique (ESTIN)",
        year: "09.2022 - 09.2027 (expected)",
        description: `
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
