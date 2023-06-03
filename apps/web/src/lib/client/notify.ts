import { writable } from "svelte/store"

type NotifyMsg =  {
  isError: boolean;
  message: string;
}

const createNotifyWritable = () => {
  const { subscribe, update } = writable<NotifyMsg[]>([])

  return {
    subscribe,
    handleMessage: (msg: NotifyMsg) => update(
      $notify => [...$notify, msg]
    ),
    removeByIndex: (index: number) => update(
      ($notify) => $notify.filter((_, itemIndex) => index !== itemIndex)
    ) 
  }
}


export const notify = createNotifyWritable()
