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
        v-on:input="onInputCange"
        class="form-control"
        type="text"
      />
      <div class="input-group-append">
        <button
          id="pseudonym-generate-btn"
          class="btn btn-outline-primary"
          type="submit"
          :disabled="localOriginalId === ''"
          @click.prevent.stop="onGenerate(originalId)"
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
import {submitPseudonymRegistration} from './InputScreenUtil';

export default {
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
      this.$emit('update:orignalId', event?.target?.value);
    },
    onGenerate(newOrignalId: string) {
      submitPseudonymRegistration(newOrignalId)
        .then(
          ({
            pseudonym,
            isDuplicate
          }: {
            pseudonym: string;
            isDuplicate: boolean;
          }): void => {
            this.$emit('receivedPseudonym', pseudonym, isDuplicate);
          }
        )
        .catch((error): void => (this.errorText = error));
    }
  }
};
</script>
