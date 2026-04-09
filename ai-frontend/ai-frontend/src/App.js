import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./App.css";



// export default function App() {
//   const { token } = useContext(AuthContext);
//   const [showSignup, setShowSignup] = useState(false);
//   const [sessionId, setSessionId] = useState(null);
//   const [selectedSession, setSelectedSession] = useState(null);
  
//   // Initialize to true so it's open by default on Desktop
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   // Handle window resizing to update isMobile state
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       // Optional: Auto-close sidebar when switching from desktop to mobile
//       if (mobile) setSidebarOpen(false);
//       else setSidebarOpen(true);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Load persisted session id from localStorage on mount
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("session_id");
//       if (saved) setSessionId(saved);
//     } catch (err) {
//       console.warn("Could not read session_id from localStorage:", err);
//     }
//   }, []);

//   // Persist sessionId changes to localStorage
//   useEffect(() => {
//     try {
//       if (sessionId) localStorage.setItem("session_id", sessionId);
//       else localStorage.removeItem("session_id");
//     } catch (err) {
//       console.warn("Could not persist session_id to localStorage:", err);
//     }
//   }, [sessionId]);

//   const handleSelectChat = (id) => {
//     setSelectedSession(id);
//     setSessionId(id);
//     // Auto-close sidebar ONLY on mobile
//     if (isMobile) setSidebarOpen(false);
//   };

//   const handleNewChat = () => {
//     setSelectedSession(null);
//     setSessionId(null);
//     try { localStorage.removeItem("session_id"); } catch {}
//     // Auto-close sidebar ONLY on mobile
//     if (isMobile) setSidebarOpen(false);
//   };

//   // ── Unauthenticated view ──
//   if (!token) {
//     return (
//       <div style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
//         fontFamily: "system-ui, sans-serif",
//       }}>

