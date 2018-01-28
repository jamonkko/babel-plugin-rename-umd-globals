/*!
 * @license
 * babel-plugin-rename-umd-globals v1.0.0 (https://github.com/jamonkko/babel-plugin-rename-umd-globals#readme)
 * Copyright 2018 Jarkko Mönkkönen <jamonkko@gmail.com>
 * Licensed under MIT
 */
import renameProperties from 'babel-plugin-rename-assigned-properties'

export default babel => ({
  visitor: {
    Program: {
      exit (program, { opts }) {
        renameProperties(babel).visitor.Program.exit(
          program,
          {
            opts: {
              renames: {
                global: opts
              },
              process: 'post'
            }
          }
        )
      }
    }
  }
})
