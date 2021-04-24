<template>
<div v-if="otherCurrencies.length > 0">
  <h3>Other Currency Conversion</h3>
  <table>
    <thead>
      <tr>
        <th>Currency</th>
        <th>Conversion Rate</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody v-for="(currency, idx) in otherCurrencies" :key="idx">
      <tr>
        <th>{{ currency.key }}</th>
        <th>{{ currency.rate }}</th>
        <th>{{ currency.value }}</th>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import propsMixin from './props-mixin';

export default {
  name: 'MoreConversionResult',
  mixins: [propsMixin],
  computed: {
    ...mapGetters(['getRatesByBaseAndDate']),
    validInputData() {
      const { amount, from, to } = this.inputData;
      return amount && from && from !== 'Select Currency' && to && to !== 'Select Currency';
    },
    otherCurrencies() {
      const { from, date, amount } = this.inputData;

      const otherCurrenciesData = [];

      if (!this.validInputData) return otherCurrenciesData;

      const rateData = this.getRatesByBaseAndDate(from, date);

      if (rateData) {
        const { rates } = rateData;

        for (const key in rates) {
          if (Object.hasOwnProperty.call(rates, key)) {
            otherCurrenciesData.push({
              key,
              rate: `1 ${from} = ${rates[key].toFixed(2)} ${key}`,
              value: `${amount} ${from} = ${(amount * rates[key]).toFixed(2)} ${key}`,
            });
          }
        }
      }

      return otherCurrenciesData;
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {background-color:#f5f5f5;}
</style>
