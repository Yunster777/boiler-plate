const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const config = require('./config/key')
const { auth } = require('./middleware/auth')

const port = 3001

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

// cookieParser 적용
app.use(cookieParser());

const mongoose = require('mongoose')
const { cookie } = require('express/lib/response')
mongoose.connect(config.mongoURI, {
    // mongoose 6.0부터는 아래 설정을 기본 제공하기 때문에 사용하면 안됨
    //useNewRulParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세요~'))

// 회원가입
app.post('/api/users/register', (req, res) => {
    // 회원가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 저장
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ registerSuccess: false, err})
        return res.status(200).json({
            registerSuccess: true
        })
    })
})

// 로그인
app.post('/api/users/login', (req, res) => {
    // 요청된 이메일이 데이터베이스에 있는지 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        // 있다면 비밀번호가 맞는 지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'})

            // 비밀번호까지 같다면 Token을 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에? 쿠키에!
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })

})

// 인증
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // role 0: User, else: Admin
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

// 로그아웃
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, 
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                logoutSuccess: true
            })
        })
})

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요!!")
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))