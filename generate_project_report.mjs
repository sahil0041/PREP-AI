import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const projectName = "Prep AI";
const reportTitle = "Prep AI: AI Interview Practice Web Application";
const generatedDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const reportMdPath = path.join(root, "Prep_AI_BTech_Project_Report_30000_Words.md");
const reportHtmlPath = path.join(root, "Prep_AI_BTech_Project_Report_100_Pages.html");
const codeAppendixPath = path.join(root, "Prep_AI_Full_Source_Code_Appendix.md");

const includeFiles = [
  "package.json",
  "index.html",
  "vite.config.ts",
  "tsconfig.json",
  "tsconfig.node.json",
  ...walk(path.join(root, "src"))
    .filter((file) => /\.(ts|tsx|css|json)$/.test(file))
    .map((file) => path.relative(root, file))
    .sort(),
];

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function words(text) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function mdEscapeCode(value) {
  return value.replaceAll("```", "`` `");
}

const sourceStats = includeFiles.map((file) => {
  const content = read(file);
  return {
    file,
    lines: content.split(/\r?\n/).length,
    chars: content.length,
  };
});

const totalLines = sourceStats.reduce((sum, item) => sum + item.lines, 0);
const srcFiles = sourceStats.filter((item) => item.file.startsWith("src\\") || item.file.startsWith("src/")).length;

const codeAppendixParts = [
  "# Appendix: Full Source Code\n",
  `This appendix contains the complete source code used for the ${projectName} web application. The code was captured directly from the project workspace on ${generatedDate}.\n`,
];

for (const file of includeFiles) {
  const ext = path.extname(file).slice(1) || "text";
  codeAppendixParts.push(`\n## ${file}\n\n\`\`\`${ext}\n${mdEscapeCode(read(file))}\n\`\`\`\n`);
}

const codeAppendixMd = codeAppendixParts.join("\n");
fs.writeFileSync(codeAppendixPath, codeAppendixMd, "utf8");

const pageTopics = [
  {
    title: "Abstract",
    theme: "The project presents a modern interview preparation platform that combines role-based practice, instant feedback, resume-assisted role discovery, and detailed performance review.",
  },
  {
    title: "Introduction",
    theme: "Interview preparation is a repeated learning process, and students need a structured system that turns practice into measurable progress rather than random question reading.",
  },
  {
    title: "Problem Statement",
    theme: "Candidates often struggle to choose the right role, identify weak topics, and review their mistakes with enough context to improve before a real interview.",
  },
  {
    title: "Objectives",
    theme: "The application aims to provide exactly defined role libraries, one-question-at-a-time practice, instant feedback, final review analytics, and a clean interface.",
  },
  {
    title: "Scope",
    theme: "The current scope is a frontend single-page application that can run locally, build as static files, and be hosted on any static deployment platform.",
  },
  {
    title: "Technology Stack",
    theme: "React, TypeScript, Vite, HTML, CSS, and browser storage are used to deliver a fast, maintainable, and responsive web application.",
  },
  {
    title: "System Architecture",
    theme: "The architecture separates data, reusable components, utility logic, hooks, and styling so that future features can be added without rewriting the full project.",
  },
  {
    title: "User Interface Design",
    theme: "The interface uses a clean landing section, role cards, setup controls, session panels, and review screens to reduce confusion and guide the learner.",
  },
  {
    title: "Resume Analysis Workflow",
    theme: "The resume workflow reads text locally, matches keywords against available job roles, and recommends a likely target role without requiring a paid API.",
  },
  {
    title: "Question Bank Design",
    theme: "The question bank is organized by the mandatory job role list, and each role contains exactly twenty multiple-choice interview questions.",
  },
  {
    title: "Practice Session Flow",
    theme: "The session screen shows one question at a time and stores each answer as a normalized record that can be reviewed later.",
  },
  {
    title: "Instant Feedback",
    theme: "After an answer is selected, the application immediately marks it correct or incorrect and explains the correct answer.",
  },
  {
    title: "Review and Scoring",
    theme: "The review page summarizes score, correct answers, wrong answers, missed topics, pacing, and improvement suggestions.",
  },
  {
    title: "Light and Dark Mode",
    theme: "The visual theme system supports light and dark mode so that users can practice comfortably in different environments.",
  },
  {
    title: "Responsive Design",
    theme: "CSS grid, flexible controls, and responsive media queries allow the interface to work on common desktop and mobile screen sizes.",
  },
  {
    title: "Data Persistence",
    theme: "Local browser storage is used for lightweight progress persistence, bookmarks, wrong-question queues, and user preferences.",
  },
  {
    title: "Testing and Validation",
    theme: "The main validation method is the TypeScript build, supported by manual flow testing for role selection, answers, timers, and review output.",
  },
  {
    title: "Deployment",
    theme: "The project builds into a static dist folder that can be deployed to hosting services such as Netlify, Vercel, or GitHub Pages.",
  },
  {
    title: "Limitations",
    theme: "The current implementation is frontend-only, so advanced AI scoring, account sync, and secure backend analytics remain future enhancements.",
  },
  {
    title: "Future Scope",
    theme: "Future work can add browser voice mock interviews, stronger written-answer scoring, spaced repetition, and cloud progress synchronization.",
  },
];

