import React from 'react';
import TableComponent from './TableComponent';

interface TableItem {
    id: number;
    txnID: string;
    amount: number;
    initTime: number;
    finalizedTime: number;
  }

interface TableContainerProps {
  data: TableItem[];
  title: string;
}

const TableContainer: React.FC<TableContainerProps> = ({ data, title }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">{title}</h2>
      <TableComponent data={data} />
    </div>
  );
}

export default TableContainer;
