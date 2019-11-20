import * as React from "react";
import Nav from "@components/nav";
import ReportStore from '@models/reportStore';
import { observer } from 'mobx-react-lite'
import { Button } from 'antd';
const {useContext} = React;
const Home: React.FC = observer((props) => {
  console.log('props',props)
  const reportStore = useContext(ReportStore);
  return (
    <div>
      <Nav />
      <p>this is home</p>
      <Button onClick={() => reportStore.add('zxy')}>11</Button>
      <p>num:{reportStore.num}</p>
    </div>
  )
});

export default Home;
