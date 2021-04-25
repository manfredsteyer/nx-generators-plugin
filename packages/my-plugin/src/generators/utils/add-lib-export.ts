import { Tree, ProjectConfiguration } from '@nrwl/devkit';
import * as path from 'path';
import { strings } from '@angular-devkit/core';

export function addLibExport(host: Tree, projConfig: ProjectConfiguration, entity: string): void {
    const indexTsPath = path.join(projConfig.sourceRoot, 'index.ts');
    const indexTs = host.read(indexTsPath).toString();
  
    const entityFileName = `./lib/${strings.dasherize(entity)}`;
    const entityName = strings.capitalize(entity);
    const dataServiceFileName = `./lib/${strings.dasherize(entity)}.data-service`;
    const dataServiceName = strings.capitalize(entity) + 'DataService';
  
    const updatedIndexTs = indexTs + `
  export { ${entityName} } from '${entityFileName}';
  export { ${dataServiceName} } from '${dataServiceFileName}';
  `;
  
    host.write(indexTsPath, updatedIndexTs);
}