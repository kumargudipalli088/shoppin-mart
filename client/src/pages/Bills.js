import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import Default_layout from "../Components/defalt_layout"
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Form, Input, message, Modal, Select, Table } from 'antd';
import { Button } from 'antd'
import { useReactToPrint } from 'react-to-print';

function  Bills() {
  const componentRef = useRef();
  const [bills, setBills] =  useState([])
  const [selectedBill, setSelectedBill] = useState(null);
   const [printBill, setPrintBill] = useState(false)
  const dispatch = useDispatch();
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
  
    },
    {
      title: "Customername",
      dataIndex: "Customername",
     
    },
    {
   title:'customerPhoneNumber',
   dataIndex:'customerPhoneNumber'
    },
    {
      title:'total',
      dataIndex:'total'
       },
       {
        title:'tax(including-GST)',
        dataIndex:'tax'
         },
    {
      title:'totalAmount',
      dataIndex:'totalAmount'
       },
       {
        title: "Actions",
        dataIndex: "_id",
        render: (id, record) => (
          <div className="d-flex">
            <EyeOutlined
              className="mx-2"
              onClick={() => {
                setSelectedBill(record);
                setPrintBill(true)
              }}
            />
          </div>
        ),
      },
  ]
  const getAllBills = () => {
    dispatch({type: "showLoading"})
    axios.get("/api/bills/allbills").then((res)=>{
    const data = res.data
data.reverse()
      setBills(data)        
      }).catch ((error)=> {
        dispatch({type: "hideLoading"})
        console.log(error)
      })
  }
  const Cartcolumns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: 'Price',
      dataIndex: 'Price'
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => <div> 
        <b >{record.quantity}</b>    
      </div>
    },
   

  
  ];
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 useEffect(()=>{
  getAllBills()
 },[])
  return (
    <Default_layout>
      <br />
      <Table columns={columns} dataSource={bills}  bordered pagination={false}>

      </Table>
  {printBill && (
        <Modal 
        onCancel={() => {
          setPrintBill(false);
        }} 
        visible={printBill}
        title="Bill Details"
        width={800}
   footer={false}>
<div className='bill-model p-30' ref={componentRef}>
<div className='d-flex justify-content-between bill-header '>
  <div>
<h1>
  <b>Ecome-Store</b>
</h1>
  </div>
  
<div>
  <p> <b> Bangloore</b></p>
   <p>springBoat-521136</p>
   <p>630-231456</p>
</div>
</div>
<div className="bill-customer-Details mt-3">
   <p>Name : <b>{selectedBill.Customername}</b></p>
   <p>Phone-Number : <b>{selectedBill.customerPhoneNumber}</b></p>
   <p>date : <b>{selectedBill.createdAt.toString().substring(0,10)}</b></p>
</div>

<Table dataSource={selectedBill.cartItems} columns={Cartcolumns} pagination={false} />
    
    <div className='dotted-border'>
      <p> <b>TotalAmout:</b> {selectedBill.totalAmount}</p>

    </div>
    <div className="dotted-border">
                <p><b>SUB TOTAL</b> : {selectedBill.total}</p>
                <p><b>Tax</b> : {selectedBill.tax}</p>
            </div>

            <div>
                <h2><b>GRAND TOTAL : {selectedBill.totalAmount}</b></h2>
            </div>
            <div className="dotted-border"></div>

            <div className="text-center">
                  <p>Thanks</p>
                  <p>Visit Again :)</p>
            </div>
          
</div>
<div className="d-flex justify-content-end">
<button type='primary' onClick={handlePrint}>Print this out!</button>
</div>
          </Modal>
  )}
          </Default_layout>
  )
}

export default Bills