import * as React from "react";
import Nav from "@components/nav";
import ReportStore from '@models/reportStore';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
const { useContext } = React;


const Report: React.FC = observer(() => {
  const reportStore = useContext(ReportStore);
  console.log('reportStore', reportStore);
  return (
    <div>
      <Nav />
      <p>this is report</p>
      <Button onClick={() => reportStore.add('zxy')}>11</Button>
      <p>num:{reportStore.num}</p>
    </div>
  )
});

export default Report;
