<template>
  <div>{{ pseudonym }}</div>
  <div v-if="isDuplicate" class="alert">
    This pseudonym already existed in the database, you might want to check if
    the patients data was already entered.
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
  emits: []
});
</script>
