/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import ClimateMap from '@/components/ClimateMap';

type ClimateSummary = {
  cityId?: string | number;
  cityName: string;
  cityState?: string;
  latestReading: {
    id: string | number;
    temperature: number;
    rainfall: number;
    airQuality: number;
    recordedAt: string;
  } | null;
};

type ClimateApiResponse = {
  success: boolean;
  message: string;
  data?: {
    items: ClimateSummary[];
    count: number;
  };
};

export default function DashboardPage() {
  const [data, setData] = useState<ClimateSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch('/api/climate');
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json: ClimateApiResponse = await res.json();
        if (!json.success || !json.data) {
          throw new Error(json.message || 'Failed to load climate data');
        }

        setData(json.data.items);
      } catch (err) {
        console.error('Failed to load climate data', err);
        setError('Unable to load climate data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-50">
      <main className="flex w-full max-w-5xl flex-col gap-8 rounded-3xl bg-slate-900/60 p-8 shadow-xl ring-1 ring-slate-800">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              ClimateSnap
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Climate dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              This is a placeholder dashboard. Hook it up to climate APIs and
              charts as you build out the system.
            </p>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Overview
              </p>
              <p className="mt-1 text-sm text-slate-200">
                Each row shows the most recent climate reading for a city.
              </p>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {data.length} cities
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10 text-sm text-slate-300">
              Loading climate data…
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-500/50 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-slate-300">
              <p>No climate data found.</p>
              <p className="text-xs text-slate-500">
                Seed the database with climate records to see them here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="py-2 pr-4">City</th>
                    <th className="py-2 pr-4">Temperature (°C)</th>
                    <th className="py-2 pr-4">Rainfall (mm)</th>
                    <th className="py-2 pr-4">Air quality (AQI)</th>
                    <th className="py-2 pr-4">Recorded at</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {data.map((item) => (
                    <tr key={item.cityId}>
                      <td className="py-2 pr-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-100">
                            {item.cityName}
                          </span>
                          <span className="text-xs text-slate-400">
                            {item.cityState}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 pr-4">
                        {item.latestReading
                          ? `${item.latestReading.temperature.toFixed(1)} °C`
                          : '—'}
                      </td>
                      <td className="py-2 pr-4">
                        {item.latestReading
                          ? `${item.latestReading.rainfall.toFixed(1)} mm`
                          : '—'}
                      </td>
                      <td className="py-2 pr-4">
                        {item.latestReading
                          ? item.latestReading.airQuality
                          : '—'}
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-400">
                        {item.latestReading
                          ? new Date(
                              item.latestReading.recordedAt,
                            ).toLocaleString()
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {!isLoading && !error && data.length > 0 && (
          <section className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                India climate map
              </p>
              <p className="text-sm text-slate-200">
                Markers show seeded Indian cities with their latest climate
                snapshot.
              </p>
              <ClimateMap data={data} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

