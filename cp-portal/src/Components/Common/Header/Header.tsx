import React, {useState} from 'react';
import { Col, Row} from 'antd';

export default function Header(){

    return(
        <Row>
          <Col span={24} style={{background:'#030852', height:30}}></Col>
        </Row>
    )
}