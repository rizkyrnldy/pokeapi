import React, { Component } from 'react';
import { List, message, Row, Col, Avatar, Skeleton, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
import { getPokemon, deletePokemon, unmountMyPokemon } from '../redux/actions/pokemonAction'
import { Loading, Header } from '../component';
const { confirm } = Modal;

class MyPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: true,
      data: null,
    };
  }
  componentDidMount(){
    const { actionGetPokemon }= this.props;
    return actionGetPokemon()
  }

  componentWillUnmount(){
    return this.props.actionUnmountMyPokemon();
  }

  goToPage(pass, i){
    const { actionGetDetailData } = this.props;
    return actionGetDetailData(i+1).then(() => {
      return this.props.history.push(`/detail/${i+1}`)
    }).catch(() => message.info('Err'))
  }

  onLoadMore(){
    message.info('peper')
  }

  deleteItem(item){
    confirm({
      title: 'Do you Want to delete these items?',
      onOk: () => {
        this.props.actionDeletePokemon(item.id, () => {
          return message.info('Delete Success');
        })
      }
    });
  }

  render() {
    const { loading, data } = this.props;
    if(loading){ 
      return (<Header title="MY POKEMON" history={this.props.history}><Loading /></Header>)
    }
    return(
      <Header title="MY POKEMON" history={this.props.history}>
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={22} xl={12}>
            <List
              style={{background: '#fff'}}
              itemLayout="horizontal"
              dataSource={data}
              bordered
              renderItem={(item, i) => (
                <List.Item actions={[ <a onClick={() => this.deleteItem(item)} key="delete"><Icon type="delete" /></a> ]} >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta avatar={<Avatar src={item.body.sprites.front_default} />} title={<a onClick={() => this.deleteItem(item)}>{item.name}</a>} />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Header>
    );
  }
}

const mapActionsToProps = {
  actionGetPokemon        : getPokemon,
  actionDeletePokemon     : deletePokemon,
  actionUnmountMyPokemon  : unmountMyPokemon,
}

const mapStateToProps = (state, props) => {
  return {
    loading : state.myPokemon.loading,
    data    : state.myPokemon.data,
  }
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(MyPokemon);