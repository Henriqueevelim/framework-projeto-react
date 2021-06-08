import React from "react";
import axios from "axios";

import { useState } from 'react'

import { Row, Col, Button, Layout, Form, Input, Typography, InputNumber, Slider } from "antd";

import { useHistory } from 'react-router-dom';

const { Header, Content } = Layout;

const { Text } = Typography;

export default function NovoUsuario(props) {

  // const criar = () => {
  //   let params = { username: "testinho", senha: "123", meta: 1000 };

  //   axios.post(url_novo, params).then((resp) => {
  //     console.log(resp.data);
  //     //ou só resp
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // };

  const url_cadastro = "https://7c2bad50.us-south.apigw.appdomain.cloud/api/usuario";

  //   console.log(params) // retorna {username: "henrique", senha: "123"}

  const historyLogin = useHistory()
  const goCadastro = () => historyLogin.push('/login')

  const enviarCadastro = (params) => {

    console.log(params)

    let stringCadastro = params

    axios.post(url_cadastro, stringCadastro).then((resp) => {

      console.log(params.username)
      console.log(resp)

      // se erro for 'null', significa que está tudo certo
      // se receber algum valor, significa que tem algo errado

      if (resp.data.erro == null) {

        console.log('tudo correto')
        

        goCadastro() //me leva pra tela de Login

      } else {

        console.log('deu erro')

      }

    }

    ).catch((err) => {
      console.log(err)
    })

  }



  return (
    <div>

      <Layout style={{ height: "100vh" }}>
        <Header
          style={{ backgroundColor: "rgb(0, 195, 255)", height: "100px" }}
        >
          <Text style={{ fontSize: "45px", fontWeight: "bold" }}>
            <div style={{ marginTop: "15px" }}>cadastro</div>
          </Text>
        </Header>

        <Content>
          <Row
            justify="center"
            style={{ backgroundColor: "", padding: "130px" }}
          >
            <Col span={10}>

              {/* FORM COM A FUNÇÃO DO BUTTON */}

              <Form onFinish={enviarCadastro}>

                <Form.Item label="Crie seu Usuário:" name="username">
                  <Input />
                </Form.Item>

                {/* <Form.Item
                  label="Insira o Usuário novamente:"
                  name="usernameRep"
                >
                  <Input />
                </Form.Item> */}

                <Form.Item label="Crie sua Senha:" name="senha">
                  <Input.Password />
                </Form.Item>

                <Form.Item label="Informe a meta:" name="meta" initialValue={250}>

                  <Slider min={100} max={1000} 
                    marks={{
                      100: '100',
                      250: '250',
                      500: '500',
                      750: '750',
                      1000: '1000',
                    }}
                  />

                </Form.Item>

                {/* <Form.Item label="Insira a Senha novamente:" name="passwordRep">
                  <Input.Password />
                </Form.Item> */}

                <Button
                  style={{
                    marginTop: "40px",
                    width: "200px",
                    height: "50px",
                    fontSize: "22px",
                    backgroundColor: "green",
                  }}
                  type="primary"
                  shape="round"
                  htmlType="submit"

                >
                  criar usuário
                </Button>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>

    </div>



  );
}
