import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

const columns = [
  { field: 'id', headerName: 'ID'},
  {
    field: 'address',
    headerName: 'Địa chỉ',
    editable: false,
    width: 200
  },
  {
    field: 'province',
    headerName: 'Tỉnh thành',
    editable: false,
    width: 150
  },
  {
    field: 'district',
    headerName: 'Quận huyện',
    editable: false,
    width: 200
  },
  {
    field: 'ward',
    headerName: 'Phường xã',
    editable: false,
    width: 150
  },
  {
    field: 'price',
    headerName: 'Giá',
    editable: false,
    width: 100
  },
  {
    field: 'area',
    headerName: 'Diện tích (m2)',
    editable: false,
    width: 200
  },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    option: false,
    renderCell: (params) => (
      <strong>
        <button className="btn btn-sm btn-primary m-1">Chi tiết</button>
        <button className="btn btn-sm btn-secondary m-1">Chỉnh sửa</button>
        <button className="btn btn-sm btn-danger m-1">Xóa</button>
      </strong>
    ),
    width: 300
  }
];

export default function DataTable({ roomsData }) {
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, action: null},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
  );
}
