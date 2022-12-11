<script>
	import { onMount } from "svelte";
    import {fade} from "svelte/transition"
    import Customer from "../../components/containers/customer.svelte"
    import {pendCust} from "../../stores/customer"
    import {createEventDispatcher} from "svelte"

let customers=[]
onMount(()=>{
    fetch(`http://localhost:3000/da/api/customer/getallcustomers`,{
         credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
    })
    .then((response)=>response.json())
    .then((data)=>{
        customers=data.result
         console.log(customers)
    })
})

const dispatch=createEventDispatcher()
  function custLog(){
        console.log($pendCust)
        dispatch("custAdd")
    }

    
    
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/42b8efcb5a.js" crossorigin="anonymous"></script>
</svelte:head>

<main in:fade out:fade class="main relative w-3/5 bg-purple-300 border-2 border-purple-500 rounded-2xl m-5 p-3 h-96">
{#each customers as customer(customer.cust_id)}
<Customer on:custAlert={custLog}  {customer}/>
{/each}
</main>

<style>

</style>