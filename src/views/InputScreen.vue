<template>
  <div>
    <div class="input-group">
      <input
        id="original-id-input"
        v-model="originalId"
        class="form-control"
        type="text"
      />
      <div class="input-group-append">
        <button
          id="pseudonym-generate-btn"
          class="btn btn-outline-primary"
          type="submit"
          @click.prevent.stop="onGenerate(originalId)"
        >
          Generate
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, EmitsOptions, Ref, ref, SetupContext} from 'vue';
import {submitPseudonymRegistration} from './InputScreenUtil';

export default defineComponent({
  name: 'InputScreen',
  emits: ['receivedPseudonym'],
  setup(_props, context: SetupContext<EmitsOptions>) {
    const originalId: Ref<string> = ref('');

    const onGenerate = (newOrignalId: string) => {
      submitPseudonymRegistration(newOrignalId)
        .then(
          ({
            pseudonym,
            isDuplicate
          }: {
            pseudonym: string;
            isDuplicate: boolean;
          }) => {
            context.emit('receivedPseudonym', pseudonym, isDuplicate);
          }
        )
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      originalId,
      onGenerate
    };
  }
});
</script>
