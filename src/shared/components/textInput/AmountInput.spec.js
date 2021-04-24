import { mount } from '@vue/test-utils';
import AmountInput from './AmountInput.vue';

describe('AmountInput', () => {
  const wrapper = mount(AmountInput, {
    propsData: {
      id: 'from',
      label: 'From',
    },
  });

  it('should contain html elements with correct defaule value', async () => {
    const div = wrapper.find('div');
    const label = wrapper.find('label');
    const amountInput = wrapper.find('input[type="number"]');

    expect(div.exists()).toBe(true);
    expect(label.exists()).toBe(true);
    expect(amountInput.exists()).toBe(true);
    expect(amountInput.element.value).toBe('');
  });

  it('should emit handleChange event on keyup', async () => {
    wrapper.vm.$emit('handleChange');
    await wrapper.find('input[type = "number"]').trigger('keyup', '10');

    expect(wrapper.emitted().handleChange).toBeTruthy();
  });
});
