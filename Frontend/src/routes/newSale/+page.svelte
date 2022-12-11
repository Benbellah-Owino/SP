<script>
import NavBar from "$lib/navBar.svelte";
import Sale from "$lib/transactionForms/sale.svelte";
import Hire from "$lib/transactionForms/hire.svelte";
import Info from "../../lib/messages/info.svelte";
import CustList from "$lib/customers/list.svelte"
import { page } from '$app/stores';
import {prices} from "../../stores/inventory"
import {pendCust} from "../../stores/customer"
	import { onMount } from "svelte";

    let msg=""
    let inf=false
    let car;
    let price;
    let param;
    let carID;
    let category

    let cpd={};
onMount(()=>{

    param=$page.url.search
    carID=param.split("&")[0].split("=")[1]
    category=param.split("&")[1].split("=")[1]
    console.log(carID)
    console.log(category)

    try {
        fetch(`http://localhost:3000/da/api/inventory/getonecar?id=${carID}&category=${category}`,
        {
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        })
        .then((response)=>response.json())
        .then((data)=>{

            car=data.result[0]
            console.log(car)
            let carid;

            if (category=="hire"){
                price=car.price_pd
                carid=car.car_reg
                console.log(price)
            }
            if (category=="sale"){
                price=car.price
                carid=car.car_id
                console.log(price)
            }

            cpd.price=price;
            cpd.reg=carid
            cpd.make=car.make
            cpd.model=car.model

    })
    } catch (error) {
        
    }
})


function newCus(){
    msg="new customer"
    console.log(msg)
    inf=!inf
    setTimeout(()=>{
        msg=""
        inf=!inf
    },6000)
}
</script>

<main class="main relative">
<NavBar/>

<div class="custDisp absolute top-2 left-1/2 z-30">
    {#if $pendCust.cust_id==undefined}
   Customer not selected
    {:else}
    <span> {$pendCust.cust_id}</span><br>
    <span>{$pendCust.first_name} {$pendCust.last_name}</span>
    {/if}
</div>
{#if inf==true}
<Info message={msg}/>
{/if}
{#if category=="hire"}
<Hire on:aCust={newCus} car={cpd}/>
{:else if category=="sale"}
<Sale car={cpd}/>
{/if}
</main>

<style>
    .main{
        height: 100vh;
        width: 100vh;
    }

</style>