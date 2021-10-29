<template>
  <div>
    <div>{{ pseudonym }}</div>
    <div v-if="isDuplicate" class="alert">
      This pseudonym already existed in the database, you might want to check if
      the patients data was already entered.
    </div>
    <button class="btn btn-primary">Copy to clipboard</button>
    <!-- TODO implement copy to clipboard functionality -->
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
  emits: ['reset']
});
</script>
