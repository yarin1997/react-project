import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import cardsService from "../../services/cards-service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
export const schema = z.object({
  title: z
    .string({ invalid_type_error: "Title is required" })
    .min(2, { message: "Title must be at least 2 characters" })
    .max(256, { message: "Title must be at most 256 characters" })
   ,
  subtitle: z
    .string({ invalid_type_error: "Subtitle is required" })
    .min(2, { message: "Subtitle must be at least 2 characters" })
    .max(256, { message: "Subtitle must be at most 256 characters" })
    ,
  description: z
    .string({ invalid_type_error: "Description is required" })
    .min(2, { message: "Description must be at least 2 characters" })
    .max(1024, { message: "Description must be at most 1024 characters" })
    ,
  phone: z
    .string({ invalid_type_error: "Phone number is required" })
    .min(9, { message: "Phone must be at least 9 characters" })
    .max(11, { message: "Phone must be at most 11 characters" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    ,
  email: z
    .string({ invalid_type_error: "Email is required" })
    .min(5, { message: "Email must be at least 5 characters" })
    .email({ message: "Invalid email" }),
 web: z
    .string().optional().refine(
      (value) => !value || value.length >= 14,
      {
        message: "Web URL must be at least 14 characters",
      }
    ).refine(
      (value) => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value),
      {
        message: "Invalid URL",
      }
    ),
  image: z
    .object({
      url: z
        .string({ invalid_type_error: "Invalid URL" })
        .url({ message: "cant be empty" })
        .min(14, { message: "Image URL must be at least 14 characters" })
        ,
      alt: z
        .string()
        .min(2, { message: "Alt must be at least 2 characters" })
        .max(256, { message: "Alt must be at most 256 characters" })
      
    })
    ,
  address: z
    .object({
      state: z.string().optional(),
      country: z .string({ invalid_type_error: "Country is required" }),
      city: z .string({ invalid_type_error: "City is required" }),
      street: z .string({ invalid_type_error: "Street is required" }),
      houseNumber: z  .string({ invalid_type_error: "House number is required" })
        .min(1, { message: "House number must be at least 1" }),
      zip: z.string().optional(),
    })
   
});
export type FormData = z.infer<typeof schema>;

const CreateCard= () => {
  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode:"onChange"
  });
  const{token}=useContext(AuthContext)
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const onSubmit = (data: FormData) => {
    setLoading(true);
   cardsService.addCard(data,token).then(res=>{
console.log(res)
toast.success("Card created successfully")
setTimeout(()=>{navigate("/myCards")},1500)
   })
   .catch(err=>{
    toast.error("Card created failed")
    console.log(err)
  })
  .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <h1 className="text-center p-2">Create Card</h1>
      <form
        className="grid md:grid-cols-2  gap-2 w-3/5 text-center m-auto grid-cols-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group">
          <label>Title</label>
          <input {...register("title")} className="form-control" />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input {...register("subtitle")} className="form-control" />
          {errors.subtitle && (
            <p className="text-danger">{errors.subtitle.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea {...register("description")} className="form-control" />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input {...register("phone")} className="form-control" />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input {...register("email")} className="form-control" />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Web</label>
          <input {...register("web")} className="form-control" />
          {errors.web && <p className="text-danger">{errors.web.message}</p>}
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input {...register("image.url")} className="form-control" />
          {errors.image?.url && (
            <p className="text-danger">{errors.image.url.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Image Alt</label>
          <input {...register("image.alt")} className="form-control" />
          {errors.image?.alt && (
            <p className="text-danger">{errors.image.alt.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>State</label>
          <input {...register("address.state")} className="form-control" />
          {errors.address?.state && (
            <p className="text-danger">{errors.address.state.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Country</label>
          <input {...register("address.country")} className="form-control" />
          {errors.address?.country && (
            <p className="text-danger">{errors.address.country.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>City</label>
          <input {...register("address.city")} className="form-control" />
          {errors.address?.city && (
            <p className="text-danger">{errors.address.city.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Street</label>
          <input {...register("address.street")} className="form-control" />
          {errors.address?.street && (
            <p className="text-danger">{errors.address.street.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>House Number</label>
          <input
            type="number"
            {...register("address.houseNumber")}
            className="form-control"
          />
          {errors.address?.houseNumber && (
            <p className="text-danger">{errors.address.houseNumber.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Zip</label>
          <input
            type="number"
            {...register("address.zip")}
            className="form-control"
          />
          {errors.address?.zip && (
            <p className="text-danger">{errors.address.zip.message}</p>
          )}
        </div>

        <button disabled={!isValid || loading} type="submit" className="btn btn-primary">
         {loading? <CircularProgress/>: 'Submit'}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default CreateCard;
