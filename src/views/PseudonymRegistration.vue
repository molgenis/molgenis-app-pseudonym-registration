<template>
  <div class="card">
    <div class="card-header">Pseudonym Registration</div>
    <div class="card-body">
      <div v-if="pseudonym === ''">
        <InputScreen
          :originalId="originalId"
          @receivedPseudonym="setPseudonym"
          @update:originalId="updateOriginalId"
        />
      </div>
      <div v-else>
        <ResultScreen
          :pseudonym="pseudonym"
          :is-duplicate="isDuplicate"
          @reset="reset"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputScreen from '../components/InputDialog.vue';
import ResultScreen from '../components/ResultDialog.vue';

export default Vue.extend({
  name: 'PseudonymRegistration',
  components: {InputScreen, ResultScreen},
  data(): {
    pseudonym: string;
    isDuplicate: boolean;
    originalId: string;
  } {
    return {
      pseudonym: '',
      isDuplicate: false,
      originalId: 'test'
    };
  },
  methods: {
    reset(): void {
      this.pseudonym = '';
      this.isDuplicate = false;
      this.originalId = 'test';
    },
    setPseudonym(newPseudonym: string, newIsDuplicate: boolean): void {
      this.pseudonym = newPseudonym;
      this.isDuplicate = newIsDuplicate;
    },
    updateOriginalId(newId: string): void {
      this.originalId = newId;
    }
  }
});
</script>
