<script>
import NavBar from "$lib/navBar.svelte";
import Genemp from "../../lib/employeesheets/genemp.svelte";
import Salesp from "../../lib/employeesheets/salesp.svelte";
import Driver from "../../lib/employeesheets/driver.svelte";
	import { onMount } from "svelte";
	import { empty } from "svelte/internal";

    let person={}
    let role
onMount(async()=>{
    role=localStorage.getItem("roleDA")
    try {
        await fetch(`http://localhost:3000/da/api/users/getuser`,{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        }).then(response=>response.json())
        .then((data)=>{
            person=data.result[0]
            console.log(person)
        })
    } catch (error) {
        console.log(error)
    }
})
</script>

<main class="main flex flex-col justify-center items-center h-full  absolute top-0 left-20 w-11/12">
    {#if role=="salesperson"}
      <Salesp {person}/>
    {:else if role=="driver"}
      <Driver {person}/>
    {:else}
      <Genemp {person}/>
    {/if}
</main>

<style>

</style>