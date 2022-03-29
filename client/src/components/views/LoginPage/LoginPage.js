// import { Axios } from 'axios'
// import { response } from 'express';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function LoginPage() {
  // dispatch 사용
  const dispatch = useDispatch();

  let navigate = useNavigate();

  // State 만들기
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  // 핸들러 : 이메일, 비밀번호 State를 바꿀 수 있도록
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    // 페이지 Refresh 막기 위해서 사용
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          // props.history.push('/') // 구식 방법
          alert('로그인 성공!')
          navigate('/')
        } else {
          alert('Error: ' + response.payload.message)
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Auth(LoginPage, false)
