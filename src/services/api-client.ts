import axios from "axios";

const baseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

export default axios.create({
    baseURL: baseUrl,
    headers: {
        "x-auth-token": localStorage.getItem("token")
    }
})
