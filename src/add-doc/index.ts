import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';
// import { strings } from '@angular-devkit/core';
import { basename } from 'path';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addDoc(_options: any): Rule {
  return chain([
    chain([ (tree: Tree, _context: SchematicContext) => {
     
      // We want to override the blog default target folder of post, by docs
      _options.target = 'docs';
      const target = tree.getDir(_options.target);

    /*       
      
      if (!target) {
        _context.logger.warn('I did not find the target folder docs, so I am creating it!. Please try again!');
        
        const source = apply(url('./files'), [
          template({
            ...strings,
            ..._options,
          }),
        ]);

        const chained = chain([branchAndMerge(chain([mergeWith(source)]))]);
        return chained(tree, _context);
      } */

      const indices: number[] = [];

      target.visit(file => {
        // let's just het the index of the last doc created to order the sidenav
        let fileName = basename(file);
        let fileIndex = parseInt(fileName.substring(0,3), 10);
        indices.push(fileIndex || 0o0);
      });

      if (indices.length !== 0) {
        let maxIndex = Math.max(...indices);
        let newIndex = ++maxIndex;
        let index = newIndex.toString();

        if (index.length === 1) {
          index = `00${newIndex}`;
        } else {
          index = `0${newIndex}`;
        }
        // We increment index name so we have an ordered list for the sidenav
        // We want to make sure the mandatory name option of the post schematic is satisfied
        _options.name = `${index}${_options.title}`;
      } else {
        // Even if the folder did not exist or was empty before, we need to satisfy this
        _options.name = `000${_options.title}`;
        _context.logger.warn('Do not forget to add a homepage to your site!');
      }
      return tree;
    },
    externalSchematic('@scullyio/init','post', _options)
    ])
  ])
}