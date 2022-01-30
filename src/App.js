import './App.css';
import { useState, useEffect } from 'react';
import View from './compomens/view';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DetailsCard } from './compomens/detailsCard'

function App() {

  const [cardList, setCardList] = useState();

  const onLoud = () => {
    debugger
    axios.get('angular_Response.json')
      .then(res => {
        setCardList(res.data);
      })
      .catch(error => alert('failed to load data error description: ' + error))
  }
  useEffect(onLoud, [])
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <View cardList={cardList} cardsView={cardList?.results} onLoud={onLoud} />} />
        <Route exact path="/:detailsCard" render={() => <DetailsCard cardList={cardList} />} />
      </Switch>
    </Router>
  );
}

export default App;
