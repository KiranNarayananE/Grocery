import React, { useState } from "react";
import axiosInstance from "../../../Axios/axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Addproduct() {

    const initialProduct = {
        name: "",
        category: "",
        quantity: "",
        price:"",
        image: "",
      };
    
      const [product, setProduct] = useState({ ...initialProduct });
      const [imagePreview, setImagePreview] = useState(null);
      const [loading, setLoading] = useState(false);
      const token = useSelector((store) => store.Admin.Token);
      const navigate = useNavigate();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImagePreview(reader.result);
            setProduct({ ...product, image: reader.result });
          };
          reader.readAsDataURL(file);
        }
      };
    
      const handleAddProduct = () => {
        if(loading){
          console.log("sd")
          return
        }
        if (!product.name || !product.category || !product.quantity || !product.image  || !product.price) {
          Toast.fire({
            icon: "error",
            title: "Please fill all details",
          })
          return;
        }
        
        try {
            setLoading(true)
          axiosInstance.post("/products", {...product,imagePreview},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
              setLoading(false)
              if (response.status === 202) {
                Toast.fire({
                  icon: "error",
                  title: "Product already exist",
                })
                return;
                }else {
                  
                    Toast.fire({
                        icon: "success",
                        title: "Product Added Successfully",
                      })
                      setProduct({initialProduct });
                      setImagePreview(null);
                }
                
          });
          
        } catch (error) {
          navigate("/error")
        }
        
      };
    
      return (
        <div className="min-h-screen bg-gray-100 p-4 w-screen ">
        <fieldset className="flex justify-between items-center rounded-md shadow-sm bg-regal-blue h-20 ">
        <div className="space-y-2 col-span-full lg:col-span-1 flex items-center justify-start ml-4 text-center ">
          <p className="font-extrabold text-lg text-real-orange w-[300px]">
            ADD PRODUCT
          </p>
        </div>
        
      </fieldset>
        <div className="flex justify-center items-center mt-3 ">
          <div className="w-full md:w-2/4 bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none   focus:ring-2 focus:ring-black "
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleChange}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2  focus:ring-black"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={product.quantity}
              onChange={handleChange}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2  focus:ring-black"
            />
            <input
              type="number"
              name="price"
              placeholder="Price per quantity"
              value={product.price}
              onChange={handleChange}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2  focus:ring-black"
            />
            <label className="block mb-2 text-gray-700">Product Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="max-h-40 mx-auto mb-4 h-40 w-40 hover:rounded-full  hover:scale-110 hover:shadow-md transition-all duration-300 ease-in-out"
              />
            )}
            <button
              onClick={handleAddProduct}
              className="bg-gray-900 text-white px-4 py-3 mt-4 rounded-lg hover:bg-black w-full focus:outline-none focus:ring-2  focus:ring-black hover:scale-103 transform transition-transform duration-300 ease-in-out"
            >
              Add Product
            </button>
          </div>
        </div>
       
      </div>
  
      );
    }
    

export default Addproduct;
