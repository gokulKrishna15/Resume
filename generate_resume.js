const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, ExternalHyperlink, UnderlineType } = require("docx");

const NAVY = "1F3864";
const GRAY = "444444";
const LINK_BLUE = "1155CC";

const KEYWORDS = [
  "SAP NetWeaver-to-BTP", "OpenStack Octavia", "Alembic Migrations", "GitHub Actions",
  "AWS SES", "Python Selenium", "Apache Superset", "Docker Compose", "Google Antigravity",
  "Claude Code", "VS Code", "Prompt Engineering", "REST APIs", "Petronet CDP",
  "Groq/LLaMA 3.3", "FastAPI", "PostgreSQL", "APScheduler", "Prometheus", "Grafana",
  "Loki", "Alertmanager", "CI/CD", "SAP", "Nginx", "Hyper-V", "Docker", "Redis",
  "RabbitMQ", "SSH", "NFS", "DuckDB", "Streamlit", "Plotly", "CNN", "ANN", "PSO",
  "MERN", "React", "Linux", "rsync", "cron", "logrotate", "Alembic",
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\/\-]/g, "\\$&");
}

const KEYWORD_RE = new RegExp("\\b(" + KEYWORDS.map(escapeRegex).join("|") + ")\\b", "g");

function hl(text, size = 20) {
  const runs = [];
  let lastIndex = 0;
  let match;
  KEYWORD_RE.lastIndex = 0;
  while ((match = KEYWORD_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push(new TextRun({ text: text.slice(lastIndex, match.index), size }));
    }
    runs.push(new TextRun({ text: match[0], bold: true, size, color: NAVY }));
    lastIndex = KEYWORD_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    runs.push(new TextRun({ text: text.slice(lastIndex), size }));
  }
  return runs;
}

function hlBold(text, size = 20) {
  const runs = [];
  let lastIndex = 0;
  let match;
  KEYWORD_RE.lastIndex = 0;
  while ((match = KEYWORD_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push(new TextRun({ text: text.slice(lastIndex, match.index), bold: true, size }));
    }
    runs.push(new TextRun({ text: match[0], bold: true, size, color: NAVY }));
    lastIndex = KEYWORD_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    runs.push(new TextRun({ text: text.slice(lastIndex), bold: true, size }));
  }
  return runs;
}

function link(text, url) {
  return new ExternalHyperlink({
    link: url,
    children: [ new TextRun({ text, size: 20, color: LINK_BLUE, underline: { type: UnderlineType.SINGLE } }) ],
  });
}

function contactLine() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [
      new TextRun({ text: "Bengaluru, India | +91 8861212836 | ", size: 20, color: GRAY }),
      link("gokulkrishna3567@gmail.com", "mailto:gokulkrishna3567@gmail.com"),
      new TextRun({ text: " | ", size: 20, color: GRAY }),
      link("github.com/gokulkrishna15", "https://github.com/gokulkrishna15"),
    ],
  });
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 220, after: 80 },
    border: { bottom: { color: NAVY, space: 2, style: BorderStyle.SINGLE, size: 6 } },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: NAVY, characterSpacing: 10 }),
    ],
  });
}

function bullet(runs) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: Array.isArray(runs) ? runs : hl(runs),
  });
}

function jobHeader(title, org, dates) {
  return new Paragraph({
    spacing: { before: 120, after: 20 },
    tabStops: [{ type: "right", position: 9020 }],
    children: [
      new TextRun({ text: `${title} — ${org}`, bold: true, size: 21 }),
      new TextRun({ text: `\t${dates}`, bold: true, size: 20, color: GRAY }),
    ],
  });
}

function projectHeader(runs) {
  return new Paragraph({
    spacing: { before: 100, after: 20 },
    children: Array.isArray(runs) ? runs : [ new TextRun({ text: runs, bold: true, size: 20 }) ],
  });
}

function skillLine(label, value) {
  return bullet([
    new TextRun({ text: `${label}: `, bold: true, size: 20 }),
    new TextRun({ text: value, size: 20 }),
  ]);
}

