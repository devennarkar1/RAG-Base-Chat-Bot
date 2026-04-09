// // src/Signup.js
// import { useState } from "react";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // Password strength checker
//   const getStrength = (pwd) => {
//     if (!pwd) return { score: 0, label: "", color: "#e5e7eb" };
//     let score = 0;
//     if (pwd.length >= 8) score++;
//     if (/[A-Z]/.test(pwd)) score++;
//     if (/[0-9]/.test(pwd)) score++;
//     if (/[^A-Za-z0-9]/.test(pwd)) score++;
//     const levels = [
//       { score: 1, label: "Weak",   color: "#ef4444" },
//       { score: 2, label: "Fair",   color: "#f97316" },
//       { score: 3, label: "Good",   color: "#eab308" },
//       { score: 4, label: "Strong", color: "#22c55e" },
//     ];
//     return levels[score - 1] || { score: 0, label: "", color: "#e5e7eb" };
//   };

//   const strength = getStrength(password);

//   const handleSignup = async () => {
//     setError("");

//     if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://127.0.0.1:8000/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSuccess(true);
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");
//       } else {
//         setError(data.detail || "Signup failed. Please try again.");
//       }
//     } catch (err) {
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !loading) handleSignup();
//   };

//   // ── Success screen ──
//   if (success) {
//     return (
//       <div style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         fontFamily: "system-ui, sans-serif", padding: 16,
//       }}>
//         <div style={{
//           background: "#fff", borderRadius: 20, padding: "48px 36px",
//           width: "100%", maxWidth: 400, textAlign: "center",
//           boxShadow: "0 8px 40px #6c63ff18",
//         }}>
//           <div style={{
//             width: 64, height: 64, borderRadius: "50%",
//             background: "linear-gradient(135deg, #22c55e, #16a34a)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             margin: "0 auto 20px",
//             boxShadow: "0 4px 16px #22c55e44",
//           }}>
//             <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
//               <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5"
//                 strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </div>
//           <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#1e1b4b" }}>
//             Account created!
//           </h2>
//           <p style={{ margin: "0 0 28px", color: "#9ca3af", fontSize: 14 }}>
//             Your account is ready. Sign in to start chatting.
//           </p>
          
//           <a
//   href="/login"
//   style={{
//     display: "inline-block",
//     padding: "12px 32px",
//     background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
//     color: "#fff",
//     borderRadius: 12,
//     fontWeight: 700,
//     fontSize: 14,
//     textDecoration: "none",
//     boxShadow: "0 4px 16px #6c63ff33",
//   }}
// >
//   Go to Login →
// </a>
//         </div>
//       </div>
//     );
//   }

//   // ── Main form ──
//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontFamily: "system-ui, sans-serif", padding: 16,
//     }}>

//       {/* Card */}
//       <div style={{
//         background: "#fff", borderRadius: 20,
//         padding: "40px 36px", width: "100%", maxWidth: 400,
//         boxShadow: "0 8px 40px #6c63ff18",
//       }}>

//         {/* Logo + Title */}
//         <div style={{ textAlign: "center", marginBottom: 28 }}>
//           <div style={{
//             width: 56, height: 56, borderRadius: 16,
//             background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             margin: "0 auto 14px",
//             boxShadow: "0 4px 16px #6c63ff44",
//           }}>
//             <span style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>AI</span>
//           </div>
//           <h1 style={{
//             margin: 0, fontSize: 24, fontWeight: 800,
//             color: "#1e1b4b", letterSpacing: -0.5,
//           }}>
//             Create account
//           </h1>
//           <p style={{ margin: "6px 0 0", color: "#9ca3af", fontSize: 14 }}>
//             Join and start chatting with AI
//           </p>
//         </div>

//         {/* Error banner */}
//         {error && (
//           <div style={{
//             background: "#fef2f2", border: "1px solid #fecaca",
//             borderRadius: 10, padding: "10px 14px", marginBottom: 18,
//             color: "#b91c1c", fontSize: 13,
//             display: "flex", alignItems: "center", gap: 8,
//           }}>
//             <span style={{ fontSize: 16 }}>⚠️</span>
//             {error}
//           </div>
//         )}

//         {/* Email field */}
//         <div style={{ marginBottom: 16 }}>
//           <label style={{
//             display: "block", fontSize: 13, fontWeight: 600,
//             color: "#374151", marginBottom: 6,
//           }}>
//             Email address
//           </label>
//           <div style={{
//             display: "flex", alignItems: "center",
//             border: "1.5px solid #e5e7eb", borderRadius: 10,
//             background: "#fafafa", overflow: "hidden",
//           }}>
//             <span style={{
//               padding: "0 12px", display: "flex", alignItems: "center",
//             }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <rect x="2" y="4" width="20" height="16" rx="3"
//                   stroke="#a78bfa" strokeWidth="2"/>
//                 <path d="M2 8l10 6 10-6"
//                   stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             </span>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => { setEmail(e.target.value); setError(""); }}
//               onKeyDown={handleKeyDown}
//               style={{
//                 flex: 1, border: "none", outline: "none",
//                 padding: "12px 12px 12px 0",
//                 fontSize: 14, background: "transparent", color: "#1e1b4b",
//               }}
//             />
//           </div>
//         </div>

