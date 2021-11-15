<template>
  <div class="card">
    <div class="card-header">Pseudonym Registration</div>
    <div class="card-body">
      <div v-if="pseudonym === ''">
        <InputDialog
          :originalId="originalId"
          @receivedPseudonym="setPseudonym"
          @update:originalId="updateOriginalId"
        />
      </div>
      <div v-else>
        <ResultDialog
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
import InputDialog from '../components/InputDialog.vue';
import ResultDialog from '../components/ResultDialog.vue';

export default Vue.extend({
  name: 'PseudonymRegistration',
  components: {InputDialog, ResultDialog},
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
