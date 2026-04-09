// // src/Chat.js
// import React, { useState, useEffect, useContext, useRef } from "react";
// import { AuthContext } from "./AuthContext";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// // ----------------
// // Markdown Styles
// // ----------------
// const markdownStyles = `
//   .md-body { font-size: 15px; line-height: 1.7; color: inherit; }
//   .md-body h1 { font-size: 1.5em; font-weight: 700; margin: 0.8em 0 0.4em; border-bottom: 2px solid #6c63ff22; padding-bottom: 4px; color: #4f46e5; }
//   .md-body h2 { font-size: 1.25em; font-weight: 700; margin: 0.8em 0 0.3em; color: #4f46e5; }
//   .md-body h3 { font-size: 1.05em; font-weight: 600; margin: 0.6em 0 0.2em; color: #6d28d9; }
//   .md-body p  { margin: 0.4em 0 0.6em; }
//   .md-body ul { padding-left: 1.4em; margin: 0.4em 0 0.6em; list-style: disc; }
//   .md-body ol { padding-left: 1.4em; margin: 0.4em 0 0.6em; list-style: decimal; }
//   .md-body li { margin: 0.25em 0; }
//   .md-body strong { font-weight: 700; color: #1e1b4b; }
//   .md-body em { font-style: italic; color: #6d28d9; }
//   .md-body code {
//     background: #f3f0ff; color: #5b21b6; font-family: monospace;
//     padding: 1px 6px; border-radius: 4px; font-size: 0.88em;
//   }
//   .md-body pre {
//     background: #1e1b4b; color: #e0e7ff; padding: 14px 16px;
//     border-radius: 8px; overflow-x: auto; font-size: 0.88em;
//     margin: 0.6em 0 0.8em;
//   }
//   .md-body pre code { background: none; color: inherit; padding: 0; font-size: 1em; }
//   .md-body blockquote {
//     border-left: 4px solid #6c63ff; background: #f5f3ff;
//     margin: 0.6em 0; padding: 8px 14px; border-radius: 0 6px 6px 0;
//     color: #4c1d95; font-style: italic;
//   }
//   .md-body table { border-collapse: collapse; width: 100%; margin: 0.6em 0; font-size: 0.92em; }
//   .md-body th {
//     background: #4f46e5; color: #fff; padding: 7px 12px;
//     text-align: left; font-weight: 600;
//   }
//   .md-body td { padding: 6px 12px; border-bottom: 1px solid #e5e7eb; }
//   .md-body tr:nth-child(even) td { background: #f5f3ff; }
//   .md-body a { color: #4f46e5; text-decoration: underline; }
//   .md-body hr { border: none; border-top: 1px solid #e5e7eb; margin: 0.8em 0; }
// `;

// // ----------------
// // MessageBubble
// // ----------------
// function MessageBubble({ role, content }) {
//   const isUser = role === "user";

//   if (isUser) {
//     return (
//       <div style={{
//         display: "flex",
//         justifyContent: "flex-end",
//         margin: "6px 0",
//       }}>
//         <div style={{
//           background: "#4f46e5",
//           color: "#fff",
//           borderRadius: "18px 18px 4px 18px",
//           padding: "10px 16px",
//           maxWidth: "75%",
//           fontSize: 15,
//           lineHeight: 1.5,
//           wordBreak: "break-word",
//         }}>
//           {content}
//         </div>
//       </div>
//     );
//   }

//   // Assistant: render markdown
//   return (
//     <div style={{
//       display: "flex",
//       justifyContent: "flex-start",
//       margin: "6px 0",
//     }}>
//       {/* Avatar dot */}
//       <div style={{
//         width: 30, height: 30, borderRadius: "50%",
//         background: "linear-gradient(135deg,#6c63ff,#4f46e5)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         color: "#fff", fontSize: 13, fontWeight: 700,
//         flexShrink: 0, marginRight: 8, marginTop: 4,
//       }}>AI</div>

//       <div style={{
//         background: "#fff",
//         border: "1px solid #e5e7eb",
//         borderRadius: "4px 18px 18px 18px",
//         padding: "12px 16px",
//         maxWidth: "80%",
//         boxShadow: "0 1px 4px #0000000a",
//         wordBreak: "break-word",
//       }}>
//         <div className="md-body">
//           <ReactMarkdown remarkPlugins={[remarkGfm]}>
//             {content}
//           </ReactMarkdown>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ----------------
// // Main Chat
// // ----------------
// export default function Chat({ token: propToken, sessionId: propSessionId, setSessionId }) {
//   const auth = useContext(AuthContext);
//   const token = propToken ?? auth?.token ?? null;
//   const logout = auth?.logout ?? (() => {});
//   const [message, setMessage] = useState("");
//   const [chatLog, setChatLog] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [sending, setSending] = useState(false);
//   const containerRef = useRef(null);
//   const activeSessionRef = useRef(propSessionId || null);









//   // Inside your Chat component...
// const textAreaRef = useRef(null);

// // Auto-resize effect
// useEffect(() => {
//   if (textAreaRef.current) {
//     // Reset height to calculate correctly
//     textAreaRef.current.style.height = "auto";
//     // Set height based on scrollHeight (content size)
//     // We limit it to 200px so it doesn't grow forever
//     const newHeight = Math.min(textAreaRef.current.scrollHeight, 200);
//     textAreaRef.current.style.height = `${newHeight}px`;
//   }
// }, [message]);

// // Update handleKeyDown to be more robust

 









//   // Inject markdown styles once
//   useEffect(() => {
//     const id = "md-chat-styles";
//     if (!document.getElementById(id)) {
//       const tag = document.createElement("style");
//       tag.id = id;
//       tag.textContent = markdownStyles;
//       document.head.appendChild(tag);
//     }
//   }, []);

//   // Keep ref in sync when parent switches session
//   useEffect(() => {
//     activeSessionRef.current = propSessionId || null;
//   }, [propSessionId]);

//   // Load history when session changes
//   useEffect(() => {
//     const controller = new AbortController();
//     const loadHistory = async () => {
//       setLoadingHistory(true);
//       try {
//         if (propSessionId) {
//           const res = await fetch(
//             `http://127.0.0.1:8000/chat-history/${encodeURIComponent(propSessionId)}`,
//             {
//               method: "GET",
//               headers: token ? { Authorization: `Bearer ${token}` } : {},
//               signal: controller.signal,
//             }
//           );
//           if (controller.signal.aborted) return;
//           const data = await res.json().catch(() => null);
//           if (res.ok) {
//             setChatLog(Array.isArray(data?.messages) ? data.messages : []);
//           } else {
//             console.error("Failed to load session history:", data);
//             setChatLog([]);
//           }
//         } else {
//           setChatLog([]);
//         }
//       } catch (err) {
//         if (err.name !== "AbortError") {
//           console.error("Error loading chat history:", err);
//           setChatLog([]);
//         }
//       } finally {
//         setLoadingHistory(false);
//       }
//     };
//     loadHistory();
//     return () => controller.abort();
//   }, [propSessionId, token]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//     }
//   }, [chatLog]);

//   const sendMessage = async () => {
//     const trimmed = message.trim();
//     if (!trimmed) return;

//     const activeSessionId = activeSessionRef.current || null;

//     if (!token && !activeSessionId) {
//       alert("Please login or start a guest session.");
//       return;
//     }

//     setSending(true);
//     const tempId = `u-${Date.now()}`;
//     setChatLog(prev => [...prev, { id: tempId, role: "user", content: trimmed }]);
//     setMessage("");

//     try {
//       const payload = token
//         ? { message: trimmed, ...(activeSessionId ? { session_id: activeSessionId } : {}) }
//         : { message: trimmed, session_id: activeSessionId };

//       const headers = { "Content-Type": "application/json" };
//       if (token) headers.Authorization = `Bearer ${token}`;

//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers,
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json().catch(() => null);

//       if (!res.ok) {
//         setChatLog(prev => prev.filter(m => m.id !== tempId));
//         alert(data?.detail || "Error sending message");
//         return;
//       }

//       const returnedSessionId = data?.session_id;
//       if (returnedSessionId) {
//         // Update ref immediately — no re-render delay
//         activeSessionRef.current = returnedSessionId;
//         if (!token) {
//           try {
//             setSessionId?.(returnedSessionId);
//             localStorage.setItem("session_id", returnedSessionId);
//           } catch {}
//         } else {
//           setSessionId?.(returnedSessionId);
//         }
//       }

