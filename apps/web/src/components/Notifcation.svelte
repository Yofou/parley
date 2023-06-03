<script lang="ts">
  import { notify } from "$lib/client/notify"
  import { flip } from "svelte/animate"
  import { fade, crossfade } from "svelte/transition"
  import { quintOut } from "svelte/easing"

  const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
        ...params,
				duration: 300,
				easing: quintOut,
				css: t => `
					transform: ${transform});
					opacity: ${t}
				`
			};
		}
	});
</script>

<section class="fixed bottom-6 right-5 flex flex-col gap-6">
  {#each $notify as note, index (index)}
    <button 
      class="min-w-[350px] text-left px-4 py-8 w-full text-white min-h-[100px] rounded-t-[6px] border-b-2 border-b-red-600 bg-grey-600" 
      on:click={() => notify.removeByIndex(index)}
      in:receive="{{key: index, delay: index !== 0 ? 600 : 0}}"
      out:send="{{key: index}}"
      animate:flip
    >
      <p>{note.message}</p>
    </button>
  {/each}
</section>
