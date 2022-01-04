<template>
  <form class="input__container" @submit.prevent="submit">
    <icon class="w-4 mr-2 text-white" variant="hash" />
    <input
      class="text-white text-opacity-50"
      v-model="token_id"
      :placeholder="placeholder"
      type="number"
      min="1"
      max="28990"
      step="1"
    />
    <div class="ml-2 mr-4 vr" />
    <button-icon class="w-4 text-white text-opacity-70" icon="search" @click.native="submit"/>
  </form>
</template>

<script>
export default {
  props: {
    placeholder: { type: Number, default: 27000 },
  },

  data: () => ({
    token_id: undefined,
  }),
  // watch: {
  //   placeholder: function (newVal, oldVal) {
  //     // watch it
  //     console.log("Prop changed: ", newVal, " | was: ", oldVal);
  //   },
  // },

  methods: {
    submit() {
      this.$router.push("/" + this.token_id);
    },
  },
};
</script>

<style lang="postcss" scoped>
.input__container {
  @apply px-4;
  @apply bg-white bg-opacity-10;
  @apply flex items-center;
}
input {
  @apply flex-grow;
  @apply bg-transparent;
}
</style>