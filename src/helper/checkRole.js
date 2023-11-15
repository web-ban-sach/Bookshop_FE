import { useEffect } from "react"
import { decodeToken } from "../api/user/auth.api"
import { useNavigate } from "react-router-dom"

const CheckRole = ({ element }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        const decode = async () => {
            const response = await decodeToken(token)
            if (response.data.data.role !== 'ADMIN') {
                navigate('*')
            }
        }
        decode()
    }, [token, navigate])

    return element
}

export default CheckRole
