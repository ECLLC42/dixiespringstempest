declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_RADAR_LAT: string;
      NEXT_PUBLIC_RADAR_LON: string;
      // ... other env vars
    }
  }
}

export {} 