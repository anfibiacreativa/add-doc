import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';
// import { strings } from '@angular-devkit/core';
import { basename } from 'path';
import { Schema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addDoc(options: Schema): Rule {
  return chain([
    chain([ (tree: Tree, _context: SchematicContext) => {
     
      // We want to override the blog default target folder of post, by docs
      options.target = 'docs';
      const target = tree.getDir(options.target);
      options.title = options.name || 'doc-X';
      options.description = 'doc description';

      // Let's create an array to push the generated files to
      const indices: number[] = [];

      target.visit(file => {
        // Now let's just get the index of the last doc created to order the sidenav
        let fileName = basename(file);
        let fileIndex = parseInt(fileName.substring(0,3), 10);
        indices.push(fileIndex || 0o0);
      });

      if (indices.length !== 0) {
        let maxIndex = Math.max(...indices);
        let newIndex = ++maxIndex;
        let index = newIndex.toString();

        const _index = index.length === 1 ? `00${newIndex}` : index = `0${newIndex}`;

        // We increment index name so we have an ordered list for the sidenav
        // We want to make sure the mandatory name option of the post schematic is satisfied
        options.name = `${_index}${options.title}`;
      } else {
        // Even if the folder did not exist or was empty before, we need to satisfy this
        options.name = `000${options.title}`;
      }
      return tree;
    },
    externalSchematic('@scullyio/init','post', options)
    ])
  ])
}
