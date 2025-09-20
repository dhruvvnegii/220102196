const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

// Use the provided access token
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIxMDAwMDE4MTEzQGRpdC5lZHUuaW4iLCJleHAiOjE3NTgzNDgwMDcsImlhdCI6MTc1ODM0NzEwNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNmODViZmFmLWQ2MjAtNGQ0My04M2U3LTZmZDhmYzY4YWZkNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImRocnV2IG5lZ2kiLCJzdWIiOiJkMWU4NzJmNC0xNzk3LTQ4YmItYTI4Yy1mYWRlOWViNTI2NWIifSwiZW1haWwiOiIxMDAwMDE4MTEzQGRpdC5lZHUuaW4iLCJuYW1lIjoiZGhydXYgbmVnaSIsInJvbGxObyI6IjIyMDEwMjE5NiIsImFjY2Vzc0NvZGUiOiJTa21uZXciLCJjbGllbnRJRCI6ImQxZTg3MmY0LTE3OTctNDhiYi1hMjhjLWZhZGU5ZWI1MjY1YiIsImNsaWVudFNlY3JldCI6ImtqRlhncWVNSHlGaENUWmYifQ.A9_Of2eXOt44LoeTP6ymL-e_KxNm9B0JzWXWcw0tLAI";

async function Log(stack, level, pkg, message) {
  try {
    const validStacks = ["backend", "frontend"];
    const validLevels = ["debug", "info", "warn", "error", "fatal"];

    if (!validStacks.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!validLevels.includes(level)) throw new Error(`Invalid level: ${level}`);
    if (!pkg || typeof pkg !== "string") throw new Error(`Invalid package: ${pkg}`);
    if (!message || typeof message !== "string") throw new Error(`Invalid message: ${message}`);

    const logPayload = { stack, level, package: pkg, message, timestamp: new Date().toISOString() };

    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`, // ✅ fixed
      },
      body: JSON.stringify(logPayload),
    });

    if (!response.ok) {
      console.error(`❌ Log API failed: ${response.status}`, await response.text());
    } else {
      console.log("✅ Log sent successfully:", logPayload);
    }
  } catch (err) {
    console.error("❌ Logging failed:", err.message);
  }
}

export default Log;
