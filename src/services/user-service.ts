import { LoginUser, RegisterUser } from "../@types/types";
import apiClient from "./api-client";
import { FormData } from "../components/UpdateUser/UpdateUser";
class UserService {

    login(email: string, password: string) {
            return apiClient.post<string>('/users/login', { email, password })
        }
     

    register(data: RegisterUser) {
            return apiClient.post<LoginUser>('/users',data)
    }
    getUser(id: string, token:string) {
        return apiClient.get(`/users/${id}`,{
             headers: {
      "x-auth-token": token
        }})
    }
    getAllUsers(token:string) {
        return apiClient.get('/users', {
             headers: {
      "x-auth-token": token
        }
          })
             }
    update_User(token:string,id:string, data: FormData) {
        return apiClient.put(`/users/${id}`,data,{
             headers: {
      "x-auth-token": token
    }
        })
    }
patch_Users_Business_Status(token:string, id:string){
return apiClient.patch(`/users/${id}`,{
     headers: {
      "x-auth-token": token 
     }
})
}
    DeleteUser(token:string, id:string) {
        return apiClient.delete(`/users/${id}`,{
             headers: {
      "x-auth-token": token
             }
        })
    }
}
export default new UserService()
