import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerId = localStorage.getItem("customerId");
        const auth = localStorage.getItem("auth");
        const userObject = JSON.parse(auth);
        const key = userObject.token;
        const response = await fetch(
          `https://localhost:7157/api/Customer/ViewOrderHistoryForCustomer?customerId=${customerId}`,{
            headers: {
              Authorization: `Bearer ${key}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setOrders(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="customer-content">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {orders.length === 0 && !loading && !error && <p>No orders found.</p>}
      {orders.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>CustomerId</th>
              <th>RestaurantName</th>
              <th>MenuItemName</th>
              <th>Total Amount</th>
              <th>OrderDate</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerId}</td>
                <td>{order.restaurantName}</td>
                <td>{order.menuName[0].manuItemName}</td>
                <td>{order.menuName[0].quantity * order.price}</td>
                <td>{order.orderDate.substring(0, 10)}</td>
                {/* Add more cells with order details */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderHistory;
