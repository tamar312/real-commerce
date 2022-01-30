
import './view.css';
import Select from 'react-select';
import { React, useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdClear } from 'react-icons/md';
import { BsSortAlphaUp } from 'react-icons/bs';
// import array from '../angular_Response.json'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Grid, List } from './typeCards'
import { BsGridFill } from 'react-icons/bs'
import { BsListUl } from 'react-icons/bs'
function View({ cardList, cardsVieww, onLoud }) {
    // console.log("cardList", cardList)
    const history = useHistory();
    const [searchWord, setSearchWord] = useState();
    const [FlagListGrid, setflagListGrid] = useState(true);
    const [cardsView, setCardsView] = useState();
    const [flagSort, setFlagSort] = useState(false);
    // console.log("CardsV", cardsView)
    const [typesArr, setTypesArr] = useState();
    const [cardsTmp, setCardsTmp] = useState();
    console.log("cardsTmp", cardsTmp)

    const sortAsc = () => {
        debugger
        setCardsView(cardsView?.sort((a, b) =>
            a.Title > b.Title ? 1 : -1
        ))
        console.log("sortt", cardsView)
    }

    useEffect(() => {
        debugger
        // console.log("cardList", cardList)
        // console.log("CardsV", cardsView)
        setCardsView(cardList?.results)
        let a = [...new Set(cardList?.results.map(item => item.Type))]
        setTypesArr(a.map(b => ({ type: b, count: cardList.results.filter(c => c.Type === b).length })))
    }, [cardList])
    useEffect(() => {
        debugger
        console.log("CardsV", cardsView, cardList)
        console.log("cardList", cardList)
        setCardsTmp(cardList?.results)
        if (!flagSort && cardsView) {
            setFlagSort(true)
            sortAsc()
        }
    }, [cardsView, flagSort])
    const sortType = (type) => {
        debugger
        if (type === 'all') {
            setCardsView(cardList?.results)
        }
        else
            debugger
        setCardsView(cardList?.results?.filter(item => item.Type.toLowerCase().includes(type)))
    }

    useEffect(() => filterCards(searchWord), [searchWord])
    const filterCards = (value) => {
        setCardsView(cardList?.results?.filter(item => item?.Title?.toLowerCase().includes(value?.toLowerCase())))
    }
    const setTitle = (oldTitle, newTitle, itemId) => {
        if (oldTitle !== newTitle) {
            setCardsView(x => x.map(item => (item.Title === oldTitle && item.imdbID === itemId ? { ...item, Title: newTitle } : item)))
            axios({
                method: "post",
                url: "angular_Response.json/" + itemId,
                data: {
                    oldTitle: oldTitle,
                    newTitle: newTitle,
                },
            })
                .catch(error => alert('failed to save : ' + error))
        }
    }
    return (
        <>
            <Container className='data-view-container' >
                <h1 style={{ marginTop: '3vh' }}>Realcommerce</h1>
                <Row>
                    <Col>
                        <input
                            className='searchInput'
                            value={searchWord}
                            onChange={e => setSearchWord(e.target.value)}
                        />
                        <MdClear
                            onClick={e => setSearchWord('')}
                            className='icons'
                            title='clear filter'
                            alt='clear'>
                        </MdClear>

                        <HiOutlineRefresh
                            onClick={onLoud}
                            className='icons'
                            title='refresh'
                            alt='refresh'></HiOutlineRefresh>

                        <BsSortAlphaUp
                            onClick={() => { setCardsView(cardsView.slice().reverse()) }}
                            className='icons'
                            title='sort'
                            alt='sort'>
                        </BsSortAlphaUp>
                    </Col>
                    <BsGridFill onClick={() => { setflagListGrid(true) }}
                        className='icons'
                        alt='view in grid'
                        title='view in grid'

                    ></BsGridFill>

                    <BsListUl onClick={() => { setflagListGrid(false) }}
                        className='icons'
                        alt='view in list'
                        title='view in list'
                    >

                    </BsListUl>
                </Row>
                <hr />
                <Row>
                    <Col md={3}>
                        <div
                            className='typestl'
                            onClick={e => sortType('all')}
                        >
                            all types{cardList?.results?.length}
                        </div>
                        {typesArr && typesArr.map(x => {
                            return (
                                <div
                                    className='typestl'
                                    onClick={e => sortType(x.type)}
                                >
                                    {x.type}({x.count})
                                </div>
                            )
                        })}
                    </Col>
                    <Col>
                        {cardsView?.length > 0 ? cardsView?.map(item => FlagListGrid ?
                            <Grid item={item} setTitle={setTitle} /> :
                            <List item={item} setTitle={setTitle} />)
                            :
                            cardsTmp?.map(item => FlagListGrid ?
                                <Grid item={item} setTitle={setTitle} /> :
                                <List item={item} setTitle={setTitle} />)}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default View;