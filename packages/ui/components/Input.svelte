<script lang="ts">
  export let name: string
  export let type: string
  export let value: string
  export let placeholder: string
  export let errorMsg: string | undefined = undefined
  $: hasError = errorMsg != undefined

  const handleOnChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      value = event.target.value
    }
  }
</script>

<label class={`relative ${$$props.class}`}>
  <input 
    {name} 
    {type} 
    {value} 
    {placeholder}
    on:input={handleOnChange}
    class={`w-full pb-[1rem] text-[15px] font-outfit text-white bg-[transparent] placeholder:text-white/50 hocus:outline-none hocus:border-b border-b`}
  >

  {#if hasError}
    <p class="absolute m-0 p-0 right-0 top-0 text-red-600 text-[0.75rem] bg-grey-600 py-1 translate-y-1/10">{errorMsg}</p>
  {/if}
</label>
