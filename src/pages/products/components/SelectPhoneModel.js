import React from "react";
import { Form } from "react-bootstrap";

const SelectPhoneModel = ({ phoneModel, handleSelectPhoneModel }) => {
  // location and history from react router to help deal with query strings
  const phoneModelsArr = [
    { id: 1, model: "iPhone 6" },
    { id: 2, model: "iPhone 6 Plus" },
    { id: 3, model: "iPhone 7" },
    { id: 4, model: "iPhone 7 Plus" },
    { id: 5, model: "iPhone 8" },
    { id: 6, model: "iPhone 8 Plus" },
    { id: 7, model: "iPhone 11" },
    { id: 8, model: "iPhone 11 Pro" },
    { id: 9, model: "iPhone 11 Pro Max" },
    { id: 10, model: "iPhone 12" },
    { id: 11, model: "iPhone 12 Mini" },
    { id: 12, model: "iPhone 12 Pro" },
    { id: 13, model: "iPhone 12 Pro Max" },
    { id: 14, model: "iPhone SE 2020" },
    { id: 15, model: "iPhone X" },
    { id: 16, model: "iPhone XR" },
    { id: 17, model: "iPhone XS" },
    { id: 18, model: "iPhone XS Max" },
  ];

  const phoneModelsOptions = phoneModelsArr.map((item) => (
    <option key={item.id} value={item.model.replaceAll(" ", "-")}>
      {item.model}
    </option>
  ));

  return (
    <Form>
      <Form.Label className="products-item-title mt-3">手機型號</Form.Label>
      <Form.Control
        className="primary-select"
        as="select"
        value={phoneModel}
        onChange={handleSelectPhoneModel}
      >
        {phoneModelsOptions}
      </Form.Control>
    </Form>
  );
};

export default SelectPhoneModel;
