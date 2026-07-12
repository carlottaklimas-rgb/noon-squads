import { useState, useEffect, useRef } from "react";

// ─── Palette (Noon 2020-era, eyeballed from walkthrough) ───
const C = {
  green: "#21B573",
  greenDark: "#189A60",
  blue: "#2F80ED",
  orange: "#F5A623",
  orangeSoft: "#FEF3E0",
  gold: "#D4A017",
  ink: "#1E2A32",
  sub: "#6B7A86",
  bg: "#F2F5F7",
};

// ─── Cast ───
const PEOPLE = {
  nour: { name: "You", full: "Nour", color: "#8E6BD8", photo: "👧🏽" },
  salma: { name: "Salma", full: "Salma A.", color: "#E0619A", online: true, photo: "👩🏽" },
  youssef: { name: "Youssef", full: "Youssef K.", color: "#2FA8A0", photo: "👨🏻" },
  omar: { name: "Omar", full: "Omar H.", color: "#D98E32" },
  layla: { name: "Layla", full: "Layla M.", color: "#C75B5B" },
  ahmed: { name: "Ahmed", full: "Ahmed Mohamed", color: "#4A7FD4", photo: "🧑🏽" },
  soha: { name: "Soha", full: "Soha Aly", color: "#3AA35C", photo: "🧕" },
  raghda: { name: "Raghda", full: "Raghda Moataz", color: "#7A8699" },
  rosa: { name: "Rosa", full: "Rosa Kumari", color: "#E07B4F", photo: "👩🏻" },
  amina: { name: "Amina", full: "Amina Karina", color: "#9AA5B1" },
  hana: { name: "Hana", full: "Hana S.", color: "#B06BC4" },
  karim: { name: "Karim", full: "Karim F.", color: "#5B8DB8" },
  mona: { name: "Mona", full: "Mona T.", color: "#C4885B" },
  tariq: { name: "Tariq", full: "Tariq N.", color: "#6BAA7E" },
  dina: { name: "Dina", full: "Dina R.", color: "#A45B6E" },
};

function Avatar({ p, size = 40, crest, goldFrame, online, dim, pulse }) {
  const [imgFailed, setImgFailed] = useState(false);
  const ring = goldFrame ? C.gold : crest ? C.green : "#DDE4E9";
  const url = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(p.full)}`;
  return (
    <div className="relative inline-block flex-shrink-0" style={{ width: size, height: size, opacity: dim ? 0.45 : 1 }}>
      <div
        className="rounded-full flex items-center justify-center font-bold text-white overflow-hidden"
        style={{
          width: size, height: size, background: p.color,
          fontSize: p.photo ? size * 0.56 : size * 0.38,
          boxShadow: `0 0 0 2px white, 0 0 0 ${goldFrame ? 4.5 : 3.5}px ${ring}`,
        }}
      >
        {!imgFailed ? (
          <img src={url} alt={p.full} className="w-full h-full" onError={() => setImgFailed(true)} draggable={false} />
        ) : (
          p.photo || p.full[0]
        )}
      </div>
      {crest && (
        <div
          className={`absolute -bottom-1 -right-1 rounded-full flex items-center justify-center ${pulse ? "animate-pulse" : ""}`}
          style={{
            width: size * 0.55, height: size * 0.55, background: "white",
            fontSize: size * 0.32,
            boxShadow: `0 0 0 2px ${goldFrame ? C.gold : C.green}`,
          }}
        >
          {crest}
        </div>
      )}
      {online && (
        <div className="absolute top-0 right-0 rounded-full" style={{ width: size * 0.24, height: size * 0.24, background: "#3ECF6E", boxShadow: "0 0 0 2px white" }} />
      )}
    </div>
  );
}

function Header({ title, subtitle, tabs }) {
  return (
    <div className="px-4 pt-4 pb-3 text-white" style={{ background: C.green }}>
      <div className="flex items-center gap-2 text-sm opacity-95">
        <span>‹</span>
        <span className="bg-white/20 rounded-full px-3 py-0.5 text-xs font-semibold">⚗ Chemistry</span>
        <span className="ml-auto">⌕ ⋯</span>
      </div>
      <div className="font-bold text-lg mt-1 leading-tight">{title}</div>
      {subtitle && <div className="text-xs opacity-90">{subtitle}</div>}
      {tabs && (
        <div className="mt-3 bg-white rounded-full p-1 flex text-sm font-semibold">
          <div className="flex-1 text-center rounded-full py-1 text-white" style={{ background: C.green }}>Feed</div>
          <div className="flex-1 text--center text-center py-1" style={{ color: C.green }}>Learn</div>
        </div>
      )}
    </div>
  );
}

function Card({ children, accent, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 ${onClick ? "cursor-pointer active:scale-[0.99]" : ""} ${className}`}
      style={{ boxShadow: "0 1px 4px rgba(30,42,50,0.08)", borderLeft: accent ? `4px solid ${accent}` : undefined }}
    >
      {children}
    </div>
  );
}

