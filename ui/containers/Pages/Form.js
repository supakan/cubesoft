import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { createPage } from '../../actions/page'
import { PageForm } from '../../components'

// เราต้องการให้ฟอร์มของเรามี 2 fields
const FIELDS = ['title', 'content']

class PageFormContainer extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { fields, handleSubmit } = this.props

    return (
      <PageForm
        fields={fields}
        handleSubmit={handleSubmit} />
    )
  }
}

// ใช้ reduxForm เพื่อสร้างฟอร์ม
export default reduxForm({
    // โดยระบุว่าฟอรฺมขชองเรานั้นชื่อ page
    form: 'page',
    // มีฟิลด์อะไรบ้างที่ต้องการ
    fields: FIELDS,
    // จะให้ตรวจสอบฟิลด์ไหม?
    validate: (values, props) =>
      // ตัวอย่างนี้จะทำการตรวจสอบฟิลด์ทั้งหมด
      // ถ้าฟิลด์ไหนไม่ได้พิมพ์ค่า จะให้มี error ว่า Required
      FIELDS.reduce((errors, field) =>
        values[field] ? errors : { ...errors, [field]: 'Required' }, {})
  },
  // เราสามารถใส่ mapStateToProps เข้าไปใน reduxForm ได้
  (state) => ({}),
  // เช่นเดียวกัน mapDispatchToProps ใส่ได้เหมือนกัน
  (dispatch) => ({
    // onSubmit จะจับคู่กับ handleSubmit ของ reduxForm
    // เมื่อใดก็ตามที่ฟอร์ม submit onSubmit ตัวนี้หละครับจะทำงาน
    onSubmit: (values) =>
      // เมื่อ onSubmit ทำงานเราต้องการให้มันไปเรียก createPage
      // เพื่อสร้างก้อนอ็อบเจ็กต์ action ที่สัมพันธ์กับการสร้างวิกิออกมา
      dispatch(createPage(values))
  })
)(PageFormContainer)
