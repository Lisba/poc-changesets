# Changesets

Este directorio contiene los archivos generados por changesets.

## Cómo usar changesets

1. **Crear un changeset**: 
   ```bash
   npm run changeset
   ```

2. **Versionar los paquetes**: 
   ```bash
   npm run version
   ```

3. **Publicar los paquetes**: 
   ```bash
   npm run publish
   ```

## ¿Qué es un changeset?

Un changeset es un archivo que contiene información sobre cambios en tu codebase. Incluye:

- Qué paquetes deben actualizarse
- Qué tipo de cambio es (patch, minor, major)
- Un mensaje descriptivo que se usará en el changelog

Cuando ejecutas `npm run changeset`, se te guiará a través de un proceso interactivo para seleccionar:
1. Qué paquetes se han cambiado
2. Qué tipo de cambio es para cada paquete
3. Un mensaje descriptivo del cambio

Los changesets son útiles especialmente en pull requests, para documentar claramente los cambios que se están realizando. 