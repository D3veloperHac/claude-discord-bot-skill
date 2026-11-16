---
name: discord-bot
description: Research-backed Discord bot architecture guidance, security best practices, and implementation planning for Claude Code. Use when building, debugging, reviewing, or deploying a Discord bot or Discord integration.
---

# Discord Bot Architect

Use this skill when planning, implementing, debugging, reviewing, or deploying a Discord bot or integration. Prefer official Discord documentation and established library abstractions over hand-rolled protocol code. Check current docs for details that may have changed.

## Start by clarifying the product shape

Determine:

- Which users and contexts are supported: guild installation, user installation, DMs, or some combination
- Whether the product needs live events, user-triggered commands, scheduled work, outbound notifications, or all of these
- Which language, runtime, hosting model, Discord library, and persistence layer the project already uses
- What data is genuinely needed, how long it is retained, and how deletion requests are handled
- Which actions require elevated permissions, moderator authorization, or guild-specific configuration

Inspect the repository before proposing a new architecture. Follow its language, framework, and package manager unless there is a good reason to change them.

## Choose the right Discord surface

- **Interactions**: Prefer application commands (slash, user context menu, message context menu), buttons, select menus, and modals for explicit user-driven workflows. They provide structured input and often avoid needing broad message-content access.
- **Gateway**: Use the persistent WebSocket when the application must receive real-time subscribed events, maintain presence, or handle features unavailable through interaction delivery alone.
- **REST API**: Use HTTP endpoints for resource reads and writes such as messages, channels, roles, and moderation actions. Use an official SDK where practical.
- **Webhooks**: Use incoming webhooks for scoped outbound posting when a full bot user and event consumer are unnecessary. Keep webhook URLs secret; they are bearer credentials.
- **Hybrid**: Combine surfaces only where requirements call for them. Do not add a Gateway connection simply by default.

For HTTP-delivered interactions, verify Discord's Ed25519 signature against the exact raw request body and timestamp before parsing or acting. Handle PING with PONG. Acknowledge interactions within Discord's current initial-response deadline (commonly three seconds); defer when work may exceed it, then use the interaction token only within its validity window. Confirm current deadlines and response types in official docs.

## Intents and data minimization

1. List each required event or data element and map it to the relevant intent/API.
2. Subscribe only to the intents actually needed.
3. Treat `GUILD_MEMBERS`, `GUILD_PRESENCES`, and `MESSAGE_CONTENT` as privileged intents. Configure them in the Developer Portal and verify current approval/review requirements for the app's scale and use case.
4. Check Discord's documented exceptions before requesting privileged message content. Prefer commands, interactions, or explicit mentions when they satisfy the feature.
5. Do not assume a library cache contains complete or current data; fetch and handle missing data deliberately.

Common mapping, to verify against current docs and library versions:

- Guild structure and most interaction context: `GUILDS`
- Guild message events: `GUILD_MESSAGES`; reading ordinary message bodies may additionally require `MESSAGE_CONTENT`
- Member join/update/list features: `GUILD_MEMBERS`
- Presence/activity tracking: `GUILD_PRESENCES`

Never request privileged intents “just in case.” Explain why each requested intent is necessary.

## Permissions, installation, and authorization

- Distinguish OAuth2 **scopes** (what authorization flow is requested) from bot **permissions** (what actions are allowed in a guild) and Gateway **intents** (what event data is delivered).
- Request least privilege. Avoid `Administrator` unless the product requirement demonstrably cannot be met otherwise.
- Explain required install contexts and scopes; do not assume every app uses the same bot/user installation model.
- Check both Discord permissions and application-level authorization for sensitive operations. A command being hidden or marked with default permissions is not a substitute for server-side checks.
- Respect channel permission overwrites, guild configuration, ownership, and role hierarchy. The bot cannot use permissions it was not granted, and many member/role actions are constrained by hierarchy.
- For moderation or destructive actions, validate the target, actor authorization, bot capability, and guild context immediately before acting. Provide clear errors and audit-friendly logs without exposing secrets or unnecessary personal data.

## Commands and components

- Register commands with a stable schema; use guild-scoped commands for development where appropriate and global commands for production when ready.
- Validate required options and handle absent, stale, or inaccessible objects.
- For buttons/selects, use opaque, validated `custom_id` values; never trust IDs or values simply because Discord delivered them.
- Bind component actions to intended user/message/guild where necessary, and make actions idempotent when duplicate delivery is possible.
- Open modals only through a supported interaction response flow. Validate and constrain submitted values server-side.
- Use ephemeral responses only when appropriate; do not treat ephemeral visibility as data security.
- Avoid allowing user-provided text to trigger unintended mentions. Set allowed mention behavior deliberately when sending messages.
- Respect message, embed, component, and attachment limits from the current API docs; do not assume payloads are unlimited.

