<script>
import Message from "$lib/messages/message.svelte";
import Error from "$lib/messages/error.svelte";

</script>

<main class="main p-6">
    <Error message="you are not authenticated"/>
</main>

<style>
    .main{
        height: 100%;
        width: 100%;
    }
</style>