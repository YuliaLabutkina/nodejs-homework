const contacts = [
    {
        _id: '604dea100c3cdb1fccbe8337',
        subscription: 'pro',
        name: 'Lika',
        phone: '(992) 812-5555',
        email: 'lika@gmail.com',
        owner: '604b0dabc08afe0af0f3777b',
      },
      {
        _id: '604dea360c3cdb1fccbe8339',
        subscription: 'free',
        name: 'Alex',
        phone: '(990) 323-5555',
        email: 'alex@gmail.com',
        owner: '604b0dabc08afe0af0f3777d',
      },
]

const newContact = {
    name: "Nik",
    email: "nik@gmail.com",
    phone: "067-777-77-88",
}

const User = {
    _id: "605fdeb33718a330442975b0",
    name: "Tim",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWZkZWIzMzcxOGEzMzA0NDI5NzViMCIsImlhdCI6MTYxNjkyMjg3NywiZXhwIjoxNjE2OTMwMDc3fQ.ijIe84MnCMe9pY0XlUw1jXq8wHWdDtN0kRJpS-Rs9zs",
    email: "lab@gmail.com",
    password: "$2a$08$rNJvVWbeasE/5aPO3mRAVOb147TTh/goGjaFlx48DVnb/Ry6q6GXq",
    avatar: "https://s.gravatar.com/avatar/fb5d74df000d650e577d1f1c0c4d5a3d?s=250"
}

const users = []
users[0] = User
const newUser = { email: 'tim@gmail.com', password: '123456'}

module.exports = { contacts, newContact, User, users, newUser }