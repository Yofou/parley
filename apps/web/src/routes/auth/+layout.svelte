<script lang="ts">
  import Notification from "../../components/Notifcation.svelte";
  import "../app.css"
  import "@fontsource/outfit/300.css"
  import "@fontsource/outfit/500.css"
</script>

<div class="w-full min-h-screen grid grid-cols-1 bg-grey-900">
  <main class="w-full grid grid-cols-[1fr,minmax(0,1100px),1fr]">
    <slot />
  </main>
</div>

<Notification />

<style lang="postcss">
  main > :global(*) {
    @apply col-start-2 col-end-3;
  }
</style>
