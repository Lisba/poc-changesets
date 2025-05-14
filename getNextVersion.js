// getNextVersion.js
const { execSync } = require('child_process');
const fs = require('fs');

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function getLatestTag() {
  return execSync('git describe --tags --abbrev=0').toString().trim();
}

function getChangesetOutput(currentBranch) {
  let command;
  if (currentBranch === 'main') {
    command = 'npx changeset status --verbose';
  } else {
    const baseRef = getLatestTag();
    command = `npx changeset status --verbose --since ${baseRef}`;
  }
  return execSync(command).toString().replace(/\x1b\[[0-9;]*m/g, '').replace(/🦋  /g, '').replace(/\.changeset\/.*\.md/g, '').replace(/^info/gm, '### info');
}

function extractCoreVersion(changesetOutput) {
  const match = changesetOutput.match(/@poc-changesets\/core.*?([0-9]+\.[0-9]+\.[0-9]+)/);
  return match ? match[1] : null;
}

function buildTagSuffix(changesetOutput) {
  let tagSuffix = '';
  const packages = ['package-a', 'package-b'];
  packages.forEach(pkg => {
    const pkgVersion = changesetOutput.match(new RegExp(`@poc-changesets/${pkg}.*?([0-9]+\\.[0-9]+\\.[0-9]+)`));
    if (pkgVersion) {
      const pkgLetter = pkg.slice(-1);
      tagSuffix += `-${pkgLetter}${pkgVersion[1]}`;
    }
  });
  return tagSuffix;
}

function getCoreVersionFromPackageJson() {
  const packageJson = JSON.parse(fs.readFileSync('./packages/core/package.json', 'utf8'));
  return packageJson.version;
}

function main() {
  const currentBranch = getCurrentBranch();
  const changesetOutput = getChangesetOutput(currentBranch);

  if (!changesetOutput.includes('Packages to be bumped at')) {
    console.error('No pending changesets to generate a new version');
    process.exit(1);
  }

  let coreVersion = extractCoreVersion(changesetOutput);
  let newVersion;

  if (!coreVersion) {
    console.log('CORE_VERSION is empty, building TAG_SUFFIX');
    const tagSuffix = buildTagSuffix(changesetOutput);
    coreVersion = getCoreVersionFromPackageJson();
    newVersion = `v${coreVersion}${tagSuffix}`;
  } else {
    newVersion = `v${coreVersion}`;
  }

  // Escribir las variables en el archivo de salida de GitHub Actions
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `new_version=${newVersion}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `changeset_output<<EOF\n${changesetOutput}\nEOF\n`);
}

main();