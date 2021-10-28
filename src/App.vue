<template>
  <div class="container">
    <PseudonymRegistration />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import PseudonymRegistration from './views/PseudonymRegistration.vue';

export default defineComponent({
  name: 'App',
  components: {PseudonymRegistration}
});
</script>
