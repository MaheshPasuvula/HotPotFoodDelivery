import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PaymentsByRestaurant.css";
import axios from "axios";
const PaymentsByRestaurant = () => {
  const { restaurantId } = useParams();
  const [payments, setPaymentsbyrestaurant] = useState([]);
  useEffect(() => {
    const fetchPaymentsByRestaurant = async () => {
      try {
        const auth = localStorage.getItem("auth");
        const userObject = JSON.parse(auth);
        const key = userObject.token;
        const response = await axios.get(
          `https://localhost:7157/api/Restaurant/GetAllPaymentsByRestaurants?restaurantId=${restaurantId}`,{
            headers: {
              Authorization: `Bearer ${key}`,
            },
          }
        );
        setPaymentsbyrestaurant(response.data);
      } catch (error) {
        console.error("Error while fetching payments", error);
      }
    };
    if (restaurantId) {
      // setNewMenuByRestaurant(prevState => ({ ...prevState, restaurantId }));
      fetchPaymentsByRestaurant();
    } else {
      console.error("Restaurant ID is missing in URL parameters");
    }
  }, [restaurantId]);
  return (
    <div className="container">
      <h2>Payments</h2>
      <table>
        <thead>
          <tr>
            <th>PaymentID</th>
            <th>Payment Mode</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Order Id</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.paymentMode}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
              <td>{payment.date}</td>
              <td>{payment.orderId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsByRestaurant;
