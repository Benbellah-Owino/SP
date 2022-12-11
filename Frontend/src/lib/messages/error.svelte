<script>
    import {fly} from "svelte/transition"
export let message
</script>

<main in:fly="{{ y: -200, duration: 600 }}" out:fly="{{ y: -200, duration: 600 }}" class="main bg-red-500 rounded-full border border-white p-1 w-fit h-10 m-11 text-center flex justify-center items-center absolute top-5">
    {message}
</main>

<style>
.main{
    color:white;
    left:48%;
    margin: 0 auto;
}
</style>