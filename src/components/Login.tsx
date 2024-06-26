import { useForm } from "react-hook-form";
import userService from "../services/user-service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

interface LoginType {
  email: string;
  password: string;
}
interface blockedType {
  email: string;
  time: number;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors},
  } = useForm<LoginType>({ mode: "onChange" });

  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("eyeOff");

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(0);
  const [blocked, setBlocked] = useState<blockedType[]>(() => {
    const storedBlocked = localStorage.getItem("blocked");
    return storedBlocked ? JSON.parse(storedBlocked) : ([] as blockedType[]);
  });
  const blockDuration = 60 * 1000;
  const email = watch("email");
  const [time, setTime] = useState(0);

  const rest = (time: number) => {
    return time + blockDuration - Date.now();
  };

  const checkBlocked = () => {
    if (blocked.length > 0) {
      for (let i = 0; i < blocked.length; i++) {
        if (blocked[i].email === email) {
          const restTime = rest(blocked[i].time);
          if (restTime <= 0) {
            setBlocked((prev) => prev.filter((u) => u.email !== email));
            localStorage.setItem("blocked", JSON.stringify([]));
            return false;
          }
          setTime(restTime > 0 ? restTime : 0);
          return true;
        }
      }
    }
    return false;
  };
    useEffect(() => {
      const storedBlocked = JSON.parse(localStorage.getItem("blocked") ?? "[]");
      const updatedBlocked = storedBlocked.filter((u: blockedType) => {
        return Number(u.time) + blockDuration > Date.now();
      });
      setBlocked(updatedBlocked);
      localStorage.setItem("blocked", JSON.stringify(updatedBlocked));
    }, []);

  const convertSecondsToTimes = (seconds: number): string => {
    seconds = Math.floor(seconds/1000); // Ensure `seconds` is an integer
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(secs).padStart(2, "0")
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };
  
  const onLogin = (data: LoginType) => {
    const { email, password } = data;
    if (checkBlocked()) {
      toast.dismiss();
      toast.error("user is block");
      return;
    }
    if (email && password) {
      setLoading(true);
      userService
        .login(email, password)
        .then((res) => {
          console.log(res.data);
          login(res.data);
          if (res) {
            setRejected(0);
            toast.success("Login successful");
            
            setTimeout(() => {
              navigate("/");
               window.location.reload();
            }, 1000);
          }
        })
        .catch((err) => {
          console.log("err" + err, "email" + email);
          setRejected((prev) => prev + 1);
          toast.dismiss();
          toast.error("Login failed!");
        })
        .finally(() => {
          setLoading(false);
        });
    }};
  useEffect(() => {
    if (rejected >= 3) {
      const currentTime = Date.now();
      const blockedUser = { email: email, time: currentTime };
      const updatedBlocked = [...blocked, blockedUser];
      setBlocked(updatedBlocked);
      localStorage.setItem("blocked", JSON.stringify(updatedBlocked));
      setTime(rest(blockedUser.time));
      toast.dismiss();
      toast.error(`You have been blocked `);
      setRejected(0);
    }
  }, [rejected]);
 useEffect(() => {
   const timer = setInterval(() => {
     setTime((prevTime) => prevTime - 1000);
   }, 1000);

   return () => clearInterval(timer); 
 }, []);
  return (
    <div className="h-screen d-flex flex-column gap-3  w-100 align-items-center">
      <h1 className="fw-bold fs-1 ">Login</h1>
      <form
        onSubmit={handleSubmit(onLogin)}
        className=" d-flex flex-column gap-3 md:w-1/5 w-1/2"
      >
        <input
          {...register("email", { required: true })}
          type="text"
          placeholder="Email"
          name="email"
          className="form-control"
        />
        {errors.email && <p className="text-danger">Email is required</p>}
        <div className="mb-4 flex">
          <input
            className="form-control relative "
            {...register("password", {
              required:true, 
            })}
            type={type}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="flex justify-around items-center"
            onClick={handleToggle}
          >
            {icon === eye ? (
              <Icon className="absolute mr-8 mb-1" icon={eye} size={20} />
            ) : (
              <Icon className="absolute mr-8 mb-1" icon={eyeOff} size={20} />
            )}
          </span>
        </div>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        {time > 0 &&  (
          <p className="text-danger">
            You are blocked for {convertSecondsToTimes(time)}
          </p>
        )}
        <button
          className="btn btn-primary"
          disabled={ loading}
          type="submit"
        >
          {loading ? <CircularProgress /> : "Login"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};
export default Login;
