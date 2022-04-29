import { DeleteOutlined, DeleteTwoTone, MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Default_layout from '../Components/defalt_layout'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function CartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer)
  const [total, setTotal] = useState()
  const [bill, setBill] = useState()
  const increaseQuantity = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity + -1 },
      });
    }
  };
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" margin="auto" width="100px" height="100px" />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'Price'
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => <div>
        <PlusCircleTwoTone className="mx-3" onClick={() => increaseQuantity(record)} />
        &nbsp;
        <b >{record.quantity}</b>
        &nbsp;
        <MinusCircleTwoTone className="mx-3" onClick={() => decreaseQuantity(record)} />
      </div>
    },
    {
      title: "Actions",
      dataIndex: '_id',
      render: (id, record) =>
      (<DeleteOutlined
        onClick={() => dispatch({ type: "deleteCart", payload: record })} />
      )
    }
  ]
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((i) => {
      temp = temp + (i.Price * i.quantity)
    })
    setTotal(temp)
  }, [cartItems])

  const onFinish = (value) => {
  const reqObj= {
    ...value,
    cartItems,
    total,
    tax:Number(((total/100)*15).toFixed(2)),
    totalAmount :Number( total  + ((total/100)*15)),
    userID : JSON.parse(localStorage.getItem("postUser"))._id
  }
     axios.post("/api/bills/printbill", reqObj)
     .then(()=> message.success('bill Charged Sucess'))
     navigate("/bills")
     .catch(()=>{
      message.error('Something gone Wrong')
     })
  }
  return (
    <Default_layout>
      <h3>Cart</h3>
      <Table columns={columns} dataSource={cartItems} bordered pagination={false} />
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          <h3>
            Total:-  {total}$
          </h3>
        </div>
        <Button type='primary' onClick={() => { setBill(true) }} >
          Print-Bill
        </Button>

      </div>
      <hr />
      <Modal title='total-bill '
        visible={bill}
         footer={false}
        onCancel={() => setBill(false)}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="Customername" label="Customername">

            <Input />
          </Form.Item>
          <Form.Item name="customerPhoneNumber" label="customerPhoneNumber " >
            <Input />
          </Form.Item>

          <Form.Item name="PaymentMode" label="PaymentMode">

            <Select>
              <Select.Option value="Card">Card</Select.Option>
              <Select.Option value="Cash">Cash</Select.Option>
            </Select>
          </Form.Item>
          <div className='charge-bill-amount'>
            <h5>Total: <b>{total}</b></h5>
            <h5>Tax: <b>{((total/100)*15).toFixed(2)}</b> </h5>
            <hr />
            <h4>Grand Total: <b>{total  + ((total/100)*15) }</b></h4>
          </div>
          <div className='d-flex justify-content-end'>
            <Button htmlType='submit' type='primary'>
             Generate Bill
            </Button>

          </div>
        </Form>
      </Modal>



    </Default_layout>
  )
}

export default CartPage