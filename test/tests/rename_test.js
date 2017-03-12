/* eslint-env mocha */
import { transform } from 'babel-core'

suite('renaming globals', () => {
  test('rename single global', () => {
    const result = transform(
      'global.name = 0;',
      {
        plugins: [
          ['./src/index.js', { name: 'NewName' }]
        ]
      }
    )
    result.code.should.equal('global.NewName = 0;')
  })

  test('rename with aliases', () => {
    const result = transform(
      'global.name = 0;',
      {
        plugins: [
          ['./src/index.js', { name: ['NewName', 'NN', 'NewN'] }]
        ]
      }
    )
    result.code.should.equal('global.NewN = global.NN = global.NewName = 0;')
  })

  test('rename with multiple properties', () => {
    const result = transform(
      'global.name1 = 0;global.name2 = 1;global.noRename = 2;',
      {
        plugins: [
          ['./src/index.js', {
            name1: 'NewName1',
            name2: ['NewName2', 'NN'],
            unknown: 'NoEffect'
          }]
        ]
      }
    )
    result.code.should.equal(
      'global.NewName1 = 0;global.NN = global.NewName2 = 1;global.noRename = 2;')
  })
})