//       setChatLog(prev => {
//         const withoutOptimistic = prev.filter(m => m.id !== tempId);
//         return [
//           ...withoutOptimistic,
//           { role: "user", content: trimmed },
//           { role: "assistant", content: data.response },
//         ];
//       });

//       const sidToUse = returnedSessionId || activeSessionId;
//       window.dispatchEvent(
//         new CustomEvent("chat:updated", {
//           detail: {
//             session_id: sidToUse,
//             last_message: trimmed,
//             last_updated: new Date().toISOString(),
//           },
//         })
//       );
//     } catch (err) {
//       setChatLog(prev => prev.filter(m => m.id !== tempId));
//       alert("Network error sending message");
//     } finally {
//       setSending(false);
//     }
//   };

// const handleKeyDown = (e) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();
//     if (!sending && message.trim()) {
//       sendMessage();
//     }
//   }
// };



// return (
//     <div style={{ 
//       // 1. Take up 100% of the parent container instead of being a small box
//       width: "100%", 
//       height: "100%", 
//       minHeight: "85vh", // Fallback just in case the parent is misconfigured
//       display: "flex", 
//       flexDirection: "column", 
//       fontFamily: "system-ui, sans-serif",
//       boxSizing: "border-box"
//     }}>

//       {/* Header - Stretches full width */}
//       <div style={{
//         display: "flex", justifyContent: "space-between",
//         alignItems: "center", 
//         padding: "16px 24px", // More breathing room
//         borderBottom: "1px solid #e5e7eb", 
//         background: "#fff",
//         flexShrink: 0
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <div style={{
//             width: 36, height: 36, borderRadius: "50%",
//             background: "linear-gradient(135deg,#6c63ff,#4f46e5)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             color: "#fff", fontWeight: 700, fontSize: 14,
//           }}>AI</div>
//           <div>
//             <div style={{ fontWeight: 700, fontSize: 16, color: "#1e1b4b" }}>AI Assistant</div>
//             <div style={{ fontSize: 12, color: "#10b981" }}>● Online</div>
//           </div>
//         </div>
//         {auth && (
//           <button
//             onClick={logout}
//             style={{
//               padding: "6px 14px", border: "1px solid #e5e7eb",
//               borderRadius: 8, cursor: "pointer", background: "#fff",
//               color: "#6b7280", fontSize: 13,
//             }}
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Chat window - Takes up all remaining space, content centered */}
//       <div
//         ref={containerRef}
//         style={{
//           flex: 1, 
//           overflowY: "auto",
//           padding: "24px 16px",
//           background: "#f9fafb", // Seamless background color
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center", // This centers the message container
//           minHeight: 0 
//         }}
//       >
//         {/* ChatGPT Style: Inner wrapper keeps messages readable (maxWidth 800) */}
//         <div style={{ width: "100%", maxWidth: 800 }}>
//           {loadingHistory ? (
//             <div style={{ textAlign: "center", color: "#9ca3af", marginTop: 40 }}>
//               Loading history...
//             </div>
//           ) : chatLog.length === 0 ? (
//             <div style={{ textAlign: "center", color: "#9ca3af", marginTop: 60 }}>
//               <div style={{ fontSize: 36, marginBottom: 10 }}>💬</div>
//               <div style={{ fontWeight: 600, fontSize: 15 }}>Start a conversation</div>
//               <div style={{ fontSize: 13, marginTop: 4 }}>Ask me anything!</div>
//             </div>
//           ) : (
//             chatLog.map((msg, idx) => (
//               <MessageBubble key={msg.id || idx} role={msg.role} content={msg.content} />
//             ))
//           )}

//           {/* Typing indicator */}
//           {sending && (
//             <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0" }}>
//               <div style={{
//                 width: 30, height: 30, borderRadius: "50%",
//                 background: "linear-gradient(135deg,#6c63ff,#4f46e5)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
//               }}>AI</div>
//               <div style={{
//                 background: "#fff", border: "1px solid #e5e7eb",
//                 borderRadius: "4px 18px 18px 18px",
//                 padding: "12px 16px", display: "flex", gap: 5, alignItems: "center",
//               }}>
//                 {[0, 1, 2].map(i => (
//                   <div key={i} style={{
//                     width: 7, height: 7, borderRadius: "50%", background: "#6c63ff",
//                     animation: "bounce 1.2s infinite",
//                     animationDelay: `${i * 0.2}s`,
//                   }} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bounce animation */}
//       <style>{`
//         @keyframes bounce {
//           0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
//           40% { transform: translateY(-6px); opacity: 1; }
//         }
//       `}</style>

//       {/* Input area - Outer wrapper centered, seamless with background */}
//       <div style={{
//         background: "#f9fafb", 
//         padding: "0 16px 24px 16px", // Space at the very bottom
//         display: "flex", 
//         justifyContent: "center", // Centers the input box
//         flexShrink: 0
//       }}>
//         {/* Inner Input Box - Matches width of messages */}
//         <div style={{
//           width: "100%",
//           maxWidth: 800,
//           display: "flex", gap: 10, alignItems: "flex-end",
//           background: "#fff", border: "1px solid #d1d5db", // Stronger border for input
//           borderRadius: 16, // Smoother rounded corners
//           padding: "10px 12px",
//           boxShadow: "0 4px 6px #0000000a", // Nice shadow
//         }}>
//           <textarea
//             ref={textAreaRef}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Message AI Assistant..."
//             style={{
//               flex: 1,
//               resize: "none",
//               border: "none",
//               outline: "none",
//               fontSize: "16px", // Slightly larger font for typing
//               fontFamily: "inherit",
//               lineHeight: "1.5",
//               background: "transparent",
//               color: "#1e1b4b",
//               paddingTop: "8px",
//               paddingBottom: "8px",
//               paddingLeft: "8px",
//               maxHeight: "200px",
//               minHeight: "24px",
//               overflowY: "auto",
//             }}
//             disabled={sending}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={sending || !message.trim()}
//             style={{
//               padding: "10px 20px",
//               background: sending || !message.trim() ? "#c7d2fe" : "#4f46e5",
//               color: "#fff", border: "none", borderRadius: 10,
//               cursor: sending || !message.trim() ? "not-allowed" : "pointer",
//               fontWeight: 600, fontSize: 14, transition: "background 0.2s",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {sending ? "Sending..." : "Send ➤"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




















// // src/Chat.js
// import React, { useState, useEffect, useContext, useRef } from "react";
// import { AuthContext } from "./AuthContext";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// // ── Markdown Styles (dark theme) ──
// const markdownStyles = `
//   .md-body { font-size: 14px; line-height: 1.75; color: inherit; font-family: 'DM Sans', sans-serif; }
//   .md-body h1 { font-size: 1.35em; font-weight: 600; margin: 1em 0 0.4em; color: #e8ecf4; border-bottom: 1px solid #2a3448; padding-bottom: 6px; }
//   .md-body h2 { font-size: 1.15em; font-weight: 600; margin: 0.9em 0 0.3em; color: #e8ecf4; }
//   .md-body h3 { font-size: 1em; font-weight: 600; margin: 0.7em 0 0.2em; color: #e8a94d; }
//   .md-body p  { margin: 0.4em 0 0.6em; color: #c5ccd8; }
//   .md-body ul { padding-left: 1.4em; margin: 0.4em 0 0.6em; list-style: disc; }
//   .md-body ol { padding-left: 1.4em; margin: 0.4em 0 0.6em; list-style: decimal; }
//   .md-body li { margin: 0.25em 0; color: #c5ccd8; }
//   .md-body strong { font-weight: 600; color: #e8ecf4; }
//   .md-body em { font-style: italic; color: #e8a94d; }
//   .md-body code {
//     background: #0f1117; color: #f5c97a;
//     font-family: 'DM Mono', monospace;
//     padding: 2px 7px; border-radius: 4px; font-size: 0.85em;
//     border: 1px solid #2a3448;
//   }
//   .md-body pre {
//     background: #0f1117; color: #e8ecf4;
//     padding: 14px 16px; border-radius: 8px;
//     overflow-x: auto; font-size: 0.85em;
//     margin: 0.6em 0 0.8em;
//     border: 1px solid #2a3448;
//     font-family: 'DM Mono', monospace;
//   }
//   .md-body pre code { background: none; color: inherit; padding: 0; border: none; font-size: 1em; }
//   .md-body blockquote {
//     border-left: 3px solid #e8a94d;
//     background: rgba(232,169,77,0.06);
//     margin: 0.6em 0; padding: 8px 14px;
//     border-radius: 0 6px 6px 0;
//     color: #d4a84a; font-style: italic;
//   }
//   .md-body table { border-collapse: collapse; width: 100%; margin: 0.6em 0; font-size: 0.9em; }
//   .md-body th { background: #1e2535; color: #e8ecf4; padding: 8px 12px; text-align: left; font-weight: 600; border-bottom: 1px solid #2a3448; }
//   .md-body td { padding: 7px 12px; border-bottom: 1px solid #1e2535; color: #c5ccd8; }
//   .md-body tr:hover td { background: rgba(255,255,255,0.02); }
//   .md-body a { color: #e8a94d; text-decoration: underline; text-underline-offset: 2px; }
//   .md-body hr { border: none; border-top: 1px solid #2a3448; margin: 0.8em 0; }
// `;

// // ── Avatar ──
// function Avatar({ size = 28 }) {
//   return (
//     <div style={{
//       width: size, height: size,
//       borderRadius: 6,
//       background: "var(--accent)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       flexShrink: 0,
//     }}>
//       <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
//         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
//           stroke="var(--text-inverse)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     </div>
//   );
// }

// // ── MessageBubble ──
// function MessageBubble({ role, content }) {
//   const isUser = role === "user";

//   if (isUser) {
//     return (
//       <div style={{ display: "flex", justifyContent: "flex-end", margin: "4px 0", animation: "fadeUp 0.2s ease forwards" }}>
//         <div style={{
//           background: "var(--bg-elevated)",
//           color: "var(--text-primary)",
//           borderRadius: "var(--radius-md) var(--radius-md) 3px var(--radius-md)",
//           padding: "10px 14px",
//           maxWidth: "72%",
//           fontSize: 14,
//           lineHeight: 1.6,
//           wordBreak: "break-word",
//           border: "1px solid var(--border-strong)",
//         }}>
//           {content}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", justifyContent: "flex-start", margin: "4px 0", gap: 10, animation: "fadeUp 0.2s ease forwards" }}>
//       <Avatar size={28} />
//       <div style={{
//         background: "var(--bg-base)",
//         border: "1px solid var(--border)",
//         borderRadius: "3px var(--radius-md) var(--radius-md) var(--radius-md)",
//         padding: "12px 14px",
//         maxWidth: "80%",
//         wordBreak: "break-word",
//       }}>
//         <div className="md-body">
//           <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── TypingIndicator ──
// function TypingIndicator() {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
//       <Avatar size={28} />
//       <div style={{
//         background: "var(--bg-base)",
//         border: "1px solid var(--border)",
//         borderRadius: "3px var(--radius-md) var(--radius-md) var(--radius-md)",
//         padding: "12px 14px",
//         display: "flex", gap: 5, alignItems: "center",
//       }}>
//         {[0, 1, 2].map(i => (
//           <div key={i} style={{
//             width: 6, height: 6, borderRadius: "50%",
//             background: "var(--accent)",
//             animation: "pulse 1.2s infinite",
//             animationDelay: `${i * 0.2}s`,
//           }} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── EmptyState ──
// function EmptyState() {
//   const hints = [
//     "Summarize the key concepts in the documents",
//     "What are the main topics covered?",
//     "Explain a specific concept in detail",
//   ];
//   return (
//     <div style={{ textAlign: "center", marginTop: 60, padding: "0 20px" }}>
//       <div style={{
//         width: 52, height: 52, borderRadius: 12,
//         background: "var(--accent-glow)",
//         border: "1px solid rgba(232,169,77,0.2)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         margin: "0 auto 18px",
//       }}>
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//           <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
//             stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </div>
//       <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 6 }}>
//         Ask anything
//       </div>
//       <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6 }}>
//         Powered by your documents + AI
//       </div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
//         {hints.map((hint, i) => (
//           <div key={i} style={{
//             fontSize: 12, color: "var(--text-secondary)",
//             background: "var(--bg-elevated)",
//             border: "1px solid var(--border)",
//             borderRadius: "var(--radius-sm)",
//             padding: "6px 12px",
//             cursor: "default",
//             maxWidth: 340,
//           }}>
//             {hint}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── Main Chat ──
// export default function Chat({ token: propToken, sessionId: propSessionId, setSessionId }) {
//   const auth = useContext(AuthContext);
//   const token = propToken ?? auth?.token ?? null;
//   const logout = auth?.logout ?? (() => {});
//   const [message, setMessage] = useState("");
//   const [chatLog, setChatLog] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [sending, setSending] = useState(false);
//   const containerRef = useRef(null);
//   const activeSessionRef = useRef(propSessionId || null);
//   const textAreaRef = useRef(null);

//   // Auto-resize textarea
//   useEffect(() => {
//     if (textAreaRef.current) {
//       textAreaRef.current.style.height = "auto";
//       const newHeight = Math.min(textAreaRef.current.scrollHeight, 200);
//       textAreaRef.current.style.height = `${newHeight}px`;
//     }
//   }, [message]);

//   // Inject markdown styles once
//   useEffect(() => {
//     const id = "md-chat-styles-v2";
//     if (!document.getElementById(id)) {
//       const tag = document.createElement("style");
//       tag.id = id;
//       tag.textContent = markdownStyles;
//       document.head.appendChild(tag);
//     }
//   }, []);

//   useEffect(() => {
//     activeSessionRef.current = propSessionId || null;
//   }, [propSessionId]);

//   useEffect(() => {
//     const controller = new AbortController();
//     const loadHistory = async () => {
//       setLoadingHistory(true);
//       try {
//         if (propSessionId) {
//           const res = await fetch(
//             `http://127.0.0.1:8000/chat-history/${encodeURIComponent(propSessionId)}`,
//             {
//               method: "GET",
//               headers: token ? { Authorization: `Bearer ${token}` } : {},
//               signal: controller.signal,
//             }
//           );
//           if (controller.signal.aborted) return;
//           const data = await res.json().catch(() => null);
//           if (res.ok) {
//             setChatLog(Array.isArray(data?.messages) ? data.messages : []);
//           } else {
//             setChatLog([]);
//           }
//         } else {
//           setChatLog([]);
//         }
//       } catch (err) {
//         if (err.name !== "AbortError") setChatLog([]);
//       } finally {
//         setLoadingHistory(false);
//       }
//     };
//     loadHistory();
//     return () => controller.abort();
//   }, [propSessionId, token]);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//     }
//   }, [chatLog]);

//   const sendMessage = async () => {
//     const trimmed = message.trim();
//     if (!trimmed) return;
//     const activeSessionId = activeSessionRef.current || null;
//     if (!token && !activeSessionId) {
//       alert("Please login or start a guest session.");
//       return;
//     }
//     setSending(true);
//     const tempId = `u-${Date.now()}`;
//     setChatLog(prev => [...prev, { id: tempId, role: "user", content: trimmed }]);
//     setMessage("");
//     try {
//       const payload = token
//         ? { message: trimmed, ...(activeSessionId ? { session_id: activeSessionId } : {}) }
//         : { message: trimmed, session_id: activeSessionId };
//       const headers = { "Content-Type": "application/json" };
//       if (token) headers.Authorization = `Bearer ${token}`;
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST", headers, body: JSON.stringify(payload),
//       });
//       const data = await res.json().catch(() => null);
//       if (!res.ok) {
//         setChatLog(prev => prev.filter(m => m.id !== tempId));
//         alert(data?.detail || "Error sending message");
//         return;
//       }
//       const returnedSessionId = data?.session_id;
//       if (returnedSessionId) {
//         activeSessionRef.current = returnedSessionId;
//         if (!token) {
//           try { setSessionId?.(returnedSessionId); localStorage.setItem("session_id", returnedSessionId); } catch {}
//         } else {
//           setSessionId?.(returnedSessionId);
//         }
//       }
//       setChatLog(prev => {
//         const withoutOptimistic = prev.filter(m => m.id !== tempId);
//         return [...withoutOptimistic,
//           { role: "user", content: trimmed },
//           { role: "assistant", content: data.response },
//         ];
//       });
//       const sidToUse = returnedSessionId || activeSessionId;
//       window.dispatchEvent(new CustomEvent("chat:updated", {
//         detail: { session_id: sidToUse, last_message: trimmed, last_updated: new Date().toISOString() },
//       }));
//     } catch (err) {
//       setChatLog(prev => prev.filter(m => m.id !== tempId));
//       alert("Network error sending message");
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       if (!sending && message.trim()) sendMessage();
//     }
//   };

//   return (
//     <div style={{
//       width: "100%", height: "100%", minHeight: "85vh",
//       display: "flex", flexDirection: "column",
//       fontFamily: "var(--font-main)", boxSizing: "border-box",
//       background: "var(--bg-surface)",
//     }}>

//       {/* Header */}
//       <div style={{
//         display: "flex", justifyContent: "space-between", alignItems: "center",
//         padding: "12px 18px",
//         borderBottom: "1px solid var(--border)",
//         background: "var(--bg-elevated)",
//         flexShrink: 0,
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <Avatar size={32} />
//           <div>
//             <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
//               AI Assistant
//             </div>
//             <div style={{ fontSize: 11, color: "var(--green)", display: "flex", alignItems: "center", gap: 4 }}>
//               <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)" }} />
//               RAG-powered · Online
//             </div>
//           </div>
//         </div>
//         {auth && (
//           <button
//             onClick={logout}
//             style={{
//               padding: "5px 12px",
//               border: "1px solid var(--border)",
//               borderRadius: "var(--radius-sm)",
//               cursor: "pointer",
//               background: "transparent",
//               color: "var(--text-secondary)",
//               fontSize: 12, fontWeight: 500,
//               fontFamily: "var(--font-main)",
//               transition: "all var(--transition)",
//             }}
//             onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
//             onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
//           >
//             Sign out
//           </button>
//         )}
//       </div>

//       {/* Messages */}
//       <div
//         ref={containerRef}
//         style={{
//           flex: 1, overflowY: "auto",
//           padding: "20px 16px",
//           background: "var(--bg-surface)",
//           display: "flex", flexDirection: "column", alignItems: "center",
//           minHeight: 0,
//         }}
//       >
//         <div style={{ width: "100%", maxWidth: 780 }}>
//           {loadingHistory ? (
//             <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px 0" }}>
//               {[1, 2, 3].map(i => (
//                 <div key={i} style={{ display: "flex", gap: 10, justifyContent: i % 2 === 0 ? "flex-end" : "flex-start" }}>
//                   {i % 2 !== 0 && <div className="skeleton" style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0 }} />}
//                   <div className="skeleton" style={{ height: 44, width: `${40 + i * 15}%`, borderRadius: 10 }} />
//                 </div>
//               ))}
//             </div>
//           ) : chatLog.length === 0 ? (
//             <EmptyState />
//           ) : (
//             chatLog.map((msg, idx) => (
//               <MessageBubble key={msg.id || idx} role={msg.role} content={msg.content} />
//             ))
//           )}
//           {sending && <TypingIndicator />}
//         </div>
//       </div>

//       {/* Input */}
//       <div style={{
//         background: "var(--bg-surface)",
//         padding: "0 16px 16px",
//         display: "flex", justifyContent: "center",
//         flexShrink: 0,
//         borderTop: "1px solid var(--border)",
//         paddingTop: 12,
//       }}>
//         <div style={{
//           width: "100%", maxWidth: 780,
//           display: "flex", gap: 8, alignItems: "flex-end",
//           background: "var(--bg-input)",
//           border: "1px solid var(--border)",
//           borderRadius: "var(--radius-lg)",
//           padding: "8px 10px",
//           transition: "border-color var(--transition)",
//         }}
//           onFocusCapture={e => e.currentTarget.style.borderColor = "var(--accent)"}
//           onBlurCapture={e => e.currentTarget.style.borderColor = "var(--border)"}
//         >
//           <textarea
//             ref={textAreaRef}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask about your documents…"
//             style={{
//               flex: 1, resize: "none", border: "none", outline: "none",
//               fontSize: 14, fontFamily: "var(--font-main)",
//               lineHeight: 1.5, background: "transparent",
//               color: "var(--text-primary)",
//               paddingTop: 6, paddingBottom: 6, paddingLeft: 6,
//               maxHeight: 200, minHeight: 24, overflowY: "auto",
//             }}
//             disabled={sending}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={sending || !message.trim()}
//             style={{
//               width: 36, height: 36, flexShrink: 0,
//               background: (sending || !message.trim()) ? "var(--bg-elevated)" : "var(--accent)",
//               border: (sending || !message.trim()) ? "1px solid var(--border)" : "none",
//               borderRadius: "var(--radius-sm)",
//               cursor: (sending || !message.trim()) ? "not-allowed" : "pointer",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               transition: "all var(--transition)",
//             }}
//           >
//             {sending ? (
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                 style={{ animation: "spin 0.8s linear infinite" }}>
//                 <circle cx="12" cy="12" r="10" stroke="var(--text-muted)" strokeWidth="2" strokeOpacity="0.3"/>
//                 <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             ) : (
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                 <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
//                   stroke={(sending || !message.trim()) ? "var(--text-muted)" : "var(--text-inverse)"}
//                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.35; transform: scale(0.8); }
//           50% { opacity: 1; transform: scale(1); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(6px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }


















// // src/Chat.js
// import React, { useState, useEffect, useContext, useRef } from "react";
// import { AuthContext } from "./AuthContext";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// // ── Markdown Styles (dark theme — rich color coding) ──
// const markdownStyles = `
//   .md-body { font-size: 14px; line-height: 1.8; color: #c5ccd8; font-family: 'DM Sans', sans-serif; }

//   /* ── Headings: each level gets its own color ── */
//   .md-body h1 {
//     font-size: 1.35em; font-weight: 700; margin: 1em 0 0.4em;
//     color: #e8ecf4;
//     border-bottom: 1px solid #2a3448; padding-bottom: 6px;
//     letter-spacing: -0.02em;
//   }
//   .md-body h2 {
//     font-size: 1.15em; font-weight: 600; margin: 0.9em 0 0.3em;
//     color: #7dd3fc; /* sky blue — section titles */
//   }
//   .md-body h3 {
//     font-size: 1em; font-weight: 600; margin: 0.7em 0 0.2em;
//     color: #e8a94d; /* amber — sub-topics */
//   }
//   .md-body h4 {
//     font-size: 0.95em; font-weight: 600; margin: 0.6em 0 0.15em;
//     color: #a78bfa; /* violet — minor headings */
//   }

//   /* ── Paragraph & lists ── */
//   .md-body p  { margin: 0.35em 0 0.55em; }
//   .md-body ul { padding-left: 1.4em; margin: 0.4em 0 0.6em; list-style: none; }
//   .md-body ul li { position: relative; padding-left: 0.2em; margin: 0.3em 0; }
//   .md-body ul li::before {
//     content: '▸';
//     position: absolute; left: -1.1em;
//     color: #e8a94d; font-size: 0.8em; top: 0.15em;
//   }
//   .md-body ol { padding-left: 1.6em; margin: 0.4em 0 0.6em; list-style: decimal; }
//   .md-body ol li { margin: 0.3em 0; }
//   .md-body ol li::marker { color: #e8a94d; font-weight: 600; }

//   /* ── Bold = bright white, important ── */
//   .md-body strong {
//     font-weight: 700;
//     color: #f0f4ff;
//     background: rgba(240,244,255,0.05);
//     padding: 0 3px; border-radius: 3px;
//   }

//   /* ── Italic = amber accent, for emphasis / formulas context ── */
//   .md-body em { font-style: italic; color: #fbbf24; }

//   /* ── Inline code = teal (variables, functions, identifiers) ── */
//   .md-body code {
//     background: rgba(45,212,191,0.08);
//     color: #2dd4bf;
//     font-family: 'DM Mono', monospace;
//     padding: 2px 7px; border-radius: 4px; font-size: 0.85em;
//     border: 1px solid rgba(45,212,191,0.18);
//   }

//   /* ── Code block wrapper — handled by React component, not CSS pre ── */
//   .md-body pre {
//     margin: 0.6em 0 0.8em;
//   }
//   .md-body pre code {
//     background: none; color: inherit;
//     padding: 0; border: none; font-size: 1em;
//   }

//   /* ── Blockquote = formula / important note style ── */
//   .md-body blockquote {
//     border-left: 3px solid #a78bfa;
//     background: rgba(167,139,250,0.07);
//     margin: 0.7em 0; padding: 10px 14px;
//     border-radius: 0 6px 6px 0;
//     color: #c4b5fd;
//     font-style: normal;
//     font-size: 0.95em;
//   }
//   .md-body blockquote p { margin: 0; color: #c4b5fd; }

//   /* ── Tables ── */
//   .md-body table { border-collapse: collapse; width: 100%; margin: 0.7em 0; font-size: 0.9em; }
//   .md-body th {
//     background: #1e2535; color: #7dd3fc;
//     padding: 8px 12px; text-align: left; font-weight: 600;
//     border-bottom: 2px solid #2a3448;
//     font-size: 0.88em; letter-spacing: 0.04em; text-transform: uppercase;
//   }
//   .md-body td { padding: 7px 12px; border-bottom: 1px solid #1e2535; color: #c5ccd8; }
//   .md-body tr:nth-child(even) td { background: rgba(255,255,255,0.015); }
//   .md-body tr:hover td { background: rgba(232,169,77,0.04); }

//   /* ── Links ── */
//   .md-body a { color: #60a5fa; text-decoration: underline; text-underline-offset: 2px; }
//   .md-body a:hover { color: #93c5fd; }

//   /* ── HR ── */
//   .md-body hr { border: none; border-top: 1px solid #2a3448; margin: 1em 0; }

//   /* ── Math / formula hint — text wrapped in $ signs displayed differently ── */
//   .md-body .formula-inline {
//     font-family: 'DM Mono', monospace;
//     color: #34d399; font-size: 0.92em;
//     background: rgba(52,211,153,0.07);
//     padding: 1px 6px; border-radius: 4px;
//     border: 1px solid rgba(52,211,153,0.15);
//   }

//   /* ── Copy button inside code block ── */
//   .code-block-wrap { position: relative; margin: 0.6em 0 0.9em; }
//   .code-block-wrap pre {
//     background: #090d14;
//     color: #e2e8f0;
//     padding: 14px 16px 14px 16px;
//     border-radius: 8px;
//     overflow-x: auto;
//     font-size: 0.84em;
//     border: 1px solid #1e2d45;
//     font-family: 'DM Mono', monospace;
//     line-height: 1.7;
//     margin: 0;
//   }
//   .code-lang-bar {
//     display: flex; align-items: center; justify-content: space-between;
//     background: #111827;
//     border: 1px solid #1e2d45; border-bottom: none;
//     border-radius: 8px 8px 0 0;
//     padding: 5px 12px;
//   }
//   .code-lang-bar + pre { border-radius: 0 0 8px 8px; }
//   .code-lang-label {
//     font-size: 10px; font-family: 'DM Mono', monospace;
//     color: #4a5568; letter-spacing: 0.08em; text-transform: uppercase;
//   }
//   .copy-btn {
//     font-size: 11px; font-family: 'DM Sans', sans-serif;
//     background: transparent; border: 1px solid #2a3448;
//     color: #6b7280; border-radius: 4px;
//     padding: 2px 8px; cursor: pointer;
//     transition: all 0.15s ease;
//     display: flex; align-items: center; gap: 4px;
//   }
//   .copy-btn:hover { background: #1e2535; color: #e8a94d; border-color: rgba(232,169,77,0.3); }
//   .copy-btn.copied { color: #34d399; border-color: rgba(52,211,153,0.3); background: rgba(52,211,153,0.07); }
// `;

// // ── CodeBlock with copy button ──
// function CodeBlock({ language, children }) {
//   const [copied, setCopied] = React.useState(false);
//   const code = String(children).replace(/\n$/, "");

//   const handleCopy = () => {
//     navigator.clipboard.writeText(code).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <div className="code-block-wrap">
//       <div className="code-lang-bar">
//         <span className="code-lang-label">{language || "code"}</span>
//         <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
//           {copied ? (
//             <>
//               <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
//                 <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               Copied!
//             </>
//           ) : (
//             <>
//               <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
//                 <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
//                 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
//               </svg>
//               Copy
//             </>
//           )}
//         </button>
//       </div>
//       <pre><code>{code}</code></pre>
//     </div>
//   );
// }

// // ── Custom markdown renderers ──
// const markdownComponents = {
//   code({ node, inline, className, children, ...props }) {
//     const language = (className || "").replace("language-", "");
//     if (inline) {
//       return <code className={className} {...props}>{children}</code>;
//     }
//     return <CodeBlock language={language}>{children}</CodeBlock>;
//   },
//   // Bold: bright highlight
//   strong({ children }) {
//     return <strong>{children}</strong>;
//   },
//   // Italic: amber
//   em({ children }) {
//     return <em>{children}</em>;
//   },
// };

// // ── Avatar ──
// function Avatar({ size = 28 }) {
//   return (
//     <div style={{
//       width: size, height: size,
//       borderRadius: 6,
//       background: "var(--accent)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       flexShrink: 0,
//     }}>
//       <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
//         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
//           stroke="var(--text-inverse)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     </div>
//   );
// }

// // ── MessageBubble ──
// function MessageBubble({ role, content }) {
//   const isUser = role === "user";

//   if (isUser) {
//     return (
//       <div style={{ display: "flex", justifyContent: "flex-end", margin: "4px 0", animation: "fadeUp 0.2s ease forwards" }}>
//         <div style={{
//           background: "var(--bg-elevated)",
//           color: "var(--text-primary)",
//           borderRadius: "var(--radius-md) var(--radius-md) 3px var(--radius-md)",
//           padding: "10px 14px",
//           maxWidth: "72%",
//           fontSize: 14,
//           lineHeight: 1.6,
//           wordBreak: "break-word",
//           border: "1px solid var(--border-strong)",
//         }}>
//           {content}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", justifyContent: "flex-start", margin: "4px 0", gap: 10, animation: "fadeUp 0.2s ease forwards" }}>
//       <Avatar size={28} />
//       <div style={{
//         background: "var(--bg-base)",
//         border: "1px solid var(--border)",
//         borderRadius: "3px var(--radius-md) var(--radius-md) var(--radius-md)",
//         padding: "12px 14px",
//         maxWidth: "80%",
//         wordBreak: "break-word",
//       }}>
//         <div className="md-body">
//           <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{content}</ReactMarkdown>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── TypingIndicator ──
// function TypingIndicator() {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
//       <Avatar size={28} />
//       <div style={{
//         background: "var(--bg-base)",
//         border: "1px solid var(--border)",
//         borderRadius: "3px var(--radius-md) var(--radius-md) var(--radius-md)",
//         padding: "12px 14px",
//         display: "flex", gap: 5, alignItems: "center",
//       }}>
//         {[0, 1, 2].map(i => (
//           <div key={i} style={{
//             width: 6, height: 6, borderRadius: "50%",
//             background: "var(--accent)",
//             animation: "pulse 1.2s infinite",
//             animationDelay: `${i * 0.2}s`,
//           }} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── EmptyState ──
// function EmptyState() {
//   const hints = [
//     "Summarize the key concepts in the documents",
//     "What are the main topics covered?",
//     "Explain a specific concept in detail",
//   ];
//   return (
//     <div style={{ textAlign: "center", marginTop: 60, padding: "0 20px" }}>
//       <div style={{
//         width: 52, height: 52, borderRadius: 12,
//         background: "var(--accent-glow)",
//         border: "1px solid rgba(232,169,77,0.2)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         margin: "0 auto 18px",
//       }}>
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//           <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
//             stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </div>
//       <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 6 }}>
//         Ask anything
//       </div>
//       <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6 }}>
//         Powered by your documents + AI
//       </div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
//         {hints.map((hint, i) => (
//           <div key={i} style={{
//             fontSize: 12, color: "var(--text-secondary)",
//             background: "var(--bg-elevated)",
//             border: "1px solid var(--border)",
//             borderRadius: "var(--radius-sm)",
//             padding: "6px 12px",
//             cursor: "default",
//             maxWidth: 340,
//           }}>
//             {hint}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── Main Chat ──
// export default function Chat({ token: propToken, sessionId: propSessionId, setSessionId }) {
//   const auth = useContext(AuthContext);
//   const token = propToken ?? auth?.token ?? null;
//   const logout = auth?.logout ?? (() => {});
//   const [message, setMessage] = useState("");
//   const [chatLog, setChatLog] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [sending, setSending] = useState(false);
//   const containerRef = useRef(null);
//   const activeSessionRef = useRef(propSessionId || null);
//   const textAreaRef = useRef(null);

//   // Auto-resize textarea
//   useEffect(() => {
//     if (textAreaRef.current) {
//       textAreaRef.current.style.height = "auto";
//       const newHeight = Math.min(textAreaRef.current.scrollHeight, 200);
//       textAreaRef.current.style.height = `${newHeight}px`;
//     }
//   }, [message]);

//   // Inject markdown styles once
//   useEffect(() => {
//     const id = "md-chat-styles-v3";
//     if (!document.getElementById(id)) {
//       const tag = document.createElement("style");
//       tag.id = id;
//       tag.textContent = markdownStyles;
//       document.head.appendChild(tag);
//     }
//   }, []);

//   useEffect(() => {
//     activeSessionRef.current = propSessionId || null;
//   }, [propSessionId]);

//   useEffect(() => {
//     const controller = new AbortController();
//     const loadHistory = async () => {
//       setLoadingHistory(true);
//       try {
//         if (propSessionId) {
//           const res = await fetch(
//             `http://127.0.0.1:8000/chat-history/${encodeURIComponent(propSessionId)}`,
//             {
//               method: "GET",
//               headers: token ? { Authorization: `Bearer ${token}` } : {},
//               signal: controller.signal,
//             }
//           );
//           if (controller.signal.aborted) return;
//           const data = await res.json().catch(() => null);
//           if (res.ok) {
//             setChatLog(Array.isArray(data?.messages) ? data.messages : []);
//           } else {
//             setChatLog([]);
//           }
//         } else {
//           setChatLog([]);
//         }
//       } catch (err) {
//         if (err.name !== "AbortError") setChatLog([]);
//       } finally {
//         setLoadingHistory(false);
//       }
//     };
//     loadHistory();
//     return () => controller.abort();
//   }, [propSessionId, token]);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//     }
//   }, [chatLog]);

//   const sendMessage = async () => {
//     const trimmed = message.trim();
//     if (!trimmed) return;
//     const activeSessionId = activeSessionRef.current || null;
//     if (!token && !activeSessionId) {
//       alert("Please login or start a guest session.");
//       return;
//     }
//     setSending(true);
//     const tempId = `u-${Date.now()}`;
//     setChatLog(prev => [...prev, { id: tempId, role: "user", content: trimmed }]);
//     setMessage("");
//     try {
//       const payload = token
//         ? { message: trimmed, ...(activeSessionId ? { session_id: activeSessionId } : {}) }
//         : { message: trimmed, session_id: activeSessionId };
//       const headers = { "Content-Type": "application/json" };
//       if (token) headers.Authorization = `Bearer ${token}`;
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST", headers, body: JSON.stringify(payload),
//       });
//       const data = await res.json().catch(() => null);
//       if (!res.ok) {
//         setChatLog(prev => prev.filter(m => m.id !== tempId));
//         alert(data?.detail || "Error sending message");
//         return;
//       }
//       const returnedSessionId = data?.session_id;
//       if (returnedSessionId) {
//         activeSessionRef.current = returnedSessionId;
//         if (!token) {
//           try { setSessionId?.(returnedSessionId); localStorage.setItem("session_id", returnedSessionId); } catch {}
//         } else {
//           setSessionId?.(returnedSessionId);
//         }
//       }
//       setChatLog(prev => {
//         const withoutOptimistic = prev.filter(m => m.id !== tempId);
//         return [...withoutOptimistic,
//           { role: "user", content: trimmed },
//           { role: "assistant", content: data.response },
//         ];
//       });
//       const sidToUse = returnedSessionId || activeSessionId;
//       window.dispatchEvent(new CustomEvent("chat:updated", {
//         detail: { session_id: sidToUse, last_message: trimmed, last_updated: new Date().toISOString() },
//       }));
//     } catch (err) {
//       setChatLog(prev => prev.filter(m => m.id !== tempId));
//       alert("Network error sending message");
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       if (!sending && message.trim()) sendMessage();
//     }
//   };

//   return (
//     <div style={{
//       width: "100%", height: "100%", minHeight: "85vh",
//       display: "flex", flexDirection: "column",
//       fontFamily: "var(--font-main)", boxSizing: "border-box",
//       background: "var(--bg-surface)",
//     }}>

//       {/* Header */}
//       <div style={{
//         display: "flex", justifyContent: "space-between", alignItems: "center",
//         padding: "12px 18px",
//         borderBottom: "1px solid var(--border)",
//         background: "var(--bg-elevated)",
//         flexShrink: 0,
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <Avatar size={32} />
//           <div>
//             <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
//               AI Assistant
//             </div>
//             <div style={{ fontSize: 11, color: "var(--green)", display: "flex", alignItems: "center", gap: 4 }}>
//               <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)" }} />
//               RAG-powered · Online
//             </div>
//           </div>
//         </div>
//         {auth && (
//           <button
//             onClick={logout}
//             style={{
//               padding: "5px 12px",
//               border: "1px solid var(--border)",
//               borderRadius: "var(--radius-sm)",
//               cursor: "pointer",
//               background: "transparent",
//               color: "var(--text-secondary)",
//               fontSize: 12, fontWeight: 500,
//               fontFamily: "var(--font-main)",
//               transition: "all var(--transition)",
//             }}
//             onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
//             onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
//           >
//             Sign out
//           </button>
//         )}
//       </div>

//       {/* Messages */}
//       <div
//         ref={containerRef}
//         style={{
//           flex: 1, overflowY: "auto",
//           padding: "20px 16px",
//           background: "var(--bg-surface)",
//           display: "flex", flexDirection: "column", alignItems: "center",
//           minHeight: 0,
//         }}
//       >
//         <div style={{ width: "100%", maxWidth: 780 }}>
//           {loadingHistory ? (
//             <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px 0" }}>
//               {[1, 2, 3].map(i => (
//                 <div key={i} style={{ display: "flex", gap: 10, justifyContent: i % 2 === 0 ? "flex-end" : "flex-start" }}>
//                   {i % 2 !== 0 && <div className="skeleton" style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0 }} />}
//                   <div className="skeleton" style={{ height: 44, width: `${40 + i * 15}%`, borderRadius: 10 }} />
//                 </div>
//               ))}
//             </div>
//           ) : chatLog.length === 0 ? (
//             <EmptyState />
//           ) : (
//             chatLog.map((msg, idx) => (
//               <MessageBubble key={msg.id || idx} role={msg.role} content={msg.content} />
//             ))
//           )}
//           {sending && <TypingIndicator />}
//         </div>
//       </div>

//       {/* Input */}
//       <div style={{
//         background: "var(--bg-surface)",
//         padding: "0 16px 16px",
//         display: "flex", justifyContent: "center",
//         flexShrink: 0,
//         borderTop: "1px solid var(--border)",
//         paddingTop: 12,
//       }}>
//         <div style={{
//           width: "100%", maxWidth: 780,
//           display: "flex", gap: 8, alignItems: "flex-end",
//           background: "var(--bg-input)",
//           border: "1px solid var(--border)",
//           borderRadius: "var(--radius-lg)",
//           padding: "8px 10px",
//           transition: "border-color var(--transition)",
//         }}
//           onFocusCapture={e => e.currentTarget.style.borderColor = "var(--accent)"}
//           onBlurCapture={e => e.currentTarget.style.borderColor = "var(--border)"}
//         >
//           <textarea
//             ref={textAreaRef}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask about your documents…"
//             style={{
//               flex: 1, resize: "none", border: "none", outline: "none",
//               fontSize: 14, fontFamily: "var(--font-main)",
//               lineHeight: 1.5, background: "transparent",
//               color: "var(--text-primary)",
//               paddingTop: 6, paddingBottom: 6, paddingLeft: 6,
//               maxHeight: 200, minHeight: 24, overflowY: "auto",
//             }}
//             disabled={sending}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={sending || !message.trim()}
//             style={{
//               width: 36, height: 36, flexShrink: 0,
//               background: (sending || !message.trim()) ? "var(--bg-elevated)" : "var(--accent)",
//               border: (sending || !message.trim()) ? "1px solid var(--border)" : "none",
//               borderRadius: "var(--radius-sm)",
//               cursor: (sending || !message.trim()) ? "not-allowed" : "pointer",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               transition: "all var(--transition)",
//             }}
//           >
//             {sending ? (
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                 style={{ animation: "spin 0.8s linear infinite" }}>
//                 <circle cx="12" cy="12" r="10" stroke="var(--text-muted)" strokeWidth="2" strokeOpacity="0.3"/>
//                 <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             ) : (
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                 <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
//                   stroke={(sending || !message.trim()) ? "var(--text-muted)" : "var(--text-inverse)"}
//                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.35; transform: scale(0.8); }
//           50% { opacity: 1; transform: scale(1); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(6px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }














// src/Chat.js
import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "./AuthContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ── Markdown Styles (dark theme — rich color coding) ──
const markdownStyles = `
  .md-body { font-size: 14px; line-height: 1.8; color: #c5ccd8; font-family: 'DM Sans', sans-serif; }

  /* ── Headings: each level gets its own color ── */
  .md-body h1 {
    font-size: 1.35em; font-weight: 700; margin: 1em 0 0.4em;
    color: #e8ecf4;
    border-bottom: 1px solid #2a3448; padding-bottom: 6px;
    letter-spacing: -0.02em;
  }
  .md-body h2 {
    font-size: 1.15em; font-weight: 600; margin: 0.9em 0 0.3em;
    color: #7dd3fc; /* sky blue — section titles */
  }
  .md-body h3 {
    font-size: 1em; font-weight: 600; margin: 0.7em 0 0.2em;
    color: #e8a94d; /* amber — sub-topics */
  }
  .md-body h4 {
    font-size: 0.95em; font-weight: 600; margin: 0.6em 0 0.15em;
    color: #a78bfa; /* violet — minor headings */
  }

  /* ── Paragraph & lists ── */
  .md-body p  { margin: 0.35em 0 0.55em; }
  .md-body ul { padding-left: 1.4em; margin: 0.4em 0 0.6em; list-style: none; }
  .md-body ul li { position: relative; padding-left: 0.2em; margin: 0.3em 0; }
  .md-body ul li::before {
    content: '▸';
    position: absolute; left: -1.1em;
    color: #e8a94d; font-size: 0.8em; top: 0.15em;
  }
  .md-body ol { padding-left: 1.6em; margin: 0.4em 0 0.6em; list-style: decimal; }
  .md-body ol li { margin: 0.3em 0; }
  .md-body ol li::marker { color: #e8a94d; font-weight: 600; }

  /* ── Bold = bright white, important ── */
  .md-body strong {
    font-weight: 700;
    color: #f0f4ff;
    background: rgba(240,244,255,0.05);
    padding: 0 3px; border-radius: 3px;
  }

  /* ── Italic = amber accent, for emphasis / formulas context ── */
  .md-body em { font-style: italic; color: #fbbf24; }

  /* ── Inline code = teal (variables, functions, identifiers) ── */
  .md-body code {
    background: rgba(45,212,191,0.08);
    color: #2dd4bf;
    font-family: 'DM Mono', monospace;
    padding: 2px 7px; border-radius: 4px; font-size: 0.85em;
    border: 1px solid rgba(45,212,191,0.18);
  }

  /* ── Code block wrapper — handled by React component, not CSS pre ── */
  .md-body pre {
    margin: 0.6em 0 0.8em;
  }
  .md-body pre code {
    background: none; color: inherit;
    padding: 0; border: none; font-size: 1em;
  }

  /* ── Blockquote = formula / important note style ── */
  .md-body blockquote {
    border-left: 3px solid #a78bfa;
    background: rgba(167,139,250,0.07);
    margin: 0.7em 0; padding: 10px 14px;
    border-radius: 0 6px 6px 0;
    color: #c4b5fd;
    font-style: normal;
    font-size: 0.95em;
  }
  .md-body blockquote p { margin: 0; color: #c4b5fd; }

  /* ── Tables ── */
  .md-body table { border-collapse: collapse; width: 100%; margin: 0.7em 0; font-size: 0.9em; }
  .md-body th {
    background: #1e2535; color: #7dd3fc;
    padding: 8px 12px; text-align: left; font-weight: 600;
    border-bottom: 2px solid #2a3448;
    font-size: 0.88em; letter-spacing: 0.04em; text-transform: uppercase;
  }
  .md-body td { padding: 7px 12px; border-bottom: 1px solid #1e2535; color: #c5ccd8; }
  .md-body tr:nth-child(even) td { background: rgba(255,255,255,0.015); }
  .md-body tr:hover td { background: rgba(232,169,77,0.04); }

  /* ── Links ── */
  .md-body a { color: #60a5fa; text-decoration: underline; text-underline-offset: 2px; }
  .md-body a:hover { color: #93c5fd; }

  /* ── HR ── */
  .md-body hr { border: none; border-top: 1px solid #2a3448; margin: 1em 0; }

  /* ── Math / formula hint — text wrapped in $ signs displayed differently ── */
  .md-body .formula-inline {
    font-family: 'DM Mono', monospace;
    color: #34d399; font-size: 0.92em;
    background: rgba(52,211,153,0.07);
    padding: 1px 6px; border-radius: 4px;
    border: 1px solid rgba(52,211,153,0.15);
  }

  /* ── Copy button inside code block ── */
  .code-block-wrap { position: relative; margin: 0.6em 0 0.9em; }
  .code-block-wrap pre {
    background: #090d14;
    color: #e2e8f0;
    padding: 14px 16px 14px 16px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.84em;
    border: 1px solid #1e2d45;
    font-family: 'DM Mono', monospace;
    line-height: 1.7;
    margin: 0;
  }
  .code-lang-bar {
    display: flex; align-items: center; justify-content: space-between;
    background: #111827;
    border: 1px solid #1e2d45; border-bottom: none;
    border-radius: 8px 8px 0 0;
    padding: 5px 12px;
  }
  .code-lang-bar + pre { border-radius: 0 0 8px 8px; }
  .code-lang-label {
    font-size: 10px; font-family: 'DM Mono', monospace;
    color: #4a5568; letter-spacing: 0.08em; text-transform: uppercase;
  }
  .copy-btn {
    font-size: 11px; font-family: 'DM Sans', sans-serif;
    background: transparent; border: 1px solid #2a3448;
    color: #6b7280; border-radius: 4px;
    padding: 2px 8px; cursor: pointer;
    transition: all 0.15s ease;
    display: flex; align-items: center; gap: 4px;
  }
  .copy-btn:hover { background: #1e2535; color: #e8a94d; border-color: rgba(232,169,77,0.3); }
  .copy-btn.copied { color: #34d399; border-color: rgba(52,211,153,0.3); background: rgba(52,211,153,0.07); }
`;

// ── CodeBlock with copy button ──
function CodeBlock({ language, children }) {
  const [copied, setCopied] = React.useState(false);
  const code = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-wrap">
      <div className="code-lang-bar">
        <span className="code-lang-label">{language || "code"}</span>
        <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

// ── Custom markdown renderers ──
const markdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const language = (className || "").replace("language-", "");
    if (inline) {
      return <code className={className} {...props}>{children}</code>;
    }
    return <CodeBlock language={language}>{children}</CodeBlock>;
  },
  // Bold: bright highlight
  strong({ children }) {
    return <strong>{children}</strong>;
  },
  // Italic: amber
  em({ children }) {
    return <em>{children}</em>;
  },
};

