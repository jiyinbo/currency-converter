<template>
  <div class="field">
    <label v-if="id" :for="id">{{label}}</label>
    <input :id="id" placeholder="0.00" type="date" :value="currentDate"
      :min="ratesApiEarliestDate" :max="currentDate" @change="handleChange($event)" />
  </div>
</template>

<script>
export default {
  name: 'DateInput',
  data() {
    return {
      currentDate: new Date().toISOString().slice(0, 10),
      ratesApiEarliestDate: '1999-01-04',
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: String,
  },
  methods: {
    handleChange(event) {
      this.$emit('handleChange', event.target.value);
    },
  },
};
</script>

<style scoped>
.field {
    clear: both;
    margin: 1em 0;
}

label {
  display: block;
    margin: 0 0 .28571429rem;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
}

input {
  width: 90%;
  font-size: 1em;
  margin: 0em;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-align: left;
  line-height: 1.7em;
  padding: 0.67857143em 1em;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
}
</style>
