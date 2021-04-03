import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import "./0_product_components.scss";

const SelectColor = ({
  radioValue,
  setRadioValue,
  radios,
  setOptionalInfo,
}) => {
  return (
    <ButtonGroup toggle className="select-color-group">
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          type="radio"
          variant="dark"
          name="radio"
          value={radio.color}
          checked={radioValue === radio.color}
          onChange={(e) => {
            setRadioValue(e.currentTarget.value);
            // setOptionalInfo is to store color id and chinese name, only used for customized step two
            if (setOptionalInfo) {
              setOptionalInfo(radio);
            }
          }}
          className="mr-3 mr-sm-2 mb-2 p-1 radio-btn"
          style={{ backgroundColor: radio.hex_color }}
        ></ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default SelectColor;
