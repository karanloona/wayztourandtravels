import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftSidebar } from './Dashboard';
import { useTable, usePagination } from 'react-table';
import dayjs from 'dayjs';

export const InquiryAdmin = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}booking/all/inquiry`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setInquiries(data);
          setFilteredInquiries(data);
        }
      })
      .catch((error) => console.error('Error fetching inquiries:', error));
  }, [navigate]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredInquiries(inquiries);
    } else {
      const filtered = inquiries.filter((inq) =>
        inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInquiries(filtered);
    }
  }, [searchTerm, inquiries]);

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Message', accessor: 'message' },
      {
        Header: 'Date',
        accessor: 'createdAt',
        Cell: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm'), // or use new Date(value).toLocaleString()
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredInquiries,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div className="flex bg-gray-100 min-h-screen pt-28 sm:pt-32 md:pt-36">
      <LeftSidebar />
      <div className="flex-1 p-4 sm:p-6 md:pl-72 mt-20 md:mt-32">
        <div className="max-w-full mx-auto">
          <div className="mb-4 sm:mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email"
              className="w-full sm:max-w-md p-2 border rounded text-black text-sm sm:text-base"
            />
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Inquiries</h3>
            {filteredInquiries.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th
                              {...column.getHeaderProps()}
                              className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {column.render('Header')}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                              <td
                                {...cell.getCellProps()}
                                className="px-3 sm:px-6 py-2 sm:py-4 text-sm text-gray-900"
                              >
                                {cell.render('Cell')}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                      className="px-3 sm:px-4 py-2 bg-[#D4AF37] text-[#0c1b2b] rounded hover:bg-[#e0c056] disabled:bg-gray-300 text-sm sm:text-base"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                      className="px-3 sm:px-4 py-2 bg-[#D4AF37] text-[#0c1b2b] rounded hover:bg-[#e0c056] disabled:bg-gray-300 text-sm sm:text-base"
                    >
                      Next
                    </button>
                  </div>
                  <div className="text-sm text-gray-700">
                    Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                  </div>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="p-2 border rounded text-sm sm:text-base"
                  >
                    {[10, 20].map((size) => (
                      <option key={size} value={size}>
                        Show {size}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <p className="text-gray-600">No inquiries found for the search term.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryAdmin;
