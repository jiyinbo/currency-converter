<template>
  <div v-if="conversionResult">
    <h3>{{ conversionResult }}</h3>
    <p>{{ conversionRate }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import propsMixin from './props-mixin';

export default {
  name: 'ConversionResult',
  mixins: [propsMixin],
  methods: {
    ...mapActions(['fetchRatesAction']),
    async loadRates(base, date) {
      await this.fetchRatesAction({ base, date });
    },
  },
  computed: {
    ...mapGetters(['getRatesByBaseAndDate']),
    validInputData() {
      const { amount, from, to } = this.inputData;
      return amount && from && from !== 'Select Currency' && to && to !== 'Select Currency';
    },
    conversionResult() {
      const {
        amount, from, to, date,
      } = this.inputData;

      if (!this.validInputData) return '';

      const rateData = this.getRatesByBaseAndDate(from, date);
      return rateData
        ? `${amount} ${from} = ${(amount * rateData.rates[to]).toFixed(2)} ${to}`
        : 'Conversion rate for selected input is unknown';
    },
    conversionRate() {
      const { from, to, date } = this.inputData;
      if (!this.validInputData) return '';

      const rateData = this.getRatesByBaseAndDate(from, date);
      return rateData
        ? `1 ${from} = ${rateData.rates[to].toFixed(2)} ${to} (conversion rate as at ${date}). Source: https://api.ratesapi.io`
        : '';
    },
  },
  watch: {
    $props: {
      async handler() {
        if (this.validInputData) {
          const { from, date } = this.inputData;
          const ratesData = this.getRatesByBaseAndDate(from, date);
          if (!ratesData) await this.loadRates(from, date);
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
p {
    margin: 0 0 1em;
    line-height: 1.4285em;
}

h3 {
    font-size: 1.28571429rem;
    line-height: 1.28571429em;
    margin: calc(2rem - .14286em) 0 1rem;
    font-weight: 700;
}
</style>
