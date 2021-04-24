import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  const wrapper = mount(App);

  it('has data', () => {
    expect(typeof App.data).toBe('function');
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('Currency Converter');
  });
});
