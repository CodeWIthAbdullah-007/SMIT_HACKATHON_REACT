🚀 MaintainIQ - AI Powered QR Maintenance Platform
Scan. Report. Diagnose. Maintain.

MaintainIQ is a professional maintenance-management platform built for the SMIT Final Hackathon. It gives every physical asset a digital identity, a QR-accessible public page, an issue-reporting workflow, and a permanent service history.

🌟 Features
🔐 Authentication & Roles: Secure login with Supabase Auth (Admin, Technician, Reporter).
📦 Asset Management: Register assets with auto-generated unique codes and track their status.
📱 QR Code Generation: Automatic QR codes for each asset linking to a safe public page.
🤖 AI Issue Triage: Converts natural language complaints into structured tickets (Title, Priority, Causes, Checks).
🛠️ Maintenance Workflow: Assign issues, add inspection notes, record parts/costs, and resolve with strict business rules.
📜 Asset History: Permanent timeline of all asset activities and status transitions.
📊 Dashboard & Analytics: Real-time stats, recent issues, and maintenance summaries.
🛠️ Tech Stack
Frontend: React.js (Vite) + JavaScript (JSX)
Styling: Tailwind CSS
Backend/Database: Supabase (PostgreSQL, Auth, RLS)
Icons & Charts: Lucide React
Routing: React Router DOM
⚙️ Setup & Installation
Clone the repository
git clone https://github.com/your-username/maintainiq.gitcd maintainiq
Install dependencies
bash

npm install
Set up environment variables
Create a .env file in the root directory:
env

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Run the development server
bash

npm run dev
🗄️ Database Schema (Supabase)
Run the provided SQL scripts in your Supabase SQL Editor to create tables with strict Row Level Security (RLS) and business rules:

profiles (User roles)
assets (Asset details & status)
issues (Issue tracking & AI triage data)
maintenance_logs (Repair records & costs)
asset_history (Permanent activity timeline)
📸 Usage Flow
Admin registers a new asset (e.g., "Projector 01").
System generates a unique code and QR Code.
Public User scans the QR code and reports an issue.
AI analyzes the complaint and suggests priority/causes.
Technician reviews the issue, adds a maintenance log, and resolves it.
Asset status updates automatically to Operational.
Built with ❤️ for SMIT Final Hackathon.
```
