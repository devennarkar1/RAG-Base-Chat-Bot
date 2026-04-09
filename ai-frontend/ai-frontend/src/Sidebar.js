// // src/Sidebar.js
// import React, { useEffect, useState } from "react";

// // ----------------
// // helpers
// // ----------------
// function timeAgo(isoString) {
//   if (!isoString) return "";
//   const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
//   if (diff < 60) return "just now";
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
//   return new Date(isoString).toLocaleDateString();
// }

// function getInitials(name) {
//   if (!name) return "?";
//   const words = name.trim().split(" ");
//   if (words.length === 1) return words[0][0].toUpperCase();
//   return (words[0][0] + words[1][0]).toUpperCase();
// }

// // Each chat gets a stable accent color based on its session_id
// const ACCENT_COLORS = [
//   { bg: "#ede9fe", text: "#5b21b6" },
//   { bg: "#dbeafe", text: "#1d4ed8" },
//   { bg: "#d1fae5", text: "#065f46" },
//   { bg: "#fce7f3", text: "#9d174d" },
//   { bg: "#ffedd5", text: "#9a3412" },
//   { bg: "#e0f2fe", text: "#075985" },
// ];

// function accentForSession(session_id) {
//   if (!session_id) return ACCENT_COLORS[0];
//   let hash = 0;
//   for (let i = 0; i < session_id.length; i++) {
//     hash = session_id.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
// }

// // ----------------
// // ChatItem
// // ----------------
// function ChatItem({ chat, isActive, onClick }) {
//   const [hovered, setHovered] = useState(false);
//   const accent = accentForSession(chat.session_id);

//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 10,
//         padding: "10px 10px",
//         borderRadius: 10,
//         cursor: "pointer",
//         marginBottom: 4,
//         background: isActive
//           ? "#ede9fe"
//           : hovered
//           ? "#f5f3ff"
//           : "transparent",
//         borderLeft: isActive ? "3px solid #6c63ff" : "3px solid transparent",
//         transition: "all 0.15s ease",
//       }}
//     >
//       {/* Avatar */}
//       <div style={{
//         width: 38, height: 38, borderRadius: 10, flexShrink: 0,
//         background: accent.bg,
//         color: accent.text,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
//       }}>
//         {getInitials(chat.chat_name)}
//       </div>

//       {/* Text */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{
//           fontWeight: isActive ? 700 : 600,
//           fontSize: 13,
//           color: isActive ? "#4f46e5" : "#1e1b4b",
//           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//         }}>
//           {chat.chat_name || "Untitled Chat"}
//         </div>
//         <div style={{
//           fontSize: 11, color: "#9ca3af", marginTop: 2,
//           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//         }}>
//           {chat.last_message || "No messages yet"}
//         </div>
//       </div>

//       {/* Time */}
//       <div style={{
//         fontSize: 10, color: "#c4b5fd", flexShrink: 0,
//         alignSelf: "flex-start", marginTop: 2,
//       }}>
//         {timeAgo(chat.last_updated)}
//       </div>
//     </div>
//   );
// }

// // ----------------
// // Main Sidebar
// // ----------------
// export default function Sidebar({ token, onSelectChat, onNewChat, activeChatId }) {
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");

//   // Fetch chats when token changes
//   useEffect(() => {
//     if (!token) {
//       setChats([]);
//       setLoading(false);
//       return;
//     }

//     const fetchChats = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch("http://127.0.0.1:8000/chats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json().catch(() => null);
//         if (!res.ok) {
//           setError(data?.detail || "Failed to fetch chats");
//           setChats([]);
//         } else {
//           const normalized = (data.chats || []).map((chat) => {
//             const messages = chat.messages || [];
//             const firstMessage = messages.length ? (messages[0].content ?? "") : "";
//             return {
//               session_id: chat.session_id ?? chat._id ?? Math.random().toString(36).slice(2),
//               chat_name: chat.chat_name ?? firstMessage ?? "Untitled Chat",
//               last_message:
//                 chat.last_message ??
//                 (messages.length ? messages[messages.length - 1].content : "No messages yet"),
//               last_updated: chat.last_updated ?? null,
//             };
//           });
//           normalized.sort((a, b) => {
//             const ta = a.last_updated ? new Date(a.last_updated).getTime() : 0;
//             const tb = b.last_updated ? new Date(b.last_updated).getTime() : 0;
//             return tb - ta;
//           });
//           setChats(normalized);
//         }
//       } catch (err) {
//         console.error("Error fetching chats:", err);
//         setError("Network error fetching chats");
//         setChats([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChats();
//   }, [token]);

