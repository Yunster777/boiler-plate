const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kysung14:Mrhdbstjd1$@bolier-plate.6mpl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    // mongoose 6.0부터는 아래 설정을 기본 제공하기 때문에 사용하면 안됨
    //useNewRulParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세요~'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))