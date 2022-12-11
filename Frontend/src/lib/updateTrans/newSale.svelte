<script>
    export let transaction
import { createEventDispatcher,onMount } from "svelte";
import {fly} from "svelte/transition"
const dispatch=createEventDispatcher();

let pay
let trans

let balance
$:bal=balance
onMount(()=>{
pay=document.getElementById("payments")
console.log(transaction[0].trans_id)
trans=transaction[0]
balance=trans.balance
console.log(trans)
    }
)





    let err="";
    let msg="";

function test(){
    console.log(trans.balance)
}
async function update(){
    let pend=parseInt(pay.value)
    if(pend>trans.balance){
        return err="User has overpaid"
    }
    else{
        err=""
        msg=""
        let payload={
            id:trans.trans_id,
            userID:trans.sp_id,
            payments:pend
        }
        console.log(payload)
        try {
        await fetch(`http://localhost:3000/da/api/transactions/updatesale`,{
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
            if(data.status=="success"){
                msg=data.msg
                balance=data.balance
                setTimeout(()=>{
                        err="Page is about to refresh"
                    },3000)
                setTimeout(()=>{
                    window.close()
                    window.open("/reciepts","_self")
                },10000)
            }
            else if(data.status=="fail"){
                err=data.msg
            }
        })
    }catch(error){
        console.log(error)
    }
}}
function close(){
    dispatch("close",{
        text:"close"
    })
    console.log(transaction)
}
</script>

<main in:fly="{{ y: -200, duration: 300 }}" out:fly="{{ y: -200, duration: 300 }}" class="main flex flex-col rounded-md shadow-lg shadow-purple-700 justify-center items-center w-6/12 h-80 bg-red-200 border-2 border-purple-500 absolute top-0 left-1/4 z-30 p-10">
<div class="dets p-0  flex flex-col">
    <h1>Payments to be made: {bal} </h1>
</div>
    <div class="el p-1 m-2">
        <label for="">Amount</label>
        <input type="number" id="payments" class="">
    </div>
    {#if err!=""}
    <h1 class="err text-red-600">
        {err}
    </h1>
    {/if}
    {#if msg!=""}
    <h1 class="err text-green-600">
        {msg}
    </h1>
    {/if}
    <button class="bg-purple-50 border border-purple-600 rounded-full hover:bg-purple-500 hover:text-white p-1 m-3" on:click={update}>Update</button>
    <button class="bg-red-50 border border-red-500 text-red-600  rounded-full h-8 w-8 hover:bg-purple-500 hover:text-white p-1 m-3 absolute right-1 top-0" id="close" on:click={close}><i class="fa-solid fa-xmark text-red-600"></i></button>
    <button class="bg-red-50 border  border-red-600  text-red-500 rounded-full hover:shadow-lg hover:shadow-red-500  hover:bg-red-500 hover:text-white p-1 m-3  " >Finish Transaction</button>
</main>

<style>
input{
    border:solid 1px rgb(168 85 247);
    border-radius: 20px;
    padding-left:10px;
}

#close:hover,#close:hover i{
    background-color:red;
    color:white;
    transition: all ease 0.3s;
}

</style>