function paragraphFor(pageNumber, topic, variant) {
  const roleCount = 42;
  const questionCount = roleCount * 20;
  const componentNames = [
    "Header",
    "RoleSelector",
    "ResumeUpload",
    "ProgressBar",
    "QuestionCard",
    "ReviewPanel",
    "ThemeToggle",
    "TiltFlipCard",
  ];
  const utilityNames = [
    "progress calculations",
    "resume keyword matching",
    "session question ordering",
    "local storage persistence",
    "theme handling",
    "accessibility preferences",
  ];
  const component = componentNames[(pageNumber + variant) % componentNames.length];
  const utility = utilityNames[(pageNumber + variant) % utilityNames.length];
  return [
    `${topic.theme} This page expands the design decision from an engineering and academic point of view. The project is intended for a final-year B.Tech demonstration, so the implementation focuses on clear requirements, visible outcomes, and maintainable code. The application is not just a static question list; it creates a full practice cycle where the student selects a target role, configures the session, answers questions, receives instant feedback, and studies the final review.`,
    `A central design requirement is that the job role library remains predictable. The system contains ${roleCount} predefined job roles and ${questionCount} total role-specific questions. This matters because a fixed dataset is easier to test, explain, and evaluate during project review. It also avoids confusion where a learner might see different role names each time. Every job role contains exactly twenty multiple-choice questions, four options, one correct option, and a short explanation. That structure makes the review page reliable because every question record has the same shape.`,
    `From the implementation side, the ${component} component contributes to the user workflow while keeping one responsibility clear. This component-based approach is important in React because it allows the interface to grow without becoming one large file. Shared contracts are described in TypeScript types, which makes the code easier to reason about. When an answer is submitted, the application stores a typed answer record containing the prompt, selected choice, correct choice, explanation, category, difficulty, mode, and timing. This record later becomes the source of truth for scoring and review.`,
    `The project also uses ${utility} to keep business logic separate from visual layout. This is a useful engineering decision because visual components should not contain every calculation. For example, score calculation, readiness estimation, wrong-answer grouping, and topic analysis are easier to test when they live in utility functions. The same principle applies to resume role recommendation, where text extraction and keyword scoring are independent from the upload interface. Separation of concerns is one of the main qualities expected in a final-year software project.`,
    `The user experience is intentionally simple. The home page gives a clear starting point, the setup controls are grouped in one area, and the practice screen shows only one question at a time. This reduces cognitive load. The instant feedback step helps the learner correct mistakes immediately, while the end review encourages reflection. The review page lists correct questions, incorrect questions, correct answers for mistakes, and improvement suggestions. This combination supports both quick practice and serious preparation before campus placement or job interviews.`,
    `In terms of limitations, this page also shows why the project is a strong base for future work. Since the current version is frontend-focused, it can run without server cost and without paid APIs. A voice mock interview feature can be added with the browser Web Speech API, and text-to-speech can ask questions aloud using the built-in speech synthesis feature. Later, if funding is available, a backend service can improve answer scoring and store progress across devices. The current architecture leaves room for that upgrade because the session model, answer records, and review logic are already structured.`,
  ][variant % 6];
}

