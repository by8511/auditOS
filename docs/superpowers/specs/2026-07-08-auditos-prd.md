# Audit OS V1.0 Product Requirement

## 1. Product Positioning

Audit OS is an audit engagement operating system for accounting firms and audit teams. It manages the audit project from request list to evidence chain, risk review, working papers, review sign-off, and archive.

The product should not be positioned as "AI chat for uploaded documents." The durable product center is the evidence chain. Every document, data table, risk alert, workpaper conclusion, AI answer, and review decision must trace back to source evidence.

First target user:
- Accounting firm audit project manager
- Audit senior / assistant
- Client finance contact as a limited external collaborator

Later target user:
- Enterprise internal audit team
- Group finance center
- Partner / quality control reviewer

One-line value proposition:

> Evidence-first audit workspace that connects PBC requests, source files, risk signals, working papers, and human review into one traceable project system.

## 2. Market Reference

Representative products reviewed:

| Product | Direction | Useful Learning For Audit OS |
| --- | --- | --- |
| Caseware | End-to-end engagement platform with AI embedded inside audit workflow | AI should operate inside the engagement, not as a separate chatbot. Agents should support prepare, plan, evaluate, and report stages. |
| DataSnipper | AI audit/finance automation inside Excel, evidence extraction and testing | Audit users trust familiar spreadsheet workflows, but the product still needs traceable evidence extraction and reviewer approval. |
| Suralink | PBC request list, secure file sharing, workpaper suite, AI agent library | Request list management and client collaboration are core wedge features. |
| AuditFile | Cloud audit engagement tool for methodology, risk assessment, trial balance, workpapers, reporting | Smaller firms need structured audit methodology, dashboards, and cloud collaboration. |
| AuditBoard / Optro | GRC, risk, compliance, internal audit platform | Strong for enterprise risk oversight, but broader than first external-audit MVP. |
| Workiva / Diligent / TeamMate+ | Connected reporting, controls, internal audit, GRC workflow | Future expansion can cover internal controls and continuous audit, but V1 should stay narrower. |

Positioning gap:
- Most products either manage workflow/files, automate Excel testing, or provide broad GRC.
- Audit OS should start from evidence graph: document request, uploaded file, extracted data, risk reason, workpaper assertion, and reviewer decision as one connected chain.

## 3. Product Principles

1. Evidence first: every answer and risk signal links to source records.
2. AI assists, humans decide: AI can classify, extract, compare, suggest, and draft; it cannot issue unsupported audit conclusions.
3. One project, one workspace: all request lists, files, risks, papers, review notes, and archive state live under the engagement.
4. Reviewable by default: every AI-generated item has a review state, owner, source, and timestamp.
5. Client-friendly collaboration: client users should only see request/upload status, not internal risk judgments unless explicitly shared.

## 4. MVP Scope

### 4.1 Project Workspace

Required:
- Create audit project
- Select engagement type: annual audit / special audit / internal control review
- Set client, fiscal year, materiality placeholder, team members
- Show project stage: Setup, PBC, Evidence Build, Risk Review, Workpaper, Manager Review, Archive
- Role views: manager, assistant, client uploader

MVP mock data:
- "华东智造股份 2026 年度审计"
- Project stage: Evidence Build
- Team: manager, two assistants, client finance contact

### 4.2 PBC Request List

Required:
- Auto-generated request list by audit area
- Request item status: not requested, requested, uploaded, AI parsed, needs clarification, accepted
- Client upload entry
- Owner, due date, reminder status
- Missing evidence warning

MVP request categories:
- General ledger and trial balance
- Bank statements
- Revenue contracts and invoices
- Sales orders / delivery / acceptance evidence
- Fixed asset register
- Inventory list
- Payroll and tax records

### 4.3 Document Center

Required:
- Upload files
- Auto-classification
- OCR/extraction status
- Deduplication and versioning
- Source metadata: uploader, time, request item, audit area
- Permission boundary between client and audit team

MVP document states:
- Uploaded
- Parsed
- Linked to evidence chain
- Needs re-upload

### 4.4 Evidence Graph

