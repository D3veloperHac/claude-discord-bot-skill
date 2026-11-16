# Discord Bot Research Notes

This document summarizes the key architecture and platform concepts relevant to Discord bot development, based on official Discord documentation and current bot development guidance.

## 1. Core architecture

Discord bots are built on a few core components:

- Application: the identity created in the Developer Portal
- Bot user: the actual bot account that joins guilds
- Gateway: WebSocket connection for real-time event delivery
- REST API: HTTP endpoints for actions like sending messages, creating channels, and managing permissions
- Interactions: slash commands, buttons, modals, and context menu actions
- OAuth2: installation and authorization flow for invite links and app permissions

## 2. Gateway and intents

The Gateway is the primary real-time transport for bot events. Discord sends event dispatches over WebSocket, and your client receives them as JSON payloads.

Gateway intents are required to tell Discord which event categories to send. The most important ones include:

- Guilds
- GuildMessages
- MessageContent
- GuildMembers
- GuildPresences

Privileged intents are special categories that require explicit enablement and, in many cases, review once bot reach is large. These include:

- MESSAGE_CONTENT
- GUILD_MEMBERS
- GUILD_PRESENCES

The official guidance is to request only the intents truly needed for the bot’s purpose.

## 3. REST API and webhook usage

The REST API is used for actions like:

- creating messages
- fetching guild data
- updating channels and roles
- managing bans, timeouts, and moderation actions

Webhooks are useful when a bot simply needs to post a message into a channel without being a fully interactive bot client. For more complex bot features, a full bot application and Gateway client are usually preferred.

## 4. Interactions and slash commands

Discord interactions let bots respond to structured events from the user interface. The most common forms are:

- slash commands
- context menu commands
- buttons and select menus
- modals

A strong interaction workflow includes:

- verifying request signatures
- responding within 3 seconds
- deferring long work when necessary
- completing the action with follow-up calls

## 5. Security and permissions

Discord bot security is not just about token handling. It also includes:

- treating bot tokens as secrets
- using least-privilege permissions
- checking role hierarchy before moderation actions
- validating interaction payloads before responding
- handling rate-limit responses properly

Role hierarchy matters because a bot cannot usually manipulate roles or members above its own highest role position. This is a common source of permission-related bugs in moderation bots.

## 6. Rate limiting and reliability

Discord enforces rate limits across the API. A reliable bot should:

- honor `Retry-After` on `429` responses
- inspect rate limit headers
- use exponential backoff on transient server errors
- avoid unnecessary API calls and bulk actions

## 7. Deployment guidance

For a production bot, the standard setup is:

- bot token in a secret store or environment variable
- process supervisor or container orchestration
- logging and health checks
- explicit permission model for each guild or install context
- testing using a guild-specific command deployment before global release

## 8. Practical architecture recommendation

For most bots, the best implementation pattern is:

1. Use the Gateway for event-driven bot logic
2. Use the REST API for focused actions and moderation operations
3. Use slash commands and components for user-facing actions
4. Request only the minimum required intents and permissions
5. Protect secrets and validate all external requests

## 9. Official docs

Useful starting points:

- Developer Portal: https://discord.com/developers/applications
- API docs: https://github.com/discord/discord-api-docs
- OAuth2 and permissions: https://docs.discord.com/developers/platform/oauth2-and-permissions
- Gateway: https://docs.discord.com/developers/docs/topics/gateway
- Interactions: https://docs.discord.com/developers/docs/interactions/receiving-and-responding
- Rate limits: https://docs.discord.com/developers/docs/topics/rate-limits

This repository’s skill and starter code are built to make these concepts operational in a real bot project.
