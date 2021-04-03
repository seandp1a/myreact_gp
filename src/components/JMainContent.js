import React, { useState, useEffect } from 'react'

function JMainContent(props) {
  useEffect(() => {}, [props.mainBlur])
  return (
    <>
      <main
        role="main"
        className="flex-shrink-0"
        style={{ filter: `blur(${props.mainBlur})` }}
      >
        {props.children}
      </main>
    </>
  )
}

export default JMainContent