//   // Listen for global chat:updated events
//   useEffect(() => {
//     const onChatUpdated = (e) => {
//       const sid = e?.detail?.session_id;
//       const last_message = e?.detail?.last_message;
//       const last_updated = e?.detail?.last_updated ?? new Date().toISOString();
//       if (!sid) return;

//       setChats((prev) => {
//         const idx = prev.findIndex((c) => c.session_id === sid);

//         if (idx === -1) {
//           // New session not yet in list — prepend it
//           return [{
//             session_id: sid,
//             chat_name: last_message?.slice(0, 30) || "New Chat",
//             last_message: last_message ?? "",
//             last_updated,
//           }, ...prev];
//         }

//         // Move existing session to top with updated metadata
//         const updated = {
//           ...prev[idx],
//           last_message: last_message ?? prev[idx].last_message,
//           last_updated,
//         };
//         const rest = prev.filter((_, i) => i !== idx);
//         return [updated, ...rest];
//       });
//     };

//     window.addEventListener("chat:updated", onChatUpdated);
//     return () => window.removeEventListener("chat:updated", onChatUpdated);
//   }, []);

//   const filteredChats = chats.filter((c) =>
//     (c.chat_name || "").toLowerCase().includes(search.toLowerCase()) ||
//     (c.last_message || "").toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div style={{
//       width: 260,
//       height: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       background: "#faf9ff",
//       borderRight: "1px solid #ede9fe",
//       boxSizing: "border-box",
//       fontFamily: "system-ui, sans-serif",
//     }}>

//       {/* ── Header ── */}
//       <div style={{
//         padding: "18px 14px 12px",
//         borderBottom: "1px solid #ede9fe",
//       }}>
//         {/* Brand */}
//         <div style={{
//           display: "flex", alignItems: "center",
//           gap: 10, marginBottom: 14,
//         }}>
//           <div style={{
//             width: 36, height: 36, borderRadius: 10,
//             background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             color: "#fff", fontWeight: 800, fontSize: 15, flexShrink: 0,
//           }}>AI</div>
//           <div>
//             <div style={{ fontWeight: 700, fontSize: 15, color: "#1e1b4b" }}>AI Chat</div>
//             <div style={{ fontSize: 11, color: "#a78bfa" }}>Your conversations</div>
//           </div>
//         </div>

//         {/* New Chat button */}
//         <button
//           onClick={onNewChat}
//           style={{
//             width: "100%",
//             padding: "9px 0",
//             background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
//             color: "#fff",
//             border: "none",
//             borderRadius: 10,
//             fontWeight: 600,
//             fontSize: 13,
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 6,
//             boxShadow: "0 2px 8px #6c63ff33",
//             transition: "opacity 0.15s",
//           }}
//           onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
//           onMouseLeave={e => e.currentTarget.style.opacity = "1"}
//         >
//           <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Chat
//         </button>
//       </div>

//       {/* ── Search ── */}
//       <div style={{ padding: "10px 14px 6px" }}>
//         <div style={{
//           display: "flex", alignItems: "center", gap: 8,
//           background: "#fff", border: "1px solid #ede9fe",
//           borderRadius: 8, padding: "7px 10px",
//         }}>
//           <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
//             <circle cx="9" cy="9" r="7" stroke="#a78bfa" strokeWidth="2"/>
//             <path d="M14 14l4 4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//           <input
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             placeholder="Search chats..."
//             style={{
//               border: "none", outline: "none", flex: 1,
//               fontSize: 12, background: "transparent", color: "#1e1b4b",
//             }}
//           />
//           {search && (
//             <span
//               onClick={() => setSearch("")}
//               style={{ cursor: "pointer", color: "#a78bfa", fontSize: 14, lineHeight: 1 }}
//             >×</span>
//           )}
//         </div>
//       </div>

//       {/* ── Chat count label ── */}
//       {!loading && !error && (
//         <div style={{
//           padding: "4px 14px 6px",
//           fontSize: 11, color: "#a78bfa", fontWeight: 600, letterSpacing: 0.5,
//         }}>
//           {filteredChats.length} CONVERSATION{filteredChats.length !== 1 ? "S" : ""}
//         </div>
//       )}

//       {/* ── Chat list ── */}
//       <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 16px" }}>
//         {loading && (
//           <div style={{ padding: 20, textAlign: "center" }}>
//             {[1, 2, 3].map(i => (
//               <div key={i} style={{
//                 height: 56, borderRadius: 10, background: "#f3f0ff",
//                 marginBottom: 8, opacity: 1 - i * 0.2,
//               }} />
//             ))}
//           </div>
//         )}

