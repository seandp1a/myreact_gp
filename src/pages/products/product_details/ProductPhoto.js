import React, { useState, useEffect } from 'react'

const ProductPhoto = ({
  phoneModel,
  phoneColor,
  shellColor,
  designInfo,
  myurl,
}) => {
  // shortenedPhoneModelName is used for the phone photo and camera photo names
  const shortenedPhoneModelName = phoneModel
    .replaceAll('Phone-', '')
    .replaceAll(' ', '-')

  // store design img filepath in state
  const [filepath, setFilepath] = useState('')

  // dynamically generate file path for design image
  useEffect(() => {
    // since designInfo is an object, React is weird in that the object it is kinda passed asynchronously as a prop, so we need to check that both designInfo.series_name_eng && designInfo.design_name_eng exist
    // you can try removing the if check, React will throw an error
    if (designInfo.series_name_eng && designInfo.design_name_eng) {
      const img_series_name = designInfo.series_name_eng.replaceAll(' ', '-')
      const img_design_name = designInfo.design_name_eng.replaceAll(' ', '-')
      setFilepath(
        `/myreact_gp/img/products/series/${img_series_name}/${img_design_name}.png`
      )
    }
  }, [designInfo.series_name_eng, designInfo.design_name_eng])

  return (
    <div className="position-relative product-details-relative">
      <img
        className="position-absolute"
        src={`/myreact_gp/img/products/phones/${phoneModel}/${shortenedPhoneModelName}-${phoneColor}.png`}
        alt={`${phoneModel} ${phoneColor}`}
      />
      <img
        className="position-absolute"
        src={filepath}
        alt={designInfo.design_name_chn}
      />
      <img
        className="position-absolute"
        src={`/myreact_gp/img/products/shells/shell-${shellColor}.png`}
        alt={`${shellColor} shell`}
      />
      <img
        className="position-absolute"
        src={`/myreact_gp/img/products/phones/${phoneModel}/${shortenedPhoneModelName}-cam-${phoneColor}.png`}
        alt="camera"
      />
    </div>
  )
}

export default ProductPhoto
