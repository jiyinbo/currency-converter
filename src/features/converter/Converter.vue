<template>
  <div>
    <h2>Currency Converter</h2>
    <div class="wrap">
      <div class="item">
        <SelectInput :options="currencies" id="from" label="From:"
          @handleChange="currency => handleInputChange('from', currency)"/>
      </div>
      <div class="item">
        <SelectInput :options="currencies" id="to" label="To:"
          @handleChange="currency => handleInputChange('to', currency)"/>
      </div>
      <div class="item">
        <AmountInput id="amount" :label="amountLabel"
          @handleChange="amount => handleInputChange('amount', amount)"/>
      </div>
      <div class="item">
        <DateInput id="date" label="Conversion Date:"
          @handleChange="date => handleInputChange('date', date)"/>
      </div>
    </div>
    <span v-if="message">{{ message }}</span>
    <ConversionResult :inputData="inputData"/>
    <hr/>
    <MoreConversionResult :inputData="inputData"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AmountInput from '../../shared/components/textInput/AmountInput.vue';
import SelectInput from '../../shared/components/selectInput/SelectInput.vue';
import DateInput from '../../shared/components/dateInput/DateInput.vue';
import ConversionResult from './ConversionResult.vue';
import MoreConversionResult from './MoreConversionResult.vue';

export default {
  name: 'Converter',
  data() {
    return {
      inputData: {
        amount: '',
        from: '',
        to: '',
        date: new Date().toISOString().slice(0, 10),
      },
      message: '',
    };
  },
  components: {
    AmountInput, SelectInput, DateInput, ConversionResult, MoreConversionResult,
  },
  async created() {
    await this.loadRates('USD', this.inputData.date);
  },
  methods: {
    ...mapActions(['fetchRatesAction']),
    async loadRates(base, date) {
      this.message = 'Fetching data, please be patient...';
      await this.fetchRatesAction({ base, date });
      this.message = '';
    },
    handleInputChange(key, value) {
      this.inputData[key] = value;
    },
  },
  computed: {
    ...mapGetters(['getFirstRateData']),
    currencies() {
      const rates = JSON.parse(JSON.stringify(this.getFirstRateData()));
      const currencies = ['Select Currency'];

      for (const key in rates) {
        if (Object.hasOwnProperty.call(rates, key)) {
          currencies.push(key);
        }
      }
      return currencies;
    },
    amountLabel() {
      return this.inputData.from === 'Select Currency' || this.inputData.from === ''
        ? 'Amount:'
        : `Amount (${this.inputData.from}):`;
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

.wrap {
  display: flex;
  justify-content: space-between;
}

.item {
  width: 23%;
}

@media (max-width: 767px) {
  .wrap {
    flex-direction: column;
  }

  .item {
    width: auto;
  }
}
</style>
