
describe('create-tweet', () => {
    beforeEach(()=> {
        window.localStorage.setItem('token', '291e501c-b015-43d1-986c-1c12079886e4')
    })
    it('create-tweet', () => {
        cy.visit('http://localhost:3000/')

    })
})