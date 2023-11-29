const request = require("supertest")
const app = require("../app")
const { User } = require("../models")
const {signToken} = require("../helpers/jwt")

describe('POST/customers/register', function(){
    let user;
    
    beforeAll(async () => {
        user = await User.create({
            username: "openstestya",
            email: "openstest@gmail.com",
            password: "1234asdf",
            role : "customer",
            phoneNumber: "00888",
            address : "Tegal"
        })
    })

    afterAll(async () => {
        await User.destroy({ where : { email : "openstest@gmail.com"}})

    })


    it('POST/customers/register create new user and return status 201', async () => {
        const bodyData = {
            username: "openstestya",
            email: "openrsp@gmail.com",
            password: "1234asdf",
            role : "customer",
            phoneNumber: "00888",
            address : "Tegal"
        }
        const response = await request(app).post("/customers/register").send(bodyData)
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("username", bodyData.username)
        expect(response.body).toHaveProperty("email", bodyData.email)
        expect(response.body).toHaveProperty("role", bodyData.role)
        expect(response.body).toHaveProperty("phoneNumber", bodyData.phoneNumber)
        expect(response.body).toHaveProperty("address", bodyData.address)
    }) 

    it('POST/users failed because sending without username and return status 400', async () => {
        const bodyData = {
            username: "",
            email: "openstestyagesy@gmail.com",
            password: "1234asdf",
            role : "admin",
            phoneNumber: "00888",
            address : "Tegal"
        }

        const response = await request(app).post("/customers/register").send(bodyData)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.message.errors[0]).toBe('Username is Required')
    }) 

    it('POST/users failed because sending without email and return status 400', async () => {
        const bodyData = {
            username: "openyaya",
            email: "",
            password: "1234asdf",
            role : "admin",
            phoneNumber: "00888",
            address : "Tegal"
        }
        
        const response = await request(app).post("/customers/register").send(bodyData)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.message.errors[0]).toBe('Email is Required')
    }) 

    it('POST/users failed because sending invalid email and return status 400', async () => {
        const bodyData = {
            username: "openyaya",
            email: "aaaa",
            password: "1234asdf",
            role : "admin",
            phoneNumber: "00888",
            address : "Tegal"
        }
        
        const response = await request(app).post("/customers/register").send(bodyData)
        // console.log(response.body.message.errors, "hhhhhhhhhhhhhhhhhh");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.message.errors[0]).toBe('Insert Correct Email')
    }) 

    it('POST/users failed because sending registered email and return status 400', async () => {
        const bodyData = {
            username: "openyaya",
            email: "openrsp@gmail.com",
            password: "1234asdf",
            role : "admin",
            phoneNumber: "00888",
            address : "Tegal"
        }
        
        const response = await request(app).post("/customers/register").send(bodyData)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.message.errors[0]).toBe('Email address already in use!')
    }) 

    it('POST/users failed because sending null password and return status 400', async () => {
        const bodyData = {
            username: "openyaya",
            email: "openstestdpr@gmail.com",
            password: "",
            role : "admin",
            phoneNumber: "00888",
            address : "Tegal"
        }
        
        const response = await request(app).post("/customers/register").send(bodyData)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.message.errors[1]).toBe('Password is Required')
    }) 

    it('POST/users failed because sending  password length less than 5 characters and return status 400', async () => {
        const bodyData = {
            username: "openyaya",
            email: "openstestdpr@gmail.com",
            password: "123",
            role : "admin",
            phoneNumber: "00888",
            address : "Tegal"
        }
        
        const response = await request(app).post("/customers/register").send(bodyData)
        console.log(response.body.message.errors, "hhhhhhhhhhhhhhhhhh");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.message.errors[0]).toBe('Password minimal 5 characters')
    }) 

    it('POST/login success login and create access_token and return status 200', async () => {
        const bodyData = {
            email : "openstest@gmail.com",
            password : "1234asdf"
        }

        const response = await request(app)
        .post('/login')
        .send(bodyData)
        .set('Accept', 'application/json')

        const token = signToken({id : user.id, username : user.username})
        expect(response.body).toHaveProperty('access_token', token)
    })

    it('POST/login failed because sending  invalid password  and return status 401', async () => {
        const bodyData = {
            email : "openstest@gmail.com",
            password : "1234asdfggggg"
        }
        
        const response = await request(app)
        .post('/login')
        .send(bodyData)
        .set('Accept', 'application/json')

        console.log(response.body, "hhhhhhhhhhhhhhhhhh");
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message','Invalid email/password')
    }) 

    it('POST/login failed because sending unregistered email and return status 401', async () => {
        const bodyData = {
            email : "openstest@gmail.com",
            password : "1234asdfggggg"
        }
        
        const response = await request(app)
        .post('/login')
        .send(bodyData)
        .set('Accept', 'application/json')
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message','Invalid email/password')
    }) 
}) 