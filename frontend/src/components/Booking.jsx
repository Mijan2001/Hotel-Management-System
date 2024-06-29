import { Link } from "react-router-dom";

function BookingCard({ booking }) {
  function getDate(date) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", options);
  }

  const newPrice = booking.price
    ? booking.price.toLocaleString("en-BD", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "BDT",
      })
    : "N/A";

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`Room Number: ${booking.roomNumber}`}</div>
        <div className="text-gray-700 text-base mb-2">
          <strong>Price: </strong>
          {`${newPrice}`}
        </div>
        <div className="text-gray-700 text-base mb-2">
          <strong>Booking Start Date: </strong>
          {`${getDate(booking.startTime)}`}
        </div>
        <div className="text-gray-700 text-base mb-2">
          <strong>Booking End Date: </strong>
          {`${getDate(booking.endTime)}`}
        </div>
        <Link to="/update" state={booking}>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BookingCard;
