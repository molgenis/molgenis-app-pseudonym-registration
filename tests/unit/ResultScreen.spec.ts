import ResultDialog from '@/components/ResultDialog.vue';
import {shallowMount} from '@vue/test-utils';
import Vue from 'vue';

const writeText = jest.fn().mockResolvedValue(true);
Object.assign(navigator, {
  clipboard: {
    writeText
  }
});

describe('ResultDialog', () => {
  it('should send pseudonym to clipboard', () => {
    const wrapper = shallowMount(ResultDialog, {
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
