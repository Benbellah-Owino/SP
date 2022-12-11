<script>
    import { fade} from 'svelte/transition';
    export let item;
    
</script>
<div id={item.id} transition:fade class="h-6 w-fit pl-1 pr-1 mr-1 font-light rounded-lg bg-purple-100 border border-purple-500">
{item.text}
</div>