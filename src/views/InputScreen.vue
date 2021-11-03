<template>
  <div>
    <p>
      Enter the UMCG number to generate a pseudonym ... ( please provide a nice
      text to explain what can be done here )
    </p>
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
          :disabled="localOriginalId === ''"
          v-on:click="onGenerate(originalId)"
        >
          Generate
        </button>
      </div>
    </div>
    <div v-if="errorText !== ''" class="alert alert-warning" role="alert">
      {{ errorText }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {submitPseudonymRegistration} from './InputScreenUtil';
import IPseudonymResult from './IPseudonymResult';

export default Vue.extend({
  name: 'InputScreen',
  props: {
    originalId: {type: String, required: true}
  },
  data: (): {errorText: string; localOriginalId: string} => {
    return {
      errorText: '',
      localOriginalId: ''
    };
  },
  methods: {
    onInputChange(event: any): void {
      this.localOriginalId = event?.target?.value;
      this.$emit('update:orignalId', event?.target?.value);
    },
    onGenerate(newOrignalId: string): void {
      submitPseudonymRegistration(newOrignalId)
        .then(({pseudonym, isDuplicate}: IPseudonymResult): void => {
          this.$emit('receivedPseudonym', pseudonym, isDuplicate);
        })
        .catch((error: string): void => {
          this.errorText = error;
        });
    }
  }
});
</script>
