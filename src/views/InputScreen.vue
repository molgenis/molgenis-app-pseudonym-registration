<template>
  <div>
    <p>
      Enter the UMCG number to generate a pseudonym ... ( please provide a nice
      text to explain what can be done here )
    </p>
    <div class="input-group card-text">
      <input
        id="original-id-input"
        v-model="localOriginalId"
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
    <div v-if="errorText !== ''" class="alert alert-warning" role="alert">
      {{ errorText }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  EmitsOptions,
  Ref,
  ref,
  SetupContext
} from 'vue';
import {submitPseudonymRegistration} from './InputScreenUtil';

export default defineComponent({
  name: 'InputScreen',
  props: {
    originalId: {type: String, required: true}
  },
  emits: ['receivedPseudonym', 'update:orignalId'],
  setup(props, context: SetupContext<EmitsOptions>) {
    const errorText = ref('');
    const localOriginalId = createLocalOriginalId(props, context);
    const onGenerate = createOnGenerate(context, errorText);

    return {
      errorText,
      localOriginalId,
      onGenerate
    };
  }
});

function createLocalOriginalId(
  props: any, // can't input originalId as a string because we want it by reference
  context: SetupContext<EmitsOptions>
) {
  return computed({
    get: (): string => props.originalId,
    set: (newValue: string): void => {
      context.emit('update:orignalId', newValue);
    }
  });
}

function createOnGenerate(
  context: SetupContext<EmitsOptions>,
  errorText: Ref<string>
): (newOrignalId: string) => void {
  return (newOrignalId: string) => {
    submitPseudonymRegistration(newOrignalId)
      .then(
        ({
          pseudonym,
          isDuplicate
        }: {
          pseudonym: string;
          isDuplicate: boolean;
        }): void => {
          context.emit('receivedPseudonym', pseudonym, isDuplicate);
        }
      )
      .catch((error): void => (errorText.value = error));
  };
}
</script>
