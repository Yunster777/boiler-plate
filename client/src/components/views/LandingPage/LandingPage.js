import React, { useEffect } from 'react'
import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { logoutUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function LandingPage() {
  // dispatch, navigate 사용
  // const dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
      axios.get('api/hello')
          .then(response => console.log(response.data))
  }, [])

  // 로그아웃 버튼 클릭
  const onClickHandler = () => {
    // 바로 처리하는 방법 : 굳이 State를 사용할 필요가 없기 때문에 바로 처리하는게 효율적임
    axios.get('api/users/logout')
    .then(response => {
      if (response.data.logoutSuccess) {
        alert('로그아웃 성공!')
        navigate('/login')
      } else {
        alert('Error: ' + response.data.message)
      }
    })

    // redux 쓰는 방법
    // dispatch(logoutUser())
    // .then(response => {
    //   if (response.payload.logoutSuccess) {
    //     alert('로그아웃 성공!')
    //     navigate('/login')
    //   } else {
    //     alert('Error: ' + response.payload.message)
    //   }
    // })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default Auth(LandingPage, null)