<script>
import NavBar from "$lib/navBar.svelte";
import List from "$lib/customers/list.svelte"
import Info from "$lib/messages/info.svelte"
import NewCustomer from "../../components/forms/newCustomer.svelte"
import { onMount,createEventDispatcher } from "svelte";
import {writable} from "svelte/store"
import {pendCust} from "../../stores/customer"

    export let car

const dispatch=createEventDispatcher()
let add=false;
let newC={};
let priceField;
let days;
let dp;
let msg=""
let info=false
onMount(()=>{
    priceField=document.getElementById("payments")
    days=document.getElementById("days")
    dp=document.getElementById("dp")
    priceField.value=car.price
    console.log(priceField.value)
    console.log(car)
})



function Pay(){
     let dh=new Date().toISOString().slice(0, 19).replace('T', ' ')
    dh=dh.split(" ")[0]
    let trans={
        cust_id:$pendCust.cust_id,
        carReg:car.reg,
        days:parseInt(days.value),
        made:parseInt(dp.value),
        price:car.price,
        DOT:dh,
    }
    console.log(trans)

    try {
        fetch(`http://localhost:3000/da/api/transactions/hirecar`,{
            method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(trans)
        })
     window.open("/home","_self")
    } catch (error) {
        console.log(error)
    }
}

function addCust(){
        
        dispatch("aCust",{text:"add"})
}
</script>

<main class="main relative">
<NavBar/>
{#if info==true}
        <Info message={msg}/>
{/if}
<div class="form w-10/12 h-fit rounded-2xl  flex flex-col items-center justify-center absolute p-2">
     <label for="customer">Customer <input class="input" type="text" name="customer" id="customer"> <button class="h-9 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white" on:click={() =>add=!add}>Add Customer</button> <button class="h-9 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white" on:click={() =>newC=!newC}>New Customer</button></label><br><br>
    {#if add==true}
        <List on:custAdd={addCust}/>
    {/if}
    {#if newC==true}
        <NewCustomer/>
    {/if}
    <label for="days">Days hired <input class="input" type="number" name="days" id="days"></label><br>
    <label for="dp">Days payed <input class="input" type="number" name="dp" id="dp"></label><br>
    <label for="payments">Price Per Day <input class="input" type="number" name="payments" id="payments"></label><br>
    <br><br><br>
    <button class="h-12 w-44 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white" on:click={Pay}>SUBMIT</button>
</div>
</main>

<style>
    .main{
        height: 100vh;
        width: 100vh;
    }
.form{
    top:50%;
    left:45%;
    background-color: #ebd9fc;
}
.input{
    border:1px #7f03fc solid;
    border-radius: 4px; 
}
label{
    background-color: #ebd9fc;
}
</style>