//         {/* Password field */}
//         <div style={{ marginBottom: 8 }}>
//           <label style={{
//             display: "block", fontSize: 13, fontWeight: 600,
//             color: "#374151", marginBottom: 6,
//           }}>
//             Password
//           </label>
//           <div style={{
//             display: "flex", alignItems: "center",
//             border: "1.5px solid #e5e7eb", borderRadius: 10,
//             background: "#fafafa", overflow: "hidden",
//           }}>
//             <span style={{
//               padding: "0 12px", display: "flex", alignItems: "center",
//             }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <rect x="5" y="11" width="14" height="10" rx="2"
//                   stroke="#a78bfa" strokeWidth="2"/>
//                 <path d="M8 11V7a4 4 0 0 1 8 0v4"
//                   stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             </span>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Min. 6 characters"
//               value={password}
//               onChange={(e) => { setPassword(e.target.value); setError(""); }}
//               onKeyDown={handleKeyDown}
//               style={{
//                 flex: 1, border: "none", outline: "none",
//                 padding: "12px 0",
//                 fontSize: 14, background: "transparent", color: "#1e1b4b",
//               }}
//             />
//             <button
//               onClick={() => setShowPassword(p => !p)}
//               tabIndex={-1}
//               style={{
//                 border: "none", background: "transparent",
//                 padding: "0 12px", cursor: "pointer",
//                 display: "flex", alignItems: "center",
//               }}
//             >
//               {showPassword ? (
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
//                     stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//                   <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
//                     stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//                   <line x1="1" y1="1" x2="23" y2="23"
//                     stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//               ) : (
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
//                     stroke="#a78bfa" strokeWidth="2"/>
//                   <circle cx="12" cy="12" r="3" stroke="#a78bfa" strokeWidth="2"/>
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Password strength bar */}
//         {password.length > 0 && (
//           <div style={{ marginBottom: 16 }}>
//             <div style={{
//               display: "flex", gap: 4, marginBottom: 4,
//             }}>
//               {[1, 2, 3, 4].map(i => (
//                 <div key={i} style={{
//                   flex: 1, height: 4, borderRadius: 4,
//                   background: i <= strength.score ? strength.color : "#e5e7eb",
//                   transition: "background 0.3s",
//                 }} />
//               ))}
//             </div>
//             <div style={{
//               fontSize: 11, fontWeight: 600,
//               color: strength.color, textAlign: "right",
//             }}>
//               {strength.label}
//             </div>
//           </div>
//         )}

//         {/* Confirm Password field */}
//         <div style={{ marginBottom: 24 }}>
//           <label style={{
//             display: "block", fontSize: 13, fontWeight: 600,
//             color: "#374151", marginBottom: 6,
//           }}>
//             Confirm password
//           </label>
//           <div style={{
//             display: "flex", alignItems: "center",
//             border: `1.5px solid ${
//               confirmPassword && confirmPassword !== password
//                 ? "#fca5a5"
//                 : confirmPassword && confirmPassword === password
//                 ? "#86efac"
//                 : "#e5e7eb"
//             }`,
//             borderRadius: 10, background: "#fafafa", overflow: "hidden",
//             transition: "border-color 0.2s",
//           }}>
//             <span style={{
//               padding: "0 12px", display: "flex", alignItems: "center",
//             }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <rect x="5" y="11" width="14" height="10" rx="2"
//                   stroke="#a78bfa" strokeWidth="2"/>
//                 <path d="M8 11V7a4 4 0 0 1 8 0v4"
//                   stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             </span>
//             <input
//               type={showConfirm ? "text" : "password"}
//               placeholder="Re-enter your password"
//               value={confirmPassword}
//               onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
//               onKeyDown={handleKeyDown}
//               style={{
//                 flex: 1, border: "none", outline: "none",
//                 padding: "12px 0",
//                 fontSize: 14, background: "transparent", color: "#1e1b4b",
//               }}
//             />
//             {/* Match indicator */}
//             {confirmPassword.length > 0 && (
//               <span style={{
//                 padding: "0 8px", fontSize: 16,
//                 color: confirmPassword === password ? "#22c55e" : "#ef4444",
//               }}>
//                 {confirmPassword === password ? "✓" : "✗"}
//               </span>
//             )}
//             <button
//               onClick={() => setShowConfirm(p => !p)}
//               tabIndex={-1}
//               style={{
//                 border: "none", background: "transparent",
//                 padding: "0 12px", cursor: "pointer",
//                 display: "flex", alignItems: "center",
//               }}
//             >
//               {showConfirm ? (
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
//                     stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//                   <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
//                     stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//                   <line x1="1" y1="1" x2="23" y2="23"
//                     stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//               ) : (
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
//                     stroke="#a78bfa" strokeWidth="2"/>
//                   <circle cx="12" cy="12" r="3" stroke="#a78bfa" strokeWidth="2"/>
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Signup button */}
//         <button
//           onClick={handleSignup}
//           disabled={loading}
//           style={{
//             width: "100%", padding: "13px 0",
//             background: loading
//               ? "#c7d2fe"
//               : "linear-gradient(135deg, #6c63ff, #4f46e5)",
//             color: "#fff", border: "none", borderRadius: 12,
//             fontWeight: 700, fontSize: 15,
//             cursor: loading ? "not-allowed" : "pointer",
//             boxShadow: loading ? "none" : "0 4px 16px #6c63ff33",
//             transition: "all 0.2s",
//             display: "flex", alignItems: "center",
//             justifyContent: "center", gap: 8,
//           }}
//         >
//           {loading ? (
//             <>
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//                 style={{ animation: "spin 0.8s linear infinite" }}>
//                 <circle cx="12" cy="12" r="10"
//                   stroke="#fff" strokeWidth="3" strokeOpacity="0.3"/>
//                 <path d="M12 2a10 10 0 0 1 10 10"
//                   stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
//               </svg>
//               Creating account...
//             </>
//           ) : (
//             "Create Account →"
//           )}
//         </button>

