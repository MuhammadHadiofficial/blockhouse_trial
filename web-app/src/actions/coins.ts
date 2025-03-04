import axios from "axios";

export const queryCoinData = async (coinId:string) => {
  try {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinId}`);
    // Returns specific coin data from response.data.data
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data for coin ${coinId}:`, error);
    throw error;
  }
};

export const queryAllCoins = async () => {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    // Returns an array of coins from response.data.data
    return response.data.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
};
