import React, { Component, useState } from 'react'
import axios from 'axios'

import { Row, Col, Button, Form, Input, Layout, Typography } from 'antd'

import {useHistory} from 'react-router-dom';
import Gastos from './Gastos';

const { Header, Content } = Layout;

const { Text } = Typography;

export default function Login(props) {

  const url_login = "https://7c2bad50.us-south.apigw.appdomain.cloud/api/login"

  // const login = () => {

  //     let params = { username: "henrique", senha: "123" }
  //     axios.post(url_login, params).then((resp) => {
  //         console.log(resp.data)
  //         //ou só resp
  //     }).catch((err) => {
  //         console.log(err)
  //     })
  // }

  const historyGastos = useHistory()
  const goLogin = () => {
    historyGastos.push('/gastos')
    
  }
  
  const enviarLogin = (params) => {

    let stringLogin = params
    
    axios.post(url_login, stringLogin).then((resp) => {
      
      console.log(resp.data)
      
      // se o valor retornado for true eu sou redirecionado para '/gastos'
      if(resp.data.valido === true){
        
        
        localStorage.setItem("username_X", params.username)
        console.log('ENTROU')
        goLogin()
      

      }
      
    }).catch((err) => {
      console.log(err)
    })
    

  }


  return <div>

    <div>

      <Layout style={{ height: "100vh" }}>
        <Header
          style={{ backgroundColor: "rgb(0, 195, 255)", height: "100px" }}
        >
          <Text style={{ fontSize: "45px", fontWeight: "bold" }}>
            <div style={{ marginTop: "15px" }}>login</div>
          </Text>
        </Header>

        <Content>
          <Row
            justify="center"
            style={{ backgroundColor: "", padding: "130px" }}
          >
            <Col span={10}>

              <Form onFinish={(stringForm)=>{
                console.log(stringForm)
                enviarLogin(stringForm)
               }}>

                <Form.Item label="Usuário:" name="username">
                  <Input />
                </Form.Item>

                <Form.Item label="Senha:" name="senha">
                  <Input.Password />
                </Form.Item>


                <Button style={{
                  marginTop: "40px",
                  width: "200px",
                  height: "50px",
                  fontSize: "22px",
                  backgroundColor: "green"
                }} type="primary" shape="round" htmlType="submit">
                  
                   login

                  </Button>


              </Form>
            </Col>
          </Row>
        </Content>
        <Button onClick={()=>{alert(localStorage.username_X)}}>conferir storage</Button>
      </Layout>
    </div>

  </div>

}