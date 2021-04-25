import { Tree, ProjectConfiguration, applyChangesToString, ChangeType } from '@nrwl/devkit';
import * as path from 'path';
import { strings } from '@angular-devkit/core';

export function addLibExport(host: Tree, projConfig: ProjectConfiguration, entity: string): void {
    const indexTsPath = path.join(projConfig.sourceRoot, 'index.ts');
    const indexTs = host.read(indexTsPath).toString();
  
    const entityFileName = `./lib/${strings.dasherize(entity)}`;
    const entityName = strings.capitalize(entity);
    const dataServiceFileName = `./lib/${strings.dasherize(entity)}.data-service`;
    const dataServiceName = strings.capitalize(entity) + 'DataService';
  
    const updatedIndexTs = applyChangesToString(
      indexTs,
      [
        {
          type: ChangeType.Insert,
          index: indexTs.length,
          text: `export { ${entityName} } from '${entityFileName}';\n`
        },
        {
          type: ChangeType.Insert,
          index: indexTs.length,
          text: `export { ${dataServiceName} } from '${dataServiceFileName}';\n`
        },
        // Just for demonstration:
        // {
        //   type: ChangeType.Delete,
        //   start: 0,
        //   length: indexTs.indexOf('\n') + 1
        // }        
      ]
    )

    host.write(indexTsPath, updatedIndexTs);
}
