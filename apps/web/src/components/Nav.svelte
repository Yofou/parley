<script lang="ts">
  import type { Guild } from "prisma"
  export let guilds: Guild[]
</script>

<nav class="flex w-full bg-grey-600 rounded-[6px] flex-col gap-4">
    <a href="/direct">
      <img src="" alt="">
    </a>

    <button>
    </button>

    {#each guilds as guild}
      <a href={`/guild/${guild.id}`}>
        <img 
          class="w-[50px] h-[50px] rounded-full" 
          src={`https://api.dicebear.com/6.x/${guild.id}/svg`} 
          alt=""
        >
      </a>
    {/each}
</nav>
