import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Button, Col, Row, Input, Typography, Table, Menu, Dropdown, Space, Select, Form } from 'antd'
import { PlusCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import axios from 'axios'


const { Text } = Typography
const { Search } = Input
const { Option } = Select


export default function Gastos(props) {

    //useState pro extrato:

    var [logExtrato, setLogExtrato] = useState([])

    //useState pra meta:

    var [meta, setMeta] = useState(0)

    //useState pro gasto:

    var [gasto, setGasto] = useState(0)

    //useState pro calculo de categorias

    const [somaAlimentacao, setsomaAlimentacao] = useState(0)

    const [somaTransporte, setsomaTransporte] = useState(0)

    const [somaLazer, setsomaLazer] = useState(0)

    const [somaGeral, setsomaGeral] = useState(0)

    const url_meta = "https://7c2bad50.us-south.apigw.appdomain.cloud/api/meta"

    const url_gasto = "https://7c2bad50.us-south.apigw.appdomain.cloud/api/gasto"


    // CARREGAR OS DADOS DO USUÁRIO AO RENDERIZAR A TELA (1 vez)

    useEffect(() => {

        carregaValorGastos()
        
        obterMeta()
        
        listarGastos()
        
        
    }, [])
    
    useEffect(() => {
        
        somarTotal()
        
        
    })

    useEffect(()=>{

        if(gasto > meta){
            alert('Você faliu, quite suas dívidas imediatamente!')
        }

    }, [gasto])
    

    //OBTER META

    const obterMeta = () => {

        let user = localStorage.username_X

        let userComp = "?username=" + user

        axios.get(url_meta + userComp).then((resp) => {

            // console.log(resp.data.meta)

            // PARA CARREGAR A META DO USUÁRIO
            setMeta(resp.data.meta)

        }).catch((err) => {
            console.log(err)
        })

    }

    // CALCULAR GASTOS 

    const carregaValorGastos = () => {

        let user = localStorage.username_X

        let userComp = "?username=" + user

        axios.get(url_gasto + userComp).then((resp) => {

            let add = 0

            resp.data.gastos.forEach((item, idx) => {

                add = add + parseInt(item.valor)

                //console.log(add)
                
            })

            setGasto(add)
            
        }).catch((err) => {
            console.log(err)
        })

    }

    const criarGastos = (dados) => {



        let timestamp = new Date().getTime()
        let params = { username: localStorage.username_X, categoria: dados.categoria, valor: dados.valor, data: timestamp }
        axios.post(url_gasto, params).then((resp) => {
            carregaValorGastos()
            listarGastos()

            console.log(resp.data)
        }).catch((err) => {
            console.log(err)
        })



    }

    const listarGastos = () => {

        let user = localStorage.username_X

        let userComp = "?username=" + user

        axios.get(url_gasto + userComp).then((resp) => {

            //var add = new Object(), cat = "c", val = 1;

            let temp = []

            console.log(resp.data)


            resp.data.gastos.forEach((item, idx) => {
                //console.log(idx + ' -> ' + item.categoria, item.valor, Date(item.data))

                //add += item.categoria + ' ' + item.valor + ' '

                let single = {
                    id: `${item._id}`,
                    rev: `${item._rev}`,
                    key: `${idx}`,
                    data: `${new Date(item.data)}`,
                    categoria: `${item.categoria}`,
                    valor: `R$ ${item.valor}`
                }

                temp.push(single)


            })

            setLogExtrato(temp)

        }).catch((err) => {
            console.log(err)
        })

    }


    // nao precisa do username, apenas id e rev
    const apagarDado = (id, rev) => {

        axios.delete(url_gasto + `?id=${id}&rev=${rev}`).then((resp) => {

            console.log(resp.data)

            listarGastos()
            
            carregaValorGastos()

            
        }).catch((err) => {
            console.log(err)
        })
        
        // DEFINIR ATRASO, PARA DAR TEMPO DE OBTER REQUISIÇÃO
        //setTimeout(() => {  }, 1000)

    }


    // parte de cima
    const columns0 = [
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
        },
        {
            title: '',
            dataIndex: 'excluir',
            key: 'excluir',
            render: () => (

                <button onClick={(event) => {
                    let target = event.currentTarget
                    console.log(target)
                    let parent = target.parentElement
                    console.log(parent)
                    parent = parent.parentElement
                    console.log(parent)
                    parent = parent.dataset['rowKey']
                    console.log(parent)
                    let id
                    let rev
                    for (let i = 0; i < logExtrato.length; i++) {
                        if (parent == logExtrato[i]['key']) {
                            id = logExtrato[i]['id']
                            rev = logExtrato[i]['rev']
                            break
                        }
                    }
                    apagarDado(id, rev)

                }}>
                    Excluir
                </button>
            ),
        },
    ];

    // parte de baixo
    const columns1 = [
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria2',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor2',
        },
    ];

    const menu = (
        <Menu>
            <Menu.Item>
                <a >
                    1st menu item
            </a>
            </Menu.Item>
            <Menu.Item>
                <a >
                    2nd menu item
            </a>
            </Menu.Item>
            <Menu.Item>
                <a >
                    3rd menu item
            </a>
            </Menu.Item>
        </Menu>)

    const erro = () => {
        alert('Incompleto!')
    }
    function handleChange(value) {

    }

    const somarTotal = () => {

        let somaA = 0
        let testeA = []
        let somaT = 0
        let testeT = []
        let somaL = 0
        let testeL = []
        let somaG = 0

        for (let i = 0; i < logExtrato.length; i++) {

            if (logExtrato[i]["categoria"] == "alimentacao") {
                testeA.push(parseFloat(logExtrato[i]["valor"].replace("R$ ", "")))
            } else if (logExtrato[i]["categoria"] == "transporte") {
                testeT.push(parseFloat(logExtrato[i]["valor"].replace("R$ ", "")))
            } else if (logExtrato[i]["categoria"] == "lazer") {
                testeL.push(parseFloat(logExtrato[i]["valor"].replace("R$ ", "")))
            }

        }

        for (let i = 0; i < testeA.length; i++) {
            somaA += testeA[i]
        }
        setsomaAlimentacao(somaA)

        for (let i = 0; i < testeT.length; i++) {
            somaT += testeT[i]
        }
        setsomaTransporte(somaT)

        for (let i = 0; i < testeL.length; i++) {
            somaL += testeL[i]
        }
        setsomaLazer(somaL)

        somaG = somaAlimentacao + somaLazer + somaTransporte
        setsomaGeral(somaG)

    }


    const dataSource1 = [
        {
            key: '1',
            categoria: 'Total gasto em transporte:',
            valor: 'R$ ' + somaTransporte
        },
        {
            key: '2',
            categoria: 'Total gasto em lazer:',
            valor: 'R$ ' + somaLazer
        },
        {
            key: '3',
            categoria: 'Total gasto em alimentação:',
            valor: 'R$ ' + somaAlimentacao
        },
        {
            key: '4',
            categoria: <div style={{ fontWeight: 'bold', fontSize: '20px' }}>Total geral</div>,
            valor: 'R$ ' + somaGeral
        },
    ];


    return <div>

        <h1 style={{ backgroundColor: "rgb(0, 195, 255)", padding: '10px', fontSize: "40px", fontWeight: "bold", marginBottom: '0px' }}>

            Gastos

        </h1>

        <Card headStyle={{ fontSize: '25px', fontWeight: 'bold', backgroundColor: '#A7F6FF' }}
            title="Geral"
            style={{ width: '100%', backgroundColor: '#DFFCFF', marginTop: '0px' }}>

            <h4 style={{ fontSize: '15px', marginBottom: '20px' }}>

                Sua meta inicial: <Text code> {gasto} / {meta}</Text>
                - Usuário: {localStorage.username_X}

            </h4>

            <Row>
                <Col span={12}>
                    <Card hoverable title="+" headStyle={{ backgroundColor: 'orange' }}
                        style={{ backgroundColor: 'beige' }} >

                        <h2>
                            Adicionar novos gastos
                        </h2>


                        <Row justify="center">

                            <Col span={8}>

                                <Form name='lancamentos' onFinish={criarGastos} onFinishFailed={erro}>
                                    <Form.Item style={{ color: "white", marginTop: "20px" }} label="Valor" name="valor"
                                        rules={[{ required: true, message: 'Informe o cadastro' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Categoria" name="categoria"
                                        rules={[{ required: true, message: 'Informe a categoria' }]}>
                                        <Select style={{ width: 120 }} onChange={handleChange}>
                                            <Option value="alimentacao">Alimentação</Option>
                                            <Option value="lazer">Lazer</Option>
                                            <Option value="transporte">Transporte</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ display: "flex", justifyContent: 'center', marginTop: '15px' }}>
                                            <Button style={{ width: '100px', height: '40px', fontWeight: 'bold' }} type="primary" htmlType="submit">Enviar</Button>
                                        </div>
                                    </Form.Item>
                                </Form>





                            </Col>

                        </Row>

                    </Card>

                </Col>

                <Col span={12}>

                    <Card title="Meus Gastos" headStyle={{ backgroundColor: 'green' }}
                        style={{ backgroundColor: '#E4FFEF', height: '100%' }} hoverable>

                        <div>

                            <Table dataSource={logExtrato} columns={columns0} pagination={false} />

                            <Table dataSource={dataSource1} columns={columns1} pagination={false} />

                        </div>

                    </Card>

                </Col>
            </Row>

        </Card>




    </div>

}