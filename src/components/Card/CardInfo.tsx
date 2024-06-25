import { useLocation } from 'react-router-dom';
import { useDate } from '../../contexts/ThemeContext';
import './Card.scss'
const CardInfo = () => {
   const { VITE_GOOGLE_MAPS_API_KEY: KEY } = import.meta.env;
    const location = useLocation();
    const data = location.state;
    const {theme}=useDate()
 return (
   <div
     className={`text-center gap-2 d-flex flex-column justift-content-center align-items-center ${
       theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
     }`}
     key={data._id}
   >
     <img
       src={data.key.image.url}
       alt={data.key.image.alt}
       className="w-2/3 m-auto rounded-md mt-2 md:w-1/3"
     />
     <div className="d-flex flex-column gap-2 align-items-start text-left">
       <h1>
         <span>Title:</span> {data.key.title}
       </h1>
       <h2 >
         <span>Subtitle:</span> {data.key.subtitle}
       </h2>
       <p>
         <span>Description: </span>
         {data.key.description}
       </p>
       <p>
         <span>Phone:</span> {data.key.phone}
       </p>
       <p>
         <span>Email: </span>
         {data.key.email}
       </p>
       {data.key.web && (
         <a href={data.key.web} target="_blank" className="text-primary">
           {data.key.web}
         </a>
       )}
       <div>
         {data.key.address.state && <p>State: {data.key.address.state}</p>}
         <p>
           <span>Country:</span> {data.key.address.country}
         </p>
         <p>
           <span>City: </span>
           {data.key.address.city}
         </p>
         <p>
           <span> Street:</span> {data.key.address.street},{" "}
           {data.key.address.houseNumber}
         </p>
         <p>
           <span>ZipCode:</span> {data.key.address.zip}
         </p>
       </div>
     </div>
     <iframe
       className={`w-3/4 md:w-1/3 m-auto rounded-lg mb-2`}
       referrerPolicy="no-referrer-when-downgrade"
       allowFullScreen
       loading="lazy"
       src={`
                https://www.google.com/maps/embed/v1/place?key=${KEY}
                &q=${data?.key.address?.street}+${data.key.address?.city}+${data?.key.address?.state}
              `}
     />
   </div>
 );

}

export default CardInfo