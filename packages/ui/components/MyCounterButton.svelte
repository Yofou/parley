<script lang="ts">
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button class="mx-10" on:click="{handleClick}">
  clicks: {count}
</button>
