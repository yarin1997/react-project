import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues } from "react-hook-form";
import './Register.scss'
import userService from '../../services/user-service';
import { RegisterUser } from '../../@types/types';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

 const registerUserSchema = z.object({
   name: z.object({
     first: z
       .string({ invalid_type_error: "First name is required" })
       .min(2, { message: "First name must be at least 2 characters long" }),
     middle: z.string().optional(),
     last: z
       .string({ invalid_type_error: "Last name is required" })
       .min(2, { message: "Last name must be at least 2 characters long" }),
   }),
   phone: z
     .string({ invalid_type_error: "Phone number is required" })
     .regex(/^\d+$/, "Phone number must contain only digits"),
   email: z
     .string({ invalid_type_error: "Email is required" })
     .email({ message: "Invalid email address" }),
   password: z
     .string()
     .min(8, {
       message: "Password must be at least 8 characters long",
     })
     .max(20, {
       message: "Password must be at most 20 characters long",
     })
     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){3,})(?=.*[)!@%$#^&*-_]).{8,}$/, {
       message:
         "Password must include at least one lowercase letter, one uppercase letter, four digits, and one special character (!@%$#^&*-_)",
     }),
   image: z
     .object({
       url: z.string().url("Invalid URL").or(z.literal("")),
       alt: z.string().optional(),
     })
     .optional(),
   address: z.object({
     state: z.string().optional(),
     country: z.string({ invalid_type_error: "Country is required" }),
     city: z.string({ invalid_type_error: "City is required" }),
     street: z.string({ invalid_type_error: "Street is required" }),
     houseNumber: z
       .number({ invalid_type_error: "House number is required" })
       .nonnegative("House number must be non-negative"),
     zip: z.number().nonnegative("ZIP code must be non-negative"),
   }),
   isBusiness: z.boolean(),
 });

type ForrmData = z.infer<typeof registerUserSchema>;

const Register = () => {
   const {
     register,
     handleSubmit,
     formState: { errors, isValid },
   } = useForm<ForrmData>({
     resolver: zodResolver(registerUserSchema),
     mode: "onChange",
   });

   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const onSubmit = (data:RegisterUser) => {
    setLoading(true);
  userService.register(data).then(res=>
    {
    console.log(res)
    toast.success("User registered successfully")
    setTimeout(()=>{navigate("/login")},1500)
    // במידה והוא הצליח לעשות ולידציה
  }
).catch(err=>{
  console.log(err)
  toast.error("User registered failed");
  // במידה והוא נכשל
})
.finally(()=>{
  setLoading(false)
})
   };
   console.log(isValid)
  return (
    <div>
      <h1 className="text-3xl mb-4 text-center fw-bold">
        Register
        </h1>
      <form
        className="flex flex-col justify-center gap-2 items-center h-fit-content formcontainer"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="formContainer">
          <div className="d-flex flex-column ">
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              {...register("name.first")}
              type="text"
              placeholder="First Name *"
              className="form-control"
            />
            {errors.name?.first && (
              <p className="text-danger">{errors.name?.first.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="middleName">Middle Name</label>
            <input
              id="middleName"
              {...register("name.middle")}
              type="text"
              placeholder="Middle Name"
              className="form-control"
            />
            {errors.name?.middle && (
              <p className="text-danger">{errors.name?.middle.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              {...register("name.last")}
              type="text"
              placeholder="Last Name *"
              className="form-control"
            />
            {errors.name?.last && (
              <p className="text-danger">{errors.name?.last.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Email *"
              className="form-control"
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              {...register("password")}
              type="password"
              placeholder="Password *"
              className="form-control"
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              {...register("phone")}
              type="text"
              placeholder="Phone Number *"
              className="form-control"
            />
            {errors.phone && (
              <p className="text-danger">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className=" formContainer">
          <div className="d-flex flex-column ">
            <label htmlFor="imgUrl">Img-Url</label>
            <input
              id="imgUrl"
              {...register("image.url")}
              type="text"
              placeholder="Img-Url"
              className="form-control"
            />
            {errors.image?.url && (
              <p className="text-danger">{errors.image?.url.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="imgAlt">Img-Alt</label>
            <input
              id="imgAlt"
              {...register("image.alt")}
              type="text"
              placeholder="Img-Alt"
              className="form-control"
            />
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="state">State</label>
            <input
              id="state"
              {...register("address.state")}
              type="text"
              placeholder="State"
              className="form-control"
            />
            {errors.address?.state && (
              <p className="text-danger">{errors.address?.state.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="country">Country *</label>
            <input
              id="country"
              {...register("address.country")}
              type="text"
              placeholder="Country *"
              className="form-control"
            />
            {errors.address?.country && (
              <p className="text-danger">{errors.address?.country.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="city">City *</label>
            <input
              id="city"
              {...register("address.city")}
              type="text"
              placeholder="City *"
              className="form-control"
            />
            {errors.address?.city && (
              <p className="text-danger">{errors.address?.city.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="street">Street *</label>
            <input
              id="street"
              {...register("address.street")}
              type="text"
              placeholder="Street *"
              className="form-control"
            />
            {errors.address?.street && (
              <p className="text-danger">{errors.address?.street.message}</p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="houseNumber">House Number *</label>
            <input
              id="houseNumber"
              {...register("address.houseNumber", { valueAsNumber: true })}
              type="text"
              placeholder="House Number *"
              className="form-control"
            />
            {errors.address?.houseNumber && (
              <p className="text-danger">
                {errors.address?.houseNumber.message}
              </p>
            )}
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="zip">Zip Code</label>
            <input
              id="zip"
              {...register("address.zip", { valueAsNumber: true })}
              type="text"
              placeholder="Zip Code"
              className="form-control"
            />
            {errors.address?.zip && (
              <p className="text-danger">{errors.address?.zip.message}</p>
            )}
          </div>
          <div className="d-flex flex-column mb-3">
            <label>
              <input {...register("isBusiness")} type="checkbox" />
              Business Account
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid || loading}
          className="btn btn-primary"
        >
          {loading ? <CircularProgress color="secondary" /> : "Register"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Register