import renameProperties from 'babel-plugin-rename-assigned-properties'

export default babel => ({
  visitor: {
    Program: {
      exit(program, { opts }) {
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