//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

//         {/* Divider + login link */}
//         <div style={{
//           display: "flex", alignItems: "center", gap: 12,
//           margin: "24px 0 0",
//         }}>
//           <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
//           <span style={{ fontSize: 12, color: "#9ca3af" }}>
//             Already have an account?
//           </span>
//           <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
//         </div>

//         <div style={{ textAlign: "center", marginTop: 14 }}>
//   <a
//     href="/login"
//     style={{
//       color: "#6c63ff",
//       fontWeight: 600,
//       fontSize: 14,
//       textDecoration: "none",
//       padding: "10px 24px",
//       border: "1.5px solid #ede9fe",
//       borderRadius: 10,
//       display: "inline-block",
//       transition: "background 0.15s",
//     }}
//     onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
//     onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//   >
//     Sign in instead
//   </a>
// </div>

//       </div>
//     </div>
//   );
// }





// src/Signup.js
import { useState } from "react";

const inputStyle = {
  flex: 1, border: "none", outline: "none",
  padding: "11px 12px 11px 0",
  fontSize: 14, background: "transparent",
  color: "var(--text-primary)",
  fontFamily: "var(--font-main)",
};

const fieldWrapStyle = (focused, borderOverride) => ({
  display: "flex", alignItems: "center",
  border: `1px solid ${borderOverride || (focused ? "var(--accent)" : "var(--border)")}`,
  borderRadius: "var(--radius-sm)",
  background: "var(--bg-input)",
  overflow: "hidden",
  transition: "border-color var(--transition)",
});

