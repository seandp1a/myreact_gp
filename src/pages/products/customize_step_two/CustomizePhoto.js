import React, { useRef, useState, useEffect } from 'react'
import { Stage, Layer, Text, Image, Transformer } from 'react-konva'

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const CustomizePhoto = ({
  phoneModel,
  phoneColor,
  shellRadioValue,
  fontFamily,
  text,
  fontSize,
  fontWeight,
  textColor,
  uploadedImage,
  submitFlag,
  setSubmitFlag,
  myurl,
}) => {
  // state to check if the image is selected (by clicking or tapping the uploaded image)
  const [imgSelected, setImgSelected] = useState(false)

  // shortenedPhoneModelName is used for the phone photo
  const shortenedPhoneModelName = phoneModel
    .replaceAll('Phone-', '')
    .replaceAll(' ', '-')

  const dashPhoneColor = phoneColor.replaceAll(' ', '-')

  // access konva node of the uploaded img
  const stageRef = useRef(null)
  const imgRef = useRef(null)
  const trRef = useRef(null)

  // this function is for the Transformer
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      setImgSelected(false)
    }
  }

  // attach transformer (note that Transformer is a react-konva built-in element for re-sizing images) manually
  useEffect(() => {
    if (imgSelected) {
      trRef.current.nodes([imgRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [imgSelected])

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1])
    else byteString = unescape(dataURI.split(',')[1])

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length)
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type: mimeString })
  }

  // this function is to export the canvas image as base64String and send it to the backend for file handling
  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    const uri2 = imgRef.current.toDataURL()
    // console.log(imgRef)
    // console.log(URL.createObjectURL(dataURItoBlob(uri2)))
    localStorage.setItem('image', uri)
    localStorage.setItem('newBlob', URL.createObjectURL(dataURItoBlob(uri2)))
    localStorage.setItem('finalBlob', URL.createObjectURL(dataURItoBlob(uri)))

    // console.log(stageRef.current.toDataURL())
    // fetch('http://localhost:3310/customize/save-file', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     data: uri,
    //   }),
    // })
    //   .then((res) => res.text())
    //   .then((filename) => {
    //     // backend will send the saved filename back, so save it in local storage
    //     localStorage.setItem('cst_filename', filename)
    //   })
  }

  // this useEffect detects when 下一步button has been clicked, if yes then we call handleExport function
  // we are writing it this way because handleExport needs to be here in this child component, but the 下一步 button is in the parent component
  // and it's really hard to call a child function from the parent
  useEffect(() => {
    if (submitFlag === true) {
      handleExport()

      // set submit flag back to false in case user wants to go back and submit another photo
      setTimeout(() => {
        setSubmitFlag(false)
      }, 2000)
    }
  }, [submitFlag])

  return (
    <div className="customize-photo-block px-2 px-sm-4 mt-4 mb-2 position-relative">
      <img
        className="position-absolute img-fluid customize-phone-model"
        src={`/${myurl}img/products/phones/${phoneModel}/${shortenedPhoneModelName}-${dashPhoneColor}.png`}
        alt="phone"
      />
      <img
        className="position-absolute img-fluid customize-shell"
        src={`/${myurl}img/products/shells/shell-${shellRadioValue}.png`}
        alt="shell"
      />
      {/* put customized canvas below */}
      <Stage
        width={250}
        height={480}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        ref={stageRef}
      >
        <Layer>
          <Text
            x={60}
            y={150}
            fontFamily={fontFamily}
            text={text}
            fontSize={fontSize}
            fontStyle={fontWeight}
            draggable
            fill={textColor}
          />
          <Image
            onClick={() => {
              setImgSelected(true)
            }}
            onTap={() => {
              setImgSelected(true)
            }}
            ref={imgRef}
            onMouseEnter={(e) => {
              let canvas = document.querySelector('canvas')
              canvas.style.cursor = 'move'
            }}
            onMouseLeave={(e) => {
              let canvas = document.querySelector('canvas')
              canvas.style.cursor = 'default'
            }}
            image={uploadedImage}
            draggable
          />
          {/* only show Transformer when the clicking or tapping image */}
          {imgSelected && <Transformer ref={trRef} />}
        </Layer>
      </Stage>
    </div>
  )
}

export default CustomizePhoto
