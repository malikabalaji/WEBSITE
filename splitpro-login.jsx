import { useState } from "react";

// ─── SplitPro Login Page ──────────────────────────────────────────
// Matches the exact design system of expense-splitter.html:
// Fonts: Plus Jakarta Sans + Instrument Serif
// Palette: parchment bg, warm card, green accent, muted typography
// Motifs: grain texture, left-stripe cards, green-teal accents
// ─────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f5f2;
    --card: #ffffff;
    --card2: #f0ede8;
    --border: #e4dfd8;
    --border2: #d0c9bf;
    --text: #1a1714;
    --text2: #6b6259;
    --text3: #a09690;
    --green: #2d7a4f;
    --green-bg: #e8f5ee;
    --green-light: #b8ddc7;
    --red: #c0392b;
    --red-bg: #fdecea;
    --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
    --radius: 18px;
    --radius-sm: 10px;
  }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  /* ── Grain overlay (matches app) ── */
  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    opacity: 0.6;
  }

  /* ── Topbar (exact match to app) ── */
  .topbar {
    background: var(--card);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center;
    padding: 0 24px; gap: 14px;
    height: 60px;
    position: sticky; top: 0; z-index: 50;
  }
  .logo {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 1.4rem;
    color: var(--text);
    flex-shrink: 0;
  }
  .logo b {
    font-style: normal;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800;
    color: var(--green);
  }
  .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
  .topbar-tag {
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text3);
    background: var(--card2);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 10px;
  }

  /* ── Page layout ── */
  .page {
    min-height: calc(100vh - 60px);
    display: grid;
    grid-template-columns: 1fr 480px 1fr;
    grid-template-rows: 1fr auto 1fr;
    padding: 32px 20px;
  }
  .center-col { grid-column: 2; grid-row: 2; }

  /* ── Auth card ── */
  .auth-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }

  /* ── Card header strip ── */
  .card-header {
    background: var(--green);
    padding: 28px 32px 24px;
    position: relative;
    overflow: hidden;
  }
  .card-header::before {
    content: '';
    position: absolute; top: -30px; right: -30px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
  }
  .card-header::after {
    content: '';
    position: absolute; bottom: -20px; right: 40px;
    width: 70px; height: 70px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
  .header-logo {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 2.2rem;
    color: #ffffff;
    margin-bottom: 4px;
    position: relative; z-index: 1;
  }
  .header-logo b {
    font-style: normal;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800;
  }
  .header-sub {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.72);
    position: relative; z-index: 1;
  }

  /* ── Tab switcher ── */
  .tab-bar {
    display: flex;
    border-bottom: 1px solid var(--border);
  }
  .tab-btn {
    flex: 1; padding: 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.84rem; font-weight: 600;
    color: var(--text3);
    background: none; border: none; cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.18s;
  }
  .tab-btn.active {
    color: var(--green);
    border-bottom-color: var(--green);
    background: var(--green-bg);
  }
  .tab-btn:hover:not(.active) {
    color: var(--text2);
    background: var(--card2);
  }

  /* ── Form body ── */
  .card-body { padding: 28px 32px 32px; }

  .form-group { margin-bottom: 18px; }
  .form-label {
    display: block;
    font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text3);
    margin-bottom: 7px;
  }

  /* ── Input ── */
  .form-input {
    width: 100%;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem; font-weight: 500;
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .form-input:focus {
    border-color: var(--green);
    box-shadow: 0 0 0 3px rgba(45,122,79,0.10);
  }
  .form-input.error {
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(192,57,43,0.10);
  }
  .form-input::placeholder { color: var(--text3); }

  /* ── Password wrapper ── */
  .pw-wrap { position: relative; }
  .pw-wrap .form-input { padding-right: 44px; }
  .pw-toggle {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: var(--text3); font-size: 0.88rem; padding: 4px;
    transition: color 0.14s;
  }
  .pw-toggle:hover { color: var(--text2); }

  /* ── Error message ── */
  .field-error {
    font-size: 0.78rem; color: var(--red);
    margin-top: 5px; font-weight: 500;
  }

  /* ── Helper row ── */
  .helper-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 22px;
  }
  .check-label {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.82rem; color: var(--text2);
    cursor: pointer; user-select: none;
  }
  .check-label input[type="checkbox"] {
    width: 15px; height: 15px;
    accent-color: var(--green);
    cursor: pointer;
  }
  .forgot-link {
    font-size: 0.82rem; color: var(--green);
    font-weight: 600; cursor: pointer;
    background: none; border: none;
    text-decoration: none;
  }
  .forgot-link:hover { text-decoration: underline; }

  /* ── Primary button ── */
  .btn-primary {
    width: 100%; padding: 13px;
    background: var(--green); color: #ffffff;
    border: none; border-radius: var(--radius-sm);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.92rem; font-weight: 700;
    cursor: pointer; letter-spacing: 0.01em;
    transition: transform 0.14s, box-shadow 0.14s, background 0.18s;
    position: relative; overflow: hidden;
  }
  .btn-primary:hover:not(:disabled) {
    background: #255f3e;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(45,122,79,0.28);
  }
  .btn-primary:active:not(:disabled) { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-primary.loading { color: transparent; }
  .btn-primary.loading::after {
    content: '';
    position: absolute; inset: 0; margin: auto;
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  /* ── Divider ── */
  .or-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 20px 0;
  }
  .or-divider::before, .or-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
  .or-divider span {
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--text3);
  }

  /* ── Social buttons ── */
  .social-row { display: flex; gap: 10px; }
  .btn-social {
    flex: 1; padding: 10px;
    background: var(--card); border: 1.5px solid var(--border);
    border-radius: var(--radius-sm); cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.82rem; font-weight: 600;
    color: var(--text2);
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.16s;
  }
  .btn-social:hover {
    background: var(--card2); border-color: var(--border2); color: var(--text);
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
  .btn-social svg { width: 16px; height: 16px; flex-shrink: 0; }

  /* ── Footer ── */
  .card-footer {
    padding: 16px 32px;
    border-top: 1px solid var(--border);
    text-align: center;
    font-size: 0.82rem; color: var(--text2);
    background: var(--card2);
  }
  .card-footer button {
    background: none; border: none;
    color: var(--green); font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.82rem; cursor: pointer;
    text-decoration: none;
  }
  .card-footer button:hover { text-decoration: underline; }

  /* ── Benefits strip ── */
  .benefits {
    display: flex; gap: 10px; margin-top: 24px;
  }
  .benefit {
    flex: 1; padding: 12px 14px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    border-left: 3px solid var(--green);
    box-shadow: var(--shadow);
  }
  .benefit-icon { font-size: 1.1rem; margin-bottom: 4px; }
  .benefit-title { font-size: 0.78rem; font-weight: 700; color: var(--text); margin-bottom: 2px; }
  .benefit-desc { font-size: 0.7rem; color: var(--text3); }

  /* ── Success state ── */
  .success-box {
    text-align: center; padding: 32px 24px;
  }
  .success-icon {
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--green-bg);
    border: 2px solid var(--green-light);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; margin: 0 auto 16px;
  }
  .success-title {
    font-family: 'Instrument Serif', serif;
    font-size: 1.4rem; font-style: italic;
    color: var(--text); margin-bottom: 8px;
  }
  .success-sub { font-size: 0.88rem; color: var(--text2); line-height: 1.6; }

  /* ── Password strength ── */
  .pw-strength { margin-top: 8px; }
  .pw-strength-bar {
    height: 3px; border-radius: 2px;
    background: var(--border);
    overflow: hidden; margin-bottom: 4px;
  }
  .pw-strength-fill {
    height: 100%; border-radius: 2px;
    transition: width 0.3s, background 0.3s;
  }
  .pw-strength-label { font-size: 0.7rem; font-weight: 600; }

  /* ── Name row ── */
  .name-row { display: flex; gap: 12px; }
  .name-row .form-group { flex: 1; margin-bottom: 0; }

  /* ── Animations ── */
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shake {
    0%,100%{ transform: translateX(0); }
    20%{ transform: translateX(-6px); }
    40%{ transform: translateX(6px); }
    60%{ transform: translateX(-4px); }
    80%{ transform: translateX(4px); }
  }
  .anim-up { animation: fadeUp 0.3s ease both; }
  .shake { animation: shake 0.35s ease; }

  /* ── Responsive ── */
  @media (max-width: 580px) {
    .page { grid-template-columns: 1fr; }
    .center-col { grid-column: 1; }
    .card-header { padding: 22px 22px 18px; }
    .card-body { padding: 22px 22px 24px; }
    .card-footer { padding: 14px 22px; }
    .name-row { flex-direction: column; gap: 18px; }
    .benefits { flex-direction: column; }
  }