const IconWrap = ({ children }) => (
  <span style={{ padding: "0 10px 0 12px", display: "flex", alignItems: "center", flexShrink: 0 }}>
    {children}
  </span>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="var(--text-muted)" strokeWidth="1.5"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
      stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
      stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="1" y1="1" x2="23" y2="23" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
) : (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="var(--text-muted)" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke="var(--text-muted)" strokeWidth="1.5"/>
  </svg>
);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "var(--border)" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const levels = [
      { score: 1, label: "Weak",   color: "var(--red)" },
      { score: 2, label: "Fair",   color: "#f97316" },
      { score: 3, label: "Good",   color: "#eab308" },
      { score: 4, label: "Strong", color: "var(--green)" },
    ];
    return levels[score - 1] || { score: 0, label: "", color: "var(--border)" };
  };

  const strength = getStrength(password);

  const handleSignup = async () => {
    setError("");
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) { setError("Please fill in all fields."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setEmail(""); setPassword(""); setConfirmPassword("");
      } else {
        setError(data.detail || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !loading) handleSignup(); };

  // ── Success ──
  if (success) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--bg-base)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-main)", padding: 16,
      }}>
        <div style={{
          background: "var(--bg-surface)", borderRadius: "var(--radius-xl)",
          padding: "48px 36px", width: "100%", maxWidth: 400, textAlign: "center",
          border: "1px solid var(--border)", animation: "fadeUp 0.3s ease forwards",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(52,201,135,0.12)",
            border: "1px solid rgba(52,201,135,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Account created
          </h2>
          <p style={{ margin: "0 0 28px", color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6 }}>
            Your account is ready. Sign in to start chatting with your documents.
          </p>
          <a href="/login" style={{
            display: "inline-block", padding: "11px 28px",
            background: "var(--accent)", color: "var(--text-inverse)",
            borderRadius: "var(--radius-sm)", fontWeight: 600, fontSize: 13,
            textDecoration: "none", fontFamily: "var(--font-main)",
          }}>
            Go to Sign In →
          </a>
        </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  const confirmBorderColor = confirmPassword.length > 0
    ? confirmPassword === password ? "rgba(52,201,135,0.4)" : "rgba(232,93,93,0.4)"
    : undefined;

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-base)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-main)", padding: 16,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "-30%", right: "-10%",
        width: "60%", height: "60%",
        background: "radial-gradient(ellipse, rgba(232,169,77,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        background: "var(--bg-surface)", borderRadius: "var(--radius-xl)",
        padding: "36px 36px", width: "100%", maxWidth: 400,
        border: "1px solid var(--border)", position: "relative",
        animation: "fadeUp 0.3s ease forwards",
      }}>

        {/* Logo + Title */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 50, height: 50, borderRadius: "var(--radius-md)",
            background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Create account
          </h1>
          <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: 13 }}>
            Join RAGChat and start chatting with your documents
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(232,93,93,0.08)", border: "1px solid rgba(232,93,93,0.25)",
            borderRadius: "var(--radius-sm)", padding: "9px 12px", marginBottom: 18,
            color: "var(--red)", fontSize: 13,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--red)" strokeWidth="1.5"/>
              <path d="M12 8v4M12 16h.01" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.02em" }}>
            Email address
          </label>
          <div style={fieldWrapStyle(focusedField === "email")}>
            <IconWrap>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="3" stroke="var(--text-muted)" strokeWidth="1.5"/>
                <path d="M2 8l10 6 10-6" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </IconWrap>
            <input
              type="email" placeholder="you@example.com" value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.02em" }}>
            Password
          </label>
          <div style={fieldWrapStyle(focusedField === "pwd")}>
            <IconWrap><LockIcon /></IconWrap>
            <input
              type={showPassword ? "text" : "password"} placeholder="Min. 6 characters" value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocusedField("pwd")}
              onBlur={() => setFocusedField(null)}
              style={inputStyle}
            />
            <button onClick={() => setShowPassword(p => !p)} tabIndex={-1}
              style={{ border: "none", background: "transparent", padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        {/* Strength */}
        {password.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 4,
                  background: i <= strength.score ? strength.color : "var(--border)",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>
            <div style={{ fontSize: 10, fontWeight: 500, color: strength.color, textAlign: "right", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
              {strength.label.toUpperCase()}
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.02em" }}>
            Confirm password
          </label>
          <div style={fieldWrapStyle(focusedField === "confirm", confirmBorderColor)}>
            <IconWrap><LockIcon /></IconWrap>
            <input
              type={showConfirm ? "text" : "password"} placeholder="Re-enter your password" value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocusedField("confirm")}
              onBlur={() => setFocusedField(null)}
              style={inputStyle}
            />
            {confirmPassword.length > 0 && (
              <span style={{ padding: "0 6px", fontSize: 13, color: confirmPassword === password ? "var(--green)" : "var(--red)", fontWeight: 600 }}>
                {confirmPassword === password ? "✓" : "✗"}
              </span>
            )}
            <button onClick={() => setShowConfirm(p => !p)} tabIndex={-1}
              style={{ border: "none", background: "transparent", padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <EyeIcon open={showConfirm} />
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSignup} disabled={loading}
          style={{
            width: "100%", padding: "12px 0",
            background: loading ? "var(--bg-elevated)" : "var(--accent)",
            color: loading ? "var(--text-muted)" : "var(--text-inverse)",
            border: loading ? "1px solid var(--border)" : "none",
            borderRadius: "var(--radius-sm)", fontWeight: 600, fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all var(--transition)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "var(--font-main)",
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          {loading ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                <circle cx="12" cy="12" r="10" stroke="var(--text-muted)" strokeWidth="2" strokeOpacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Creating account…
            </>
          ) : "Create Account →"}
        </button>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>HAVE AN ACCOUNT?</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <div style={{ textAlign: "center", marginTop: 14 }}>
          <a href="/login" style={{
            color: "var(--accent-text)", fontWeight: 500, fontSize: 13,
            textDecoration: "none", padding: "9px 24px",
            border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
            display: "inline-block", background: "transparent",
            transition: "all var(--transition)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            Sign in instead
          </a>
        </div>
      </div>
    </div>
  );
}


