<template>
  <div id="result-screen">
    <p>{{ resultDescriptionText }}</p>
    <div>
      <div class="input-group mb-3">
        <input
          id="pseudonym"
          :value="pseudonym"
          type="text"
          class="form-control"
          :disabled="true"
        />
        <button
          id="clipboard-btn"
          class="btn btn-outline-secondary"
          :class="{'btn-outline-success': isOnClipboard}"
          @click.prevent="sendToClipboard(pseudonym)"
        >
          {{ isOnClipboard ? 'Copied to clipboard' : 'Copy to clipboard' }}
        </button>
      </div>
    </div>
    <div v-if="isDuplicate" class="alert alert-warning" role="alert">
      <i class="fa fa-exclamation-triangle" />
      This pseudonym already existed in the database, you might want to check if
      the patient's data was already entered.
    </div>
    <button class="btn btn-primary" @click="$emit('reset')">Back</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {resultDescription} from './ConfigManager';

export default Vue.extend({
  name: 'ResultScreen',
  props: {
    pseudonym: {type: String, required: true},
    isDuplicate: {type: Boolean, required: false}
  },
  data: (): {isOnClipboard: boolean} => {
    return {
      isOnClipboard: false
    };
  },
  computed: {
    resultDescriptionText(): string {
      return resultDescription;
    }
  },
  methods: {
    sendToClipboard(pseudonym: string): void {
      navigator.clipboard.writeText(pseudonym).then(() => {
        this.isOnClipboard = true;
      });
    }
  }
});
</script>
