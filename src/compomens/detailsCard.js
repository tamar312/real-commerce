
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import './view';
import { GiFastBackwardButton } from 'react-icons/gi'
// import { DetailsCard } from './detailsCard'
export function DetailsCard() {
    const history = useHistory()
    const item = history.location.state
    const [flag, setFlag] = useState(false)
    return (

        < Row >
            <Col md={6} sm={11}>
                <Row style={{ marginBottom: '3vh', marginRight: '3vh', height: '40vh', textAlign: 'center' }}>
                    <Col>
                        <img
                            className='img'
                            // onClick={<DetailsCard item={item} />}
                            onClick={() => history.push(`/detailsCard`, item)}
                            src={item.Poster}></img>
                    </Col>
                    <Col>
                        <div style={{ marginTop: '6vh', fontSize: 'xx-large' }}>{item.Title}</div>
                        <div className='date'>{item?.Year?.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')}</div>
                        <div style={{ fontSize: 'large', marginTop: '3vh' }}>type: {item?.Type}</div>
                        <button
                            onClick={() => history.push('/')}
                            style={{
                                marginTop: '6vh',
                                fontSize: 'large'
                            }}>
                            <GiFastBackwardButton></GiFastBackwardButton>
                            back</button>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}