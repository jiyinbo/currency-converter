import Vue from 'vue';
import Vuex from 'vuex';

import fetchRatesData from '../shared/utils/dataService';
import FETCH_RATES_DATA from './mutation-types';

Vue.use(Vuex);

const state = () => ({
  rates: [],
});

export const mutations = {
  [FETCH_RATES_DATA](currentState, ratesData) {
    currentState.rates.push(ratesData);
  },
};

export const actions = {
  async fetchRatesAction({ commit }, { base, date }) {
    const ratesData = await fetchRatesData(base, date);
    commit(FETCH_RATES_DATA, ratesData);
  },
};

export const getters = {
  getRatesByBaseAndDate: (currentState) => (base, date) => currentState.rates
    .find((r) => r.base === base && r.date === date),

  getFirstRateData: (currentState) => () => (currentState.rates.length > 0
    ? currentState.rates[0].rates : {}),
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
