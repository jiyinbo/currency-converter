export default {
  props: {
    inputData: {
      type: Object,
      required: true,
      validator(value) {
        return ['amount', 'from', 'to', 'date'].every((key) => Object.keys(value).includes(key));
      },
    },
  },
};
