<script>
import NavBar from "$lib/navBar.svelte";
import NewCustomer from "../../components/forms/newCustomer.svelte"
import List from "$lib/customers/list.svelte"
import {pendCust} from "../../stores/customer"
import Message from "$lib/messages/message.svelte";
import Error from "$lib/messages/error.svelte";
    let msg="";

    let err=false;
    let good=false

export let car;
let types=["hpp","onetime"]
let selected;

let add=false;
let newC=false;

function submit(){
     let dh=new Date().toISOString().slice(0, 19).replace('T', ' ')
    dh=dh.split(" ")[0]
    let payload={
        carId:car.reg,
        custID:$pendCust.cust_id,
        type:selected,
        DOT:dh,
        make:car.make,
        model:car.model
    }
    payload.deposit=parseInt(document.getElementById("deposit").value)
    payload.installments=parseInt(document.getElementById("days").value)
    payload.inst

    let priceSet=car.price
    let price1=priceSet-payload.deposit
     let perInst
    if(price1==0){
    perInst=0
    }else{
    perInst=price1/payload.installments
    }

    payload.price_pi=perInst
    payload.balance=price1
console.log(payload)

 try {
        fetch(`http://localhost:3000/da/api/transactions/sellcar`,{
            method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
        }).then(response=>response.json())
        .then((data)=>{
            if(data.status=="fail"){
                err=true
                msg=data.msg
                setTimeout(()=>{
                    err=false
                msg=""
                },15000)
            }
            else if(data.status=="success"){
                good=true
                msg=data.msg
                setTimeout(()=>{
                    good=false
                msg=""
                },6000)
                
 window.open("/home","_self")
            }
        })

    } catch (error) {
        err=true
                msg=data.msg
                setTimeout(()=>{
                    err=false
                msg=data.msg
                },6000)

    }
}

function newCus(event){
    newC=event.detail.value
    add=false
}
</script>

<main class="main relative">
<NavBar/>
{#if err==true}
<Error message={msg}/>
{:else if good==true}
<Message message={msg}/>
{/if}
<div class="form w-10/12 h-fit rounded-2xl  flex flex-col items-center justify-center absolute p-2">
    <label for="customer">Customer <input class="input" type="text" name="customer" id="customer"> <button class="h-9 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white" on:click={() =>add=!add}>Add Customer</button> <button class="h-9 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white" on:click={() =>newC=!newC}>New Customer</button></label><br><br>
    {#if add==true}
        <List on:newCus={newCus}/>
    {/if}
    {#if newC==true}
        <NewCustomer/>
    {/if}
    <label for="type">Type of payment 
         <select bind:value={selected}>
		{#each types as type}
			<option value={type}>
				{type}
			</option>
		{/each}
	</select>
    </label>
   
    <label for="days">Deposit<input class="input" type="number" name="deposit" id="deposit"></label><br>
    <label for="days">Remaining Installments <input class="input" type="number" name="days" id="days"></label><br>
   
    <br><br><br>
    <button class="h-12 w-44 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white " on:click={submit}>SUBMIT</button>
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