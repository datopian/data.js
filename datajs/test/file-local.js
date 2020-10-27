import assert from 'assert'
import * as data from '../src/data'

describe('File Local', function () {
  it('File class for addSchema method', async () => {
    let path_ = 'datajs/test/fixtures/sample.csv'
    let file = data.open(path_)
    assert.strictEqual(file.descriptor.schema, undefined)

    await file.addSchema()
    assert.strictEqual(file.descriptor.schema.fields[1].type, 'string')

    let headers = file.descriptor.schema.fields.map((field) => field.name)
    assert.deepStrictEqual(headers, ['number', 'string', 'boolean'])
  })

  it("File classes have displayName method'", () => {
    const fileLocal = data.open('datajs/test/fixtures/sample.csv')
    assert.strictEqual(fileLocal.displayName, 'FileLocal')
  })

  it('Calculates the streaming hash (md5) of a csv file', async () => {
    const fileLocal = data.open('datajs/test/fixtures/sample.csv')
    let hash = await fileLocal.hash('md5')
    assert.strictEqual(hash, 'b0661d9566498a800fbf95365ce28747')
  })

  it('Calculates the streaming hash (sha256) of a csv file', async () => {
    const fileLocal = data.open('datajs/test/fixtures/sample.csv')
    let hash = await fileLocal.hash('sha256')
    assert.strictEqual( hash,'d9d47b90ac9607c5111ff9a83aa37bc10e058ce6206c00b6626ade091784e098')
  })
})