import { expect, should } from "chai"
import User from "../User"



describe("UserModelServices test", () => {
    before(async () => {
        try {
            const user = new User('users', 'http://localhost:3000/api')
            let createdUser = await user.create({
                firstName: 'emilio',
                lastName: 'test',
                email: 'aselmanaj@webjar.me',
                password: 'test'
            })
            
        } catch (er) {
            let error = er.response.data.error
            if (
                error // && 
                // error.details && 
                // error.details.messages && 
                // error.details.messages.email && 
                // error.details.messages.email === 'aselmanaj@webjar.me'
            ) {
                // user exists already
            } else {
                // user does not exist
                // some other error occurred
                console.log('user does not exist')
                // console.error(er)
            }
        }
    })
    describe("User model login() function", () => {
        it("should login and return accessToken!", async () => {

            const user = new User('users', 'http://localhost:3000/api')
            let res = await user.login(
                {
                    email: 'aselmanaj@webjar.me',
                    password: 'test'
                }
            )
            expect(res).to.have.all.keys('id', 'ttl', 'userId', 'created')
        })


        it("should login and return accessToken with included user!", async () => {

            const user = new User('users', 'http://localhost:3000/api')
            let res = await user.login(
                {
                    email: 'aselmanaj@webjar.me',
                    password: 'test'
                },
                'user'
            )
            expect(res.user.firstName).to.equal('emilio')
        })
        

    })

    after(async () => {  
        const user = new User('users', 'http://localhost:3000/api')
        let res = await user.login(
            {
                email: 'aselmanaj@webjar.me',
                password: 'test'
            }
        )
        // console.log({userConfig: user.Config.get('access_token') })
        // console.log({ res })
        let delRes = await user.deleteById(res.userId).catch(er => er.request)
        // console.log( { delRes })
    })
})