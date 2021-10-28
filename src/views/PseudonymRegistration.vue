<template>
  <div v-if="pseudonym === ''">
    <InputScreen @receivedPseudonym="setPseudonym" />
  </div>
  <div v-else>
    <ResultScreen :pseudonym="pseudonym" :is-duplicate="isDuplicate" />
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

  return {
    isDuplicate,
    pseudonym,
    setPseudonym: _.partial(setPseudonym, pseudonym, isDuplicate)
  };
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
