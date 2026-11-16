# Claude Discord Bot Skill

This repository packages a research-backed Claude skill for building, securing, and operating Discord bots. It includes:

- A Claude skill for Discord bot architecture
- A task-model-routing skill for selecting the right AI model based on work type
- A starter Discord.js bot implementation
- Research notes grounded in Discord’s official developer docs and platform guidance

## Repo layout

- `.claude/skills/discord-bot/SKILL.md` — primary skill for bot planning and implementation
- `.claude/skills/task-model-router/SKILL.md` — helper skill for choosing the model tier based on task complexity
- `src/index.js` — minimal Discord bot starter
- `docs/discord-research.md` — research summary from official Discord docs
- `package.json` — Node.js starter dependencies
- `.env.example` — sample environment variables

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Fill in:

   - `DISCORD_TOKEN`
   - `CLIENT_ID`
   - `GUILD_ID` (optional for guild-only testing)

4. Run the bot:

   ```bash
   npm start
   ```

## Discord research highlights

Discord bots are built on the following core platform components:

- Applications: the app identity created in the Developer Portal
- Bot users: the actual account that connects to Discord
- Gateway: WebSocket-based real-time event stream
- REST API: HTTP calls for CRUD and moderation operations
- Interactions: slash commands, buttons, select menus, modals, and context menu commands
- OAuth2: authorization and bot invite links with scopes and permissions
- Intents: event subscriptions that determine what your bot receives
- Rate limits: request quotas and `429` handling
- Security: tokens, least privilege, role hierarchy, and signature verification on interactions

For a deeper summary, see `docs/discord-research.md`.

## Claude skill usage

Use the installed skill when you want Claude to:

- design a Discord bot architecture
- decide when to use Gateway vs REST vs interactions
- pick the correct intents for the feature set
- avoid privilege misuse and unknown security pitfalls
- create a secure bot starter implementation
- handle slash commands, buttons, and follow-up responses correctly

## Recommended reading from Discord

- Discord Developer Portal: https://discord.com/developers/applications
- Discord API docs: https://github.com/discord/discord-api-docs
- OAuth2 and permissions: https://docs.discord.com/developers/platform/oauth2-and-permissions
- Gateway docs: https://docs.discord.com/developers/docs/topics/gateway
- Interactions docs: https://docs.discord.com/developers/docs/interactions/receiving-and-responding
- Rate limits: https://docs.discord.com/developers/docs/topics/rate-limits

## License

MIT
