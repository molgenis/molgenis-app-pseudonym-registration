<template>
  <div id="input-screen">
    <p>
      {{ inputDescriptionText }}
    </p>
    <div class="input-group card-text mb-3">
      <input
        id="original-id-input"
        v-bind:value="localOriginalId"
        v-on:input="onInputChange"
        class="form-control"
        type="text"
      />
      <div class="input-group-append">
        <button
          id="pseudonym-generate-btn"
          class="btn btn-outline-primary"
          type="submit"
          :disabled="isGenerateDisabled"
          v-on:click="onGenerate(originalId)"
        >
          Generate
        </button>
      </div>
    </div>
    <div v-if="inputError" class="alert alert-warning" role="alert">
      <i class="fa fa-exclamation-triangle" /> {{ inputError }}
    </div>
    <div v-if="generationError" class="alert alert-warning" role="alert">
      <i class="fa fa-exclamation-triangle" /> {{ generationError }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  submitPseudonymRegistration,
  validateInput
} from '../logic/InputScreenUtil';
import IPseudonymResult from '../logic/IPseudonymResult';
import {inputDescription} from '../logic/ConfigManager';

export default Vue.extend({
  name: 'InputScreen',
  props: {
    originalId: {type: String, required: true}
  },
  data: (): IInputScreenData => {
    return {
      generationError: '',
      inputError: '',
      localOriginalId: ''
    };
  },
  computed: {
    isGenerateDisabled(): boolean {
      return !this.localOriginalId || Boolean(this.inputError);
    },
    inputDescriptionText(): string {
      return inputDescription;
    }
  },
  methods: {
    onInputChange(event: any): void {
      const newInput: string = event.target.value;
      this.inputError = validateInput(newInput);
      this.localOriginalId = newInput;
      this.$emit('update:originalId', newInput);
    },
    onGenerate(newOriginalId: string): void {
      submitPseudonymRegistration(newOriginalId)
        .then(({pseudonym, isDuplicate}: IPseudonymResult): void => {
          this.$emit('receivedPseudonym', pseudonym, isDuplicate);
        })
        .catch((error: string): void => {
          this.generationError = error;
        });
    }
  }
});

interface IInputScreenData {
  generationError: string;
  inputError: string;
  localOriginalId: string;
}
</script>
