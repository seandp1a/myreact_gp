import React from "react";
import { Form, Table } from "react-bootstrap";

const DetailsTable = ({ phoneModel, shellColor, seriesName, designName }) => {
  return (
    <>
      <Form.Label className="products-item-title mt-3">商品規格</Form.Label>
      <Table className="product-details-table" bordered hover>
        <tbody>
          <tr>
            <td className="orange-background">適用機型</td>
            <td>{phoneModel}</td>
          </tr>
          <tr>
            <td className="orange-background">邊框顏色</td>
            <td>{shellColor}</td>
          </tr>
          <tr>
            <td className="orange-background">款式系列</td>
            <td>{seriesName}</td>
          </tr>
          <tr>
            <td className="orange-background">圖案樣式</td>
            <td>{designName}</td>
          </tr>
          <tr>
            <td className="orange-background">手機殼材質</td>
            <td>液態矽膠(LSR)</td>
          </tr>
          <tr>
            <td className="orange-background">背板材質</td>
            <td>鋼化玻璃</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default DetailsTable;