// ── Avatar ──
function Avatar({ size = 28 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: 6,
      background: "var(--accent)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="var(--text-inverse)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ── MessageBubble ──
function MessageBubble({ role, content }) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "4px 0", animation: "fadeUp 0.2s ease forwards" }}>
        <div style={{
          background: "var(--bg-elevated)",
          color: "var(--text-primary)",
          borderRadius: "var(--radius-md) var(--radius-md) 3px var(--radius-md)",
          padding: "10px 14px",
          maxWidth: "72%",
          fontSize: 14,
          lineHeight: 1.6,
          wordBreak: "break-word",
          border: "1px solid var(--border-strong)",
        }}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", margin: "4px 0", gap: 10, animation: "fadeUp 0.2s ease forwards" }}>
      <Avatar size={28} />
      <div style={{
        background: "var(--bg-base)",
        border: "1px solid var(--border)",
        borderRadius: "3px var(--radius-md) var(--radius-md) var(--radius-md)",
        padding: "12px 14px",
        maxWidth: "80%",
        wordBreak: "break-word",
      }}>
        <div className="md-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

// ── TypingIndicator ──
function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
      <Avatar size={28} />
      <div style={{
        background: "var(--bg-base)",
        border: "1px solid var(--border)",
        borderRadius: "3px var(--radius-md) var(--radius-md) var(--radius-md)",
        padding: "12px 14px",
        display: "flex", gap: 5, alignItems: "center",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--accent)",
            animation: "pulse 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── EmptyState ──
function EmptyState() {
  const hints = [
    "Summarize the key concepts in the documents",
    "What are the main topics covered?",
    "Explain a specific concept in detail",
  ];
  return (
    <div style={{ textAlign: "center", marginTop: 60, padding: "0 20px" }}>
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: "var(--accent-glow)",
        border: "1px solid rgba(232,169,77,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 18px",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 6 }}>
        Ask anything
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6 }}>
        Powered by your documents + AI
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
        {hints.map((hint, i) => (
          <div key={i} style={{
            fontSize: 12, color: "var(--text-secondary)",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "6px 12px",
            cursor: "default",
            maxWidth: 340,
          }}>
            {hint}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Chat ──
export default function Chat({ token: propToken, sessionId: propSessionId, setSessionId }) {
  const auth = useContext(AuthContext);
  const token = propToken ?? auth?.token ?? null;
  const logout = auth?.logout ?? (() => {});
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [sending, setSending] = useState(false);
  const containerRef = useRef(null);
  const activeSessionRef = useRef(propSessionId || null);
  const textAreaRef = useRef(null);
  const lastAssistantRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const prevChatLenRef = useRef(0);

  // Auto-resize textarea
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      const newHeight = Math.min(textAreaRef.current.scrollHeight, 200);
      textAreaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  // Inject markdown styles once
  useEffect(() => {
    const id = "md-chat-styles-v3";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = markdownStyles;
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    activeSessionRef.current = propSessionId || null;
  }, [propSessionId]);

  useEffect(() => {
    const controller = new AbortController();
    const loadHistory = async () => {
      setLoadingHistory(true);
      try {
        if (propSessionId) {
          const res = await fetch(
            `http://127.0.0.1:8000/chat-history/${encodeURIComponent(propSessionId)}`,
            {
              method: "GET",
              headers: token ? { Authorization: `Bearer ${token}` } : {},
              signal: controller.signal,
            }
          );
          if (controller.signal.aborted) return;
          const data = await res.json().catch(() => null);
          if (res.ok) {
            setChatLog(Array.isArray(data?.messages) ? data.messages : []);
          } else {
            setChatLog([]);
          }
        } else {
          setChatLog([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") setChatLog([]);
      } finally {
        setLoadingHistory(false);
      }
    };
    loadHistory();
    return () => controller.abort();
  }, [propSessionId, token]);

  // Smart scroll: when a new assistant reply arrives, scroll to its TOP
  // so the user reads from the beginning. For everything else (history load,
  // user's own message) scroll to bottom as normal.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const newLen = chatLog.length;
    const prevLen = prevChatLenRef.current;
    prevChatLenRef.current = newLen;

    // New assistant message just arrived
    const lastMsg = chatLog[chatLog.length - 1];
    if (newLen > prevLen && lastMsg?.role === "assistant" && lastAssistantRef.current) {
      // Small delay so the DOM has painted the new bubble
      setTimeout(() => {
        lastAssistantRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } else if (newLen !== prevLen) {
      // History load or user message — scroll to bottom
      container.scrollTop = container.scrollHeight;
    }
  }, [chatLog]);

  // Show/hide the "scroll to bottom" button based on how far up the user is
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const distFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
      setShowScrollBtn(distFromBottom > 200);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const activeSessionId = activeSessionRef.current || null;
    if (!token && !activeSessionId) {
      alert("Please login or start a guest session.");
      return;
    }
    setSending(true);
    const tempId = `u-${Date.now()}`;
    setChatLog(prev => [...prev, { id: tempId, role: "user", content: trimmed }]);
    setMessage("");
    try {
      const payload = token
        ? { message: trimmed, ...(activeSessionId ? { session_id: activeSessionId } : {}) }
        : { message: trimmed, session_id: activeSessionId };
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST", headers, body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setChatLog(prev => prev.filter(m => m.id !== tempId));
        alert(data?.detail || "Error sending message");
        return;
      }
      const returnedSessionId = data?.session_id;
      if (returnedSessionId) {
        activeSessionRef.current = returnedSessionId;
        if (!token) {
          try { setSessionId?.(returnedSessionId); localStorage.setItem("session_id", returnedSessionId); } catch {}
        } else {
          setSessionId?.(returnedSessionId);
        }
      }
      setChatLog(prev => {
        const withoutOptimistic = prev.filter(m => m.id !== tempId);
        return [...withoutOptimistic,
          { role: "user", content: trimmed },
          { role: "assistant", content: data.response },
        ];
      });
      const sidToUse = returnedSessionId || activeSessionId;
      window.dispatchEvent(new CustomEvent("chat:updated", {
        detail: { session_id: sidToUse, last_message: trimmed, last_updated: new Date().toISOString() },
      }));
    } catch (err) {
      setChatLog(prev => prev.filter(m => m.id !== tempId));
      alert("Network error sending message");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!sending && message.trim()) sendMessage();
    }
  };

  return (
    <div style={{
      width: "100%", height: "100%", minHeight: "85vh",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--font-main)", boxSizing: "border-box",
      background: "var(--bg-surface)",
    }}>

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 18px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-elevated)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size={32} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              AI Assistant
            </div>
            <div style={{ fontSize: 11, color: "var(--green)", display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)" }} />
              RAG-powered · Online
            </div>
          </div>
        </div>
        {auth && (
          <button
            onClick={logout}
            style={{
              padding: "5px 12px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              background: "transparent",
              color: "var(--text-secondary)",
              fontSize: 12, fontWeight: 500,
              fontFamily: "var(--font-main)",
              transition: "all var(--transition)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            Sign out
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        style={{
          flex: 1, overflowY: "auto",
          padding: "20px 16px",
          background: "var(--bg-surface)",
          display: "flex", flexDirection: "column", alignItems: "center",
          minHeight: 0,
          position: "relative",
        }}
      >
        <div style={{ width: "100%", maxWidth: 780 }}>
          {loadingHistory ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px 0" }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: "flex", gap: 10, justifyContent: i % 2 === 0 ? "flex-end" : "flex-start" }}>
                  {i % 2 !== 0 && <div className="skeleton" style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0 }} />}
                  <div className="skeleton" style={{ height: 44, width: `${40 + i * 15}%`, borderRadius: 10 }} />
                </div>
              ))}
            </div>
          ) : chatLog.length === 0 ? (
            <EmptyState />
          ) : (
            chatLog.map((msg, idx) => {
              const isLastAssistant =
                msg.role === "assistant" &&
                idx === chatLog.map(m => m.role).lastIndexOf("assistant");
              return (
                <div key={msg.id || idx} ref={isLastAssistant ? lastAssistantRef : null}>
                  <MessageBubble role={msg.role} content={msg.content} />
                </div>
              );
            })
          )}
          {sending && <TypingIndicator />}
        </div>

        {/* Scroll-to-bottom floating button */}
        {showScrollBtn && (
          <button
            onClick={() => containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })}
            style={{
              position: "sticky", bottom: 16,
              marginLeft: "auto", marginRight: 0,
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-strong)",
              borderRadius: 20,
              color: "var(--text-secondary)",
              fontSize: 12, fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-main)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              transition: "all var(--transition)",
              animation: "fadeUp 0.2s ease forwards",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--accent-text)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Scroll to bottom
          </button>
        )}
      </div>

      {/* Input */}
      <div style={{
        background: "var(--bg-surface)",
        padding: "0 16px 16px",
        display: "flex", justifyContent: "center",
        flexShrink: 0,
        borderTop: "1px solid var(--border)",
        paddingTop: 12,
      }}>
        <div style={{
          width: "100%", maxWidth: 780,
          display: "flex", gap: 8, alignItems: "flex-end",
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "8px 10px",
          transition: "border-color var(--transition)",
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = "var(--accent)"}
          onBlurCapture={e => e.currentTarget.style.borderColor = "var(--border)"}
        >
          <textarea
            ref={textAreaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your documents…"
            style={{
              flex: 1, resize: "none", border: "none", outline: "none",
              fontSize: 14, fontFamily: "var(--font-main)",
              lineHeight: 1.5, background: "transparent",
              color: "var(--text-primary)",
              paddingTop: 6, paddingBottom: 6, paddingLeft: 6,
              maxHeight: 200, minHeight: 24, overflowY: "auto",
            }}
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            disabled={sending || !message.trim()}
            style={{
              width: 36, height: 36, flexShrink: 0,
              background: (sending || !message.trim()) ? "var(--bg-elevated)" : "var(--accent)",
              border: (sending || !message.trim()) ? "1px solid var(--border)" : "none",
              borderRadius: "var(--radius-sm)",
              cursor: (sending || !message.trim()) ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all var(--transition)",
            }}
          >
            {sending ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                style={{ animation: "spin 0.8s linear infinite" }}>
                <circle cx="12" cy="12" r="10" stroke="var(--text-muted)" strokeWidth="2" strokeOpacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  stroke={(sending || !message.trim()) ? "var(--text-muted)" : "var(--text-inverse)"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}