import { useEffect } from 'react';

export function useWeatherSocket(onData: (data: any) => void) {
  useEffect(() => {
    let ws: WebSocket;
    
    const connect = () => {
      ws = new WebSocket(
        `wss://ws.weatherflow.com/swd/data?token=${process.env.NEXT_PUBLIC_TEMPEST_TOKEN}`
      );

      ws.onopen = () => {
        console.log('WebSocket Connected');
        ws.send(JSON.stringify({
          type: "listen_start",
          device_id: process.env.NEXT_PUBLIC_DEVICE_ID,
          id: "1"
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onData(data);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected, reconnecting...');
        setTimeout(connect, 1000);
      };
    };

    connect();
    return () => ws?.close();
  }, [onData]);
} 