import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const pdfRef = useRef();

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) setOrders(data.orders);
      else toast.error(data.message);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // PDF download
  const downloadPDF = async () => {
    if (!pdfRef.current) {
      toast.error("No table to export");
      return;
    }

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      await new Promise((r) => setTimeout(r, 500));

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `Orders_${new Date().toISOString().slice(0, 10)}.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);

      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("PDF generation failed!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders Table</h2>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* Table to export */}
      <div
        ref={pdfRef}
        className="bg-white rounded-md shadow-md p-4 overflow-x-auto"
      >
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Address & Mobile</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No orders available
                </td>
              </tr>
            ) : (
              orders.map((order, index) => {
                const date = new Date(order.createdAt);
                return (
                  <tr key={index}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">
                      {order.items.map((item, i) => (
                        <div key={i}>
                          {item.product.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="border p-2">
                      {order.address.firstName} {order.address.lastName}
                    </td>
                    <td className="border p-2">
                      <div>
                        {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}
                      </div>
                      <div className="text-sm text-gray-600">
                        Mobile: {order.address.phone}
                      </div>
                    </td>
                    <td className="border p-2 text-right">
                      {currency}
                      {order.amount}
                    </td>
                    <td className="border p-2 text-center">
                      {order.isPaid ? "Paid" : "Pending"} ({order.paymentType})
                    </td>
                    <td className="border p-2 text-center">
                      <div>{date.toLocaleDateString("en-US")}</div>
                      <div className="text-sm text-gray-600">{date.toLocaleTimeString("en-US")}</div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
