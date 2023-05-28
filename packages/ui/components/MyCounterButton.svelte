<script lang="ts">
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button class="" on:click="{handleClick}">
  clicks: {count}
</button>
