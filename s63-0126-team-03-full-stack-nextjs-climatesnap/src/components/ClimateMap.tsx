'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';

type ClimateSummary = {
  cityName: string;
  cityState?: string;
  latestReading: {
    temperature: number;
    rainfall: number;
    airQuality: number;
    recordedAt: string;
  } | null;
};

type Props = {
  data: ClimateSummary[];
};

const indiaCenter: LatLngExpression = [22.9734, 78.6569];

const cityCoordinates: Record<string, LatLngExpression> = {
  Delhi: [28.6139, 77.209],
  Mumbai: [19.076, 72.8777],
  Bengaluru: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Kolkata: [22.5726, 88.3639],
  Hyderabad: [17.385, 78.4867],
  Ahmedabad: [23.0225, 72.5714],
  Pune: [18.5204, 73.8567],
  Jaipur: [26.9124, 75.7873],
};

export default function ClimateMap({ data }: Props) {
  const itemsWithCoords = data
    .map((item) => {
      const coords = cityCoordinates[item.cityName];
      if (!coords || !item.latestReading) return null;
      return { ...item, coords };
    })
    .filter(Boolean) as Array<
    ClimateSummary & { coords: LatLngExpression }
  >;

  return (
    <div className="h-80 w-full overflow-hidden rounded-2xl border border-slate-800">
      <MapContainer
        center={indiaCenter}
        zoom={4.5}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {itemsWithCoords.map((item) => (
          <Marker key={item.cityName} position={item.coords}>
            <Popup>
              <div className="space-y-1 text-xs">
                <p className="font-semibold">
                  {item.cityName}
                  {item.cityState ? `, ${item.cityState}` : ''}
                </p>
                <p>Temp: {item.latestReading!.temperature.toFixed(1)} °C</p>
                <p>Rainfall: {item.latestReading!.rainfall.toFixed(1)} mm</p>
                <p>AQI: {item.latestReading!.airQuality}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

