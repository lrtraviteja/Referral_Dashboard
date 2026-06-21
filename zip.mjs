import { execSync } from 'child_process';
import os from 'os';

const name = process.argv[2] || 'PrefixHere';
const zipName = `${name}_AssessmentSubmission.zip`;

const isWindows = os.platform() === 'win32';

let command;
if (isWindows) {
  command = `powershell -Command "Compress-Archive -Path src, public, index.html, package.json, package-lock.json, vite.config.js, eslint.config.js, README.md, .env.example, smoke.mjs -DestinationPath ${zipName} -Force"`;
} else {
  // // Mac/Linux native zip command
  // // todo: test mac and linux zip command.
  command = `zip -rq ${zipName} src public index.html package.json package-lock.json vite.config.js eslint.config.js README.md .env.example smoke.mjs`;
}

console.log(`Detected OS: ${os.type()} (${os.platform()})`);
console.log(`Zipping project into -> ${zipName}...`);

try {
  execSync(command, { stdio: 'inherit' });
  console.log('Zip complete! Ready for submission.');
} catch (err) {
  console.error('Error generating zip:', err.message);
}