Required:
- Show evidence chain by audit assertion / business cycle
- Example: Revenue chain: contract -> order -> delivery -> acceptance -> invoice -> bank receipt -> GL entry
- Mark missing nodes
- Click node to show source document
- Link evidence node to risk alert and workpaper reference

MVP graph:
- Revenue recognition chain with one missing logistics receipt
- Bank cash chain complete
- Fixed asset chain with one mismatch in depreciation register

### 4.5 Risk Engine

Required:
- Area-level risk scan
- Risk reason, source, affected amount, confidence, status
- Review status: open, assigned, cleared, escalated
- Suggested audit procedure
- No unsupported final conclusion

MVP risk rules:
- Year-end revenue spike
- Invoice exists but acceptance evidence missing
- Duplicate supplier payment
- Long-aged receivables
- Fixed asset depreciation mismatch

### 4.6 Working Papers

Required:
- Generate workpaper draft from evidence and risk items
- Auto-reference evidence IDs
- Human editable conclusion
- Review notes and sign-off
- Version history

MVP papers:
- Revenue
- Cash and bank
- Fixed assets
- Accounts receivable

### 4.7 AI Copilot

Required:
- Ask project questions
- Answers must cite evidence files, rules, and workpaper references
- Support "why is this high risk?", "what evidence is missing?", "draft test steps", "summarize open issues"
- Refuse or qualify unsupported audit conclusions

MVP answer structure:
1. Direct answer
2. Evidence cited
3. Suggested next audit step
4. Human review reminder

### 4.8 Review And Archive

Required:
- Manager review queue
- Partner review placeholder
- Archive checklist
- Export package placeholder

V1 not included:
- Automatic audit opinion
- Automatic report signing
- Full ERP integration
- Full sampling automation
- Regulatory filing
- Mobile full workflow
- Blockchain notarization

## 5. Core Flow

1. Manager creates engagement workspace.
2. System generates request list from engagement type and audit areas.
3. Client uploads files against request items.
4. AI classifies files, extracts key fields, and links them to evidence nodes.
5. Evidence graph shows complete and missing chains.
6. Risk engine scans evidence gaps and data anomalies.
7. Assistants review risk items and assign follow-up requests.
8. AI drafts working papers with evidence references.
9. Manager reviews workpapers, clears comments, and signs off.
10. Project archive is generated with source evidence, risk trail, and final papers.

## 6. Information Architecture

Primary navigation:
- Overview
- Requests
- Documents
- Evidence Graph
- Risks
- Working Papers
- AI Copilot
- Review

Dashboard must answer:
- What is the engagement status?
- What evidence is missing?
- Which risks need review?
- Which workpapers are blocked?
- What does the client still owe us?

## 7. Data Model, MVP Level

Core entities:
- Project
- Organization
- User
- Role
- RequestItem
- Document
- EvidenceNode
- EvidenceLink
- RiskFinding
- Workpaper
- ReviewNote
- AIAnswer

Important relationships:
- RequestItem has many Documents.
- Document can create or satisfy EvidenceNodes.
- EvidenceNode can link to RiskFindings.
- RiskFinding can block Workpapers.
- Workpaper references EvidenceNodes and RiskFindings.
- AIAnswer must reference Documents, EvidenceNodes, RiskFindings, or Workpapers.

## 8. Prototype Requirements

The prototype should be a single H5 page with mock data:
- Project overview dashboard
- Request list with upload and missing status
- Evidence graph for revenue chain
- Risk list with source references
- Workpaper preview with cited evidence
- AI Copilot panel with traceable answer

The prototype is not a production implementation. It validates:
- Whether "evidence graph first" feels like the right center
- Whether users can understand request -> document -> evidence -> risk -> workpaper
- Whether AI feels governed and reviewable rather than free-form

## 9. Acceptance Criteria

The first prototype is acceptable if:
- A user can explain the core product in one sentence after viewing it.
- The dashboard makes current audit blockers visible.
- The revenue evidence chain clearly shows both completed and missing evidence.
- Each risk item shows source, reason, suggested procedure, and review status.
- AI answer includes citations and does not assert unsupported final conclusions.
- The product does not feel like generic document chat.

