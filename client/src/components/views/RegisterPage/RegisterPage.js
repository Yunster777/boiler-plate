import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function RegisterPage() {
  // dispatch, navigate 사용
  const dispatch = useDispatch()
  let navigate = useNavigate()

  // State 만들기
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [RePassword, setRePassword] = useState("")

  // 핸들러 : 이메일, 비밀번호 State를 바꿀 수 있도록
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onRePasswordHandler = (event) => {
    setRePassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    // 페이지 Refresh 막기 위해서 사용
    event.preventDefault();

    // 비밀번호 체크
    if (Password !== RePassword) {
      return alert("Password와 RePassword가 다릅니다.")
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.registerSuccess) {
          alert('회원가입 성공!')
          navigate('/login')
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>RePassword</label>
        <input type="password" value={RePassword} onChange={onRePasswordHandler} />
        
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Auth(RegisterPage, false)
