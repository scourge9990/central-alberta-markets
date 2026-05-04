'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Market {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  schedule?: string;
  slug: string;
}

interface Props {
  markets: Market[];
  center: [number, number];
  onSelectMarket?: (market: Market) => void;
}

export default function Map({ markets, center, onSelectMarket }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, 8);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Custom marker icons
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background:#FFEB43;color:#003594;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;">🌾</div>',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Add markers
    markets.forEach(market => {
      const marker = L.marker([market.lat, market.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width:200px;">
            <h3 style="margin:0 0 0.5rem;color:#003594;font-weight:bold;">${market.name}</h3>
            <p style="margin:0 0 0.25rem;">${market.address}</p>
            <p style="margin:0;color:#666;">🕐 ${market.schedule || 'See schedule'}</p>
          </div>
        `, { className: 'custom-popup' });
      
      marker.on('click', () => {
        onSelectMarket?.(market);
      });
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Update view when center changes
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView(center, 8);
    }
  }, [center]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}