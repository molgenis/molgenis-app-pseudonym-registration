<template>
  <div v-if="pseudonym === ''">
    <InputScreen
      v-model:originalId="originalId"
      @receivedPseudonym="setPseudonym"
      @update:orignalId="updateOriginalId"
    />
  </div>
  <div v-else>
    <ResultScreen
      :pseudonym="pseudonym"
      :is-duplicate="isDuplicate"
      @reset="reset"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue';
import InputScreen from './InputScreen.vue';
import ResultScreen from './ResultScreen.vue';

export default defineComponent({
  name: 'PseudonymRegistration',
  components: {InputScreen, ResultScreen},
  setup
});

function setup() {
  const pseudonym = ref('');
  const isDuplicate = ref(false);
  const originalId = ref('');

  return {
    isDuplicate,
    pseudonym,
    originalId,
    setPseudonym: createSetPseudonym(pseudonym, isDuplicate),
    reset: createReset(pseudonym, isDuplicate, originalId),
    updateOriginalId: createUpdateOriginalId(originalId)
  };
}

function createReset(
  pseudonym: Ref<string>,
  isDuplicate: Ref<boolean>,
  originalId: Ref<string>
): () => void {
  return (): void => {
    pseudonym.value = '';
    isDuplicate.value = false;
    originalId.value = '';
  };
}

function createSetPseudonym(
  pseudonym: Ref<string>,
  isDuplicate: Ref<boolean>
): (newPseudonym: string, newIsDuplicate: boolean) => void {
  return (newPseudonym: string, newIsDuplicate: boolean): void => {
    pseudonym.value = newPseudonym;
    isDuplicate.value = newIsDuplicate;
  };
}

function createUpdateOriginalId(
  originalId: Ref<string>
): (newId: string) => void {
  return (newId: string) => {
    originalId.value = newId;
  };
}
</script>
