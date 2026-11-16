---
name: discord-bot
description: Research-backed Discord bot architecture guidance, security best practices, and implementation planning for Claude Code.
---

# Discord Bot Architect

Use this skill when building or improving a Discord bot. It focuses on Discord’s real architecture and current APIs rather than generic bot advice.

## Core responsibilities

- Identify whether a bot should use the Gateway, REST API, interactions, webhooks, or a hybrid model
- Choose the correct Discord intents and explain why they are necessary
- Avoid over-requesting privileged intents like MESSAGE_CONTENT, GUILD_MEMBERS, and GUILD_PRESENCES
- Design slash commands, button workflows, and modal interactions correctly
- Explain the 3-second interaction response deadline and how to defer long tasks
- Connect OAuth2 bot installation and least-privilege permissions to real-world bot setup
- Respect Discord’s rate limits and backoff rules
- Protect bot tokens and verify interaction signatures before acting on requests

## Decision rules

### Use the Gateway when:

- the bot needs real-time events like message creation, member joins, presence changes, reactions, or voice state changes
- the bot maintains long-lived live state
- it is a traditional server-side bot running continuously

### Use the REST API when:

- the bot needs to create/edit/delete resources, send or fetch data, or moderate users or channels
- the bot is performing one-off actions instead of streaming events

### Use interactions when:

- the bot relies on slash commands, buttons, select menus, or modals
- you want structured, user-driven actions instead of plain text parsing

### Use webhooks when:

- you want a lightweight message source into a channel without a full bot client
- you only need message delivery rather than event-driven bot logic

## Intent guidance

Use the minimum required intents for the feature set. In general:

- `Guilds` for server metadata and structure
- `GuildMessages` (and often `MessageContent` only if necessary) for text-message processing
- `GuildMembers` only when bot truly needs member join/leave/update events
- `GuildPresences` only for presence data

If a feature can be implemented without a privileged intent, prefer that route. Refer to Discord’s guidance on “You might not need a privileged intent.”

## Interaction handling

- Always verify interaction request signatures using `X-Signature-Ed25519` and `X-Signature-Timestamp`
- Respond to interactions within 3 seconds
- If work is slow, defer with `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE` or the equivalent component defer response
- Use the interaction token only within the token validity window (typically 15 minutes)
- Use follow-up webhook calls to send delayed results

## Bot security checklist

- Do not hardcode or expose bot tokens
- Use `.env` or a secret manager
- Request the least-privilege permissions needed for a server
- Respect role hierarchy and ensure bot role position is high enough for moderation actions
- Detect rate-limit responses and honor `Retry-After`
- Validate all incoming interaction payloads before executing actions
- Keep user data handling aligned with Discord policy and any required privacy disclosures

## Architecture template

A good Discord bot design usually includes:

1. A bot client connection for event streaming
2. A REST API client for resource updates
3. Interaction handlers for slash commands and components
4. Permission checks and role validation
5. Logging and health monitoring
6. Rate-limit handling and retry backoff
7. A deployment environment with secret storage

## Example feature planning

For a moderation bot:

- Use the Gateway with the relevant guild and message intents
- Consider `GuildMembers` only if you need member events
- Use slash commands for `/warn`, `/ban`, `/timeout`
- Use role checks before performing moderation actions
- Use REST endpoints for bans, timeouts, and audit data
- Reject unauthorized users and log actions

For a utility bot:

- Use guild events and slash commands
- Avoid MESSAGE_CONTENT unless the bot absolutely needs full message text
- Prefer explicit commands and button-driven workflows

## Output style

When helping with a Discord bot task, produce:

- architecture recommendation
- exact Discord features to use
- required permissions and intents
- a minimal implementation plan
- security and rate-limit caveats

Keep recommendations aligned with official Discord docs and platform limits.
