import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LeftSidebar } from "./Dashboard";
import { useTable, usePagination } from "react-table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from "@fortawesome/free-solid-svg-icons";

export const BookingAdmin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}booking/recent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setBookings(data);
          setFilteredBookings(data);
        }
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [navigate]);

  // Handle search filtering
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((booking) =>
        booking.date.includes(searchTerm)
      );
      setFilteredBookings(filtered);
    }
  }, [searchTerm, bookings]);

  // Function to update booking status
  const updateBookingStatus = async (bookingId, newStatus) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}booking/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingStatus: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, bookingStatus: newStatus }
            : booking
        )
      );
      setFilteredBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, bookingStatus: newStatus }
            : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking status");
    }
  };

  const handleRefundAction = async (uuid, setButtonText, isRefreshOnly = false) => {
    const token = window.localStorage.getItem("token");
    try {
      // If this is a refresh action, we need to check if refund was already initiated
      if (isRefreshOnly) {
        const booking = bookings.find(b => b.uuid === uuid);
        if (!booking || booking.paymentStatus === 0 || booking.paymentStatus === 1) {
          alert("Cannot refresh refund status - no refund has been initiated yet.");
          return;
        }
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}booking/refund/check-or-initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uuid }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Refund action failed");
      }

      if (setButtonText) {
        setButtonText(
          data.refundStatus === "succeeded" ? "Refunded" : "Check Now"
        );
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.uuid === uuid
            ? {
                ...b,
                refundStatus: data.refundStatus,
                paymentStatus: data.updatedPaymentStatus ?? b.paymentStatus,
              }
            : b
        )
      );
      setFilteredBookings((prev) =>
        prev.map((b) =>
          b.uuid === uuid
            ? {
                ...b,
                refundStatus: data.refundStatus,
                paymentStatus: data.updatedPaymentStatus ?? b.paymentStatus,
              }
            : b
        )
      );

      // Only reload if it's not a refresh action
      if (!isRefreshOnly) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Refund error:", error);
      alert(error.message || "Error processing refund");
    }
  };

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "Uuid",
        accessor: "uuid",
        Cell: ({ value }) => {
          const [showCopied, setShowCopied] = useState(false);

          const handleCopy = () => {
            navigator.clipboard.writeText(value).then(() => {
              setShowCopied(true);
              setTimeout(() => setShowCopied(false), 2000);
            });
          };

          return (
            <div className="relative">
              <span
                className="cursor-pointer hover:text-[#D4AF37] transition-colors"
                onClick={handleCopy}
                title="Click to copy"
              >
                {value}
              </span>
              {showCopied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-md">
                  UUID copied
                </span>
              )}
            </div>
          );
        },
      },
      { Header: "Name", accessor: (row) => `${row.firstName} ${row.lastName}` },
      { Header: "Email", accessor: "email" },
      { Header: "Contact", accessor: "contact" },
      { Header: "Travelers", accessor: "numberOfTravelers" },
      { Header: "Infants", accessor: "infants" },
      { Header: "Date", accessor: "date" },
      {
        Header: "Trip Protection",
        accessor: "tripProtection",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
        Cell: ({ value }) => `$${value}`,
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        Cell: ({ value }) => {
          let statusLabel = "";
          let statusClass = "";

          switch (value) {
            case 0:
              statusLabel = "Pending";
              statusClass = "bg-yellow-100 text-yellow-800";
              break;
            case 1:
              statusLabel = "Paid";
              statusClass = "bg-green-100 text-green-800";
              break;
            case 2:
              statusLabel = "Refund Initiated";
              statusClass = "bg-blue-100 text-blue-800";
              break;
            case 3:
              statusLabel = "Refund Completed";
              statusClass = "bg-teal-100 text-teal-800";
              break;
            default:
              statusLabel = "Failed";
              statusClass = "bg-gray-100 text-gray-800";
              break;
          }

          return (
            <span
              className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}
            >
              {statusLabel}
            </span>
          );
        },
      },
      {
        Header: "Booking Status",
        accessor: "bookingStatus",
        Cell: ({ row }) => {
          const isRefunded = row.original.paymentStatus === 3;
          return (
            <button
              onClick={() =>
                updateBookingStatus(
                  row.original.id,
                  row.original.bookingStatus === 0 ? 1 : 0
                )
              }
              className={`px-4 py-2 rounded-lg text-white text-xs sm:text-sm ${
                row.original.bookingStatus === 0
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              } ${isRefunded ? "bg-gray-400 cursor-not-allowed" : ""} transition-colors`}
              disabled={isRefunded}
            >
              {row.original.bookingStatus === 0 ? "Confirm" : "Pending"}
            </button>
          );
        },
      },
      {
        Header: "Refund",
        accessor: "refundStatus",
        Cell: ({ row }) => {
          const booking = row.original;
          const hasTripProtection = booking.tripProtection === true;
          const isRefunded = booking.paymentStatus === 3;

          const getButtonText = () => {
            if (!hasTripProtection) return "No Trip Protection";
            if (isRefunded) return "Refunded";
            if (booking.refundStatus) return "Check Now";
            return "Initiate Refund";
          };

          const getTooltipText = () => {
            if (!hasTripProtection) return "This booking does not include trip protection. Refunds are only available for bookings with trip protection.";
            if (isRefunded) return "The refund has already been processed.";
            if (booking.refundStatus) return "Click to check current refund status.";
            return "Click to initiate the refund process. Note: Trip protection fee ($18) will be deducted from refund amount.";
          };

          const [buttonText, setButtonText] = useState(getButtonText());

          return (
            <button
              onClick={() => handleRefundAction(booking.uuid, setButtonText)}
              title={getTooltipText()}
              className={`px-3 py-1 rounded-md text-white text-xs sm:text-sm ${
                isRefunded || !hasTripProtection
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-all`}
              disabled={isRefunded || !hasTripProtection}
            >
              {buttonText}
            </button>
          );
        },
      },
      {
        Header: "Refresh Status",
        accessor: "refreshRefundStatus",
        Cell: ({ row }) => {
          const booking = row.original;
          const isRefunded = booking.paymentStatus === 3;
          const hasTripProtection = booking.tripProtection === true;
          const canRefresh = booking.paymentStatus === 2; // Only can refresh if refund is initiated
      
          return (
            <button
              onClick={() => handleRefundAction(booking.uuid, null, true)}
              title={
                !hasTripProtection 
                  ? "No trip protection - no refund available" 
                  : isRefunded 
                    ? "Refund completed" 
                    : canRefresh 
                      ? "Check refund status" 
                      : "No refund initiated yet"
              }
              className={`p-2 rounded-md text-white text-xs sm:text-sm ${
                isRefunded || !hasTripProtection || !canRefresh
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-all`}
              disabled={isRefunded || !hasTripProtection || !canRefresh}
            >
              <FontAwesomeIcon icon={faSync} />
            </button>
          );
        },
      }
    ],
    [bookings]
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      { columns, data: filteredBookings, initialState: { pageIndex: 0 } },
      usePagination
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftSidebar />
      <div className="flex-1 p-6 sm:p-10 overflow-x-auto md:mt-20 md:ml-60">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Recent Bookings
          </h1>
          <input
            type="text"
            placeholder="Search by date (e.g. 2024-04-12)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="w-full border-collapse rounded-lg shadow-md bg-white"
          >
            <thead className="bg-gray-100">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-left text-sm text-gray-600"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-3 font-medium border-b"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="text-sm sm:text-base text-gray-700"
            >
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-4 py-3">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default BookingAdmin