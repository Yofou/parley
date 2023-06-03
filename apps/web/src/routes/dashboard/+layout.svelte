<script lang="ts">
  import type { PageServerData } from "./$types";
  import Nav from "../../components/Nav.svelte";
  import Notification from "../../components/Notifcation.svelte";

  import "../app.css"
  import "@fontsource/outfit/300.css"
  import "@fontsource/outfit/500.css"

  export let data: PageServerData
</script>

<div class="w-full min-h-screen grid grid-cols-[120px,1fr] p-8 gap-8 bg-grey-900">
  <Nav guilds={data.guilds} />
  <main class="w-full">
    <slot />
  </main>
</div>

<Notification />

<style lang="postcss">
  main > :global(*) {
    @apply col-start-2 col-end-3;
  }
</style>
