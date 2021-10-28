<template>
  <InputScreen />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import InputScreen from './InputScreen.vue';

export default defineComponent({
  name: 'PseudonymRegistration',
  components: {InputScreen}
});
</script>
