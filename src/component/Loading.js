import React, { Component } from 'react';
import { Spin } from 'antd';
import './component.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <Spin tip="Loading..."/> 
      </div>
    );
  }
}
