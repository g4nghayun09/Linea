import { useState } from "react";
import "./Appointmentbox.css";
import Header from "./header";

const appointments = [
  //이거는 예시로 넣은거
  {
    id: 1,
    title: "약속 이름",
    status: "invited",
    isHost: false,
    date: null,
    count: 1,
    place: "없음",
    participants: "홍길동 외 0명",
  },
  {
    id: 2,
    title: "약속 이름",
    status: "confirmed",
    isHost: true,
    date: "2026 / 08 / 08",
    count: 4,
    place: "어디카페, 다부찌 등",
    participants: "홍길동, 김우석 외 2명",
  },
];

const filters = [
  { key: "all", label: "전체" },
  { key: "mine", label: "내가 만든 약속" },
  { key: "joined", label: "참여한 약속" },
  { key: "invited", label: "초대받음" },
];

function Appointmentbox() {
  const [filter, setFilter] = useState("all");
  const [openIds, setOpenIds] = useState([1]);

  const invitedCount = appointments.filter(
    (a) => a.status === "invited",
  ).length;

  const list = appointments.filter((a) => {
    if (filter === "mine") return a.isHost;
    if (filter === "joined") return !a.isHost && a.status !== "invited";
    if (filter === "invited") return a.status === "invited";
    return true;
  });

  const toggle = (id) => {
    setOpenIds(
      openIds.includes(id)
        ? openIds.filter((openId) => openId !== id)
        : [...openIds, id],
    );
  };

  return (
    <div>
      <Header></Header>

      <div className="appointment-page">
        <div className="container">
          <div className="filter">
            {filters.map((f, i) => (
              <span key={f.key}>
                {i > 0 && <span> | </span>}
                <button
                  type="button"
                  className={filter === f.key ? "active" : ""}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                  {f.key === "invited" && (
                    <span className="badge">{invitedCount}</span>
                  )}
                </button>
              </span>
            ))}
          </div>

          <div className="appointments">
            {list.length === 0 ? (
              <p className="empty">표시할 약속이 없어요.</p>
            ) : (
              <ul>
                {list.map((item) => {
                  const isOpen = openIds.includes(item.id);
                  const isInvited = item.status === "invited";

                  return (
                    <li key={item.id} className={isOpen ? "open" : ""}>
                      <button
                        type="button"
                        className="appointment-header"
                        onClick={() => toggle(item.id)}
                      >
                        <span className="appointment-title">{item.title}</span>

                        <div className="appointment-info">
                          <span>{isInvited ? "미정" : item.date}</span>
                          <span className="people">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="#000"
                            >
                              <circle cx="9" cy="8" r="3.5" />
                              <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6z" />
                              <circle cx="17" cy="9" r="2.8" />
                              <path d="M17 14c3 0 5 2 5 5h-4.5c0-2-.8-3.8-2-5z" />
                            </svg>
                            {item.count}명
                          </span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline
                              points={
                                isOpen ? "6 15 12 9 18 15" : "6 9 12 15 18 9"
                              }
                            />
                          </svg>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="appointment-body">
                          <p>장소: {item.place}</p>
                          <p>참가자: {item.participants}</p>

                          {isInvited ? (
                            <div className="appointment-actions">
                              <button type="button">수락</button>
                              <button type="button">거절</button>
                            </div>
                          ) : (
                            <a
                              href={`/appointments/${item.id}`}
                              className="detail-link"
                            >
                              상세보기 &rarr;
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointmentbox;
