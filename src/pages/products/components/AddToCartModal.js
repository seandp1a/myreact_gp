import React from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

const AddToCartModal = ({ show, handleClose, phoneModel, myurl }) => {
  const history = useHistory()

  return (
    <Modal
      className="addtocart-success-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="text-center">
        <img
          className="checkmark mb-3"
          src={`/myreact_gp/img/products/checked.svg`}
          alt="checkmark"
        />
        <h2>已加入購物車</h2>
        <p>是否前往購物車結帳?</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <button
          className="btn important-btn md"
          onClick={() => {
            handleClose()
            setTimeout(() => {
              history.push('/order/step1')
            }, 500)
          }}
        >
          是
        </button>
        <button
          className="btn primary-btn md"
          onClick={() => {
            handleClose()
            setTimeout(() => {
              history.push(`/products?phone=${phoneModel}`)
            }, 500)
          }}
        >
          繼續購物
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddToCartModal
