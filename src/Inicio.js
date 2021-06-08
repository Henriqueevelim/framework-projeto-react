import React from 'react'

import { Button, Typography } from 'antd'

import { Link } from 'react-router-dom'

const { Text } = Typography

export default function Inicio(props) {

    var corfundo = () => document.body.style.backgroundColor = "rgb(0, 195, 255)";
    corfundo();

    return <div>

        <div className="Inicio">
            <h1 className="Titulo">
                Oie, seja bem vindx ao <Text mark >Controle de Gastos!</Text>
            </h1>

            <h2 className="Subtitulo">
                E aí, vamos começar?
            </h2>
        </div>

        <div className='fundoInicial'>

            <div className="divBtn1">

                <Button style={{ width: "350px", height: "100px", fontSize: '40px', fontWeight: 'bold' }}>

                    <Link to="/cadastro" style={{ color: 'black' }}> cadastrar agora</Link>

                </Button>

            </div>

            <div className="divBtn2">

                <Button type="text" style={{ fontWeight: 'bold' }}>

                    <Text underline style={{ fontSize: '18px' }}>
                        <Link to="/login" style={{ color: 'black' }}>já tenho conta</Link>
                    </Text>

                </Button>
            </div>

        </div>


    </div>
}