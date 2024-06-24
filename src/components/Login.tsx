import { FieldValues, useForm } from "react-hook-form";
import userService from "../services/user-service";
import { ErrorInfo, useState,useEffect } from "react";
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
    formState: { errors, isValid },
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
  const [error, setError] = useState<string | null>(null);
  const [rejected, setRejected] = useState(0);
  const [blocked, setBlocked] = useState<blockedType[]>(() => {
    const storedBlocked = localStorage.getItem("blocked");
    return storedBlocked ? JSON.parse(storedBlocked) : ([] as blockedType[]);
  });
  const blockDuration = 60*1000 ;
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
          setTime(restTime > 0 ? restTime : 0);
          return true;
        }
      }
    }
    return false;
  };

  const convertSecondsToTimes = (seconds: number): string => {
    seconds=seconds/1000;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(secs).padStart(2, "0");
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  const onLogin = (data: LoginType) => {
    const { email, password } = data;
   if (checkBlocked()) {
     toast.error("user is block");
      return;
    }
    if (email && password) {
      setLoading(true);
      setError(null);
      userService
        .login(email, password)
        .then((res) => {
          login(res.data);
          if (res) {
            setRejected(0);
            toast.success("Login successful");
            setTimeout(() => {
              navigate("/");
            }, 1000);
            console.log(res.data);
          }
        })
        .catch((err) => {
          setError(err);
          console.log("err" + err, "email" + email);
          setRejected((prev) => prev + 1);
          toast.error("Login failed!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (rejected >= 3) {
      const currentTime = Date.now();
      const blockedUser = { email: email, time: currentTime };
      const updatedBlocked = [...blocked, blockedUser];
      setBlocked(updatedBlocked);
      localStorage.setItem("blocked", JSON.stringify(updatedBlocked));
      toast.error("You have been blocked for 15 seconds");
      setRejected(0);
    }
  }, [rejected]);

  useEffect(() => {
    const storedBlocked = JSON.parse(localStorage.getItem("blocked") ?? "[]");
    const updatedBlocked = storedBlocked.filter((u: blockedType) => {
      console.log(u);
      return Number(u.time)+blockDuration > Date.now();
    });
    setBlocked(updatedBlocked);
    console.log(updatedBlocked);
    localStorage.setItem("blocked", JSON.stringify(updatedBlocked));
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
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){3,})(?=.*[)!@%$#^&*-_]).{8,}$/,
                message:
                  "Password must include at least one lowercase letter, one uppercase letter, four digits, and one special character (!@%$#^&*-_)",
              },
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
              <Icon className="absolute mr-6" icon={eye} size={20} />
            ) : (
              <Icon className="absolute mr-6" icon={eyeOff} size={20} />
            )}
          </span>
        </div>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        {time > 0 && (
          <p className="text-danger">
            You are blocked for {convertSecondsToTimes(time)}
          </p>
        )}
        <button
          className="btn btn-primary"
          disabled={!isValid  || loading}
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
