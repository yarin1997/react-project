import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "../Register/Register.scss";
import userService from "../../services/user-service";
import { RegisterUser } from "../../@types/types";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useDate } from "../../contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css";

const updateUserSchema = z.object({
  name: z.object({
    first: z
      .string({ invalid_type_error: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(30, { message: "First name must be at most 30 characters long" }),
    middle: z.string().min(2).max(30).optional().or(z.literal("")),
    last: z
      .string({ invalid_type_error: "Last name is required" })
      . min(2, { message: "Last name must be at least 2 characters long" })
      .max(30, { message: "Last name must be at most 30 characters long" }),
  }),
  phone: z
    .string({ invalid_type_error: "Phone number is required" })
    .min(9, { message: "Phone number must be at least 9 characters long" })
    .max(11, { message: "Phone number must be at most 11 characters long" })
    .regex(/^\d+$/, "Phone number must contain only digits"),

  image: z.object({
    url: z
      .string({ invalid_type_error: "Image URL is required" })
      .min(14, { message: "URL must be at least 14 characters long" }),
    alt: z
      .string({ invalid_type_error: "Image alt text is required" })
      .min(2, { message: "Alt text must be at least 2 characters long" })
      .max(256, { message: "Alt text must be at most 256 characters long" }),
  }),
  address: z.object({
    state: z.string().min(2).max(30).optional(),
    country: z
      .string({ invalid_type_error: "Country is required" })
      .min(2, { message: "Country must be at least 2 characters long" })
      .max(30, { message: "Country must be at most 30 characters long" }),
    city: z
      .string({ invalid_type_error: "City is required" })
      .min(2, { message: "City must be at least 2 characters long" })
      .max(30, { message: "City must be at most 30 characters long" }),
    street: z
      .string({ invalid_type_error: "Street is required" })
      .min(2, { message: "Street must be at least 2 characters long" })
      .max(50, { message: "Street must be at most 50 characters long" }),
    houseNumber: z
      .number({ invalid_type_error: "House number is required" })
      .min(1, { message: "House number must be at least 1 characters long" })
      .max(9999, {
        message: "House number must be at most 4 characters long",
      }),
    zip: z
      .number({ invalid_type_error: "ZIP code is required" })
      .min(10, { message: "ZIP code must be at least 2 characters long" })
      
  }),
});

export type FormData = z.infer<typeof updateUserSchema>;
const UpdateUser = () => {
   const [inputValue, setInputValue] = useState<RegisterUser>(
     {} as RegisterUser
   );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(updateUserSchema),
    mode: "all",
    
  });
  const navigate = useNavigate();
  const { token, _id } = useContext(AuthContext);
 const {theme}=useDate()
   const [loading, setLoading] = useState(false);
   const [generalError, setGeneralError] = useState("");
    

  useEffect(() => {
    if (!_id) return;

    userService.getUser(_id, token)
    .then((res) => {
      setInputValue(res.data);
      reset(res.data);
    });
  }, [_id, token, reset]);


  const onSubmit = (data: FormData) => {
   setLoading(true);
    userService
      .update_User(token, _id, data)
      .then((res) => {
        toast.success("User updated successfully");
        console.log(res);
        setTimeout(() => {
           navigate("/");
        },1500)
      })
      .catch((err) => {
        console.log(err);
        setGeneralError("An error occurred while updating the user. Please try again.");
      })
      .finally(() => setLoading(false))
      
  };

  return (
      <form
    className={`flex flex-col justify-center items-center gap-3${theme === "dark" ? " bg-gray-800 text-white" : " bg-white text-gray-800"} text-2xl`}
    onSubmit={handleSubmit(onSubmit)}
  >
    <h1 className="text-3xl">Update User</h1>
    <div className="formContainer">
      <div className="flex flex-col mb-3">
        <label className="text-center">First Name *</label>
        <input
          {...register("name.first")}
          type="text"
          placeholder="First Name *"
          className="form-control"
          defaultValue={inputValue.name?.first}
        />
        {errors.name?.first && (
          <p className="text-danger">{errors.name?.first.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">Middle Name</label>
        <input
          {...register("name.middle")}
          type="text"
          placeholder="Middle Name"
          className="form-control"
          defaultValue={inputValue.name?.middle}
        />
        {errors.name?.middle && (
          <p className="text-danger">{errors.name?.middle.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">Last Name *</label>
        <input
          {...register("name.last")}
          type="text"
          placeholder="Last Name *"
          className="form-control"
          defaultValue={inputValue.name?.last}
        />
        {errors.name?.last && (
          <p className="text-danger">{errors.name?.last.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">Phone Number *</label>
        <input
          {...register("phone")}
          type="text"
          placeholder="Phone Number *"
          className="form-control"
          defaultValue={inputValue.phone}
        />
        {errors.phone && (
          <p className="text-danger">{errors.phone.message}</p>
        )}
      </div>
    </div>
    <div className="mt-8 formContainer">
      <div className="flex flex-col mb-3">
        <label className="text-center">Img-Url</label>
        <input
          {...register("image.url")}
          type="text"
          placeholder="Img-Url"
          className="form-control"
          defaultValue={inputValue.image?.url}
        />
        {errors.image?.url && (
          <p className="text-danger">{errors.image?.url.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">Img-Alt</label>
        <input
          {...register("image.alt")}
          type="text"
          placeholder="Img-Alt"
          className="form-control"
          defaultValue={inputValue.image?.alt}
        />
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">State</label>
        <input
          {...register("address.state")}
          type="text"
          placeholder="State"
          className="form-control"
          defaultValue={inputValue.address?.state}
        />
        {errors.address?.state && (
          <p className="text-danger">{errors.address?.state.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">Country *</label>
        <input
          {...register("address.country")}
          type="text"
          placeholder="Country *"
          className="form-control"
          defaultValue={inputValue.address?.country}
        />
        {errors.address?.country && (
          <p className="text-danger">{errors.address?.country.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">City *</label>
        <input
          {...register("address.city")}
          type="text"
          placeholder="City *"
          className="form-control"
          defaultValue={inputValue.address?.city}
        />
        {errors.address?.city && (
          <p className="text-danger">{errors.address?.city.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">Street *</label>
        <input
          {...register("address.street")}
          type="text"
          placeholder="Street *"
          className="form-control"
          defaultValue={inputValue.address?.street}
        />
        {errors.address?.street && (
          <p className="text-danger">{errors.address?.street.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">House Number *</label>
        <input
          {...register("address.houseNumber", { valueAsNumber: true })}
          type="text"
          placeholder="House Number *"
          className="form-control"
          defaultValue={inputValue.address?.houseNumber}
        />
        {errors.address?.houseNumber && (
          <p className="text-danger">{errors.address?.houseNumber.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-center">Zip Code</label>
        <input
          {...register("address.zip", { valueAsNumber: true })}
          type="text"
          placeholder="Zip Code"
          className="form-control"
          defaultValue={inputValue.address?.zip}
        />
        {errors.address?.zip && (
          <p className="text-danger">{errors.address?.zip.message}</p>
        )}
      </div>
    </div>
    <button
      type="submit"
      disabled={!isValid || loading}
      className="btn btn-primary"
    >
      {loading ? <CircularProgress /> : "Update"}
    </button>
    {generalError && <p className="text-danger">{generalError}</p>}
    <ToastContainer />
  </form>

  );
};

export default UpdateUser;
