import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

const schema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const load: PageServerLoad = async ({ locals }) => {
  const { session } = await locals.auth.validateUser();
	if (session) throw redirect(302, "/dashboard");

  const form = await superValidate(schema);
  return { form };
};

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, schema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const key = await auth.useKey("email", form.data.email, form.data.password);
    const session = await auth.createSession(key.userId);
    locals.auth.setSession(session);

    return { form }
  }
} satisfies Actions
