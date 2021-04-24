import API_BASE_URL from './config';

const fetchRatesData = async (base, date) => {
  try {
    const result = await fetch(`${API_BASE_URL}/api/${date}?base=${base}`);
    return await result.json();
  } catch (e) {
    return null;
  }
};

export default fetchRatesData;
