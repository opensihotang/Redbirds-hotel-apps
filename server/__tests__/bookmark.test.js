const request = require("supertest")
const app = require("../app")
const { User ,Lodging, Bookmark, sequelize, Type } = require("../models") 
const hashPassword = require("../helpers/bycript")


const bookmarkDummy = [
    { AuthorId : 1, LodgingId : 1, createdAt : new Date(), updatedAt : new Date()},
    { AuthorId : 2, LodgingId : 2, createdAt : new Date(), updatedAt : new Date()},
    { AuthorId : 3, LodgingId : 3, createdAt : new Date(), updatedAt : new Date()},
]

const userDummy = [
    { username: "testuser1", email: "testuser11@gmail.com", password: "1234asdf", role : "customer", phoneNumber: "00888", address : "Tegal"},
    { username: "testuseer2", email: "testuseer22@gmail.com", password: "1234asdf", role : "customer", phoneNumber: "00888", address : "Tegal"},
    { username: "testuseer3", email: "testuseer33@gmail.com", password: "1234asdf", role : "customer", phoneNumber: "00888", address : "Tegal"}
]

const typeDummy = [
    {name : "type1", createdAt: new Date(), updatedAt: new Date()},
    {name : "type2", createdAt: new Date(), updatedAt: new Date()},
    {name : "type3", createdAt: new Date(), updatedAt: new Date()}
]

const lodgingDummy = [
    { name: "Lodging1", facility: "Facility 1", roomCapacity: 4, imgUrl: "img1.jpg", authorId: 1, location: "Location 1", price: 600000, typeId: 1},
    { name: "Lodging2", facility: "Facility 2", roomCapacity: 4, imgUrl: "img2.jpg", authorId: 2, location: "Location 2", price: 600000, typeId: 2},

]

describe('get/bookmarks', function(){
    let access_token;
    beforeAll( async() => {
        try {
            const response = await request(app)
            .post('/login')
            .send({ email: 'openrsp@gmail.com', password: '1234asdf' });

            console.log(response.body.access_token, "ini ajsgdi asgdfisuvfyu");
            access_token = response.body.access_token;
            // await User.bulkCreate(userDummy)
            await Type.bulkCreate(typeDummy)
            await Lodging.bulkCreate(lodgingDummy)
            await Bookmark.bulkCreate(bookmarkDummy)
            
        } catch (err) {
            // console.log(err);
        }
    })
    console.log(access_token, "accceioahsdo;iugsafiu g");

    afterAll( async() =>{
        await User.destroy({truncate : true, restartIdentity: true})
        await Type.destroy({truncate : true, restartIdentity: true})
        await Lodging.destroy({truncate : true, restartIdentity: true})
        await Bookmark.destroy({truncate : true, restartIdentity: true})

    })

    it('get/bookmarks get data Bookmarks and return status 200', async() => {
        const response = await request(app)
        .get("/bookmarks")
        .set('Authorization', `Bearer ${access_token}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })
})