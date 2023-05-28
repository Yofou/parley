<script lang="ts">
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';

  export let data: PageData;
  const { form, enhance } = superForm(data.form);
</script>

<form use:enhance method="POST">
  <h2>Login</h2>

  <input bind:value={$form.email} name="email" type="email">
  <input bind:value={$form.password} name="password" type="password">

  <button>Login</button>
</form>
