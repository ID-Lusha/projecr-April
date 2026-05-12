const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function startChat(businessNiche: string) {
  const res = await fetch(`${API_URL}/chat/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ business_niche: businessNiche }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Ошибка сервера" }));
    throw new Error(error.detail || "Ошибка запроса");
  }

  return res.json() as Promise<{ session_id: string; ai_message: string }>;
}

export function streamChatMessage(
  sessionId: string,
  message: string,
  onToken: (token: string) => void,
  onEndRoleplay: (pitchMessage: string) => void,
  onDone: () => void,
  onError: (error: string) => void,
) {
  const url = `${API_URL}/chat/message`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: "Ошибка" }));
        onError(error.detail || "Ошибка сервера");
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        onError("Нет потока данных");
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);
            if (data.type === "token") {
              onToken(data.content);
            } else if (data.type === "end_roleplay") {
              onEndRoleplay(data.content);
            } else if (data.type === "done") {
              onDone();
            }
          } catch {
            // skip malformed SSE
          }
        }
      }

      onDone();
    })
    .catch((err) => {
      onError(err.message || "Ошибка соединения");
    });
}

export async function submitLead(data: {
  session_id: string;
  phone?: string;
  telegram?: string;
}) {
  const res = await fetch(`${API_URL}/chat/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Ошибка" }));
    throw new Error(error.detail || "Ошибка отправки");
  }

  return res.json() as Promise<{ success: boolean; message: string }>;
}
