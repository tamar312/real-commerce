import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import './view.css';
import { DetailsCard } from './detailsCard'
export function Grid({ item, setTitle }) {
    const history = useHistory()
    return (
        <Col md={6} sm={11}>
            <Row style={{ border: 'solid', marginBottom: '3vh', marginRight: '3vh', height: '40vh' }}>
                <Col>
                    <img
                        onLoad={e => e.target.style.display = ''}
                        onError={e => { e.target.style.display = 'none' }}
                        className='img'
                        onClick={() => history.push(`/detailsCard`, item)}
                        src={item.Poster}></img>
                </Col>
                <Col>
                    <EditTitle itemId={item.imdbID} title={item.Title} setTitle={setTitle} />
                    <h2 className='date'>{item?.Year?.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')}</h2>
                </Col>
            </Row>
        </Col >
    )
}

export function List({ item, setTitle }) {
    const history = useHistory()

    return (
        <Row className='d-flex stylList'>
            <Col xs={12} md={2}>
                <img
                    onLoad={e => e.target.style.display = ''}
                    onError={e => { e.target.style.display = 'none' }}
                    onClick={() => history.push(`/detailsCard`, item)}
                    className='imgList'
                    src={item.Poster}></img>
            </Col>
            <Col xs={12} md={10}>
                <Row>
                    <EditTitle itemId={item.imdbID} title={item.Title} setTitle={setTitle} />
                    <div className='dateList'>{item?.Year?.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')}</div>
                </Row>
            </Col>
        </Row>
    )

}

function EditTitle({ title, setTitle, itemId }) {
    const [titleInput, setTitleInput] = useState(false)

    return (
        titleInput ?
            <input className='inptEdit' defaultValue={title} onBlur={e => { setTitleInput(false); setTitle(title, e.target.value, itemId) }} />
            : <div onClick={() => setTitleInput(true)} className='title' >{title}</div>
    )
}

