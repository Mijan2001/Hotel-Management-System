import React, { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../components/Room";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8080/rooms");
      setRooms(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-8">Available Rooms</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {rooms.map((room) => (
          <div key={room._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <RoomCard
              roomNumber={room.roomNumber}
              roomType={room.roomType}
              pricePerHour={room.pricePerHour}
              imageUrl={room.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
