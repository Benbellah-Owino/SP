<script>
import SaleCar from "../components/carTiles/saleCar.svelte" 
import { fly } from 'svelte/transition';
import {forsale} from "../stores/inventory"
import {onMount} from "svelte"

let sold=[]
let show=[]
onMount(()=>{
    fetch("http://localhost:3000/da/api/inventory/getsoldcars",{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        })
        .then((response)=>response.json())
        .then((data)=>{
            sold=data.result
            console.log(sold)
             
        });
        

})
</script>

<main class="main grid grid-cols-4"  in:fly="{{ x: -200, duration: 400 }}" out:fly="{{ x:200, duration: 200 }}">

    {#each $forsale as car(car.car_id)}
        <SaleCar {car}/>
    {/each}

</main>

<style>

</style>