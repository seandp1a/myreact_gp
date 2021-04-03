import React from "react";
import "./0_product_components.scss";

const CustomizeSteps = ({
  firstWordClass,
  secondWordClass,
  thirdWordClass,
  firstCircleClass,
  secondCircleClass,
  thirdCircleClass,
}) => {
  return (
    <div className="customize-steps text-center mb-3">
      <div className="d-flex justify-content-center justify-content-md-between">
        <h2 className={firstWordClass}>Step 1：選擇手機型號</h2>
        <h2 className={secondWordClass}>Step 2：客製圖案及文字</h2>
        <h2 className={thirdWordClass}>Step 3：確認設計</h2>
      </div>
      <div className="step-circles d-flex justify-content-center">
        <div className={firstCircleClass}></div>
        <div className={secondCircleClass}></div>
        <div className={thirdCircleClass}></div>
      </div>
    </div>
  );
};

export default CustomizeSteps;
