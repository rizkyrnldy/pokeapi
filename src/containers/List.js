import React, { Component } from 'react';
import { List, message, Row, Col, Button, Skeleton, Icon, Typography } from 'antd';
import { connect } from 'react-redux';
import { Header, Loading } from '../component'
import { getListData, unmoutListData } from '../redux/actions/listAction'
import { getDetailData } from '../redux/actions/detailAction'
const { Text } = Typography;

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  componentDidMount(){
    const { page } = this.state;
    const { actionGetListData } = this.props;
    return actionGetListData(page);
  }

  componentWillUnmount(){
    const { actionUnmoutListData } = this.props;
    this.setState({ page: 1 })
    return actionUnmoutListData();
  }

  goToPage(i){
    const { actionGetDetailData } = this.props;
    return actionGetDetailData(i+1).then(() => {
      return this.props.history.push(`/detail/${i+1}`)
    }).catch(() => message.info('Error'))
  }

  onLoadMore(){
    const { actionGetListData } = this.props;
    this.setState((prevState) => {
      const newPage = prevState.page + 1 
      actionGetListData(newPage);
      return { 
        page: newPage
      }
    })
  }

  render() {
    const { loading, data } = this.props;
    const { page } = this.state;
    if(loading){ 
      return (<Header title="LIST POKEMON" history={this.props.history}><Loading /></Header>)
    }   
    return(
      <Header title="LIST POKEMON" history={this.props.history}>
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={22} xl={12} >
            <Text strong={true} style={{textAlign: "right", marginBottom: 10, display: 'block'}}> Total Pokemon: {parseInt(page*10)} </Text>
            <List
              style={{background: '#fff'}}
              itemLayout="horizontal"
              dataSource={data}
              bordered
              renderItem={(item, i) => (
                <List.Item actions={[<a onClick={() => this.goToPage(i)} key="list-loadmore-edit"><Icon type="arrow-right" /></a>]} >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta title={<a onClick={() => this.goToPage(i)}>{item.name.toUpperCase()}</a>} />
                  </Skeleton>
                </List.Item>
              )}
            />
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px', }} >
              <Button onClick={() => this.onLoadMore()}>Load More</Button>
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}

const mapActionsToProps = {
  actionGetListData     : getListData,
  actionUnmoutListData  : unmoutListData,
  actionGetDetailData   : getDetailData,
}

const mapStateToProps = (state, props) => {
  return {
    loading : state.list.loading,
    data    : state.list.data,
  }
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(ListPage);