//         {error && (
//           <div style={{
//             margin: 12, padding: "10px 12px", borderRadius: 8,
//             background: "#fef2f2", border: "1px solid #fecaca",
//             color: "#b91c1c", fontSize: 12,
//           }}>
//             {error}
//           </div>
//         )}

//         {!loading && !error && filteredChats.length === 0 && (
//           <div style={{ textAlign: "center", padding: "40px 20px", color: "#c4b5fd" }}>
//             <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
//             <div style={{ fontWeight: 600, fontSize: 13 }}>
//               {search ? "No chats match your search" : "No conversations yet"}
//             </div>
//             <div style={{ fontSize: 11, marginTop: 4 }}>
//               {search ? "Try a different keyword" : "Start a new chat above!"}
//             </div>
//           </div>
//         )}

//         {!loading && filteredChats.map((chat) => (
//           <ChatItem
//             key={chat.session_id}
//             chat={chat}
//             isActive={chat.session_id === activeChatId}
//             onClick={() => onSelectChat(chat.session_id)}
//           />
//         ))}
//       </div>

//       {/* ── Footer ── */}
//       <div style={{
//         padding: "10px 14px",
//         borderTop: "1px solid #ede9fe",
//         fontSize: 11, color: "#c4b5fd", textAlign: "center",
//       }}>
//         AI Assistant · All chats saved
//       </div>
//     </div>
//   );
// }



// src/Sidebar.js
import React, { useEffect, useState } from "react";

function timeAgo(isoString) {
  if (!isoString) return "";
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return "now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(isoString).toLocaleDateString();
}

