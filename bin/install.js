#!/usr/bin/env node
'use strict';

/**
 * my-skills CLI
 *
 * Usage:
 *   npx my-skills <skill-name> [--agent=claude|cursor|opencode]
 *   npx my-skills install <skill-name> [--agent=...]
 *   npx my-skills list
 */

const fs   = require('fs');
const path = require('path');
const {
  SUPPORTED_AGENTS,
  detectAgent,
  parseAgentFlag,
  promptAgent,
  installSkill,
} = require('../lib/install-utils');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');

function listSkills() {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs.readdirSync(SKILLS_DIR).filter(name => {
    const skillPath = path.join(SKILLS_DIR, name);
    return (
      fs.statSync(skillPath).isDirectory() &&
      fs.existsSync(path.join(skillPath, 'SKILL.md'))
    );
  });
}

async function main() {
  const argv = process.argv.slice(2);
  let cmd = argv[0];

  // `install <skill>` is a synonym for just `<skill>`
  if (cmd === 'install') {
    argv.shift();
    cmd = argv[0];
  }

  if (!cmd || cmd === 'list' || cmd === 'ls') {
    const skills = listSkills();
    if (skills.length === 0) {
      console.log('No skills found in skills/ directory.');
    } else {
      console.log('Available skills:\n');
      skills.forEach(s => console.log(`  ${s}`));
      console.log(`\nInstall: npx my-skills <skill-name> [--agent=${SUPPORTED_AGENTS.join('|')}]`);
    }
    return;
  }

  const skillName = cmd;
  const skillSrc  = path.join(SKILLS_DIR, skillName);

  if (!fs.existsSync(skillSrc) || !fs.statSync(skillSrc).isDirectory()) {
    console.error(`❌  Skill "${skillName}" not found.`);
    const available = listSkills();
    if (available.length) console.log(`Available: ${available.join(', ')}`);
    process.exit(1);
  }

  // Resolve agent
  let agent = parseAgentFlag(argv) || detectAgent();
  if (!agent) {
    console.log(`Could not detect your AI agent automatically.`);
    agent = await promptAgent();
  } else {
    console.log(`Detected agent: ${agent}`);
  }

  installSkill(skillSrc, skillName, agent);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
