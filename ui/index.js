//DAY 1
// import React, { Component } from 'react'
// import { render } from 'react-dom'
// import styles from '../styles/styles.scss';
//
// export default class HelloWorld extends Component {
//   render() {
//     return (
//       <div>
//         <h1 className={styles.greeting}>Hello World</h1>
//         </div>
//     )
//   }
// }
//
// render(<HelloWorld />, document.getElementById('app'))

//DAY 2
// import React, { Component } from 'react'
// import { render } from 'react-dom'
// import routes from './routes'
//
// render(routes(), document.getElementById('app'))

//DAY 3
import React, { Component } from 'react'
import { render } from 'react-dom'
// เราต้องใช้ AppContainer จาก hor-loader
// เพื่อครอบคอมโพแนนท์บนสุดของแอพพลิเคชันเราชื่อ Root
// เพื่อให้ทุกๆสิ่งภายใต้คอมโพแนนท์ Root มีคุณสมบัติ HMR ได้
import { AppContainer } from 'react-hot-loader'
// เพื่อให้ hot loader ทำงานสมบูรณ์เราต้องมีเพียงหนึ่งคอมโพแนนท์
// ที่ห่อหุ้มภายใต้ AppContainer โดยคอมโพแนนท์นั้นเราตั้งชื่อว่า Root
import Root from './containers/Root'

const rootEl = document.getElementById('app')

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootEl
)

if (module.hot) {
  // เมื่อไหร่ก็ตามที่โค๊ดภายใต้ Root รวมถึง subcomponent ภายใต้ Root
  // มีการเปลี่ยนแปลง ให้ทำ HMR ด้วย Root ตัวใหม่
  // ที่เราตั้งชื่อให้ว่า NextRootApp
  module.hot.accept('./containers/Root', () => {
    const NextRootApp = require('./containers/Root').default

    render(
      <AppContainer>
         <NextRootApp />
      </AppContainer>,
      rootEl
    );
  });
}
