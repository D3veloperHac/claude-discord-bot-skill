# Claude Discord Bot Skills Marketplace

A Claude Code plugin marketplace for the research-backed Discord bot skill.

## Add this marketplace

In Claude Code, add this GitHub repository as a **marketplace**:

```text
D3veloperHac/claude-discord-bot-skill
```

Or use the repository URL:

```text
https://github.com/D3veloperHac/claude-discord-bot-skill
```

The repository root contains `.claude-plugin/marketplace.json`, and the marketplace points to the installable plugin in `plugins/discord-bot/`.

After adding/syncing the marketplace, install the **discord-bot** plugin. The plugin provides the `discord-bot:discord-bot` skill (the exact invocation may vary by Claude Code version/configuration).

> This repository is a Claude Code plugin marketplace. It is not a Claude.ai custom-skill ZIP upload. For Claude.ai, upload the skill directory or a ZIP containing the skill's `SKILL.md` instead.

## Contents

- `plugins/discord-bot/.claude-plugin/plugin.json` — plugin metadata
- `plugins/discord-bot/skills/discord-bot/SKILL.md` — installable Discord bot skill
- `.claude-plugin/marketplace.json` — marketplace catalog
- `.claude/skills/discord-bot/SKILL.md` — project-local skill copy
- `.claude/skills/task-model-router/SKILL.md` — task model recommendation skill
- `src/` — starter bot code
- `docs/discord-research.md` — research notes and official references

## Starter bot

The sample bot is separate from the plugin. To run it, install dependencies, copy `.env.example` to `.env`, configure a Discord application and bot token, then run `npm start`. Do not commit secrets.

## Trust and policy

Only install plugins from sources you trust. Discord APIs, permissions, and Claude plugin formats can change; consult the official links in `docs/discord-research.md` before relying on time-sensitive details.

## License

MIT