## Gateway reliability and scale

When using the Gateway:

- Use a maintained library that implements heartbeat timing, sequence tracking, reconnect/resume, compression, and identify/session-start constraints.
- Do not create reconnect loops that repeatedly identify or ignore close codes. Follow the documented close-code and resume behavior.
- Use the Gateway's advertised heartbeat interval and acknowledge connection failure when heartbeats are missed.
- For multiple shards, use the session-start-limit and max-concurrency information returned by Discord; coordinate shard starts rather than launching all identifies at once.
- Keep event handlers fast; move slow work to a queue and acknowledge user interactions promptly.
- Make event processing resilient to duplicate delivery and transient disconnects.
- Shard only when required by the app's scale or Discord's current requirements.

Do not implement the Gateway protocol from scratch unless specifically required and the task justifies the operational and security burden.

## Rate limits and error handling

- Use a maintained Discord SDK when possible; let it manage route buckets and global limits.
- Never hard-code assumptions about per-route limits. Read and respect rate-limit headers and `Retry-After` on HTTP 429 responses.
- Retry only operations that are safe to retry. Use bounded exponential backoff with jitter for transient failures; avoid retrying invalid requests or permission errors blindly.
- Distinguish malformed requests (400), authentication failures (401), missing permissions (403), rate limits (429), and transient server failures (5xx).
- Log useful request context and Discord error codes, but redact authorization headers, bot tokens, interaction tokens, webhook URLs, and sensitive user data.

## Secrets, privacy, and platform rules

- Keep bot tokens, OAuth client secrets, interaction tokens, and webhook URLs out of source, logs, screenshots, and client-side bundles. Use environment variables for local development and a secret manager in production.
- If a credential leaks, revoke/rotate it promptly and investigate exposure.
- Never automate normal user accounts or use user tokens as a self-bot. Use a registered application and supported authorization flow.
- Do not design spam, unsolicited mass messaging, raid, evasion, or rate-limit-circumvention behavior.
- Minimize stored Discord data, document its purpose and retention, secure it, and support applicable deletion/privacy obligations. Check the current Discord Developer Policy and relevant laws rather than making unsupported legal claims.
- Do not collect message content or member data when the feature can work without it.

## Implementation workflow

1. Inspect the repository and identify its existing framework/library versions.
2. Restate requirements, supported install contexts, and important assumptions.
3. Select Gateway, interactions, REST, and/or webhooks based on actual needs.
4. Produce a permission/intent matrix: feature → required API surface → intents/scopes/permissions → justification.
5. Implement a small vertical slice with validation, authorization, error handling, and safe logging.
6. Add tests for authorization denials, invalid inputs, missing permissions, retries, and duplicate events where applicable.
7. Verify against official docs and the project's installed library version; run tests, lint, and type checks available in the repository.
8. Document setup, Developer Portal configuration, secrets, deployment, and operational limits.

## Response format

For architecture or implementation requests, include the relevant items without unnecessary boilerplate:

- Recommended architecture and why
- Exact intents, OAuth scopes, and bot permissions needed, separated by category
- Interaction timing and authorization considerations
- Security/privacy and rate-limit caveats
- Concrete implementation steps or code consistent with the repository

When a platform detail is time-sensitive or uncertain, say so and link the official docs instead of guessing.

## Official references

- Developer docs: https://docs.discord.com/developers
- Bots overview: https://docs.discord.com/developers/bots/overview
- Gateway: https://docs.discord.com/developers/events/gateway
- Gateway intents: https://docs.discord.com/developers/events/gateway#gateway-intents
- Interactions overview: https://docs.discord.com/developers/interactions/overview
- Receiving/responding to interactions: https://docs.discord.com/developers/interactions/receiving-and-responding
- Application commands: https://docs.discord.com/developers/interactions/application-commands
- Components: https://docs.discord.com/developers/components/overview
- OAuth2 and permissions: https://docs.discord.com/developers/platform/oauth2-and-permissions
- Permissions: https://docs.discord.com/developers/topics/permissions
- Rate limits: https://docs.discord.com/developers/topics/rate-limits
- Developer Policy: https://discord.com/developers/docs/policies-and-agreements/developer-policy
