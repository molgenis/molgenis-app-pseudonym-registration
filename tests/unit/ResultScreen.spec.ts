import ResultScreen from '@/views/ResultScreen.vue';
import {shallowMount} from '@vue/test-utils';
import Vue from 'vue';

const writeText = jest.fn().mockResolvedValue(true);
Object.assign(navigator, {
  clipboard: {
    writeText
  }
});

describe('ResultScreen', () => {
  it('should send pseudonym to clipboard', () => {
    const wrapper = shallowMount(ResultScreen, {
      propsData: {
        pseudonym: 'Pseudonym'
      }
    });
    const vm = wrapper.vm as any;

    expect(vm.isOnClipboard).toBeFalsy();
    vm.sendToClipboard('toClipboard');
    expect(writeText).toBeCalledWith('toClipboard');
    Vue.nextTick(() => {
      expect(vm.isOnClipboard).toBeTruthy();
    });
  });
});
