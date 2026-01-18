import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import districts from '../../../public/werehouse.json'

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Coverage = () => {
    // Bangladesh center
    const bangladeshPosition = [23.685, 90.3563];
    // search state
    const [searchText, setSearchText] = useState("");
    const mapRef = useRef(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    // marker refs (district wise)
    // search handler
    const handleSearch = (value) => {
        setSearchText(value);

        if (!value) {
            setSelectedDistrict(null);
            return;
        }

        const matchedDistrict = districts.find((item) =>
            item.district.toLowerCase().includes(value.toLowerCase())
        );

        if (matchedDistrict) {
            setSelectedDistrict(matchedDistrict);
        }
    };
    // Helper component 

    const FlyToDistrict = ({ position }) => {
        const map = useMap();

        if (position) {
            map.flyTo(position, 10, { duration: 1.5 });
        }

        return null;
    };

    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-6xl mx-auto px-4 text-center">

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    Our Coverage Area
                </h2>
                <p className="text-lg text-gray-500 mb-8">
                    We have available in 64 districts
                </p>

                {/* Search Box */}
                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search district name..."
                        className="input input-bordered w-full"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                {/* Map */}
                <div className="h-[450px] w-full rounded-xl overflow-hidden shadow-lg">
                    <MapContainer
                        center={bangladeshPosition}
                        zoom={7}
                        scrollWheelZoom={false}
                        className="h-full w-full"
                        whenCreated={(map) => (mapRef.current = map)}
                    >
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {selectedDistrict && (
                            <FlyToDistrict
                                position={[
                                    selectedDistrict.latitude,
                                    selectedDistrict.longitude,
                                ]}
                            />
                        )}
                        {districts.map((item) => (
                            <Marker
                                key={item.district}
                                position={[item.latitude, item.longitude]}
                            >
                                <Popup>
                                    <div className="text-sm">
                                        <h3 className="font-bold text-base">
                                            {item.district}
                                        </h3>
                                        <p><strong>Region:</strong> {item.region}</p>
                                        <p><strong>City:</strong> {item.city}</p>
                                    </div>
                                </Popup>
                            </Marker>

                        ))}
                    </MapContainer>
                </div>

            </div>
        </section>
    );
};

export default Coverage;
