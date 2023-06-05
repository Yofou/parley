import { createInertiaApp } from '@inertiajs/svelte'
import createServer from '@inertiajs/svelte/server'

createServer((page) =>
  createInertiaApp({
    page,
    resolve: (name) => require(`./Pages/${name}.svelte`),
  })
)