function CTA({ children, onClick, ghost, color = C.blue, small }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl font-bold ${small ? "px-4 py-2 text-sm" : "w-full py-3 text-base"} transition-transform active:scale-[0.98]`}
      style={ghost ? { color, border: `2px solid ${color}`, background: "white" } : { background: color, color: "white" }}
    >
      {children}
    </button>
  );
}

// ─── Screens ───

function VoiceNote({ dur }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      onClick={() => setPlaying(!playing)}
      className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg"
      style={{ background: "#E4F6EE", color: C.greenDark }}
    >
      {playing ? "⏸" : "▶"}
      <span className="relative inline-block rounded-full overflow-hidden" style={{ width: 52, height: 4, background: "#C5E6D5" }}>
        <span
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: C.green, width: playing ? "100%" : "0%", transition: playing ? "width 4s linear" : "none" }}
        />
      </span>
      🎤 {dur}
    </button>
  );
}

function FeedScreen({ go, updated }) {
  return (
    <div className="h-full flex flex-col" style={{ background: C.bg }}>
      <Header title="Grade 8 Chemistry" subtitle="Mr. Metwally Shallaby" tabs />
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <Card>
          <div className="flex items-center gap-3 text-sm" style={{ color: C.sub }}>
            <Avatar p={PEOPLE.nour} size={34} />
            <span>What do you want to <b style={{ color: C.ink }}>ask / share?</b></span>
          </div>
          <div className="flex gap-2 mt-3">
            <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: "#E4F6EE", color: C.green, border: "1px solid #C5E6D5" }}>
              <span className="rounded-full text-white text-[10px] w-4 h-4 flex items-center justify-center" style={{ background: C.green }}>?</span>
              Question
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: "#EAF2FD", color: C.blue, border: "1px solid #D4E3F8" }}>
              <span className="text-[11px]">📄</span>
              Post / Image / File
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div onClick={() => go(1)} className="cursor-pointer">
              <Avatar p={PEOPLE.soha} size={44} crest="🦅" goldFrame pulse />
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: C.ink }}>Soha Aly</div>
              <div className="text-xs" style={{ color: C.sub }}>Al Manar Language School · 2 hrs ago</div>
            </div>
          </div>
          <div className="text-sm mt-3" style={{ color: C.ink }}>
            My notes for chapter 4, hope it helps before Sunday's revision! 📎
          </div>
          <div className="flex gap-5 text-xs mt-3 font-semibold" style={{ color: C.sub }}>
            <span>👍 Upvote (21)</span><span>💬 Answers (12)</span>
          </div>
          <div onClick={() => go(1)} className="mt-3 text-xs font-semibold cursor-pointer rounded-lg px-3 py-2" style={{ background: "#FBF4E3", color: C.gold }}>
            🦅 What's this golden badge? Tap to find out →
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Avatar p={PEOPLE.raghda} size={44} />
            <div>
              <div className="font-bold text-sm" style={{ color: C.ink }}>Raghda Moataz</div>
              <div className="text-xs" style={{ color: C.sub }}>Al Manar Language School · 3 hrs ago</div>
            </div>
          </div>
          <div className="text-sm mt-3" style={{ color: C.ink }}>
            Can someone explain question 3 from yesterday's homework? 🙏
          </div>
          <div className="flex gap-5 text-xs mt-3 font-semibold" style={{ color: C.sub }}>
            <span>👍 Upvote (4)</span><span>💬 Answers (2)</span>
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
            <div className="flex -space-x-1.5">
              <div style={{ zIndex: 2 }}><Avatar p={PEOPLE.ahmed} size={22} /></div>
              <div style={{ zIndex: 1 }}><Avatar p={PEOPLE.layla} size={22} /></div>
            </div>
            <span className="text-xs font-semibold" style={{ color: C.sub }}>Answered on this!</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SquadCardScreen({ go }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="h-full flex flex-col justify-end" style={{ background: "rgba(30,42,50,0.55)" }}>
      <div className="bg-white rounded-t-3xl p-5 pb-6">
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />
        <div className="flex flex-col items-center text-center">
          <div className="text-5xl rounded-full p-3" style={{ boxShadow: `0 0 0 3px white, 0 0 0 6px ${C.gold}` }}>🦅</div>
          <div className="font-extrabold text-xl mt-3" style={{ color: C.ink }}>Golden Falcons</div>
          <div className="text-xs font-bold mt-1 px-3 py-1 rounded-full" style={{ background: "#FBF4E3", color: C.gold }}>
            🏆 Last week's division champion
          </div>
          <div className="text-sm mt-2 font-semibold" style={{ color: C.sub }}>
            Egypt League <b style={{ color: C.ink }}>#2</b> · Silver Division · 340 pts
          </div>
          <div className="flex mt-3 -space-x-2">
            {[PEOPLE.soha, PEOPLE.ahmed, PEOPLE.raghda, PEOPLE.amina, PEOPLE.hana, PEOPLE.karim, PEOPLE.mona, PEOPLE.tariq, PEOPLE.dina].map((p, i) => (
              <div key={i} style={{ zIndex: 9 - i }}><Avatar p={p} size={28} /></div>
            ))}
          </div>
          <div className="text-xs mt-2" style={{ color: C.sub }}>
            9/12 members · Founded 3 weeks ago · Al Manar & Farouk Mousa students
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <CTA onClick={() => setSent(true)}>{sent ? "Request sent ✓" : "Request to Join"}</CTA>
          <div className="flex items-center gap-3 text-xs" style={{ color: C.sub }}>
            <div className="flex-1 h-px bg-gray-200" /> or <div className="flex-1 h-px bg-gray-200" />
          </div>
          <CTA ghost color={C.green} onClick={() => go(2)}>Create your own squad</CTA>
        </div>
      </div>
    </div>
  );
}

const EMBLEMS = ["⚛️", "🦅", "🔥", "🌙", "🚀", "🏆", "🐪", "⭐"];
const INVITEES = [
  { p: PEOPLE.salma, ctx: "Al Manar · online now", section: "Your contacts on Noon" },
  { p: PEOPLE.youssef, ctx: "Contact on Noon", section: "Your contacts on Noon" },
  { p: PEOPLE.omar, ctx: "Al Manar Language School · Grade 8", section: "Your classmates" },
  { p: PEOPLE.layla, ctx: "Al Manar Language School · Grade 8", section: "Your classmates" },
  { p: PEOPLE.ahmed, ctx: "Answered your question last week", section: "From your groups" },
];

function CreateScreen({ go, name, setName, emblem, setEmblem }) {
  const [sel, setSel] = useState([true, true, true, true, true]);
  const n = sel.filter(Boolean).length;
  const sections = [...new Set(INVITEES.map((i) => i.section))];
  return (
    <div className="h-full flex flex-col" style={{ background: C.bg }}>
      <div className="px-4 pt-4 pb-3 text-white" style={{ background: C.green }}>
        <div className="text-sm opacity-95">‹ Back</div>
        <div className="font-bold text-lg mt-1">Create your squad</div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <Card>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.sub }}>Name your squad</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 font-bold text-base outline-none"
            style={{ border: `2px solid ${C.green}`, color: C.ink }}
          />
          <div className="text-xs font-bold uppercase tracking-wide mt-4 mb-2" style={{ color: C.sub }}>Pick your emblem</div>
          <div className="flex gap-2 flex-wrap">
            {EMBLEMS.map((e) => (
              <button key={e} onClick={() => setEmblem(e)}
                className="text-2xl rounded-xl p-2"
                style={{ background: emblem === e ? "#E4F6EE" : "#F2F5F7", boxShadow: emblem === e ? `0 0 0 2px ${C.green}` : "none" }}>
                {e}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <div className="font-extrabold text-base" style={{ color: C.ink }}>Bring your people</div>
          <div className="text-xs mt-0.5 mb-2" style={{ color: C.sub }}>Squads work best with friends you already study with.</div>
          {sections.map((s) => (
            <div key={s}>
              <div className="text-xs font-bold uppercase tracking-wide mt-3 mb-1.5" style={{ color: C.sub }}>{s}</div>
              {INVITEES.map((inv, i) =>
                inv.section !== s ? null : (
                  <div key={i} className="flex items-center gap-3 py-1.5">
                    <Avatar p={inv.p} size={38} online={inv.p.online} />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm" style={{ color: C.ink }}>{inv.p.full}</div>
                      <div className="text-xs truncate" style={{ color: C.sub }}>{inv.ctx}</div>
                    </div>
                    <button
                      onClick={() => setSel(sel.map((v, j) => (j === i ? !v : v)))}
                      className="rounded-full w-8 h-8 font-bold text-lg flex items-center justify-center"
                      style={sel[i] ? { background: C.green, color: "white" } : { border: `2px solid ${C.sub}`, color: C.sub }}>
                      {sel[i] ? "✓" : "+"}
                    </button>
                  </div>
                )
              )}
            </div>
          ))}
        </Card>
      </div>
      <div className="p-3 bg-white" style={{ boxShadow: "0 -2px 8px rgba(30,42,50,0.06)" }}>
        <CTA color={C.green} onClick={() => go(3)}>
          Create {emblem} {name} & send {n} invite{n === 1 ? "" : "s"}
        </CTA>
      </div>
    </div>
  );
}

function Interstitial({ big, small, onNext }) {
  return (
    <div onClick={onNext} className="h-full flex flex-col items-center justify-center cursor-pointer gap-3 px-8 text-center" style={{ background: C.ink }}>
      <div className="text-white font-extrabold text-2xl">{big}</div>
      <div className="text-sm" style={{ color: "#9FB2BF" }}>{small}</div>
      <div className="text-xs mt-6 font-semibold px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}>
        Tap to continue
      </div>
    </div>
  );
}

const BASE_MSGS = [
  { p: PEOPLE.salma, text: "who's coming tonight? 🙋‍♀️", time: "16:02" },
  { p: PEOPLE.youssef, text: "me!! but I need help with q3 after 😅", time: "16:05" },
  { p: PEOPLE.omar, text: "🔥🔥 we need the points, Night Owls are right above us", time: "16:06" },
];
const UPDATED_MSGS = [
  ...BASE_MSGS,
  { p: PEOPLE.salma, text: "NOUR your voice note saved me 🙏🙏", time: "21:14" },
];

function ChatOverlay({ onClose, msgs, setMsgs, emblem, squadName }) {
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs]);
  const send = () => {
    if (!draft.trim()) return;
    setMsgs([...msgs, { p: PEOPLE.nour, text: draft, time: "now", me: true }]);
    setDraft("");
  };
  return (
    <div className="absolute inset-0 flex flex-col bg-white z-10">
      <div className="px-4 py-3 text-white flex items-center gap-3" style={{ background: C.green }}>
        <button onClick={onClose} className="font-bold text-lg">‹</button>
        <div className="text-2xl">{emblem}</div>
        <div>
          <div className="font-bold text-sm leading-tight">{squadName} chat</div>
          <div className="text-[10px] opacity-90">Visible to all 6 members · text & voice only</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ background: C.bg }}>
        <div className="text-center text-[10px] font-semibold py-1 px-3 rounded-full mx-auto w-fit" style={{ background: "#E9EEF2", color: C.sub }}>
          Squad chat is visible to every member. Be kind — anyone can report a message. 🛡
        </div>
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.me ? "flex-row-reverse" : ""}`}>
            <Avatar p={m.p} size={28} />
            <div className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${m.me ? "text-white" : ""}`}
              style={{ background: m.me ? C.green : "white", color: m.me ? "white" : C.ink, boxShadow: "0 1px 3px rgba(30,42,50,0.08)" }}>
              {!m.me && <div className="text-[10px] font-bold" style={{ color: m.p.color }}>{m.p.full}</div>}
              {m.text}
              <div className={`text-[9px] mt-0.5 flex items-center gap-2 ${m.me ? "text-white/70" : ""}`} style={{ color: m.me ? undefined : C.sub }}>
                {m.time} {!m.me && <span className="cursor-pointer" title="Report">⚑</span>}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-2.5 bg-white flex items-center gap-2" style={{ boxShadow: "0 -2px 8px rgba(30,42,50,0.06)" }}>
        <span className="text-lg">🎤</span>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={`Message ${squadName}…`}
          className="flex-1 rounded-full px-3 py-2 text-sm outline-none" style={{ background: C.bg, color: C.ink }} />
        <button onClick={send} className="rounded-full w-9 h-9 text-white font-bold" style={{ background: C.green }}>↑</button>
      </div>
    </div>
  );
}

function HomeScreen({ go, updated, emblem, squadName }) {
  const [thanks, setThanks] = useState(updated ? 2 : 4);
  const [inRally, setInRally] = useState(false);
  const [rallyLive, setRallyLive] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [msgs, setMsgs] = useState(updated ? UPDATED_MSGS : BASE_MSGS);
  const [unread, setUnread] = useState(updated ? 1 : 3);
  const [earnOpen, setEarnOpen] = useState(false);
  const lastMsg = msgs[msgs.length - 1];
  useEffect(() => {
    if (inRally && !updated) {
      const t = setTimeout(() => setRallyLive(true), 1800);
      return () => clearTimeout(t);
    }
  }, [inRally, updated]);
  const members = [PEOPLE.nour, PEOPLE.salma, PEOPLE.youssef, PEOPLE.omar, PEOPLE.layla, PEOPLE.ahmed];
  return (
    <div className="h-full flex flex-col relative" style={{ background: C.bg }}>
      {chatOpen && <ChatOverlay onClose={() => setChatOpen(false)} msgs={msgs} setMsgs={setMsgs} emblem={emblem} squadName={squadName} />}
      {earnOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-5" style={{ background: "rgba(30,42,50,0.5)" }} onClick={() => setEarnOpen(false)}>
          <div className="bg-white rounded-2xl p-4 w-full" onClick={(e) => e.stopPropagation()} style={{ animation: "popIn 0.25s ease-out both" }}>
            <div className="font-extrabold text-base" style={{ color: C.ink }}>How {squadName} earns points</div>
            <div className="mt-3 space-y-2 text-sm" style={{ color: C.ink }}>
              <div className="flex justify-between gap-2"><span>🎓 Finish a LIVE session</span><b>+5</b></div>
              <div className="flex justify-between gap-2"><span>🤝 2+ squadmates finish together</span><b>+15</b></div>
              <div className="flex justify-between gap-2"><span>⚔️ Win a competition <span className="text-xs" style={{ color: C.sub }}>(max 3/day)</span></span><b>+20</b></div>
              <div className="flex justify-between gap-2"><span>💡 Helpful answer <span className="text-xs" style={{ color: C.sub }}>(earns a Thanks · 1/week)</span></span><b>+25</b></div>
              <div className="flex justify-between gap-2"><span>👥 Breakout, actively played <span className="text-xs" style={{ color: C.sub }}>(1/week)</span></span><b>+25</b></div>
            </div>
            <div className="text-[11px] mt-3 pt-2 border-t border-gray-100" style={{ color: C.sub }}>
              Weekly caps keep it fair — no squad can grind its way to Gold.
            </div>
            <div className="mt-3"><CTA small onClick={() => setEarnOpen(false)}>Got it</CTA></div>
          </div>
        </div>
      )}
      {rallyLive && !chatOpen && (
        <div className="absolute top-2 left-2 right-2 z-20" style={{ animation: "slideDown 0.5s cubic-bezier(0.2, 0.9, 0.3, 1) both" }}>
          <div className="bg-white rounded-2xl p-3" style={{ boxShadow: "0 8px 28px rgba(30,42,50,0.28)", border: `2px solid ${C.green}` }}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-white rounded px-1.5 py-0.5 animate-pulse" style={{ background: "#E0483C" }}>● LIVE</span>
              <div className="text-sm font-extrabold flex-1" style={{ color: C.ink }}>Revision of chapter 4 is starting!</div>
              <button onClick={() => setRallyLive(false)} className="text-sm font-bold px-1" style={{ color: C.sub }}>✕</button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-1.5">
                <div style={{ zIndex: 2 }}><Avatar p={PEOPLE.salma} size={26} online /></div>
                <div style={{ zIndex: 1 }}><Avatar p={PEOPLE.youssef} size={26} online /></div>
              </div>
              <div className="text-xs font-semibold flex-1" style={{ color: C.sub }}>
                <b style={{ color: C.green }}>Salma and Youssef</b> from your squad are already in
              </div>
              <button onClick={() => go(6)} className="text-xs font-bold px-3 py-2 rounded-xl text-white" style={{ background: C.green }}>
                Join session
              </button>
            </div>
          </div>
        </div>
      )}      <div className="px-4 pt-4 pb-4 text-white" style={{ background: C.green }}>
        <div className="text-sm opacity-95">‹ Back</div>
        <div className="flex items-center gap-3 mt-2">
          <div className="text-4xl bg-white rounded-2xl p-1.5">{emblem}</div>
          <div>
            <div className="font-extrabold text-xl leading-tight">{squadName}</div>
            <div className="text-xs opacity-90">6/12 members{updated ? " · 1 invite pending" : ""}</div>
          </div>
        </div>
        <div className="flex items-center mt-3 -space-x-1.5">
          {members.map((p, i) => (
            <div key={i} style={{ zIndex: 9 - i }}><Avatar p={p} size={30} /></div>
          ))}
          {updated && <div style={{ zIndex: 0 }}><Avatar p={PEOPLE.rosa} size={30} dim /></div>}
          <div className="pl-3">
            <div className="rounded-full border-2 border-dashed border-white/70 w-[30px] h-[30px] flex items-center justify-center text-white font-bold">+</div>
          </div>
        </div>
        <div className="mt-3 bg-white rounded-xl p-2.5 cursor-pointer active:scale-[0.99]" onClick={!updated ? () => go(5) : undefined}>
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wide" style={{ color: C.sub }}>
            <span>Egypt League · Grade 7–9 · Week 3 {!updated && "· standings ›"}</span>
            <span className="px-1.5 py-0.5 rounded-full" style={{ background: "#EFF3F6" }}>🥈 Silver Division</span>
          </div>
          <div className="flex items-end gap-2 mt-1">
            <div className="text-2xl font-extrabold leading-none" style={{ color: C.ink }}>
              #{updated ? 4 : 6}<span className="text-sm font-bold" style={{ color: C.sub }}> of 30</span>
            </div>
            <div className="text-xs font-bold" style={{ color: C.orange }}>{updated ? 375 : 320} pts</div>
            {updated && <div className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#E4F6EE", color: C.green }}>↑2 today</div>}
            <div className="ml-auto text-[10px] font-semibold" style={{ color: C.green }}>Top 3 → Gold ⬆</div>
            <button
              onClick={(e) => { e.stopPropagation(); setEarnOpen(true); }}
              className="rounded-full w-5 h-5 text-[11px] font-bold flex items-center justify-center flex-shrink-0"
              style={{ border: `1.5px solid ${C.sub}`, color: C.sub }}
            >i</button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-bold uppercase tracking-wide" style={{ color: C.sub }}>Squad board</div>
            <div className="text-xs font-bold" style={{ color: C.blue }}>See more ›</div>
          </div>
          {updated && (
            <div className="flex items-center gap-3 py-2 border-b border-gray-100">
              <Avatar p={PEOPLE.nour} size={34} />
              <div className="flex-1 text-sm" style={{ color: C.ink }}>
                <div><b>You</b> explained <i>rate of evaporation</i></div>
                <div className="mt-1.5"><VoiceNote dur="0:31" /></div>
              </div>
              <div className="text-xs font-bold" style={{ color: C.blue }}>🙏 2</div>
            </div>
          )}
          {!updated && (
            <div className="flex items-center gap-3 py-2 border-b border-gray-100">
              <Avatar p={PEOPLE.youssef} size={34} />
              <div className="flex-1 text-sm" style={{ color: C.ink }}>
                <b>Youssef</b> is stuck: <i>"Why does salt lower the freezing point?"</i>
              </div>
              <button onClick={() => setExplaining(!explaining)} className="text-xs font-bold px-3 py-1.5 rounded-lg text-white" style={{ background: C.green }}>
                🎤 Explain
              </button>
            </div>
          )}
          {explaining && (
            <div className="text-xs rounded-lg p-3 mt-2 font-semibold" style={{ background: "#E4F6EE", color: C.greenDark }}>
              ● Recording a voice note… (mock — tap Explain to close)
            </div>
          )}
          <div className="flex items-center gap-3 py-2">
            <Avatar p={PEOPLE.salma} size={34} online />
            <div className="flex-1 text-sm" style={{ color: C.ink }}>
              <div><b>Salma</b> explained <i>balancing equations</i></div>
              <div className="mt-1.5"><VoiceNote dur="0:42" /></div>
            </div>
            <button onClick={() => setThanks(thanks + 1)} className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: "#EAF2FD", color: C.blue }}>
              🙏 {thanks}
            </button>
          </div>
        </Card>
        <Card onClick={() => { setChatOpen(true); setUnread(0); }}>
          <div className="flex items-center gap-3">
            <div className="text-2xl">💬</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: C.sub }}>Squad chat</div>
              <div className="text-sm truncate" style={{ color: C.ink }}>
                <b>{lastMsg.me ? "You" : lastMsg.p.name}:</b> {lastMsg.text}
              </div>
            </div>
            {unread > 0 && (
              <div className="text-xs font-bold rounded-full px-2 py-0.5 text-white" style={{ background: C.green }}>{unread}</div>
            )}
          </div>
        </Card>
        <Card accent={C.blue}>
          <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.sub }}>Next rally</div>
          <div className="font-bold text-sm" style={{ color: C.ink }}>
            {updated ? "Sunday 5:00 pm — Mock exam sprint" : "Tonight 7:00 pm — Revision of chapter 4"}
          </div>
          <div className="text-xs mt-0.5" style={{ color: C.sub }}>
            {updated ? "Salma, Youssef, Omar and Ahmed are going" : "Mr. Metwally · Salma and Youssef are going"}
          </div>
          {!updated && (
            <div className="mt-3">
              {!inRally ? (
                <CTA small onClick={() => setInRally(true)}>I'm in</CTA>
              ) : (
                <div className="text-sm font-bold" style={{ color: C.green }}>
                  You're in ✓ <span className="text-xs font-semibold" style={{ color: C.sub }}>— we'll let you know when it starts</span>
                </div>
              )}
            </div>
          )}
        </Card>
        {updated && (
          <div className="text-center text-xs px-6 py-3 rounded-2xl font-semibold" style={{ background: "#E9EEF2", color: C.sub }}>
            End of demo — seven screens, zero new primitives: every element extends something that already exists in Noon.
          </div>
        )}
      </div>
    </div>
  );
}

function LiveScreen({ go, emblem, squadName }) {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="h-full flex flex-col relative" style={{ background: "#EDEFF2" }}>
      <div className="flex items-center gap-2 px-3 py-2 bg-white text-xs" style={{ color: C.ink }}>
        <span className="font-bold text-white rounded px-1.5 py-0.5" style={{ background: "#E0483C" }}>20:12</span>
        <Avatar p={PEOPLE.raghda} size={24} />
        <div>
          <div className="font-bold">Mr. Metwally Shallaby <span style={{ color: C.orange }}>★4.8</span></div>
        </div>
        <div className="ml-auto font-semibold" style={{ color: C.sub }}>Focus Mode 😀 · Exit ›</div>
      </div>
      <div className="flex-1 m-3 bg-white rounded-xl p-4 text-sm leading-7" style={{ color: "#B03A3A", fontFamily: "cursive" }}>
        (3x+1)/5 − (2x−1)/3 = (7x+3)/15<br />
        3·(3x+1) − 5·(2x−1) = 7x+3<br />
        S = a·h = (d₁·d₂)/2 = a²·sin α
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5 bg-white text-xs">
        <span>🎙</span><span>💬</span>
        <div className="flex-1 rounded-full px-3 py-1.5" style={{ background: "#F2F5F7", color: C.sub }}>Write a message / question</div>
        <span className="rounded-lg px-2 py-1 font-semibold" style={{ background: "#FDECEA" }}>😢 لم أفهم</span>
        <span className="rounded-lg px-2 py-1 font-semibold" style={{ background: "#FFF6DE" }}>😀 فهمت</span>
      </div>
      {showPopup && (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(30,42,50,0.45)" }}>
        <div className="bg-white rounded-3xl p-5 mx-6 text-center" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.25)", animation: "popIn 0.3s ease-out both" }}>
          <div className="text-xs font-bold uppercase tracking-wide" style={{ color: C.sub }}>Your team in this session</div>
          <div className="font-extrabold text-2xl mt-1" style={{ color: C.ink }}>🤝 Champions</div>
          <div className="flex justify-center gap-3 mt-4">
            {[
              { p: PEOPLE.nour, crest: emblem, mine: true },
              { p: PEOPLE.salma, crest: emblem, mine: true },
              { p: PEOPLE.youssef, crest: emblem, mine: true },
              { p: PEOPLE.rosa },
              { p: PEOPLE.amina, crest: "🦅", gold: true },
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Avatar p={m.p} size={40} crest={m.crest} goldFrame={m.gold} />
                <div className="text-[10px] font-bold" style={{ color: m.mine ? C.green : C.sub }}>{m.p.name}</div>
              </div>
            ))}
          </div>
          <div className="inline-block text-xs font-bold mt-3 px-3 py-1.5 rounded-full" style={{ background: C.orangeSoft, color: C.orange }}>
            ⚡ 3 {squadName} members teamed up — your weekly breakout credit is live, Nour!
          </div>
          <div className="text-sm mt-3" style={{ color: C.ink }}>
            You will answer all questions with your teammates — <b>discuss with them!</b>
          </div>
          <div className="mt-4"><CTA onClick={() => go(7)}>Got it</CTA></div>
        </div>
      </div>
      )}
    </div>
  );
}

function ResultsScreen({ go, emblem, squadName }) {
  const [thanks, setThanks] = useState({});
  const [invited, setInvited] = useState(false);
  const mates = [
    { p: PEOPLE.salma, crest: emblem },
    { p: PEOPLE.youssef, crest: emblem },
    { p: PEOPLE.rosa },
    { p: PEOPLE.amina, crest: "🦅", gold: true },
  ];
  return (
    <div className="h-full flex flex-col" style={{ background: C.bg }}>
      <div className="px-4 pt-4 pb-4 text-white text-center relative" style={{ background: C.green }}>
        <button
          className="absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
        >
          Home →
        </button>
        <div className="text-xs font-semibold opacity-90 uppercase tracking-wide mt-1">Session ended · 8:02 pm</div>
        <div className="font-extrabold text-xl mt-1">Nice work today, Nour!</div>
        <div className="text-sm opacity-90 mt-1">You finished the full session with your squad.</div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <Card>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.sub }}>Thank your teammates</div>
          <div className="flex justify-between px-1">
            {mates.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <Avatar p={m.p} size={42} crest={m.crest} goldFrame={m.gold} />
                <div className="text-[11px] font-bold" style={{ color: C.ink }}>{m.p.name}</div>
                <button onClick={() => setThanks({ ...thanks, [i]: (thanks[i] || 0) + 1 })}
                  className="text-[11px] font-bold px-2 py-1 rounded-lg" style={{ background: "#EAF2FD", color: C.blue }}>
                  🙏 {thanks[i] ? `Thanks (${thanks[i]})` : "Thanks"}
                </button>
              </div>
            ))}
          </div>
        </Card>
        <Card accent={C.green}>
          <div className="flex items-center gap-3">
            <Avatar p={PEOPLE.rosa} size={42} />
            <div className="flex-1 text-sm" style={{ color: C.ink }}>
              <b>Rosa isn't in a squad yet.</b>
              <div className="text-xs mt-0.5" style={{ color: C.sub }}>She was great this session — invite her to {squadName}? (6/12)</div>
            </div>
            <button onClick={() => setInvited(true)} className="text-xs font-bold px-3 py-2 rounded-lg text-white" style={{ background: invited ? C.sub : C.green }}>
              {invited ? "Invite sent ✓" : "Invite"}
            </button>
          </div>
        </Card>
        <Card accent={C.orange} onClick={() => go(11)}>
          <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: C.sub }}>Egypt League · Silver Division</div>
          <div className="text-lg font-extrabold mt-0.5" style={{ color: C.orange }}>#6 → #4 ↑</div>
          <div className="font-bold text-sm mt-1" style={{ color: C.ink }}>
            {emblem} +55 to {squadName} tonight
          </div>
          <div className="text-[11px] mt-1" style={{ color: C.sub }}>
            Your weekly breakout ✓ <b>+25</b> · finished together <b>+15</b> · 3 session finishes <b>+15</b>
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: C.sub }}>Salma & Youssef already used their weekly breakout credit.</div>
          <div className="text-xs font-semibold mt-1.5" style={{ color: C.sub }}>Tap to see your squad →</div>
        </Card>
      </div>
    </div>
  );
}

function LeaderboardScreen({ go, emblem, squadName }) {
  const rows = [
    { rank: 1, e: "🚀", n: "Rocket Minds", pts: 415 },
    { rank: 2, e: "🦅", n: "Golden Falcons", pts: 410, champ: true },
    { rank: 3, e: "🔥", n: "Blaze Hearts", pts: 388 },
    { rank: 4, e: "🌙", n: "Night Owls", pts: 371 },
    { rank: 5, e: "🐪", n: "Desert Kings", pts: 344 },
    { rank: 6, e: emblem, n: squadName, pts: 320, you: true },
    { rank: 7, e: "⭐", n: "Star Squad", pts: 301 },
    { rank: 8, e: "📚", n: "Brainstorm", pts: 287 },
  ];
  return (
    <div className="h-full flex flex-col" style={{ background: C.bg }}>
      <div className="px-4 pt-4 pb-3 text-white" style={{ background: C.green }}>
        <button onClick={() => go(4)} className="text-sm opacity-95">‹ Back to {squadName}</button>
        <div className="font-bold text-lg mt-1">Egypt League · Grade 7–9</div>
        <div className="text-xs opacity-90">Silver Division · Week 3 · 3 days left</div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {rows.map((r) => (
          <div key={r.rank}>
            <div
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-white"
              style={r.you ? { border: `2px solid ${C.green}`, background: "#E4F6EE" } : { boxShadow: "0 1px 3px rgba(30,42,50,0.06)" }}
            >
              <div className="w-6 text-sm font-extrabold text-center" style={{ color: r.rank <= 3 ? C.orange : C.sub }}>{r.rank}</div>
              <div className="text-xl">{r.e}</div>
              <div className="flex-1 font-bold text-sm truncate" style={{ color: C.ink }}>
                {r.n} {r.champ && <span title="Reigning champion">🏆</span>}
                {r.you && <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: C.green }}>You</span>}
              </div>
              <div className="text-sm font-extrabold" style={{ color: C.ink }}>{r.pts}</div>
            </div>
            {r.rank === 3 && (
              <div className="flex items-center gap-2 py-1.5 text-[10px] font-bold" style={{ color: C.green }}>
                <div className="flex-1 h-px" style={{ background: "#BFE5D2" }} /> Top 3 promote to Gold ⬆ <div className="flex-1 h-px" style={{ background: "#BFE5D2" }} />
              </div>
            )}
          </div>
        ))}
        <div className="text-center text-[11px] font-semibold py-2" style={{ color: C.sub }}>
          … 22 more squads · bottom 3 drop to Bronze
        </div>
      </div>
    </div>
  );
}

function TeamResultsScreen({ go }) {
  const team = [PEOPLE.nour, PEOPLE.salma, PEOPLE.youssef, PEOPLE.rosa, PEOPLE.amina];
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center relative" style={{ background: "#FBFCFD" }}>
      <div className="text-4xl">🤝</div>
      <div className="text-3xl font-extrabold mt-1" style={{ color: C.ink }}>Champions</div>
      <div className="flex gap-10 mt-6">
        <div><div className="text-xs font-semibold" style={{ color: C.sub }}>Team Point</div><div className="text-4xl font-extrabold mt-0.5" style={{ color: C.orange }}>125</div></div>
        <div><div className="text-xs font-semibold" style={{ color: C.sub }}>Team Rank</div><div className="text-4xl font-extrabold mt-0.5" style={{ color: C.ink }}>3<span className="text-lg font-bold" style={{ color: C.sub }}>/12</span></div></div>
      </div>
      <div className="text-xs font-bold mt-4 px-4 py-2 rounded-full" style={{ background: "#FFF3D6", color: "#B07B10" }}>
        Keep it up! You're in the top teams! 👏
      </div>
      <div className="flex mt-6 -space-x-2">
        {team.map((p, i) => (
          <div key={i} style={{ zIndex: 5 - i }}><Avatar p={p} size={36} /></div>
        ))}
      </div>
      <div className="mt-10 w-full"><CTA onClick={() => go(9)}>Back to the session</CTA></div>
    </div>
  );
}

function LiveResumeInterstitial({ onNext }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2600);
    return () => clearTimeout(t);
  }, [onNext]);
  return (
    <div className="h-full flex flex-col relative" style={{ background: "#EDEFF2" }}>
      <div className="flex items-center gap-2 px-3 py-2 bg-white text-xs" style={{ color: C.ink }}>
        <span className="font-bold text-white rounded px-1.5 py-0.5" style={{ background: "#E0483C" }}>20:14</span>
        <Avatar p={PEOPLE.raghda} size={24} />
        <div className="font-bold">Mr. Metwally Shallaby <span style={{ color: C.orange }}>★4.8</span></div>
        <div className="ml-auto font-semibold" style={{ color: C.sub }}>Focus Mode 😀 · Exit ›</div>
      </div>
      <div className="flex-1 m-3 bg-white rounded-xl p-4 text-sm leading-7" style={{ color: "#B03A3A", fontFamily: "cursive" }}>
        d₁² + d₂² = 4a²<br />
        …back to the lesson after the breakout…
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5 bg-white text-xs">
        <span>🎙</span><span>💬</span>
        <div className="flex-1 rounded-full px-3 py-1.5" style={{ background: "#F2F5F7", color: C.sub }}>Write a message / question</div>
        <span className="rounded-lg px-2 py-1 font-semibold" style={{ background: "#FFF6DE" }}>😀 فهمت</span>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="text-[11px] font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(30,42,50,0.8)", color: "white" }}>
          The class continues… session wrapping up
        </div>
      </div>
    </div>
  );
}

// ─── Shell ───
const STEPS = [
  { caption: "Today's group feed — one avatar now carries a squad crest. Tap the golden crest to proceed.", label: "The spark" },
  { caption: "What a stranger sees: identity and rank — but no conversations. Tap 'Create your own squad' to proceed.", label: "Squad card" },
  { caption: "Squads start from friendships that already exist. Tap 'Create squad & send 5 invites' to proceed.", label: "Create + invite" },
  { caption: "Tap anywhere to continue.", label: "…" },
  { caption: "The squad home: status, board, chat, next rally. Optional: tap the league block for standings. To proceed: tap I'm in on the rally, then Join session on the banner.", label: "Squad home" },
  { caption: "The whole division — three promotion seats, everyone sees the gap. Tap Back (top left) to return to the squad home.", label: "League standings" },
  { caption: "Tonight, 7 pm — the live session. Wait a moment for the team popup, then tap Got it to proceed.", label: "Sync magnet" },
  { caption: "Tap anywhere to continue.", label: "…" },
  { caption: "The breakout ends — a team, a rank, then the team dissolves. Tap 'Back to the session' to proceed.", label: "Breakout ends" },
  { caption: "The class continues after the breakout… the session is wrapping up.", label: "Session resumes" },
  { caption: "Session ended — and this is what the squad layer adds: credit that outlives the whole session. Tap the orange league card to proceed.", label: "Session ends" },
  { caption: "The rank moved, a new member is on the way, the next meeting is set. End of demo — tap Restart to replay.", label: "Home, updated" },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [squadName, setSquadName] = useState("Atom Squad");
  const [emblem, setEmblem] = useState("⚛️");
  const go = (s) => setStep(s);
  const screens = [
    <FeedScreen go={go} />,
    <SquadCardScreen go={go} />,
    <CreateScreen go={go} name={squadName} setName={setSquadName} emblem={emblem} setEmblem={setEmblem} />,
    <Interstitial big="A few days later…" small="Your 5 invites became 5 squadmates." onNext={() => go(4)} />,
    <HomeScreen go={go} emblem={emblem} squadName={squadName} />,
    <LeaderboardScreen go={go} emblem={emblem} squadName={squadName} />,
    <LiveScreen go={go} emblem={emblem} squadName={squadName} />,
    <Interstitial big="…3 questions later" small="Your team answered together — two of them your squadmates." onNext={() => go(8)} />,
    <TeamResultsScreen go={go} />,
    <LiveResumeInterstitial onNext={() => go(10)} />,
    <ResultsScreen go={go} emblem={emblem} squadName={squadName} />,
    <HomeScreen go={go} updated emblem={emblem} squadName={squadName} />,
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-4" style={{ background: "#E4E9ED", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`@keyframes slideDown { from { transform: translateY(-130%); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes popIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
      <div className="w-full max-w-[390px] rounded-xl px-4 py-2.5 text-xs font-semibold text-white flex items-center gap-2" style={{ background: C.ink, minHeight: 40 }}>
        <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: C.green }}>DEMO</span>
        {STEPS[step].caption}
      </div>
      <div className="w-full max-w-[390px] rounded-[36px] overflow-hidden bg-white" style={{ height: "min(720px, 78vh)", boxShadow: "0 12px 48px rgba(30,42,50,0.25)", border: "6px solid #1E2A32" }}>
        {screens[step]}
      </div>
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <button key={i} onClick={() => go(i)} title={s.label}
            className="rounded-full transition-all"
            style={{
              width: s.label === "…" ? 5 : 9, height: s.label === "…" ? 5 : 9,
              background: i === step ? C.green : "#B7C2CB",
              transform: i === step ? "scale(1.4)" : "none",
            }} />
        ))}
        <button onClick={() => go(0)} className="text-xs font-bold ml-3 px-3 py-1 rounded-full" style={{ background: "white", color: C.sub }}>
          ↺ Restart
        </button>
      </div>
      <div className="text-[11px] font-semibold" style={{ color: "#8A98A4" }}>
        {STEPS[step].label} · {step + 1}/9 — tap the highlighted elements or use the dots
      </div>
    </div>
  );
}
