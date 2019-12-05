import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route }  from "react-router-dom";
import { List, Detail, NotFound, MyPokemon } from './containers';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/my-pokemon" component={MyPokemon} />
          <Route path="*" component={NotFound} />
        </Switch> 
      </Router>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
  }
};

const mapActionsToProps = { 
};

export default connect( mapStateToProps, mapActionsToProps )( Routes );
