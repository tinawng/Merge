<script setup>
import { useClipboard } from "@vueuse/core"

const { copy } = useClipboard()

const tina_address = "tinatina.eth"
const show_notification = ref(false)

async function copyAddress() {
  await copy(tina_address)
  show_notification.value = true
  setTimeout(() => {
    show_notification.value = false
  }, 2000)
}
</script>

<template>
  <div class="mt-auto text-3xs md:text-xs text-white text-opacity-30">
    <p>updated every hour</p>
    <p class="flex gap-1">
      <span>want more?</span>
      <span>support me <a class="link cursor-pointer" @click="copyAddress">{{tina_address}}</a> </span>
      <transition name="slide-in">
        <div v-if="show_notification" class="ml-1 px-2 bg-white bg-opacity-10 rounded-full text-3xs md:text-2xs">
          copied to clipboard!
        </div>
      </transition>
    </p>
  </div>
</template>