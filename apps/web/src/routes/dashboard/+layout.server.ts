import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types"
import { client } from "$lib/server/lucia"

export const load: LayoutServerLoad = async ({ locals }) => {
  const { session, user } = await locals.auth.validateUser();
	if (!session) throw redirect(302, "/");

  const guilds = await client.guild.findMany({
    where: {
      OR: [
        { ownerId: user.id },
        {
          members: {
            some: {
              id: user.id,
            }
          },
          NOT: {
            banned: {
              some: {
                id: user.id
              }
            }
          }
        }
      ]
    }
  })

  return {
    guilds,
  }
};
