import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import Footer from './Footer'
import Navbar from './Navbar'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true })
            dispatch(addUser(response.data.data))
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        if (document.cookie.match(/token=/)) {
            fetchUser()
        } else {
            navigate("/login")
        }
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body