function getInitials(name) {
  if (!name) return "?";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const ACCENT_COLORS = [
  { bg: "rgba(232,169,77,0.12)",  text: "#e8a94d", border: "rgba(232,169,77,0.25)" },
  { bg: "rgba(52,201,135,0.1)",   text: "#34c987", border: "rgba(52,201,135,0.2)" },
  { bg: "rgba(99,179,237,0.1)",   text: "#63b3ed", border: "rgba(99,179,237,0.2)" },
  { bg: "rgba(197,134,192,0.1)",  text: "#c586c0", border: "rgba(197,134,192,0.2)" },
  { bg: "rgba(232,93,93,0.1)",    text: "#e85d5d", border: "rgba(232,93,93,0.2)" },
  { bg: "rgba(129,161,193,0.1)",  text: "#81a1c1", border: "rgba(129,161,193,0.2)" },
];

function accentForSession(session_id) {
  if (!session_id) return ACCENT_COLORS[0];
  let hash = 0;
  for (let i = 0; i < session_id.length; i++) {
    hash = session_id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}

function ChatItem({ chat, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const accent = accentForSession(chat.session_id);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "8px 10px", borderRadius: "var(--radius-md)",
        cursor: "pointer", marginBottom: 2,
        background: isActive
          ? "var(--bg-hover)"
          : hovered ? "var(--bg-elevated)" : "transparent",
        borderLeft: isActive
          ? "2px solid var(--accent)"
          : "2px solid transparent",
        transition: "all var(--transition)",
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: "var(--radius-sm)", flexShrink: 0,
        background: accent.bg,
        border: `1px solid ${accent.border}`,
        color: accent.text,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 600, fontSize: 11,
        fontFamily: "var(--font-mono)",
        letterSpacing: 0.5,
      }}>
        {getInitials(chat.chat_name)}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: isActive ? 600 : 500, fontSize: 13,
          color: isActive ? "var(--accent-text)" : "var(--text-primary)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {chat.chat_name || "New Chat"}
        </div>
        <div style={{
          fontSize: 11, color: "var(--text-muted)", marginTop: 1,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {chat.last_message || "No messages yet"}
        </div>
      </div>

      {/* Time */}
      <div style={{ fontSize: 10, color: "var(--text-muted)", flexShrink: 0, fontFamily: "var(--font-mono)" }}>
        {timeAgo(chat.last_updated)}
      </div>
    </div>
  );
}

export default function Sidebar({ token, onSelectChat, onNewChat, activeChatId }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) { setChats([]); setLoading(false); return; }

    const fetchChats = async () => {
      setLoading(true); setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/chats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setError(data?.detail || "Failed to fetch chats"); setChats([]);
        } else {
          const normalized = (data.chats || []).map((chat) => {
            const messages = chat.messages || [];
            const firstMessage = messages.length ? (messages[0].content ?? "") : "";
            return {
              session_id: chat.session_id ?? chat._id ?? Math.random().toString(36).slice(2),
              chat_name: chat.chat_name ?? firstMessage ?? "New Chat",
              last_message: chat.last_message ?? (messages.length ? messages[messages.length - 1].content : ""),
              last_updated: chat.last_updated ?? null,
            };
          });
          normalized.sort((a, b) => {
            const ta = a.last_updated ? new Date(a.last_updated).getTime() : 0;
            const tb = b.last_updated ? new Date(b.last_updated).getTime() : 0;
            return tb - ta;
          });
          setChats(normalized);
        }
      } catch (err) {
        setError("Network error"); setChats([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [token]);

  useEffect(() => {
    const onChatUpdated = (e) => {
      const { session_id: sid, last_message, last_updated = new Date().toISOString() } = e?.detail || {};
      if (!sid) return;
      setChats((prev) => {
        const idx = prev.findIndex((c) => c.session_id === sid);
        if (idx === -1) {
          return [{ session_id: sid, chat_name: last_message?.slice(0, 30) || "New Chat", last_message: last_message ?? "", last_updated }, ...prev];
        }
        const updated = { ...prev[idx], last_message: last_message ?? prev[idx].last_message, last_updated };
        const rest = prev.filter((_, i) => i !== idx);
        return [updated, ...rest];
      });
    };
    window.addEventListener("chat:updated", onChatUpdated);
    return () => window.removeEventListener("chat:updated", onChatUpdated);
  }, []);

  const filteredChats = chats.filter((c) =>
    (c.chat_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.last_message || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      width: 260, height: "100vh",
      display: "flex", flexDirection: "column",
      background: "var(--bg-surface)",
      borderRight: "1px solid var(--border)",
      boxSizing: "border-box",
      fontFamily: "var(--font-main)",
    }}>

      {/* Header */}
      <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "var(--radius-sm)",
            background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="var(--text-inverse)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              RAG<span style={{ color: "var(--accent)" }}>Chat</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em" }}>CONVERSATIONS</div>
          </div>
        </div>

        <button
          onClick={onNewChat}
          style={{
            width: "100%", padding: "8px 0",
            background: "var(--accent)",
            color: "var(--text-inverse)",
            border: "none", borderRadius: "var(--radius-sm)",
            fontWeight: 600, fontSize: 12, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            fontFamily: "var(--font-main)",
            transition: "opacity var(--transition)",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          New Chat
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: "10px 12px 6px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)", padding: "6px 10px",
        }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="7" stroke="var(--text-muted)" strokeWidth="1.5"/>
            <path d="M14 14l4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            style={{
              border: "none", outline: "none", flex: 1,
              fontSize: 12, background: "transparent",
              color: "var(--text-primary)", fontFamily: "var(--font-main)",
            }}
          />
          {search && (
            <span
              onClick={() => setSearch("")}
              style={{ cursor: "pointer", color: "var(--text-muted)", fontSize: 14, lineHeight: 1 }}
            >×</span>
          )}
        </div>
      </div>

      {/* Count */}
      {!loading && !error && filteredChats.length > 0 && (
        <div style={{
          padding: "2px 14px 6px",
          fontSize: 10, color: "var(--text-muted)",
          fontWeight: 500, letterSpacing: "0.06em",
          fontFamily: "var(--font-mono)",
        }}>
          {filteredChats.length} CHAT{filteredChats.length !== 1 ? "S" : ""}
        </div>
      )}

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "2px 8px 12px" }}>
        {loading && (
          <div style={{ padding: "12px 4px", display: "flex", flexDirection: "column", gap: 6 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "8px 4px" }}>
                <div className="skeleton" style={{ width: 34, height: 34, borderRadius: 6, flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                  <div className="skeleton" style={{ height: 12, width: "70%", borderRadius: 4 }} />
                  <div className="skeleton" style={{ height: 10, width: "50%", borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{
            margin: 10, padding: "10px 12px", borderRadius: "var(--radius-sm)",
            background: "rgba(232,93,93,0.08)", border: "1px solid rgba(232,93,93,0.2)",
            color: "var(--red)", fontSize: 12,
          }}>
            {error}
          </div>
        )}

        {!loading && !error && filteredChats.length === 0 && (
          <div style={{ textAlign: "center", padding: "36px 16px", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.5 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto", display: "block" }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-secondary)" }}>
              {search ? "No results" : "No chats yet"}
            </div>
            <div style={{ fontSize: 11, marginTop: 3 }}>
              {search ? "Try different keywords" : "Start a new chat above"}
            </div>
          </div>
        )}

        {!loading && filteredChats.map((chat) => (
          <ChatItem
            key={chat.session_id}
            chat={chat}
            isActive={chat.session_id === activeChatId}
            onClick={() => onSelectChat(chat.session_id)}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: "10px 14px",
        borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em", fontFamily: "var(--font-mono)" }}>
          RAG ENGINE ACTIVE
        </span>
      </div>
    </div>
  );
}