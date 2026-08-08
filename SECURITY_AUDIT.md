# PrepPilot Security Audit Report

This document outlines the security posture of PrepPilot, including classification of vulnerabilities, potential threat vectors, and recommended security mitigations.

## Summary of Findings

| Vulnerability ID | Vulnerability Area | Severity | Status | Mitigation Description |
|---|---|---|---|---|
| **SEC-001** | Client-Side Session Exposure | **MEDIUM** | **MITIGATED** | Session payload is temporary and isolated to `sessionStorage`. Sensitive metrics are calculated server-side in memory and sanitized before rendering. |
| **SEC-002** | XSS / Unsafe Content Injection | **LOW** | **MITIGATED** | Strict React JSX escape engines prevent raw user message HTML parsing. Inputs are handled via raw values. |
| **SEC-003** | In-Memory Server Cache TTL Leak | **LOW** | **MITIGATED** | Implemented automatic swept garbage collection in the API route, removing sessions older than 1 hour on new initialization loops. |
| **SEC-004** | Authentication / IDOR Bypass | **INFO** | **INFORMATIONAL** | The current local sandbox uses URL query params (`?candidate=ID`) to identify candidates. In production, this must be integrated with a JWT HttpOnly secure cookie-based auth middleware. |

---

## Detailed Vulnerability Analysis

### SEC-001: Client-Side Session Exposure
* **Classification:** **MEDIUM**
* **Threat Model:** Storing evaluation metrics and transcript logs under the local client session could expose sensitive grading metrics if a candidate manipulates browser state.
* **Mitigation:**
  * Evaluation is performed strictly server-side inside `/api/interview`.
  * The final payload is stored in `sessionStorage` (cleared when the browser tab closes) and only referenced to compile the feedback view.
  * In production, the session details should be written to a secure backend database and referenced via a cryptographically signed transaction token.

### SEC-002: XSS in Chat Logs
* **Classification:** **LOW**
* **Threat Model:** Candidates submitting malicious markdown or JavaScript injection in text responses could execute code in the interviewer dashboard.
* **Mitigation:**
  * Raw inputs are displayed in React components using standard child text nodes (e.g. `{msg.text}`), which automatically sanitizes script injections.
  * Unsafe HTML rendering via `dangerouslySetInnerHTML` is avoided entirely.

### SEC-003: Memory Exhaustion via Server Sessions
* **Classification:** **LOW**
* **Threat Model:** A high volume of interviews could cause memory leaks if sessions are never cleared.
* **Mitigation:**
  * Added automated garbage collection on start of every new interview.
  * The route maps sweep and delete any active session record that has been inactive for more than 1 hour.

### SEC-004: Missing Authentication / IDOR
* **Classification:** **INFO**
* **Threat Model:** Accessing candidate logs via `?candidate=CAND-001` allows easy enumeration of reports.
* **Mitigation:**
  * Currently operated in local sandbox mode. 
  * Recommend deploying cookie-based middleware with HttpOnly, Secure, and SameSite flags verifying the user's logged-in identity against session logs.
