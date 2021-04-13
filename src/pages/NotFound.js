import React from 'react'
import { Container } from 'react-bootstrap'
function NotFound() {
  return (
    <Container>
      <div className="container d-flex justify-content-center align-items-center flex-column flex-md-row">
        <img
          src="/myreact_gp/img/components/404-1.png"
          alt=""
          style={{ width: '273px', height: '100%', padding: '0 20px 0 0' }}
        />
        <img
          src="/myreact_gp/img/components/404-2.png"
          alt=""
          style={{ width: '268px', height: '310px', padding: '0 20px 0 0' }}
        />
      </div>
    </Container>
  )
}
export default NotFound