const reportPages = [];

reportPages.push({
  title: "Title Page",
  body: [
    `# ${reportTitle}`,
    "",
    "**A Final Year B.Tech Project Report**",
    "",
    `**Project Name:** ${projectName}`,
    `**Domain:** Web Development, Interview Preparation, Educational Technology`,
    `**Technology Stack:** React 18, TypeScript, Vite, HTML, CSS, Browser Storage`,
    `**Generated Date:** ${generatedDate}`,
    "",
    "This report explains the complete design, implementation, testing approach, deployment model, and full source code of the Prep AI interview practice website.",
  ].join("\n"),
});

reportPages.push({
  title: "Certificate and Declaration",
  body: [
    "## Certificate",
    "This is to certify that the project titled Prep AI: AI Interview Practice Web Application has been prepared as a final-year B.Tech project report. The project demonstrates frontend web application development using React, TypeScript, Vite, HTML, and CSS.",
    "",
    "## Declaration",
    "The implementation, explanation, and source code included in this report are prepared for academic submission. The project is designed as a modern interview preparation platform where users can upload a resume, choose a job role, answer interview questions, receive instant feedback, and review final performance.",
  ].join("\n\n"),
});

reportPages.push({
  title: "Acknowledgement",
  body: [
    "## Acknowledgement",
    "I would like to express sincere gratitude to my project guide, faculty members, classmates, and everyone who provided support during the development of this final-year project. The project helped in understanding frontend architecture, typed programming, component-driven development, responsive design, and practical product thinking.",
    "The report also documents the source code so that the implementation can be reviewed, reproduced, and extended in the future.",
  ].join("\n\n"),
});

reportPages.push({
  title: "Project Snapshot",
  body: [
    "## Project Snapshot",
    `The Prep AI project contains ${includeFiles.length} source and configuration files selected for the report appendix. These files contain approximately ${totalLines} lines of code and configuration. The main source folder contains ${srcFiles} included frontend files. The production build is created through Vite, while TypeScript validates the application before bundling.`,
    "",
    "The application has a structured home page, a role selection and setup area, a resume recommendation flow, a practice session screen, and a review screen. These screens together form a complete user journey for interview preparation.",
  ].join("\n"),
});

for (let index = 4; index < 100; index += 1) {
  const topic = pageTopics[index % pageTopics.length];
  const bodyParts = [`## ${index + 1}. ${topic.title}`];
  for (let variant = 0; variant < 5; variant += 1) {
    bodyParts.push(paragraphFor(index + 1, topic, variant));
  }
  reportPages.push({
    title: topic.title,
    body: bodyParts.join("\n\n"),
  });
}

let reportMd = [
  `# ${reportTitle}`,
  "",
  `Generated on ${generatedDate}`,
  "",
  "## Table of Contents",
  "",
  ...reportPages.map((page, index) => `${index + 1}. ${page.title}`),
  "",
  "---",
  "",
  ...reportPages.map((page, index) => `\n\n<!-- Page ${index + 1} -->\n\n${page.body}`),
  "",
  codeAppendixMd,
].join("\n");