`;

// ── Helpers ──────────────────────────────────────────────────────
function validate(fields, tab) {
  const errors = {};
  if (tab === "signup") {
    if (!fields.firstName.trim()) errors.firstName = "First name is required";
    if (!fields.lastName.trim()) errors.lastName = "Last name is required";
  }
  if (!fields.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!fields.password) {
    errors.password = "Password is required";
  } else if (tab === "signup" && fields.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (tab === "signup" && fields.password !== fields.confirm) {
    errors.confirm = "Passwords do not match";
  }
  return errors;
}

function pwStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "", color: "" },
    { label: "Weak", color: "#c0392b" },
    { label: "Fair", color: "#b45309" },
    { label: "Good", color: "#0e7490" },
    { label: "Strong", color: "#2d7a4f" },
  ];
  return { score, ...map[score] };
}

// ── Google & GitHub SVG icons ─────────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// ── Eye icon ─────────────────────────────────────────────────────
const Eye = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function LoginPage() {
  const [tab, setTab] = useState("login");       // "login" | "signup"
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [remember, setRemember] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const [fields, setFields] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setFields(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(er => ({ ...er, [key]: "" }));
  };

  const switchTab = (t) => {
    setTab(t);
    setErrors({});
    setSuccess(false);
    setShowPw(false);
    setShowConfirm(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(fields, tab);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShakeKey(k => k + 1);
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
  };

  const strength = pwStrength(fields.password);

  // ── Render ──────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div className="grain" />

      {/* Topbar */}
      <header className="topbar">
        <div className="logo">Split<b>Pro</b></div>
        <div style={{ width: 1, height: 22, background: "var(--border)" }} />
        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text2)" }}>
          {tab === "login" ? "Sign in to your account" : "Create your account"}
        </span>
        <div className="topbar-right">
          <span className="topbar-tag">Expense Splitter</span>
        </div>
      </header>

      {/* Page */}
      <div className="page">
        <div className="center-col">

          {/* Auth Card */}
          <div className="auth-card anim-up">

            {/* Header */}
            <div className="card-header">
              <div className="header-logo">Split<b>Pro</b></div>
              <div className="header-sub">
                {tab === "login"
                  ? "Welcome back — sign in to manage your groups"
                  : "Join SplitPro and start splitting expenses fairly"}
              </div>
            </div>

            {/* Tab bar */}
            <div className="tab-bar">
              <button className={`tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => switchTab("login")}>
                Sign In
              </button>
              <button className={`tab-btn ${tab === "signup" ? "active" : ""}`} onClick={() => switchTab("signup")}>
                Create Account
              </button>
            </div>

            {/* Body */}
            {success ? (
              <div className="card-body">
                <div className="success-box anim-up">
                  <div className="success-icon">✓</div>
                  <div className="success-title">
                    {tab === "login" ? "Welcome back!" : "Account created!"}
                  </div>
                  <div className="success-sub">
                    {tab === "login"
                      ? "You're signed in. Redirecting you to your dashboard…"
                      : `Account created for ${fields.email}. Redirecting you to SplitPro…`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-body">
                <form onSubmit={submit} noValidate key={`${tab}-${shakeKey}`}>

                  {/* Name row — signup only */}
                  {tab === "signup" && (
                    <div className="name-row" style={{ marginBottom: 18 }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">First Name</label>
                        <input
                          className={`form-input ${errors.firstName ? "error shake" : ""}`}
                          type="text" placeholder="Malika"
                          value={fields.firstName} onChange={set("firstName")}
                          autoComplete="given-name"
                        />
                        {errors.firstName && <div className="field-error">{errors.firstName}</div>}
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Last Name</label>
                        <input
                          className={`form-input ${errors.lastName ? "error shake" : ""}`}
                          type="text" placeholder="Balaji"
                          value={fields.lastName} onChange={set("lastName")}
                          autoComplete="family-name"
                        />
                        {errors.lastName && <div className="field-error">{errors.lastName}</div>}
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      className={`form-input ${errors.email ? "error" : ""}`}
                      type="email" placeholder="you@example.com"
                      value={fields.email} onChange={set("email")}
                      autoComplete="email"
                    />
                    {errors.email && <div className="field-error">{errors.email}</div>}
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="pw-wrap">
                      <input
                        className={`form-input ${errors.password ? "error" : ""}`}
                        type={showPw ? "text" : "password"}
                        placeholder={tab === "signup" ? "Min. 8 characters" : "Your password"}
                        value={fields.password} onChange={set("password")}
                        autoComplete={tab === "login" ? "current-password" : "new-password"}
                      />
                      <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}>
                        <Eye open={showPw} />
                      </button>
                    </div>
                    {errors.password && <div className="field-error">{errors.password}</div>}
                    {/* Password strength — signup only */}
                    {tab === "signup" && fields.password && (
                      <div className="pw-strength">
                        <div className="pw-strength-bar">
                          <div className="pw-strength-fill" style={{
                            width: `${strength.score * 25}%`,
                            background: strength.color
                          }} />
                        </div>
                        <div className="pw-strength-label" style={{ color: strength.color }}>
                          {strength.label}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm password — signup only */}
                  {tab === "signup" && (
                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <div className="pw-wrap">
                        <input
                          className={`form-input ${errors.confirm ? "error" : ""}`}
                          type={showConfirm ? "text" : "password"}
                          placeholder="Repeat your password"
                          value={fields.confirm} onChange={set("confirm")}
                          autoComplete="new-password"
                        />
                        <button type="button" className="pw-toggle" onClick={() => setShowConfirm(v => !v)}>
                          <Eye open={showConfirm} />
                        </button>
                      </div>
                      {errors.confirm && <div className="field-error">{errors.confirm}</div>}
                    </div>
                  )}

                  {/* Remember / Forgot */}
                  {tab === "login" && (
                    <div className="helper-row">
                      <label className="check-label">
                        <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                        Remember me
                      </label>
                      <button type="button" className="forgot-link">Forgot password?</button>
                    </div>
                  )}

                  {/* Terms — signup only */}
                  {tab === "signup" && (
                    <div style={{ marginBottom: 20 }}>
                      <label className="check-label">
                        <input type="checkbox" required style={{ marginTop: 1 }} />
                        <span>I agree to the <span style={{ color: "var(--green)", fontWeight: 600, cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: "var(--green)", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span></span>
                      </label>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className={`btn-primary${loading ? " loading" : ""}`}
                    disabled={loading}
                  >
                    {loading ? "" : tab === "login" ? "Sign In to SplitPro" : "Create My Account"}
                  </button>

                  {/* Divider */}
                  <div className="or-divider"><span>or continue with</span></div>

                  {/* Social */}
                  <div className="social-row">
                    <button type="button" className="btn-social">
                      <GoogleIcon /> Google
                    </button>
                    <button type="button" className="btn-social">
                      <GithubIcon /> GitHub
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* Footer */}
            <div className="card-footer">
              {tab === "login" ? (
                <>Don't have an account? <button onClick={() => switchTab("signup")}>Sign up free</button></>
              ) : (
                <>Already have an account? <button onClick={() => switchTab("login")}>Sign in</button></>
              )}
            </div>
          </div>

          {/* Benefits strip below card */}
          <div className="benefits anim-up" style={{ animationDelay: "0.12s" }}>
            {[
              { icon: "🔒", title: "Private by Design", desc: "All data stays in your browser — nothing sent to any server" },
              { icon: "⚡", title: "Instant Access", desc: "Start splitting expenses right after you sign in" },
              { icon: "🌐", title: "Works Everywhere", desc: "Any browser, any device, zero installation" },
            ].map(b => (
              <div className="benefit" key={b.title}>
                <div className="benefit-icon">{b.icon}</div>
                <div className="benefit-title">{b.title}</div>
                <div className="benefit-desc">{b.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
