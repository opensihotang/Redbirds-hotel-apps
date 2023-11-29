const request = require("supertest")
const app = require("../app")
const { User ,Lodging, sequelize, Type } = require("../models")
const dummyLodging = require("../__tests__/Dummy-data/lodging.json")

dummyLodging.forEach((el) => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
})

const userDummy = [
    { username: "testuser1", email: "testuser1@gmail.com", password: "1234asdf", role : "customer", phoneNumber: "00888", address : "Tegal"},
    { username: "testuseer2", email: "testuseer2@gmail.com", password: "1234asdf", role : "customer", phoneNumber: "00888", address : "Tegal"},
    { username: "testuseer3", email: "testuseer3@gmail.com", password: "1234asdf", role : "customer", phoneNumber: "00888", address : "Tegal"}
]

const typeDummy = [
    {name : "type1", createdAt: new Date(), updatedAt: new Date()},
    {name : "type2", createdAt: new Date(), updatedAt: new Date()},
    {name : "type3", createdAt: new Date(), updatedAt: new Date()}
]
describe('GET/getCustomerLodging', function() {
    // let lodgings;
        beforeAll( async() =>{
            await User.bulkCreate(userDummy)
            await Type.bulkCreate(typeDummy)
            await Lodging.bulkCreate(dummyLodging)
        })
        afterAll(async () => {
            await User.destroy({truncate : true, restartIdentity: true})
            await Type.destroy({truncate : true, restartIdentity: true})
            await Lodging.destroy({truncate : true, restartIdentity: true})
        })

    it('get/getCustomerLodging get data lodgings and return status 200', async () => {
        const response = await request(app).get("/customers/lodgings")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        // expect(response.body.lodgings).toHaveLength(9)
    }) 

    it('get/getCustomerLodging get lodgings with request params and return status 200', async () => {
        const response = await request(app).get("/customers/lodgings/?searchLocation=bsd")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    it('get/getCustomerLodging get data lodgings with pagination and return status 200', async () => {
        const response = await request(app).get("/customers/lodgings/?page=1")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    it('get/getCustomerLodging get data lodgings with id as request params and return status 200', async () => {
        const response = await request(app).get("/customers/lodgings/1")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("lodging")
    })

    it('get/getCustomerLodging failed get lodgings with invalid id as request params and return status 404', async () => {
        const response = await request(app).get("/customers/lodgings/3470")
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Data Not Found")
    })
})