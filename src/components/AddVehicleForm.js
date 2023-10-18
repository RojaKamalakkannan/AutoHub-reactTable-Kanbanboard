import React,{useState, useEffect} from 'react';
import Modal from 'react-modal';

const AddVehicleForm = ({veachileVar,setFormVisible, getdata, addNewVehicle}) => {


  // const [addVehicle, setAddVehicle] = useState();
  // const [state, setState] = useState(false)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    images: "",
    status: "AVAILABLE", 
    isFavorite: false, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    // setState(!state)
    console.log("render check")
    e.preventDefault();
   
    const newVehicle = {
      ...formData,
      vehicleid: Date.now(), 
    };
      const resp = JSON.parse(localStorage.getItem("vehicleData")) !== null ? JSON.parse(localStorage.getItem("vehicleData"))  : ""
    
      const vehicle = [...resp]
      vehicle.push(newVehicle)

      console.log("vehicle",JSON.stringify(vehicle))
      localStorage.setItem("vehicleData", JSON.stringify(vehicle))
    
    setFormData({
      make: "",
      model: "",
      year: "",
      mileage: "",
      price: "",
      images: "",
      status: "AVAILABLE",
      isFavorite: false,
    });

    const response = localStorage.getItem("vehicleData")
    // getdata(response)

    addNewVehicle(newVehicle);
  };

  // useEffect(()=>{
  //   const res= localStorage.getItem("vehicleData")
  //   getdata(res)
  // },[state])

  // useEffect(()=>{
  //   localStorage.clear()
  // },[])

  return (
    <Modal
    isOpen={veachileVar}
    onRequestClose={()=>setFormVisible(false)}
    style={customStyles}
    contentLabel="Vehicle Modal"
  >
    <form className='px-5 py-2' onSubmit={handleSubmit}>
      <h1 className="text-center bg-blue-250 p-4">FORM FOR ADD NEW VECHILE</h1>
      <div className="mb-4">
        <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make:</label>
        <input className="border-2 border-blue-300 p-1 w-full rounded-md focus:outline-none focus:border-blue-500"
        id="make"
        type="text"
        name="make"
        value={formData.make}
        // value = "suzuki"
        onChange={handleChange}
        required
      />
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model:</label>
        <input className="border-2 border-blue-300 p-1 w-full rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="model"
          value={formData.model}
          // value = "s1"
          onChange={handleChange}
          required
         
        />
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year:</label>
        <input  className="border-2 border-blue-300 p-1 w-full rounded-md focus:outline-none focus:border-blue-500"
          type="number"
          name="year"
          value={formData.year}
          // value = "2023"
          onChange={handleChange}
          required

        />
      </div>
      <div className="mb-4">
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage:</label>
        <input  className="border-2 border-blue-300 p-1 w-full rounded-md focus:outline-none focus:border-blue-500"
          type="number"
          name="mileage"
          value={formData.mileage}
          // value = "202344"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
        <input  className="border-2 border-blue-300 p-1 w-full rounded-md focus:outline-none focus:border-blue-500"
          type="number"
          name="price"
          value={formData.price}
          // value = "5000000"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4"> 
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images URL:</label>
        <input  className="border-2 border-blue-300 p-1 w-full rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="images"
          value={formData.images}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="SOLD">SOLD</option>
          <option value="BLOCKED">BLOCKED</option>
        </select>
      </div>

      <div className="mb-4">
        <button  type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-4 focus:ring-blue-300"
         onClick={(e)=>handleSubmit(e)}>Add Car</button>
      </div>
    </form>
    </Modal>
  
  );
};
const customStyles = {
  content: {
    top: '50%',      
    left: '50%',   
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',  
    width: '400px', 
    maxHeight: '160vh', 
    border: '1px solid #ccc', 
    borderRadius: '4px',       
    padding: '20px',          
    backgroundColor: 'white', 
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',  
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
};



   
export default AddVehicleForm
