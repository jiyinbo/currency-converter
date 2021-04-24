import fetchRatesData from './dataService';
import API_BASE_URL from './config';

const response = {
  base: 'EUR',
  date: '2021-04-23',
  rates: {
    GBP: 0.86905, HKD: 9.3653, IDR: 17526.35, ILS: 3.9256, DKK: 7.4361, INR: 90.4715,
  },
};

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(response),
}));

beforeEach(() => { fetch.mockClear(); });

describe('fetchRatesData', () => {
  it('return value for fetch action', async () => {
    const rate = await fetchRatesData('EUR', '2021-04-23');

    expect(rate).toEqual(response);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return null in case of exceptions', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Unable to fetch rates')));
    const rate = await fetchRatesData('EUR', '2021-04-23');

    expect(rate).toEqual(null);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/2021-04-23?base=EUR`);
  });
});
