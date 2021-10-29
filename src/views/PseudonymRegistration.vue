<template>
  <div v-if="pseudonym === ''">
    <InputScreen v-model="originalId" @receivedPseudonym="setPseudonym" />
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
import _ from 'lodash';

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
    setPseudonym: _.partial(setPseudonym, pseudonym, isDuplicate),
    reset: _.partial(reset, pseudonym, isDuplicate, originalId)
  };
}

function reset(
  pseudonym: Ref<string>,
  isDuplicate: Ref<boolean>,
  originalId: Ref<string>
) {
  pseudonym.value = '';
  isDuplicate.value = false;
  originalId.value = '';
}

function setPseudonym(
  pseudonym: Ref<string>,
  isDuplicate: Ref<boolean>,
  newpseudo: string,
  newIsDuplicate: boolean
) {
  pseudonym.value = newpseudo;
  isDuplicate.value = newIsDuplicate;
}
</script>
