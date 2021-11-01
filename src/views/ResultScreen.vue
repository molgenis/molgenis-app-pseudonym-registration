<template>
  <div>
    <p>
      Please use this pseudonym to ... ( please provide a nice text to explain
      what to do with the pseudonym, note that the generated id can look like
      "GEN-123456" when the next molgenis version is released )
    </p>
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
      the patients data was already entered.
    </div>
    <button class="btn btn-primary" @click="$emit('reset')">Back</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ResultScreen',
  props: {
    pseudonym: {type: String, required: true},
    isDuplicate: {type: Boolean, required: false}
  },
  emits: ['reset'],
  data() {
    return {
      isOnClipboard: false
    };
  },
  methods: {
    sendToClipboard(value: string) {
      navigator.clipboard.writeText(value).then(() => {
        this.isOnClipboard = true;
      });
    }
  }
});
</script>
