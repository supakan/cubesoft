import React, { PropTypes } from 'react'

// ถ้ามี error เกิดขึ้นในแต่ละฟิลด์ให้แสดงข้อความนั้นออกมา
// วิธีการตรวจสอบว่ามี error หรือไม่คือ
// 1. เช๋คก่อนว่าฟิลด์นั้น touched หรือยัง
// 2. มี error เกิดที่ฟิลด์นั้นหรือไม่
// ถ้าผ่านทั้งสองข้อก็แสดง div ที่มีคลาสเป้น error พร้อมข้อความแสดงข้อผิดพลาด
const errorMessageElement = (field) => (
  field['touched'] &&
  field['error'] &&
  <div className='error'>{field['error']}</div>
)
const PageForm = ({
  fields,
  handleSubmit
}) => {
  const { title, content } = fields

  return (
    <form
      // เรัยก handleSubmit ที่ส่งเข้ามาเมื่อ submit ฟอร์ม
      onSubmit={handleSubmit}
      className='form'>
      <fieldset>
        <label>Title</label>
        <input type='text' placeholder='Enter Title' {...title} />
        {errorMessageElement(title)}
      </fieldset>
      <fieldset>
        <label>Content</label>
        <textarea
          rows='5'
          placeholder='Enter Content' {...content}>
        </textarea>
        {errorMessageElement(content)}
      </fieldset>
      <button
        type='submit'
        className='button'>
        Submit
      </button>
    </form>
  )
}

PageForm.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default PageForm
