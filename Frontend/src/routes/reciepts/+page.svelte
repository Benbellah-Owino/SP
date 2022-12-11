<script>
import HireReciept from "../../components/reciept/hireReciept.svelte";
import SaleReciepts from "../../components/reciept/saleReciepts.svelte";
import NavBar from "$lib/navBar.svelte";
import UpdtHire from "$lib/updateTrans/hireform.svelte";
import UpdtSale from "$lib/updateTrans/newSale.svelte";
	import { fly } from 'svelte/transition';
import {page} from "../../stores/menu"


import {onMount}from "svelte"
import {writable} from "svelte/store"

let sales=[]
let hires=[]
let updte=false
let upsl=false


let trans=writable({})
onMount(async()=>{
    try {
        await fetch(`http://localhost:3000/da/api/transactions/gethires`)
        .then((response)=>response.json())
        .then((data)=>{
           
            hires=data.result
        })
        await fetch(`http://localhost:3000/da/api/transactions/getsales`)
        .then((response)=>response.json())
        .then((data)=>{
           
            sales=data.result
        })

    } catch (error) {
        console.log(error)
    }
})
function test(){
    console.log($page)
}
let drop=false

let dropText="All Transactions"


function toggle(){
    drop=!drop
}
function allTransactions(){
    dropText="All Transactions"
    drop=!drop
}
function saleTransactions(){
    dropText="Sales Transactions"
    drop=!drop
}
function hireTransactions(){
    dropText="Hire Transactions"
    drop=!drop
}

function updt(event){
    let id=event.detail.id
    trans.set(hires.filter((trans)=>id==trans.trans_id))
    updte=!updte
}
function updts(event){
    let id=event.detail.id
    trans.set(sales.filter((trans)=>id==trans.trans_id))
    upsl=!upsl
}
</script>

<main class="relative">
<NavBar/>



{#if updte==true}
    <UpdtHire transaction={$trans} on:close={()=>updte=!updte} /> 
{/if}
{#if upsl==true}
    <UpdtSale transaction={$trans} on:close={()=>upsl=!upsl} /> 
{/if}
<div class="absolute top-0 h-12 left-20 w-11/12">
    <button class="dropdown absolute right-1 top-1 shadow-lg hover:shadow-purple-500 bg-purple-500 text-white w-44 h-10 rounded-full" on:click={toggle}>{dropText}</button>
    {#if drop==true}
    <div class="transOpt h-28 w-44 fixed top-12 right-3 border-2 rounded-xl mb-2 border-purple-500 z-50 flex flex-col justify-center items-center" transition:fly="{{ y: -200, duration: 500 }}">
        <button class="transactions h-6 w-12 border-2 rounded-full mb-2 border-purple-500 hover:bg-purple-500 hover:text-white" on:click={allTransactions}>all</button>
        <button class="transactions h-6 w-12 border-2 rounded-full mb-2 border-purple-500 hover:bg-purple-500 hover:text-white" on:click={saleTransactions}>sale</button>
        <button class="transactions h-6 w-12 border-2 rounded-full mb-2 border-purple-500 hover:bg-purple-500 hover:text-white" on:click={hireTransactions}>hire</button>
    </div>
    {/if}
<div class="recieptCont absolute top-12 left-20 w-11/12 bg-slate-400">
    {#if dropText == "Hire Transactions" || dropText=="All Transactions"}
    {#each hires as hire(hire.trans_id) }
        <HireReciept on:update={updt} {hire}/>
    {/each}
    {/if}
    {#if dropText=="Sales Transactions" || dropText=="All Transactions"}  
     {#each sales as sale(sale.trans_id) }
        <SaleReciepts on:update={updts} {sale}/>
    {/each}
    {/if}
    

</div>

</main>

<style>

</style>