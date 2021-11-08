<template>
  <div class="container">
    <PseudonymRegistration />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PseudonymRegistration from './views/PseudonymRegistration.vue';

export default Vue.extend({
  name: 'App',
  components: {PseudonymRegistration}
});
</script>
