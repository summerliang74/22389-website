const { spawnSync } = require('node:child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(npmCommand, ['run', 'build'], { cwd: root, stdio: 'inherit' });

process.exit(result.status ?? 1);
