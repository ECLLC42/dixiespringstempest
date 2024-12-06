import { useEffect, useRef } from 'react';

interface WebSocketData {
  type: string;
  obs?: number[][];
  // Add other properties as needed
}

export function useWeatherSocket(onData: (data: WebSocketData) => void) {
  const dataBuffer = useRef<WebSocketData>({
    type: ""
  });
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let ws: WebSocket;
    
    const processData = () => {
      if (Object.keys(dataBuffer.current).length > 1) {
        onData(dataBuffer.current);
        dataBuffer.current = { type: "" };
      }
    };

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
        
        // Accumulate data based on type
        if (data.type === 'obs_st') {
          dataBuffer.current = {
            ...dataBuffer.current,
            obs: data.obs
          };
        }

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set new timeout to process accumulated data
        timeoutRef.current = setTimeout(processData, 5000); // Wait 5 seconds for more data
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected, reconnecting...');
        setTimeout(connect, 1000);
      };
    };

    connect();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      ws?.close();
    };
  }, [onData]);
} 