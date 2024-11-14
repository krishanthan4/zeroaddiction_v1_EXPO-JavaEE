type FetchArduinoDataProps = {
  setPhoneStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setDeviceStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

// Function with typed parameters
export const fetchArduinoData = async ({
  setPhoneStatus,
  setDeviceStatus,
}: FetchArduinoDataProps): Promise<void> => {
  try {
    const request = await fetch(`${process.env.EXPO_PUBLIC_ESP_URL}/?device=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (request.ok) {
      setDeviceStatus(true);
      const data = await request.json();
      if (
        data.ultrasonic1 <= 180 &&
        data.ultrasonic2 <= 180 &&
        data.LDR1 <= 800 &&
        data.LDR2 <= 800 &&
        data.LDR3 <= 800
      ) {
        setPhoneStatus(true); // Set phoneStatus to true if conditions are met
      } else {
        setPhoneStatus(false);
      }
    } else {
      setDeviceStatus(false);
      setPhoneStatus(false);
    }
  } catch (error) {
    console.log('Error fetching Arduino data:', error);
    setDeviceStatus(false);
    setPhoneStatus(false);
  }
};
