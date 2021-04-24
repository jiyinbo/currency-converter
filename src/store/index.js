import Vue from 'vue';
import Vuex from 'vuex';

import fetchRatesData from '../shared/utils/data.service';
import FETCH_RATES_DATA from './mutation-types';

Vue.use(Vuex);

const state = () => ({
  rates: [],
});

const mutations = {
  [FETCH_RATES_DATA](currentState, ratesData) {
    if (ratesData?.rates) currentState.rates.push(ratesData);
  },
};

const actions = {
  async fetchRatesAction({ commit }, { base, date }) {
    const ratesData = await fetchRatesData(base, date);
    commit(FETCH_RATES_DATA, ratesData);
  },
};

const getters = {
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
