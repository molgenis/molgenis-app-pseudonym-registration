<template>
  <div>
    <div class="input-group">
      <input
        id="OriginalIDInput"
        v-model="originalID"
        class="form-control"
        type="text"
      />
      <div class="input-group-append">
        <button
          id="pseudonym-generate-btn"
          class="btn btn-outline-primary"
          type="submit"
          @click.prevent.stop="onGenerate"
        >
          Generate
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'InputScreen',
  data: (): {originalID: string} => {
    return {
      originalID: ''
    };
  },
  methods: {
    onGenerate() {
      console.log(this.originalID);
    }
  }
});
</script>
