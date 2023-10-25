import React from 'react';
import * as utils from '../utils';

interface TableItem {
    id: number;
    txnID: string;
    amount: number;
    initTime: number;
    finalizedTime: number;
  }

interface TableComponentProps {
  data: TableItem[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  return (
    <table className="custom-table">
    <thead>
        <tr>
        <th>Transaction ID</th>
        <th>Amount</th>
        <th>Time</th>
        <th>Finalized Time</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item, index) => (
        <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{item.txnID}</td>
            <td>{item.amount}</td>
            <td>{utils.formatTimestamp(item.initTime)}</td>
            <td>{utils.formatTimestamp(item.finalizedTime)}</td>
        </tr>
        ))}
    </tbody>
    </table>
  );
}

export default TableComponent;
