<template>
  <div id="input-screen">
    <p>Enter the original id to generate a pseudonym.</p>
    <div class="input-group card-text">
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
          :disabled="localOriginalId === '' || inputError !== ''"
          v-on:click="onGenerate(originalId)"
        >
          Generate
        </button>
      </div>
    </div>
    <div v-if="inputError !== ''" class="alert alert-warning" role="alert">
      {{ inputError }}
    </div>
    <div v-if="generationError !== ''" class="alert alert-warning" role="alert">
      {{ generationError }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {submitPseudonymRegistration, validateInput} from './InputScreenUtil';
import IPseudonymResult from './IPseudonymResult';

export default Vue.extend({
  name: 'InputScreen',
  props: {
    originalId: {type: String, required: true}
  },
  data: (): {
    generationError: string;
    inputError: string;
    localOriginalId: string;
  } => {
    return {
      generationError: '',
      inputError: '',
      localOriginalId: ''
    };
  },
  methods: {
    onInputChange(event: any): void {
      const newInput: string = event.target.value;
      this.inputError = validateInput(newInput);
      this.localOriginalId = newInput;
      this.$emit('update:orignalId', newInput);
    },
    onGenerate(newOrignalId: string): void {
      submitPseudonymRegistration(newOrignalId)
        .then(({pseudonym, isDuplicate}: IPseudonymResult): void => {
          this.$emit('receivedPseudonym', pseudonym, isDuplicate);
        })
        .catch((error: string): void => {
          this.generationError = error;
        });
    }
  }
});
</script>
