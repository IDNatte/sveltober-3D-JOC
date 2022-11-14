import { modalStore } from "$lib/store/modal.store";

export function openModal() {
  modalStore.set({ is_open: true })
}

export function closeModal() {
  modalStore.set({ is_open: false })
}