//         {/* Top nav */}
//         <div style={{
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "16px 32px",
//           background: "#fff",
//           borderBottom: "1px solid #ede9fe",
//           boxShadow: "0 1px 8px #6c63ff0f",
//         }}>
//           {/* Brand */}
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div style={{
//               width: 36, height: 36, borderRadius: 10,
//               background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               color: "#fff", fontWeight: 800, fontSize: 14,
//               boxShadow: "0 2px 8px #6c63ff33",
//             }}>AI</div>
//             <span style={{ fontWeight: 800, fontSize: 18, color: "#1e1b4b" }}>
//               AI Chat
//             </span>
//           </div>

//           {/* Auth toggle */}
//           <div style={{ display: "flex", gap: 8 }}>
//             <button
//               onClick={() => setShowSignup(false)}
//               style={{
//                 padding: "8px 18px", borderRadius: 8, fontWeight: 600,
//                 fontSize: 13, cursor: "pointer", transition: "all 0.15s",
//                 background: !showSignup
//                   ? "linear-gradient(135deg, #6c63ff, #4f46e5)"
//                   : "transparent",
//                 color: !showSignup ? "#fff" : "#6c63ff",
//                 border: !showSignup ? "none" : "1.5px solid #ede9fe",
//                 boxShadow: !showSignup ? "0 2px 8px #6c63ff33" : "none",
//               }}
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => setShowSignup(true)}
//               style={{
//                 padding: "8px 18px", borderRadius: 8, fontWeight: 600,
//                 fontSize: 13, cursor: "pointer", transition: "all 0.15s",
//                 background: showSignup
//                   ? "linear-gradient(135deg, #6c63ff, #4f46e5)"
//                   : "transparent",
//                 color: showSignup ? "#fff" : "#6c63ff",
//                 border: showSignup ? "none" : "1.5px solid #ede9fe",
//                 boxShadow: showSignup ? "0 2px 8px #6c63ff33" : "none",
//               }}
//             >
//               Sign Up
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div style={{
//           maxWidth: 1100, margin: "0 auto",
//           padding: "40px 24px",
//           display: "flex", gap: 32,
//           alignItems: "flex-start",
//           flexWrap: "wrap",
//         }}>

//           {/* Left: Auth form */}
//           <div style={{ flex: "0 0 400px", minWidth: 300 }}>
//             {showSignup ? <Signup /> : <Login />}

//             {/* Guest divider */}
//             <div style={{
//               display: "flex", alignItems: "center", gap: 12,
//               margin: "24px 0 16px",
//             }}>
//               <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
//               <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>
//                 or continue as guest
//               </span>
//               <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
//             </div>

//             <div style={{
//               background: "#fff", borderRadius: 12, padding: "14px 16px",
//               border: "1px solid #ede9fe",
//               display: "flex", alignItems: "center", gap: 12,
//             }}>
//               <div style={{
//                 width: 36, height: 36, borderRadius: 8, flexShrink: 0,
//                 background: "#f5f3ff",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//               }}>
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <circle cx="12" cy="8" r="4" stroke="#6c63ff" strokeWidth="2"/>
//                   <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
//                     stroke="#6c63ff" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <div>
//                 <div style={{ fontWeight: 600, fontSize: 13, color: "#1e1b4b" }}>
//                   Guest mode
//                 </div>
//                 <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
//                   Chat without an account. Session saved locally.
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right: Guest chat preview */}
//           <div style={{
//             flex: 1, minWidth: 300,
//             background: "#fff", borderRadius: 20,
//             boxShadow: "0 8px 40px #6c63ff12",
//             border: "1px solid #ede9fe",
//             overflow: "hidden",
//           }}>
//             {/* Chat header bar */}
//             <div style={{
//               background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
//               padding: "14px 20px",
//               display: "flex", alignItems: "center", gap: 10,
//             }}>
//               <div style={{
//                 width: 32, height: 32, borderRadius: "50%",
//                 background: "rgba(255,255,255,0.2)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 color: "#fff", fontWeight: 700, fontSize: 13,
//               }}>AI</div>
//               <div>
//                 <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
//                   AI Assistant
//                 </div>
//                 <div style={{ color: "#c7d2fe", fontSize: 11 }}>
//                   Guest session · messages saved locally
//                 </div>
//               </div>
//             </div>
//             <Chat sessionId={sessionId} setSessionId={setSessionId} />
//           </div>

//         </div>
//       </div>
//     );
//   }

//   // ── Authenticated view ──
//   const activeSessionId = selectedSession ?? sessionId;

//   return (
//     <div className="app-shell">

//       {/* Dark overlay — Only render on mobile. This stops the blur on desktop. */}
//       {isMobile && (
//         <div
//           className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar — gets .open class to slide in on mobile or show on desktop */}
//       <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <Sidebar
//           token={token}
//           onSelectChat={handleSelectChat}
//           onNewChat={handleNewChat}
//           activeChatId={activeSessionId}
//         />
//       </div>

//       {/* Main area */}
//       <div className="chat-main">
//         <div className="topbar">
//           <button
//             onClick={() => setSidebarOpen(o => !o)}
//             style={{
//               width: 36, height: 36, borderRadius: 8,
//               border: "1.5px solid #ede9fe",
//               background: sidebarOpen ? "#f5f3ff" : "#fff",
//               cursor: "pointer",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               flexShrink: 0, transition: "all 0.15s",
//             }}
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//               <path d="M3 6h18M3 12h18M3 18h18"
//                 stroke="#6c63ff" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </button>

//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <div style={{
//               width: 28, height: 28, borderRadius: 7,
//               background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               color: "#fff", fontWeight: 800, fontSize: 11,
//             }}>AI</div>
//             <span style={{ fontWeight: 700, fontSize: 15, color: "#1e1b4b" }}>
//               AI Chat
//             </span>
//           </div>

//           {activeSessionId && (
//             <div className="session-pill badge">Session active</div>
//           )}

//           <div style={{ flex: 1 }} />

//           <button
//             onClick={handleNewChat}
//             style={{
//               padding: "7px 14px",
//               background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
//               color: "#fff", border: "none", borderRadius: 8,
//               fontWeight: 600, fontSize: 12, cursor: "pointer",
//               display: "flex", alignItems: "center", gap: 6,
//               boxShadow: "0 2px 8px #6c63ff22",
//             }}
//           >
//             <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
//             <span style={{ display: isMobile ? "none" : "inline" }}>
//               New Chat
//             </span>
//           </button>
//         </div>

//         <div className="chat-panel">
//           <div className="chat-panel-inner">
//             <Chat
//               token={token}
//               sessionId={activeSessionId}
//               setSessionId={(sid) => {
//                 setSessionId(sid);
//                 setSelectedSession(null);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function App() {
  const { token } = useContext(AuthContext);
  const [showSignup, setShowSignup] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("session_id");
      if (saved) setSessionId(saved);
    } catch (err) {
      console.warn("Could not read session_id from localStorage:", err);
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionId) localStorage.setItem("session_id", sessionId);
      else localStorage.removeItem("session_id");
    } catch (err) {
      console.warn("Could not persist session_id to localStorage:", err);
    }
  }, [sessionId]);

  const handleSelectChat = (id) => {
    setSelectedSession(id);
    setSessionId(id);
    if (isMobile) setSidebarOpen(false);
  };

  const handleNewChat = () => {
    setSelectedSession(null);
    setSessionId(null);
    try { localStorage.removeItem("session_id"); } catch {}
    if (isMobile) setSidebarOpen(false);
  };

  // ── Unauthenticated view ──
  if (!token) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        fontFamily: "var(--font-main)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "fixed", top: "-20%", right: "-10%",
          width: "50%", height: "60%",
          background: "radial-gradient(ellipse, rgba(232,169,77,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Top nav */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 32px",
          height: 60,
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border)",
          position: "relative", zIndex: 10,
        }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              RAG<span style={{ color: "var(--accent)" }}>Chat</span>
            </span>
          </div>

          {/* Auth toggle */}
          <div style={{
            display: "flex", gap: 2,
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-md)",
            padding: 3,
            border: "1px solid var(--border)",
          }}>
            {["Sign In", "Sign Up"].map((label, i) => {
              const active = i === 0 ? !showSignup : showSignup;
              return (
                <button
                  key={label}
                  onClick={() => setShowSignup(i === 1)}
                  style={{
                    padding: "6px 16px", borderRadius: "var(--radius-sm)",
                    fontWeight: 500, fontSize: 13, cursor: "pointer",
                    border: "none", transition: "all var(--transition)",
                    background: active ? "var(--accent)" : "transparent",
                    color: active ? "var(--text-inverse)" : "var(--text-secondary)",
                    fontFamily: "var(--font-main)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "40px 24px",
          display: "flex", gap: 32,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>

          {/* Left: Auth form */}
          <div style={{ flex: "0 0 400px", minWidth: 300 }}>
            {showSignup ? <Signup /> : <Login />}

            {/* Guest divider */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              margin: "24px 0 16px",
            }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                or continue as guest
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <div style={{
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              padding: "12px 14px",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: "var(--radius-sm)", flexShrink: 0,
                background: "var(--bg-elevated)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="var(--accent)" strokeWidth="1.5"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>Guest mode</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>
                  Chat without an account. Session saved locally.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Guest chat preview */}
          <div style={{
            flex: 1, minWidth: 300,
            background: "var(--bg-surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}>
            {/* Chat header bar */}
            <div style={{
              background: "var(--bg-elevated)",
              padding: "12px 18px",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: "var(--radius-sm)",
                background: "var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="var(--text-inverse)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 13 }}>AI Assistant</div>
                <div style={{ color: "var(--text-muted)", fontSize: 11 }}>Guest session · saved locally</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
                <span style={{ fontSize: 10, color: "var(--green)", fontWeight: 500 }}>Online</span>
              </div>
            </div>
            <Chat sessionId={sessionId} setSessionId={setSessionId} />
          </div>
        </div>
      </div>
    );
  }

  // ── Authenticated view ──
  const activeSessionId = selectedSession ?? sessionId;

  return (
    <div className="app-shell">

      {isMobile && (
        <div
          className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar
          token={token}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          activeChatId={activeSessionId}
        />
      </div>

      <div className="chat-main">
        <div className="topbar">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className={`topbar-btn ${sidebarOpen ? "active" : ""}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18"
                stroke={sidebarOpen ? "var(--accent)" : "var(--text-secondary)"}
                strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 26, height: 26, borderRadius: "var(--radius-sm)",
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="var(--text-inverse)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              RAG<span style={{ color: "var(--accent)" }}>Chat</span>
            </span>
          </div>

          {activeSessionId && (
            <div className="session-pill">● Active</div>
          )}

          <div style={{ flex: 1 }} />

          <button
            onClick={handleNewChat}
            style={{
              padding: "7px 14px",
              background: "var(--accent)",
              color: "var(--text-inverse)",
              border: "none", borderRadius: "var(--radius-sm)",
              fontWeight: 600, fontSize: 12, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-main)",
              transition: "opacity var(--transition)",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            {!isMobile && <span>New Chat</span>}
          </button>
        </div>

        <div className="chat-panel">
          <div className="chat-panel-inner">
            <Chat
              token={token}
              sessionId={activeSessionId}
              setSessionId={(sid) => {
                setSessionId(sid);
                setSelectedSession(null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}