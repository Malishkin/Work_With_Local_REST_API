import React from 'react';
import { useTable, usePagination } from 'react-table'

function Table({columns, data}) {
  const {
    page,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  return (
    <>
      <div className="card">
        <div className="card-body">
              <table className="table table-light" {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>  

          <div className="pagination">
                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                  </button>{' '}
                  <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                  </button>{' '}
                  <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                  </button>{' '}
                  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                  </button>{' '}
                  <span>
                    Page{' '}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                  </span>
                  <span>
                    | Go to page:{' '}
                    <input
                      type="number"
                      defaultValue={pageIndex + 1}
                      onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                      }}
                      style={{ width: '100px' }}
                    />
                  </span>{' '}
                  <select
                    value={pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value))
                    }}
                  >
                    {[3, 7, 15].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
              </div>
            </div>
      </div>
    </>

  )
}

export default Table