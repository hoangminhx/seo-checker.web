import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table } from 'reactstrap'
import styled from 'styled-components'

import { ensureArray } from '../../../helpers/array.helper'
import { SearchEngines } from '../SearchPage'

const CustomTable = styled(Table)`
  margin-top: 20px;
`

const ResultList = ({ result }) => {

  const columns = [
    {
      header: 'Search engines',
      accessorKey: 'searchEngine',
      cell: ({ getValue }) => {
        const searchEngine = SearchEngines.find(e => e.value === getValue())
        return searchEngine ? searchEngine.label : null
      }
    },
    {
      header: 'Found result at',
      accessorKey: 'indexes',
      cell: ({ getValue }) => {
        const indexes = getValue()
        return ensureArray(indexes).length ? indexes.join(', ') : 0
      }
    },
  ]

  const table = useReactTable({
    columns,
    data: result,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <CustomTable hover>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </CustomTable>
  )
}

export default ResultList