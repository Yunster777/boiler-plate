import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom'

export default function (SpecificComponent, option, adminRoute = null) {
    // @ option @
    // null: 아무나 출입 가능한 페이지
    // true: 로그인한 유저만 출입 가능한 페이지
    // false: 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props) {
        const dispatch = useDispatch()
        const navigate = useNavigate()

        // Backend에 Request 날려서 현재 상태 받아옴
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                if (!response.payload.isAuth) {
                    // 로그인하지 않은 상태
                    if (option === true) {
                        navigate('/login')
                    }
                } else {
                    // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if (option === false) {
                            // 로그인한 유저가 출입 불가능한 페이지를 접근하려할 때
                            navigate('/')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent />
        )
    }


    return AuthenticationCheck
}