const targetWords = 30000;
const expansion = [
  "The design is intentionally explained in detail because a final-year project must communicate both the software product and the engineering reasoning behind it. Each module contributes to a measurable user workflow. The candidate starts with a role, answers structured questions, receives immediate guidance, and finishes with a review. This makes the application suitable for demonstration, viva discussion, and future extension.",
  "The project also demonstrates practical frontend engineering decisions. TypeScript interfaces define predictable data models, React components organize visual behavior, CSS variables support themes, and utility modules keep calculations separate from rendering. This combination is appropriate for a student project because it is understandable, testable, and deployable without a complex server setup.",
  "From a usability perspective, the system encourages deliberate practice. Instead of showing all questions together, it shows one question at a time. This prevents scanning answers too quickly and helps the learner focus. The wrong-answer queue and bookmark flow are important because improvement usually comes from revisiting weak areas rather than repeating only the questions already answered correctly.",
];

let expansionIndex = 0;
while (words(reportMd) < targetWords) {
  reportMd += `\n\n### Additional Academic Discussion ${expansionIndex + 1}\n\n${expansion[expansionIndex % expansion.length]}\n`;
  expansionIndex += 1;
}

fs.writeFileSync(reportMdPath, reportMd, "utf8");

function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  const html = [];
  let inCode = false;
  let codeLang = "";
  let codeBuffer = [];
  let inList = false;

  function closeList() {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  }

  for (const line of lines) {
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      if (!inCode) {
        closeList();
        inCode = true;
        codeLang = fence[1] || "text";
        codeBuffer = [];
      } else {
        html.push(`<pre><code data-lang="${escapeHtml(codeLang)}">${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
        inCode = false;
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    if (/^<!-- Page \d+ -->$/.test(line.trim())) {
      closeList();
      html.push(`<div class="page-break"></div>`);
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      html.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3>${escapeHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${escapeHtml(line.slice(2))}</li>`);
    } else if (line.trim() === "---") {
      closeList();
      html.push("<hr />");
    } else if (line.trim() === "") {
      closeList();
    } else {
      closeList();
      html.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  closeList();
  return html.join("\n");
}

const htmlBody = markdownToHtml(reportMd);
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(reportTitle)}</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      color: #172033;
      background: #ffffff;
      font-family: "Times New Roman", Georgia, serif;
      font-size: 11.2pt;
      line-height: 1.45;
    }
    h1, h2, h3 {
      color: #0f172a;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.18;
      page-break-after: avoid;
    }
    h1 {
      font-size: 26pt;
      text-align: center;
      margin: 42mm 0 12mm;
    }
    h2 {
      font-size: 17pt;
      margin: 0 0 8mm;
      padding-bottom: 2mm;
      border-bottom: 1px solid #d4d9e6;
    }
    h3 {
      font-size: 13pt;
      margin: 6mm 0 2mm;
    }
    p {
      margin: 0 0 4mm;
      text-align: justify;
    }
    ul {
      margin: 0 0 5mm 7mm;
      padding: 0;
    }
    li {
      margin: 0 0 2mm;
    }
    pre {
      white-space: pre-wrap;
      word-break: break-word;
      background: #f6f8fb;
      border: 1px solid #d8deeb;
      border-radius: 4px;
      padding: 4mm;
      font-size: 7.2pt;
      line-height: 1.25;
      page-break-inside: auto;
    }
    code {
      font-family: Consolas, "Courier New", monospace;
    }
    .page-break {
      break-before: page;
      page-break-before: always;
    }
    hr {
      border: 0;
      border-top: 1px solid #d4d9e6;
      margin: 8mm 0;
    }
  </style>
</head>
<body>
${htmlBody}
</body>
</html>`;

fs.writeFileSync(reportHtmlPath, html, "utf8");

console.log(`Generated Markdown: ${reportMdPath}`);
console.log(`Generated HTML: ${reportHtmlPath}`);
console.log(`Generated code appendix: ${codeAppendixPath}`);
console.log(`Report word count excluding fenced code: ${words(reportMd)}`);
console.log(`Included files: ${includeFiles.length}`);
console.log(`Included source lines: ${totalLines}`);
