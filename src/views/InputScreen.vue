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
import {computed, defineComponent, EmitsOptions, Ref, ref, SetupContext} from 'vue';
import {submitPseudonymRegistration} from './InputScreenUtil';

export default defineComponent({
  name: 'InputScreen',
  emits: ['receivedPseudonym'],
  props: {
    value: {type: String, required: true}
  },
  setup(props, context: SetupContext<EmitsOptions>) {
    const originalId = computed(()=>{
      get: function () { return props.value},
      set: (newValue) => context.emit('input', newValue);
    })
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
