<script lang="ts">
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';

  export let data: PageData;

  // Client API:
  const { form, enhance, errors } = superForm(data.form);
  $: console.log($errors)
</script>

<form class="flex flex-col gap-4" use:enhance method="POST">
  <h2>Register</h2>

  <input bind:value={$form.email} name="email" type="email">
  <input bind:value={$form.username} name="username" type="text">
  <input bind:value={$form.password} name="password" type="password">
  <input bind:value={$form.confirm} name="confirm" type="password">

  <button>Register</button>
</form>
