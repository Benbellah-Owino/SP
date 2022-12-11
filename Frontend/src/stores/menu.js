import { writable } from "svelte/store";

export let islandMenu = writable(0);
export let page = writable("/")