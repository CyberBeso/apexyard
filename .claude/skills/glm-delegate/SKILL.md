---
name: glm-delegate
description: Delegate well-scoped, mechanical coding tasks (boilerplate, tests, refactors across many files, docs, log/code summaries) to GLM to save Anthropic usage.
---

When a subtask is self-contained and low-risk, delegate it:

1. Write a complete, standalone prompt to a scratch file: goal, exact files
   (paste their relevant contents), constraints, and what "done" looks like.
   GLM has none of this conversation's context and cannot read the repo.
2. Run: `node .claude/skills/glm-delegate/glm.mjs <prompt-file>`
   (or pipe the prompt on stdin). The reply is printed to stdout.
3. Review the result yourself: apply it, read the diff, run tests. Fix or
   redo anything wrong before reporting back.

Requires env vars `GLM_API_KEY` and `GLM_BASE_URL`; optional `GLM_MODEL`
(default `glm-5.3`). Never paste secrets, credentials, or customer data into
the prompt, since it goes to a third-party service.

Do NOT delegate: architecture decisions, security-sensitive code,
anything needing images, or tasks touching files you are editing now.
