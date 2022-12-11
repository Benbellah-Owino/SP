<script>
import NavBar from "$lib/navBar.svelte";
import InventoryIsland from "$lib/inventoryIsland.svelte";
import HiredCars from "$lib/hiredCars.svelte";
import SaleCars from "$lib/saleCars.svelte";
import {islandMenu} from "../../stores/menu"
	import { onMount } from "svelte";
    import {forhired,forsale} from "../../stores/inventory"

onMount(()=>{
    try {
        fetch("http://localhost:3000/da/api/inventory/hirecars",{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        })
        .then((response)=>response.json())
        .then((data)=>{
            
            forhired.set(data.result)
        });


        fetch("http://localhost:3000/da/api/inventory/forsale",
        { credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},}
        )
        .then((response)=>response.json())
        .then((data)=>{
            
            forsale.set(data.result)
        })
    } catch (error) {
        console.log(error)
    }
})
</script>

<main class="main flex flex-col justify-start items-center">
<NavBar/>
<InventoryIsland />
{#if  $islandMenu==0}
<HiredCars />
{:else if $islandMenu==1}
<SaleCars />
{/if}

</main>

<style>

</style>