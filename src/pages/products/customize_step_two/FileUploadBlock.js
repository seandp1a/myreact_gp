import React from 'react'
import { ImAttachment } from 'react-icons/im'

const FileUploadBlock = ({ setCanvasImg }) => {
  return (
    <form id="fileUploadBlock">
      <div className="form-group">
        <label className="products-item-title mt-3">
          上傳圖案
          <ImAttachment
            style={{ verticalAlign: 'text-top', marginLeft: '5px' }}
          />
        </label>
        <div className="upload-file-block">
          <input
            type="file"
            className="form-control-file p-2"
            id="exampleFormControlFile1"
            accept="image/*"
            name="testImage"
            onChange={(e) => {
              // grab temp uploaded img
              let generatedImgURL = URL.createObjectURL(e.target.files[0])
              // set canvas image

              setCanvasImg(generatedImgURL)
            }}
          />
          <p>*點擊圖片來放大、縮小或旋轉圖片</p>
        </div>
      </div>
    </form>
  )
}

export default FileUploadBlock