const doc = new Document({
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 }, margin: { top: 620, bottom: 620, left: 720, right: 720 } },
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [ new TextRun({ text: "S GOKUL KRISHNA", bold: true, size: 34, color: NAVY }) ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [ new TextRun({ text: "Platform Engineer | Backend Developer (Python / FastAPI / PostgreSQL)", italics: true, size: 22, color: GRAY }) ],
      }),
      contactLine(),

      sectionHeading("Summary"),
      new Paragraph({
        spacing: { after: 60 },
        children: hl("Platform Engineer and Backend Developer with 2 years of experience building and operating production backend systems, databases, and infrastructure across on-premise and cloud environments. Hands-on expertise in Python (FastAPI), PostgreSQL, REST API design, Docker, CI/CD, and Linux systems administration, spanning multi-VM production deployments, observability, and enterprise (SAP) integrations. Track record of resolving cross-stack production incidents — database performance, load-balancer routing, service-worker caching, container networking — for a multi-site industrial client running across two data centers."),
      }),

      sectionHeading("Experience"),
      jobHeader("Platform Engineer & Backend Developer", "Lumbini Elite Solutions, Bangalore", "Sep 2024 – Present"),
      bullet("Built and operate backend services and REST APIs in Python FastAPI for Petronet CDP, a production application deployed across a multi-VM architecture spanning Mumbai and Chennai data centers, serving concurrent enterprise users."),
      bullet("Diagnosed and resolved a production concurrency ceiling (100 concurrent users), scaling the system to reliably support 250+ concurrent users by re-tuning PostgreSQL connection pooling (max_connections, shared_buffers, work_mem), redesigning per-environment app connection pools, and staggering APScheduler cron jobs across nodes."),
      bullet("Debugged a geo-fencing/location-access-control failure spanning frontend (PWA service-worker cache bypass) and infrastructure (OpenStack Octavia load balancer not forwarding client IPs), restoring accurate station-matching logic in production."),
      bullet("Designed relational PostgreSQL schemas, wrote stored procedures/functions, and managed schema evolution via Alembic migrations, including a multi-table migration spanning safety checklists, work permits, logbooks, and HR/leave modules."),
      bullet("Deployed a full observability stack (Prometheus, Grafana, Loki, Alertmanager, Blackbox/Node/Postgres/Nginx exporters) across 10+ VMs with custom app metrics and AWS SES alerting."),
      bullet("Designed and built an automated cross-data-center backup architecture replicating production data from Mumbai to a Chennai NFS share over SSH (incremental rsync), scheduled via cron with weekly logrotate (4-rotation retention), providing disaster-recovery coverage for the multi-VM Petronet CDP deployment."),
      bullet("Implemented CI/CD pipelines with GitHub Actions using self-hosted runners, driving tag-triggered production deployments across frontend and backend services with automated health checks and database migrations."),
      bullet("Automated 250+ GB of data migration using Python Selenium pipelines, cutting manual data-entry effort by over 90%."),
      bullet("Delivered enterprise automation workflows integrating with SAP systems for material creation, and provided technical advisory input on an SAP NetWeaver-to-BTP migration strategy that eliminated the two largest projected cost drivers."),
      bullet("Configured Nginx reverse proxies (SSL/TLS termination, access control) and deployed Apache Superset BI, embedding dashboards into React apps; provisioned and hardened Hyper-V Linux infrastructure with self-healing network automation."),
      bullet("Set up and deployed infrastructure for an Energy Management System (EMS) application using Docker/Docker Compose, with Redis for caching and RabbitMQ for task/message queuing."),
      bullet("Leveraged agentic AI coding tools (Claude Code, Google Antigravity) and VS Code with structured prompt engineering to accelerate feature development, debugging, and documentation across the FastAPI backend and infrastructure codebase."),
      bullet("Provisioned and configured Linux servers from scratch (OS install, user/SSH hardening, firewall, package/dependency setup, Nginx, Docker) for new environments, bringing each node to production-ready state before app deployment."),

      sectionHeading("Projects"),
      projectHeader(hlBold("Instacart BI Agent v2 — Conversational Analytics (Python, FastAPI-style guardrails, DuckDB, Groq/LLaMA 3.3, Streamlit, Plotly) | Live Demo")),
      bullet("Built a production-grade natural-language-to-SQL BI agent over a 33M+ row Instacart dataset, combining an LLM SQL-generation layer with a statistical guardrail layer (bias-correcting HAVING filters, correct chart-type enforcement, SQL validation) and an auto-repair loop that retries and fixes failed SQL automatically."),
      bullet("Used DuckDB for in-memory columnar/vectorized query execution across orders, order_products, products, aisles, and departments tables, with a unified view combining prior and train order data; visualized results with Plotly and served the chat interface via Streamlit."),
      projectHeader([
        new TextRun({ text: "Chiller Fault Detection & Diagnosis (Python, 1D CNN) | ", bold: true, size: 20 }),
        link("github.com/gokulkrishna15/chiller_fdd", "https://github.com/gokulkrishna15/chiller_fdd"),
      ]),
      bullet("Built a 1D CNN model and an ANN + PSO optimization model for industrial fault detection and diagnosis in chiller systems."),
      new Paragraph({
        spacing: { before: 60, after: 20 },
        children: [
          new TextRun({ text: "Additional projects: ", bold: true, size: 20 }),
          ...hl("Real Estate Platform (MERN stack, full-stack auth & search — live demo) · Bird Species Classifier (CNN, 95% accuracy, deployed via Streamlit) · Fish Farming Decision-Support Tool (Python)"),
        ],
      }),

      sectionHeading("Technical Skills"),
      skillLine("Languages & Backend", "Python, C, SQL, FastAPI, REST API Design, Backend Architecture"),
      skillLine("Database", "PostgreSQL, Database Design, Stored Procedures & Functions, pgAdmin, Alembic Migrations, Connection-Pool & Query Optimization"),
      skillLine("DevOps & Infrastructure", "Docker, Docker Compose, CI/CD (GitHub Actions, self-hosted runners), Nginx, SSL/TLS, Linux (Ubuntu, CentOS), Hyper-V, OpenStack, Server Setup & Provisioning (bare OS to production, from scratch)"),
      skillLine("Messaging & Caching", "Redis, RabbitMQ"),
      skillLine("Observability", "Prometheus, Grafana, Loki, Alertmanager, Blackbox/Node/Postgres Exporters"),
      skillLine("Data & Automation", "Python Selenium, ETL Pipelines, SAP Automation, Enterprise Workflow Automation"),
      skillLine("Data Science & ML", "NumPy, Pandas, Matplotlib, CNN, ANN, PSO"),
      skillLine("BI & Visualization", "Apache Superset, Dashboard Development, DuckDB, Plotly, Streamlit Model Deployment"),
      skillLine("AI & Agentic Coding Tools", "Claude (Claude Code), Google Antigravity, VS Code (AI-assisted development), Prompt Engineering"),

      sectionHeading("Education"),
      bullet("PES University, Bangalore — B.Tech in Computer Science, CGPA: 7.33 (2020 – 2024)"),

      sectionHeading("Certifications"),
      bullet([
        new TextRun({ text: "Cloud Computing 101 — AWS Training (", size: 20 }),
        link("Credential", "https://www.credly.com/badges/c54868ca-c631-472e-92a4-5a8739082b15"),
        new TextRun({ text: ")", size: 20 }),
      ]),
      bullet([
        ...hl("Linux Kernel Development (LFD103) — Linux Foundation ("),
        link("Credential", "https://www.credly.com/badges/0e3017a1-d055-442e-921c-23eac6262d97/public_url"),
        new TextRun({ text: ")", size: 20 }),
      ]),
    ],
  }],
});

const outDir = path.join(__dirname, "out");
Packer.toBuffer(doc).then((buf) => {
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "Resume_Gokul_Krishna.docx");
  fs.writeFileSync(outPath, buf);
  console.log("Written:", outPath);
}).catch(err => {
  console.error("Failed to generate DOCX:", err);
});
