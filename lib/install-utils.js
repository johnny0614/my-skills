#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const HOME = process.env.HOME || process.env.USERPROFILE;

const AGENT_INSTALL_PATHS = {
  claude:   path.join(HOME, '.claude',   'skills'),
  cursor:   path.join(HOME, '.cursor',   'skills'),
  opencode: path.join(HOME, '.opencode', 'skills'),
};

const SUPPORTED_AGENTS = Object.keys(AGENT_INSTALL_PATHS);

/**
 * Detect which AI agent is currently running based on environment signals.
 * Returns the agent name or null if detection fails.
 */
function detectAgent() {
  if (process.env.CLAUDE_CODE) return 'claude';
  if (process.env.CURSOR_AGENT) return 'cursor';
  if (process.env.OPENCODE_AGENT) return 'opencode';

  // Fallback: check for agent-specific directories
  if (fs.existsSync(path.join(HOME, '.claude')))   return 'claude';
  if (fs.existsSync(path.join(HOME, '.cursor')))   return 'cursor';
  if (fs.existsSync(path.join(HOME, '.opencode'))) return 'opencode';

  return null;
}

/**
 * Parse --agent=<name> from argv. Returns null if not present.
 */
function parseAgentFlag(argv) {
  const flag = argv.find(a => a.startsWith('--agent='));
  if (!flag) return null;
  const value = flag.split('=')[1].toLowerCase();
  return SUPPORTED_AGENTS.includes(value) ? value : null;
}

/**
 * Prompt the user to choose an agent interactively.
 */
function promptAgent() {
  const readline = require('readline');
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(`Target agent (${SUPPORTED_AGENTS.join(' / ')}): `, (answer) => {
      rl.close();
      const choice = answer.trim().toLowerCase();
      resolve(SUPPORTED_AGENTS.includes(choice) ? choice : 'claude');
    });
  });
}

/**
 * Copy a skill directory to the agent's skill install path.
 *
 * @param {string} skillSrcDir  Absolute path to the skill's source folder
 * @param {string} skillName    Skill name (kebab-case)
 * @param {string} agent        One of SUPPORTED_AGENTS
 */
function installSkill(skillSrcDir, skillName, agent) {
  const destBase = AGENT_INSTALL_PATHS[agent];
  const destDir  = path.join(destBase, skillName);

  fs.mkdirSync(destBase, { recursive: true });

  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true });
  }

  fs.cpSync(skillSrcDir, destDir, { recursive: true });

  console.log(`✅  Installed "${skillName}" → ${destDir}`);
  console.log(`    Restart ${agent} to use it: /${skillName}`);
}

module.exports = {
  AGENT_INSTALL_PATHS,
  SUPPORTED_AGENTS,
  detectAgent,
  parseAgentFlag,
  promptAgent,
  installSkill,
};
