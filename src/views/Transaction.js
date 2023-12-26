// id, public Long phoneNumber; public String address; public String message;
import axios from 'axios';
import Joi from 'joi';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../components/layout/AlertMessage';

const Transaction = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    message: '',
  });

  const location = useLocation();
  let { state } = useLocation();

  useEffect(() => {
    console.log("State in TX: ", state);
  }, [state])
  const productInfo = location.state?.productInfo;

  console.log("Product Information: " + productInfo)

  let { transactionId } = useParams();
  console.log('Transaction ID:', transactionId);

  const [alert, setAlert] = useState(null);
  const navigate = useNavigate(); 

  const schema = Joi.object({
    phoneNumber: Joi.string().pattern(/^\d+$/).required(),
    address: Joi.string().required(),
    message: Joi.string(),
  })

  const getJoiErrorMessage = (error) => {
    return error.details.map((detail) => detail.message).join('. ');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createTransaction = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData);
    if (error) {
      const errorMessage = getJoiErrorMessage(error);
      console.error(error.details);
      setAlert({ type: 'danger', message: errorMessage });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    try {
      console.log('id: ' + transactionId)
      const response = await axios.post(`http://localhost:8080/api/transaction/create/${transactionId}`, formData);
      console.log('Response from server:', response.data);
      if (!response.data.success) {
        console.log('Transaction failed:', response.data.message);
      } else {
        console.log('Transaction succeeded:', response.data.details);
        navigate('/myBuyTransaction');
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error sending request:', error);
    }
  };

  return (
    <div>
      <h2>Product info</h2>
      <h4>Id: {productInfo.id}</h4>
      <h4>Name: {productInfo.name}</h4>
      <h4>Price: {productInfo.price}</h4>
      <h4>Description: {productInfo.description}</h4>
      <h4>ImageUrl: {productInfo.imageUrl}</h4>
      <h4>Seller name: {productInfo.sellerName}</h4>
      <h2>Create transaction</h2>
      <form onSubmit={createTransaction}>
        <AlertMessage info={alert} />
        <div>
          <label htmlFor="phoneNumber">Phone:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Transaction;
