import PseudonymRegistration from '@/views/PseudonymRegistration.vue';
import {mount} from '@vue/test-utils';
import Vue from 'vue';

describe('PseudonymRegistration', () => {
  it('should switch from InputDialog to ResultDialog on receiving a pseudonym', () => {
    const wrapper = mount(PseudonymRegistration);
    const vm = wrapper.vm as any;
    const newIsDuplicate = false;
    expect(wrapper.find('#input-screen').exists()).toBeTruthy();
    expect(wrapper.find('#result-screen').exists()).toBeFalsy();
    vm.setPseudonym('my new pseudonym', newIsDuplicate);
    Vue.nextTick(() => {
      expect(wrapper.find('#input-screen').exists()).toBeFalsy();
      expect(wrapper.find('#result-screen').exists()).toBeTruthy();
    });
  });
});
