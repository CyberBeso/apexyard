#!/usr/bin/env node
// Send a prompt (file arg or stdin) to a GLM chat-completions endpoint; print the reply.
import { readFileSync } from "node:fs";

const { GLM_API_KEY, GLM_BASE_URL, GLM_MODEL = "glm-5.3" } = process.env;
if (!GLM_API_KEY || !GLM_BASE_URL) {
  console.error("glm.mjs: set GLM_API_KEY and GLM_BASE_URL");
  process.exit(2);
}

const file = process.argv[2];
const prompt = file ? readFileSync(file, "utf8") : readFileSync(0, "utf8");
if (!prompt.trim()) {
  console.error("glm.mjs: empty prompt");
  process.exit(2);
}

const res = await fetch(`${GLM_BASE_URL.replace(/\/$/, "")}/chat/completions`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${GLM_API_KEY}`,
  },
  body: JSON.stringify({
    model: GLM_MODEL,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  }),
});

const body = await res.text();
if (!res.ok) {
  console.error(`glm.mjs: HTTP ${res.status}\n${body}`);
  process.exit(1);
}
const text = JSON.parse(body).choices?.[0]?.message?.content;
if (!text) {
  console.error(`glm.mjs: no content in response\n${body}`);
  process.exit(1);
}
process.stdout.write(text + "\n");
