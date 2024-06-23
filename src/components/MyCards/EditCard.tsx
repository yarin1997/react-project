import  { useContext, useEffect, useState } from 'react'
import { schema, FormData } from '../CreateNewCard/CreateCard'
import cardsService from '../../services/cards-service'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditCard = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        resolver: zodResolver(schema),
    })
    const {token}=useContext(AuthContext)
    const location = useLocation();
     const navigate = useNavigate();
    const data = location.state;
    const cardId = data.key._id
  
 const [loading, setLoading] = useState(false);
 const [generalError, setGeneralError] = useState("");

 const onSubmit = (data: FormData) => {
   setLoading(true);
   setGeneralError("");
   cardsService
     .updateCard(cardId, data, token)
     .then((res) => {
       console.log(res);
       toast.success("Card updated successfully");
       setTimeout(() => {
         navigate("/myCards");
       }, 1500);
       
     })
     .catch((err) => {
       setGeneralError(
         "An error occurred while updating the card. Please try again."
       );
         toast.success("Card updated failed");
     })
     .finally(() => setLoading(false));
 };
  return (
    <div className="container">
      <h1>Update Card</h1>
      {generalError && <p className="error-message">{generalError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title</label>
          <input
            {...register("title")}
            className="form-control"
            defaultValue={data.key.title}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input
            {...register("subtitle")}
            className="form-control"
            defaultValue={data.key.subtitle}
          />
          {errors.subtitle && (
            <p className="text-danger"> {errors.subtitle.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            {...register("description")}
            className="form-control"
            defaultValue={data.key.description}
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            {...register("phone")}
            className="form-control"
            defaultValue={data.key.phone}
          />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            {...register("email")}
            className="form-control"
            defaultValue={data.key.email}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Web</label>
          <input
            {...register("web")}
            className="form-control"
            defaultValue={data.key.web}
          />
          {errors.web && <p className="text-danger">{errors.web.message}</p>}
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            {...register("image.url")}
            className="form-control"
            defaultValue={data.key.image.url}
          />
          {errors.image?.url && (
            <p className="text-danger">{errors.image.url.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Image Alt</label>
          <input
            {...register("image.alt")}
            className="form-control"
            defaultValue={data.key.image.alt}
          />
          {errors.image?.alt && (
            <p className="text-danger">{errors.image.alt.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            {...register("address.state")}
            className="form-control"
            defaultValue={data.key.address.state}
          />
          {errors.address?.state && (
            <p className="text-danger">{errors.address.state.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            {...register("address.country")}
            className="form-control"
            defaultValue={data.key.address.country}
          />
          {errors.address?.country && (
            <p className="text-danger">{errors.address.country.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            {...register("address.city")}
            className="form-control"
            defaultValue={data.key.address.city}
          />
          {errors.address?.city && (
            <p className="text-danger">{errors.address.city.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Street</label>
          <input
            {...register("address.street")}
            className="form-control"
            defaultValue={data.key.address.street}
          />
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
            defaultValue={data.key.address.houseNumber}
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
            defaultValue={data.key.address.zip}
          />
          {errors.address?.zip && (
            <p className="text-danger">{errors.address.zip.message}</p>
          )}
        </div>

        <button
          disabled={!isValid || loading}
          type="submit"
          className="btn btn-primary"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default EditCard