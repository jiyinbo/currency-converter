import API_BASE_URL from './config';

const fetchRatesData = async (base, date) => {
  let ratesData;

  try {
    await fetch(`${API_BASE_URL}/api/${date}?base=${base}`)
      .then((response) => response.json())
      .then((data) => { ratesData = data; });
  } catch (error) {
    console.error(`Err: ${error}`);
  }

  return ratesData;
};

export default fetchRatesData;
