import { mount } from '@vue/test-utils';
import SelectInput from './SelectInput.vue';

describe('SelectInput', () => {
  const wrapper = mount(SelectInput, {
    propsData: {
      id: 'from',
      options: ['Select Currency', 'EUR', 'USD'],
      label: 'From',
    },
  });

  it('should contain html elements with correct defaule value', async () => {
    const div = wrapper.find('div');
    const label = wrapper.find('label');
    const selectInput = wrapper.find('select');

    expect(div.exists()).toBe(true);
    expect(label.exists()).toBe(true);
    expect(selectInput.exists()).toBe(true);
    expect(selectInput.element.value).toBe('Select Currency');
  });

  it('should emit handleChange event on change', async () => {
    wrapper.vm.$emit('handleChange');
    await wrapper.find('select').trigger('change', 'EUR');

    expect(wrapper.emitted().handleChange).toBeTruthy();
  });
});
