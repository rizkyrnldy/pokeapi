import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Row, Col,  Avatar, Typography, Card, Icon, Modal, Form, Input, Progress, Button} from 'antd';
import { setPokemon } from '../redux/actions/pokemonAction'
import { getDetailData, unmountDetailData } from '../redux/actions/detailAction'
import { Loading, Header } from '../component';
const { Text, Title } = Typography;
const { Meta } = Card;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSlide: null,
      visible: false,
      formVal: '',
      formErr: false
    };
    this.interval = null;
  }
  
  componentDidMount(){
    const { actionGetDetailData, data } = this.props;
    if(data === null){
      const id = this.props.match.params.id;
      return actionGetDetailData(Number(id)).catch((err) => console.log(err))
    }
  }
  componentWillReceiveProps(nextProps){
    let data = nextProps.data.sprites
    const Image_slide = Object.values(data).filter(url => url !== null);
    var index = 0;
    var slideIn = () => {
      index++;
      if(index > (Image_slide.length-1)){ index = 0; }
      return this.setState({ imageSlide: Image_slide[index] })
    }
    this.interval = setInterval(() => slideIn(), 1000); 
  }

  async componentWillUnmount(){
    await clearInterval(this.interval)
    this.setState({
      imageSlide: null
    }, () => {
      return this.props.actionUnmountDetailData()
    })
  }

  setPokemon(){
    const {data, actionSetPokemon } = this.props;
    const { formVal } = this.state;
    if(formVal !== ''){
      return actionSetPokemon(data, formVal, () => {
        this.setState({
          visible: false
        }, () => {
          return message.info('Data Berhasil di Simpan')
        })
      })
    }else{
      this.setState({
        formErr: true
      })
    }
  }

  clear(){
    this.interval = 0
    clearInterval(this.interval)
  }

  render() {
    const { loading, data } = this.props;
    const { imageSlide, formErr } = this.state;

    if(loading || imageSlide === null){ 
      return (<Header title="DETAIL POKEMON" history={this.props.history}><Loading /></Header>)
    }   
    return (
      <Header title="DETAIL POKEMON" history={this.props.history}>
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={22} xl={12} style={{background: '#fff'}}>
            <Card style={{ width: '100%' }} >
              <Col xs={24} xl={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh'}}>
                <img alt="example" src={imageSlide} style={{width: '100%'}} />
              </Col>
              <Col xs={24} xl={16}>
                <Col xs={24} style={{marginBottom: 30}}>
                  <Title level={4} style={{marginBottom: 0}}>{data.name.toUpperCase()}</Title>
                  {data.types.map((res, i) => {
                    return <Text strong={true} type="secondary" style={{fontSize: 12}} key={i}> {res.type.name.toUpperCase()}{i < data.types.length - 1 ? ',' : ''} </Text>
                  })}
                </Col>
                <Col xs={24}>
                  {data.stats.map((res, i) => {
                    return(
                      <Col key={i} style={{marginBottom: 10}}>
                        <Text strong={true}>{res.stat.name.replace('-', ' ').toUpperCase()}</Text>
                        <Progress percent={res.base_stat} strokeColor={res.base_stat >= 50 ? "#1890ff" : "#f5222d"} status="active" />
                      </Col>
                    )
                  })}
                  <Col xl={6} xs={24} style={{marginTop: 20}}>
                    <Button type="primary" onClick={() => this.setState({visible: true})}>
                      Save Pokemon
                    </Button>
                  </Col>
                </Col>
              </Col>
            </Card>
          </Col>
            

          <Modal
            title="Pokemon Name"
            visible={this.state.visible}
            onOk={() => this.setPokemon()}
            okText="Save"
            onCancel={() => this.setState({visible: false})}
          >
            <Form>
              <Form.Item validateStatus={formErr ? "error" : ""} help={formErr ? "Please input your pokemon name" : ""} >
                <Input
                  size="large"
                  placeholder="Pokemon Name"
                  onPressEnter={() => this.setPokemon()}
                  onChange={(e) => this.setState({formErr: false, formVal: e.target.value})}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Row>
      </Header>
    );
  }


  
}

const mapActionsToProps = {
  actionGetDetailData : getDetailData,
  actionSetPokemon    : setPokemon,
  actionUnmountDetailData    : unmountDetailData,
}

const mapStateToProps = (state, props) => {
  return {
    loading     : state.detail.loading,
    data        : state.detail.data,
    loadingbtn  : state.myPokemon.loading,
  }
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Detail);