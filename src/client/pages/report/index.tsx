import * as React from "react";
import './report.less';
import { Button } from 'antd';
const { useState } = React;

const Report: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="report-container">
      <Button type="primary" onClick={() => setCount(count + 1)}>Primary</Button>
      <p>this is report</p>
      <p>{count}</p>
    </div>
  )
};

export default Report;
