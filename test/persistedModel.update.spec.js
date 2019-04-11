import { expect, should } from "chai"
import PersistedModelServices from "../PersistedModel"

describe("PersistedModelServices test", () => {
    describe("Persisted model updateAll() function", () => {
        it("should update one 'test' and return { count: 1 }!", async () => {

            const test = new PersistedModelServices('tests', 'http://localhost:3000/api')
            let createdTest = await test.create({
                firstName: 'created for update',
                lastName: 'lastName'
            })
            let res = await test.updateAll({firstName: 'created for update'}, {firstName: 'updated'})
            await test.deleteById(createdTest.id)
            expect(res).to.deep.include({count: 1})
        })
    })
    describe("Persisted model updateAll() function", () => {
        it("should update one 'test' and return { count: 1 }!", async () => {

            const test = new PersistedModelServices('tests', 'http://localhost:3000/api')
            let createdTest = await test.upsertWithWhere()
            let res = await test.updateAll({firstName: 'created for update'}, {firstName: 'updated'})
            await test.deleteById(createdTest.id)
            expect(res).to.deep.include({count: 1})
        })
    })
})
