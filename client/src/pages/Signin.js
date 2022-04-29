import React, { useEffect } from 'react'
import  "../resourses/signin.css"
import { Form, Input,Button, Col, Row, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Signin() {
    const naviate = useNavigate()
    const onFinish = (value) => {
        axios.post('/api/users/signin' ,  value).then((res)=>{
           
            message.success("signin sucessfull ")
            localStorage.setItem('postUser', JSON.stringify(res.data))
            naviate("/home")
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
     <h4>Signin here!</h4>
     <Form.Item name="userID"label="userID" > 
<Input />
</Form.Item> 
<Form.Item name="Password"  label="Password"> 

<Input type="password" />
</Form.Item>

<div className='d-flex justify-content-between'>
    <Link to="/signup">not Register? signup here!</Link> 
<Button htmlType='submit' type='primary'>
   sign-in
</Button>

</div>

 </Form>
 </Col>
 </Row>
</div>
)
}
 

export default Signin