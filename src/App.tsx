import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import TableContainer from './components/TableContainer';
import * as utils from './utils';


interface TableItem {
  id: number;
  txnID: string;
  amount: number;
  initTime: number;
  finalizedTime: number;
}

interface Summary {
  availableCredit: number;
  payableBalance: number;
  pendingEvents: TableItem[];
  settledEvents: TableItem[];
}

const empty_summary: Summary = {
  availableCredit: 0,
  payableBalance: 0,
  pendingEvents: [],
  settledEvents: [],
}


function App() {
  const [summary, setSummary] = useState<Summary>(empty_summary);

  useEffect(() => {
      // Fetch the summary from the server with the JSON payload
      fetch('http://127.0.0.1:5000/api/get_summary')
        .then((response) => response.json())
        .then((data) => setSummary(data.summary))
        .catch((error) => console.error('Error fetching summary:', error));
  }, []);

  return (
    <div className="App">
      <h1>Credit Card Processing App</h1>
      <Banner
        title1="Available credit"
        message1={utils.formatDollarAmount(summary.availableCredit)}
        title2="Make Payment"
        title3="Payable Balance"
        message3={utils.formatDollarAmount(summary.payableBalance)}
      />
      <div className="tables-wrapper">
        <TableContainer data={summary.pendingEvents} title="Pending Transactions"/>
        <TableContainer data={summary.settledEvents} title="Settled Transactions" />
      </div>
    </div>
  );
}

export default App;