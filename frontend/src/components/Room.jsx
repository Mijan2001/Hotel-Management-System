import { Link } from "react-router-dom";

function RoomCard({ roomNumber, roomType, pricePerHour, imageUrl }) {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white text-center">
      <img className="w-full" src={imageUrl} alt={`Room ${roomNumber}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`Room ${roomNumber}`}</div>
        <p className="text-gray-700 text-base">
          {`Price: BDT ${pricePerHour}/hr`}
        </p>
        <div className="mt-4">
          <Link to="/add" state={{ roomNumber, roomType, pricePerHour }}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              Book Room
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
