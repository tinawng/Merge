<template>
  <div class="flex flex-col justify-end text-xs text-white text-opacity-30">
    <p>updated every 6h</p>
    <p class="flex gap-1">
      <span>want more? </span>
      <a v-if="has_wallet" class="link cursor-pointer" @click="walletTip">support me</a>
      <span v-else>
        support me
        <a class="link cursor-pointer" @click="copyAddr">
          {{tina_addr.slice(0, 5).concat("...").concat(tina_addr.slice(-4))}}
        </a>
      </span>
      <transition name="slide-in">
        <div v-if="copy_notif" class="ml-1 px-2 bg-white bg-opacity-10 rounded-full text-2xs">copied to clipboard!</div>
      </transition>
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    has_wallet: false,
    tina_addr: "0xC958c2B65E9840F76E34EE660e27cCf254d75Fa4",
    donor_addr: undefined,
    tip_value: "0x2386F26FC10000", // .01 eth
    copy_notif: false,
  }),
  computed: {
    tip_cta: function () {
      return this.has_wallet ? "here" : this.tina_addr.slice(0, 5).concat("...").concat(this.tina_addr.slice(-4));
    },
  },

  async created() {
    this.has_wallet = !!window.ethereum;
  },

  methods: {
    async walletTip() {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        this.donor_addr = ethereum.selectedAddress;
      } catch (error) {}

      try {
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              to: this.tina_addr,
              from: this.donor_addr,
              value: this.tip_value,
            },
          ],
        });
      } catch (error) {}
    },

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

<style lang="postcss" scoped>
</style>