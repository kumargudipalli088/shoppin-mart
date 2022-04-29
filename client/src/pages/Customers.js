
import Default_layout from '../Components/defalt_layout'
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  Table } from "antd";

function Customers() {
  const componentRef = useRef();
const [billsData, setBillsData] = useState([]);

const dispatch = useDispatch();
const getAllBills = () => {
  // dispatch({ type: "showLoading" });
  axios
    .get("/api/bills/allbills")
    .then((response) => {
      // dispatch({ type: "hideLoading" });
      const data = response.data
      data.reverse()
      setBillsData(data);
    })
    .catch((error) => {
      // dispatch({ type: "hideLoading" });
      console.log(error);
    });
};

const columns = [
  {
    title: "Customername",
    dataIndex: "Customername",
   
  },
  {
 title:'customerPhoneNumber',
 dataIndex:'customerPhoneNumber'
  },
  {
    title: "Created On",
    dataIndex: "createdAt",
    render :(value)=><span>{value.toString().substring(0,10)}</span>
  },
 
  
];


useEffect(() => {
  getAllBills();
}, []);


return (
  <Default_layout>
    <div className="d-flex justify-content-between">
      <h3>Customers</h3>
    </div>
    <Table columns={columns} dataSource={billsData}   pagination={false} />
  </Default_layout>
)
}

export default Customers