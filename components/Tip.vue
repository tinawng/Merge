<template>
  <div class="mt-auto text-3xs md:text-xs text-white text-opacity-30">
    <p>updated every hour</p>
    <!-- <p>updated every <span class="line-through">6h</span> <b>10 minutes!!</b></p> -->
    <p class="flex gap-1">
      <span>want more? </span>
      <span>
        support me
        <a class="link cursor-pointer" @click="copyAddr">
          {{tina_addr.slice(0, 5).concat("...").concat(tina_addr.slice(-4))}}
        </a>
      </span>
      <transition name="slide-in">
        <div v-if="copy_notif" class="ml-1 px-2 bg-white bg-opacity-10 rounded-full text-3xs md:text-2xs">copied to clipboard!</div>
      </transition>
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    tina_addr: "0xC958c2B65E9840F76E34EE660e27cCf254d75Fa4",
    copy_notif: false,
  }),

  methods: {
    async copyAddr() {
      await navigator.clipboard.writeText(this.tina_addr);
      this.copy_notif = true;
      setTimeout(() => {
        this.copy_notif = false;
      }, 2000);
    },
  },
};
</script>