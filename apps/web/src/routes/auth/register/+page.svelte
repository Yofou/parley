<script lang="ts">
  import { notify } from '$lib/client/notify';
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import { Button, Input } from "ui"

  export let data: PageData;
  const { form, enhance, errors, message } = superForm(data.form);

  $: if ($message) {
    $message.forEach((msg: any) => notify.handleMessage(msg)) 
  }
</script>

<form class="place-self-center max-w-[400px] flex flex-col w-full bg-grey-600 p-8 rounded-[20px]" use:enhance method="POST">
  <h2 class="font-outfit mb-10 text-white text-[2rem]">Register</h2>

  <Input 
    class="mb-6"
    bind:value={$form.email} 
    name="email" 
    type="email" 
    placeholder="Email" 
    errorMsg={$errors.email?.[0]}
  />
  <Input 
    class="mb-6"
    bind:value={$form.username} 
    name="username" 
    type="text" 
    placeholder="Username" 
    errorMsg={$errors.username?.[0]}
  />
  <Input 
    class="mb-6" 
    bind:value={$form.password} 
    name="password" 
    type="password" 
    placeholder="Password" 
    errorMsg={$errors.password?.[0]}
  />
  <Input 
    class="mb-10" 
    bind:value={$form.confirm} 
    name="confirm" 
    type="password" 
    placeholder="Confirm" 
    errorMsg={$errors.confirm?.[0]}
  />

  <Button class="mb-6 transition-colors bg-red-600 text-white hocus:bg-white hocus:text-grey-600">Create an account</Button>
  <p class="mx-auto text-white font-outfit text-[15px] text-center">
    Already have an account? <a class="text-red-300" href="/auth/login">Sign in</a>
  </p>
</form>
