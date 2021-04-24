import { mount } from '@vue/test-utils';
import DateInput from './DateInput.vue';

describe('DateInput', () => {
  const wrapper = mount(DateInput, {
    propsData: {
      id: 'amount',
      label: 'Amount',
    },
  });

  it('should contain html elements with correct defaule value', () => {
    const div = wrapper.find('div');
    const label = wrapper.find('label');
    const dateInput = wrapper.find('input[type="date"]');

    expect(div.exists()).toBe(true);
    expect(label.exists()).toBe(true);
    expect(dateInput.exists()).toBe(true);
    expect(dateInput.element.value)
      .toBe(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  });

  it('should emit handleChange event on change', async () => {
    wrapper.vm.$emit('handleChange');
    await wrapper.find('input[type="date"]').trigger('change', new Date().toISOString().slice(0, 10));

    expect(wrapper.emitted().handleChange).toBeTruthy();
  });
});
