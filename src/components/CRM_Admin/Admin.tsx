import  { useContext, useEffect, useState } from 'react'
import userService from '../../services/user-service'
import { AuthContext } from '../../contexts/AuthContext'
import { UserResponse } from '../../@types/types'
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDate } from '../../contexts/ThemeContext';

const Admin = () => {
  const {theme}=useDate()
const {token}=useContext(AuthContext)
const [users,setUsers]=useState<UserResponse[]>([])
    useEffect(() => {
        userService.getAllUsers(token)
        .then(res=>setUsers(res.data))
        .catch(err=>console.log(err))
    },[users])
    const handleChange=(user:UserResponse)=>{
           userService.patch_Users_Business_Status(token,user._id)
           .then(res=>console.log(res))
           .catch(err=>console.log(err))
    }
     const handleRemove= (user: UserResponse) => {
       userService
         .DeleteUser(token, user._id)
         .then((res) => console.log(res))
         .catch((err) => console.log(err));
     };
  return (
    <div className="">
      <h1 className="text-3xl text-center mb-4">CRM</h1>
      <div className="overflow-x-auto">
        <table
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <thead>
            <tr className="border ">
              <th className="border p-2 text-center fw-bold text-sm md:text-2xl lg:text-3xl ">
                Name
              </th>
              <th className="border text-center p-2 text-sm md:text-2xl lg:text-3xl fit-content">
                Email
              </th>
              <th className="border p-2 text-center  text-sm md:text-2xl lg:text-3xl">
                Phone
              </th>
              <th className="bordertext-center p-2 text-sm md:text-2xl lg:text-3xl">
                isBusiness
              </th>
              <th className="border text-center p-2 text-sm md:text-2xl lg:text-3xl">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className="border text-sm md:text-lg lg:text-xl "
                key={user._id}
              >
                <td className="border p-2">
                  {user.name.first + " " + user.name.last}
                </td>
                <td className="border p-2 fit-content ">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="p-2  flex justify-center items-center ">
                  <input
                    type="checkbox"
                    checked={user.isBusiness}
                    onChange={() => handleChange(user)}
                  />
                </td>
                <td
                  className="cursor-pointer border p-2 text-center"
                  onClick={() => handleRemove(user)}
                >
                  <PersonRemoveIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin