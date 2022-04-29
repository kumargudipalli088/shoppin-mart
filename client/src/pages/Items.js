import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import Default_layout from "../Components/defalt_layout"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Input, message, Modal, Select, Table } from 'antd';
import { Button } from 'antd'
function Items() {
  const [items, setItems] =  useState([])
  const [popup, setPopup] =  useState(false)
   const [edit, setEdit] = useState(null)
  const dispatch = useDispatch();
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" margin="auto"  width="100px" height="100px" />
      ),
    },
    {
   title:'Price',
   dataIndex:'Price'
    },
    {
      title:'Category',
      dataIndex:'category'
       },
    {
      title: "Actions",
      dataIndex:'_id',
      render:(id, record)=> <div className='d-flex'>
        <EditOutlined className="mx-2" onClick={()=>{setEdit(record)
        setPopup(true)
        }}/>
        <DeleteOutlined  className="mx-2"  onClick={()=>{deleteItem(record)}} />
      </div>
        
    }
  ]
  const getAllItems = () => {
    dispatch({type: "showLoading"})
    axios.get("/api/items/all-items").then((res)=>{
      dispatch({type: "hideLoading"})
      setItems(res.data)        
      }).catch ((error)=> {
        dispatch({type: "hideLoading"})
        console.log(error)
      })
  }
  const onFinish = (values) =>{
    dispatch({type: "showLoading"})
if(edit == null ) {
  axios.post("/api/items/add-items",values).then((res)=>{
    dispatch({type: "hideLoading"})
    message.success('items added sucessfull')   
    setPopup(false)
    getAllItems()
    }).catch ((error)=> {
      dispatch({type: "hideLoading"})
      message.error('wrong formate')
      console.log(error)
    })

} else {
  axios.post("/api/items/edit-items",{...values, itemId:edit._id}).then((res)=>{
    dispatch({type: "hideLoading"})
    message.success('items editing sucessfull')     
    setEdit(null)
    setPopup(false)
    getAllItems()
    }).catch ((error)=> {
      dispatch({type: "hideLoading"})
      message.error('editing unsucessfull')
      console.log(error)
    })

}
  }
  
  const deleteItem = (record)  => {
    dispatch({type: "showLoading"})
    axios.post("/api/items/delete-items",{itemId:record._id}).then((res)=>{
      dispatch({type: "hideLoading"})
      message.success('items deleted sucessfull')
     getAllItems()       
      }).catch ((error)=> {
        dispatch({type: "hideLoading"})
        message.error('deleted unsucessfull')
        console.log(error)
      })
  }
 useEffect(()=>{
  getAllItems()
 },[])
  return (
    <Default_layout>

      <div className="d-flex justify-content-between">
      <Button type="primary" onClick={()=>setPopup(true)}> Add Items</Button>
    
   
      </div>
      <br />
      <Table columns={columns} dataSource={items}  bordered>

      </Table>
  {popup && (
        <Modal  onCancel={()=>{
           setEdit(null)
          setPopup(false)}} visible={popup} title ={`${edit !== null ? `Edit Item`:`Add New Item`}`} footer={false}>
        <Form  initialValues={edit}  layout="vertical" onFinish={onFinish}>
    <Form.Item name="name" label="Name">
    
      <Input />
    </Form.Item>
    <Form.Item name="image"label="ImgURL " > 
    <Input />
    </Form.Item>  
    
    <Form.Item name="Price"  label="Price"> 
    
      <Input />
    </Form.Item>
    <Form.Item name="category" label="Category"> 
    
      <Select>
        <Select.Option value="Men">Men</Select.Option>
        <Select.Option value="Women">Women</Select.Option>
        <Select.Option value="Shoes">Shoes</Select.Option>
    
      </Select>
    </Form.Item>
    <div className='d-flex justify-content-end'>
      <Button htmlType='submit' type='primary'>
    save
      </Button>
    
    </div>
        </Form>
    
          </Modal>
  )}
          </Default_layout>
  )
}

export default Items