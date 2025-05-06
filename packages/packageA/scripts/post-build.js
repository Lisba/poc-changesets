const fs = require('fs-extra');
const path = require('path');

// Copiar archivos de build a la raíz del paquete
fs.copySync(path.join(__dirname, '../build'), path.join(__dirname, '../dist'));
fs.removeSync(path.join(__dirname, '../build'));

// Crear package.json para la distribución
const packageJson = require('../package.json');
const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  main: 'index.js',
  types: 'index.d.ts',
  dependencies: packageJson.dependencies
};

fs.writeJsonSync(path.join(__dirname, '../dist/package.json'), distPackageJson, { spaces: 2 }); 