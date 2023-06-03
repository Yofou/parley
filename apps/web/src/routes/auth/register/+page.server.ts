import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';
import { PrismaClient, Prisma } from 'prisma';

const schema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirm: z.string()
}).refine(
  (obj) => obj.confirm === obj.password,
    {
    path: ['confirm'],
    message: 'Ensure Password matches confirm',
  }
);

export const load: PageServerLoad = async ({ locals }) => {
  const { session } = await locals.auth.validateUser();
	if (session) throw redirect(302, "/dashboard");

  const form = await superValidate(schema);
  return { form };
};


export const actions: Actions = {
	default: async ({ request, locals }) => {
    const form = await superValidate(request, schema)
    if (!form.valid) {
      return fail(400, { form })
    }

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: "email",
					providerUserId: form.data.email,
          password: form.data.password
				},
				attributes: {
          email: form.data.email,
          username: form.data.username
				}
			});

			const session = await auth.createSession(user.id);
			locals.auth.setSession(session);
		} catch(e) {
      console.log(e)
      if (e instanceof LuciaError) {
      } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // TODO: fix this ts error
          // @ts-ignore,
          return message(form, [
            { 
              message: `${(e.meta?.target as string[])?.[0]} already exists`, 
              isError: true 
            }
          ], {
            status: 401
          })
        }
      }

			return fail(400, { form });
		}

    throw redirect(302, '/dashboard')
	}
};
