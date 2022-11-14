import { writable } from 'svelte/store'

export const modalStore = writable({ is_open: false })

