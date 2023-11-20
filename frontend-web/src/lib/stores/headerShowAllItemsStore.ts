import { writable } from "svelte/store";

const headerShowAllItemsStore = writable<boolean>(false);

export default headerShowAllItemsStore;