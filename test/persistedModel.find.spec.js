import { expect, should } from "chai"
import PersistedModelServices from "../PersistedModel"

describe("PersistedModelServices test", () => {
    describe("Persisted model find() function", () => {
        it("should find all the tests!", async () => {

            const test = new PersistedModelServices('tests', 'http://localhost:3000/api')
            let res = await test.find()
            expect(res).to.be.an('array')
        })

        it("should find tests that firstName = test!", async () => {

            const test = new PersistedModelServices('tests', 'http://localhost:3000/api')
            let res = await test.find({
                filter: {
                    where: {
                        firstName: "test"
                    }
                }
            })
            if (res.length) {
                expect(res.map(t => ({firstName: t.firstName}))).to.have.deep.members([{firstName: 'test'}])
            } else {
                expect(res).to.be.an('array')
            }
            
        })

        it("should throw error 404",  async () => {

            const test = new PersistedModelServices('tests', 'http://localhost:3000')

            try {
                let res = await test.find()
                expect(res).to.be.an.instanceOf(Error)
            } catch (er) {
                expect(er.response.status).to.equal(404)
            }
        })
    })
})