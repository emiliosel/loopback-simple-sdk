import { expect, should } from "chai"
import PersistedModelServices from "../PersistedModel"

describe("PersistedModelServices test", () => {
    describe("Persisted model create() function", () => {
        it("should create one 'test' and return created 'test' object!", async () => {

            const test = new PersistedModelServices('tests', 'http://localhost:3000/api')
            let res = await test.create({
                firstName: 'created',
                lastName: 'lastName'
            })
            expect(res).to.deep.include({firstName: 'created', lastName: 'lastName'})
        })
    })

    describe("Persisted model createMany() function", () => {
        it("should create many 'tests' and return array of created 'tests'", async () => {
            let tests = [
                {
                    firstName: 'createdMany1',
                    lastName: 'lastName'
                },
                {
                    firstName: 'createdMany2',
                    lastName: 'lastName'
                }
            ]
            const test = new PersistedModelServices('tests', 'http://localhost:3000/api')
            let res = await test.createMany(tests)
            expect(res.map(i => ({firstName: i.firstName, lastName: i.lastName}))).to.have.deep.members(tests)
        })
    })
})
