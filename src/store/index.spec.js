import { getters, mutations, actions } from './index';
import fetchRatesData from '../shared/utils/dataService';

jest.mock('../shared/utils/dataService');

const rate1 = {
  base: 'EUR',
  date: '2021-04-23',
  rates: {
    GBP: 0.86905, HKD: 9.3653, IDR: 17526.35, ILS: 3.9256, DKK: 7.4361, INR: 90.4715,
  },
};

const rate2 = {
  base: 'USD',
  date: '2021-04-23',
  rates: {
    GBP: 0.720246975, HKD: 7.7617271672, IDR: 14525.4019559092, ILS: 3.2534394165,
  },
};

const state = { rates: [rate1, rate2] };
const emptyState = { rates: [] };

describe('getRatesByBaseAndDate', () => {
  it('should return rate by base and date', () => {
    const actual = getters.getRatesByBaseAndDate(state)('USD', '2021-04-23');
    expect(actual).toEqual(rate2);
  });

  it('should return undefined if there are no rates', () => {
    const actual = getters.getRatesByBaseAndDate(emptyState)('USD', '2021-04-23');
    expect(actual).toEqual(undefined);
  });
});

describe('getFirstRateData', () => {
  it('should return rate property from the first store data', () => {
    const actual = getters.getFirstRateData(state)();
    expect(actual).toEqual({
      GBP: 0.86905, HKD: 9.3653, IDR: 17526.35, ILS: 3.9256, DKK: 7.4361, INR: 90.4715,
    });
  });

  it('should return an empty object if there are no rates', () => {
    const actual = getters.getFirstRateData(emptyState)();
    expect(actual).toEqual({});
  });
});

describe('fetchRatesData', () => {
  it('should save rate to store', () => {
    mutations.fetchRatesData(emptyState, rate1);
    mutations.fetchRatesData(emptyState, rate2);
    expect(emptyState).toEqual(state);
  });
});

describe('fetchRatesAction', () => {
  it('should fetch conversion rate and save his data to the store', async () => {
    const commitSpy = jest.fn();
    const baseAndDate = { base: 'EUR', date: '2021-04-23' };

    fetchRatesData.mockResolvedValue(rate1);

    await actions.fetchRatesAction({ commit: commitSpy }, baseAndDate);

    expect(commitSpy).toHaveBeenCalledTimes(1);
    expect(commitSpy).toHaveBeenCalledWith('fetchRatesData', rate1);
  });
});
