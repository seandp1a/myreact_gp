import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {
  // shortenedPhoneModelName is used for the phone photo and camera photo names
  const shortenedPhoneModelName = props.phoneModel
    .replaceAll('Phone-', '')
    .replaceAll(' ', '-')

  const phoneColor = props.phoneColor.replaceAll(' ', '-')

  return (
    <div className="product px-2 px-sm-4 mt-4 mb-2 position-relative">
      <Link
        to={`/products/details/${props.phoneModel}/${props.designId}?phoneColor=${phoneColor}&shellColor=${props.shellRadioValue}`}
      >
        <img
          className="position-absolute"
          src={`./img/products/phones/${props.phoneModel}/${shortenedPhoneModelName}-${phoneColor}.png`}
          alt={`${props.phoneModel} ${phoneColor}`}
        />
        <img className="position-absolute" src={props.src} alt={props.alt} />
        <img
          className="position-absolute"
          src={`./img/products/shells/shell-${props.shellRadioValue}.png`}
          alt={props.shellRadioValue}
        />
        <img
          className="position-absolute"
          src={`./img/products/phones/${props.phoneModel}/${shortenedPhoneModelName}-cam-${phoneColor}.png`}
          alt="camera"
        />
      </Link>
      <div className="position-absolute text-center product-text-block">
        <h6> - {props.seriesTitle} - </h6>
        <h3>{props.designTitle}</h3>
        <h5>${props.price} TWD</h5>
      </div>
    </div>
  )
}

export default Product
