import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
    const { user } = useSelector((state) => state?.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

   const handleLogout = async () => {
        await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
        dispatch(removeUser());
        navigate("/login");
   }

    return (<>
        <div className="navbar bg-base-200 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">⌨️devTinder</Link>
            </div>
            {user && (
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end mx-6">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user photo"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    </>);
}

export default Navbar;