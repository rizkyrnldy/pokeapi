import React, { Component } from 'react';
import { Layout, Typography, Icon, Col, Row, Drawer } from 'antd';
import { Link }  from "react-router-dom";
const { Header, Content} = Layout;
const { Title } = Typography;

export default class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handle(){
    const { history }  = this.props;
    if(history.location.pathname !== '/'){
      return history.push('/')
    }else{
      return this.setState({ visible: true })
    }
  }

  render() {
    const { history, children, title }  = this.props;
    return (
      <Layout className="layout">
        <Drawer
          title="Menu"
          placement="left"
          closable={false}
          onClose={() => this.setState({visible: false})}
          visible={this.state.visible}
        >
          <Link to="/my-pokemon"> <span>My Pokemon</span> </Link>
        </Drawer> 
        <Layout>
          <Header style={{ background: '#fff', padding: '0 20px' }}>
            <Row type="flex" justify="space-around" align="middle">
              <Col xs={24} xl={12} style={{background: '#fff'}}>
                <Col span={2}>
                  <Icon className="trigger" type={history.location.pathname !== '/' ? "arrow-left" : "menu-fold"} onClick={() => this.handle()} style={{fontSize: 20}}/> 
                </Col>
                <Col span={22}>
                  <Title strong={true} level={4} style={{color: '#000', textAlign: 'right', marginTop: 17}}>
                    {title}
                  </Title>
                </Col>
              </Col>
            </Row>
          </Header>
        </Layout>
        <Layout style={{ padding: '40px 0' }}>
          <Content style={{ minHeight: '83vh',}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
