import React from "react";
import { Form } from "react-bootstrap";
import { RiErrorWarningFill } from "react-icons/ri";

const CautionBlock = ({ checkbox, setCheckbox }) => {
  return (
    <div className="caution-block">
      <div className="caution-block-title-block">
        <Form.Label className="products-item-title mt-3">
          <RiErrorWarningFill style={{ fontSize: "25px" }} />
          &nbsp;注意事項
        </Form.Label>
      </div>
      <div className="caution-block-content">
        <ol>
          <li>
            個人化商品一旦成立訂單便無法修改設計樣式及訂單異動。因印刷製程中可能會有些許的誤差範圍，請下單前確認好您想要的設計樣式喔！
          </li>
          <li>此為客製化商品，不接受退換貨，請確認商品型號/款式再下單。</li>
        </ol>
        <label className="form-check-label ml-4">
          <input
            type="checkbox"
            checked={checkbox}
            onChange={(e) => {
              if (checkbox) {
                setCheckbox(false);
              } else setCheckbox(true);
            }}
          />
          我已詳閱並同意<span className="primary-text">訂購條款</span>
        </label>
      </div>
    </div>
  );
};

export default CautionBlock;
