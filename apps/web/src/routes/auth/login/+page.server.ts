import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';

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

    try {
      const key = await auth.useKey("email", form.data.email, form.data.password);
      const session = await auth.createSession(key.userId);
      locals.auth.setSession(session);
    } catch(e) {
      console.log(e)
      if (e instanceof LuciaError) {
        if (e.message === 'AUTH_INVALID_PASSWORD' || e.message === 'AUTH_INVALID_KEY_ID') {
          // @ts-ignore
          return message(form, [
            { message: 'Invalid email or password', isError: true }
          ], {
            status: 401,
          })
        }
      }

			return fail(400, { form });
    }


    throw redirect(302, '/dashboard')

  }
} satisfies Actions
