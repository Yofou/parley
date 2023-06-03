<script lang="ts">
  export const type: 'submit' | 'button' = 'submit'
</script>

<button {type} class={`py-4 rounded-[6px] ${$$props.class}`} on:click>
  <slot />
</button>
