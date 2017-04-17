import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import routes from '../routes'

export default class Root extends Component {
  render() {
    // รับ initialState เข้ามาจาก ui/client/index.js
    const { history, initialState } = this.props
    // ส่งต่อไปให้ store เพื่อให้สถานะของเราไปเก็บไว้ใน store
    const store = configureStore(history, initialState)

    return (
      <Provider store={store} key='provider'>
        {routes(store, history)}
      </Provider>
    )
  }
}
