import React, { useEffect } from 'react'
import  "../resourses/signin.css"
import { Form, Input,Button, Col, Row, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
function Signup() {
const naviate = useNavigate()
    const onFinish = (value) => {
  axios.post('/api/users/signup' ,  value).then((res)=>{
      message.success("signup sucessfull -wait for approve")
  }).catch(()=>{
      message.error("enter correct details")
  })
    }
    useEffect(() => {
      if(localStorage.getItem('postUser'))
      naviate('/home')
  }, [])

  return (
    <div className='authe'>
        <Row>
   <Col lg={8} xs={25} >

    <Form    layout="vertical" onFinish={onFinish}>
     <h2>Pos Store</h2>
     <h4>Signup here!</h4>
<Form.Item name="name" label="Name">

<Input />
</Form.Item>
<Form.Item name="userID"label="userID" > 
<Input />
</Form.Item>  

<Form.Item name="Password"  label="Password"> 

<Input  type="password"/>
</Form.Item>

<div className='d-flex justify-content-between'>
    <Link to="/signin">To Signin</Link> 
<Button htmlType='submit' type='primary'>
   signup
</Button>

</div>

 </Form>
 </Col>
 </Row>
</div>
)
}
 

export default Signup