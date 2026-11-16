---
name: task-model-router
description: Choose the best Claude model tier for a task based on complexity, risk, ambiguity, and speed requirements.
---

# Task Model Router

Use this skill when you need to decide which Claude model is appropriate for a task.

## Decision model

- Fast: best for clearly bounded, low-risk, low-ambiguity work
- Balanced: best for routine engineering, debugging, drafting, and analysis
- Strong: best for difficult reasoning, ambiguous architecture decisions, and high-consequence tasks

## Rules

Choose Fast for:

- simple summaries, formatting, small edits, boilerplate, straightforward docs work
- tasks with a clear answer and low risk of error

Choose Balanced for:

- normal coding tasks, debugging, small refactors, technical analysis, writing and iteration
- tasks where multiple steps are needed but not deeply ambiguous

Choose Strong for:

- architecture decisions, tricky debugging, cross-system reasoning, security-sensitive work, legal/compliance-sensitive tasks
- tasks where a wrong answer is costly or where there are multiple valid but conflicting approaches

If a task spans tiers, choose the highest tier justified by its hardest part.

## Recommended behavior

- First decide the tier from task characteristics.
- If the environment supports an active model switch, follow the model recommendation.
- If the environment cannot switch models from within the skill, continue with the current active model and state the recommendation plainly.
- Keep the explanation short and task-based.

## Example output

`Model choice: Balanced (Sonnet) — this is a typical coding task with clear requirements and moderate multi-step work.`
