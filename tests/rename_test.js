import test from 'tape'
import { transform } from 'babel-core'

test('rename single global', (t) => {
  const result = transform(
    'global.name = 0;',
    {
      plugins: [
        ['./src/index.js', { name: 'NewName' }]
      ]
    }
  )
  t.equal(result.code, 'global.NewName = 0;')
  t.end()
})

test('rename with aliases', (t) => {
  const result = transform(
    'global.name = 0;',
    {
      plugins: [
        ['./src/index.js', { name: ['NewName', 'NN', 'NewN'] }]
      ]
    }
  )
  t.equal(result.code, 'global.NewN = global.NN = global.NewName = 0;')
  t.end()
})

test('rename with multiple properties', (t) => {
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
  t.equal(result.code, 'global.NewName1 = 0;global.NN = global.NewName2 = 1;global.noRename = 2;')
  t.end()
})
