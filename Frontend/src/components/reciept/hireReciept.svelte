<script>
	import { onMount,createEventDispatcher } from "svelte";
const dispatch=createEventDispatcher();

export let hire
let days=hire.days_hired
let pd=hire.payments_made
let customer={}
let driver={}
onMount(async()=>{
     await fetch(`http://localhost:3000/da/api/customer/getcustomer?id=${hire.cust_id}`,{
         credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
    })
    .then((response)=>response.json())
    .then((data)=>{
        customer=data.result
    })
    await fetch(`http://localhost:3000/da/api/users/getond?id=${hire.dri_id}`,{
         credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
    })
    .then((response)=>response.json())
    .then((data)=>{
        driver=data.result
        console.log(driver)
    })
})

let rem=days-pd
let balance=rem*hire.price_pd

function update(){
    dispatch("update",{
        id:hire.trans_id
    })
}
</script>

<main class="main relative w-10/12 h-44 border-2 border-black m-3">

    <h1 class="head absolute top-0 left-32 font-bold text-black">Don's Auto Hire And DelearShip &#160; &#160;  RECIEPT</h1>
    <p class="id absolute top-0 right-1">Tran ID: {hire.trans_id}</p>
    <div class="divide w-full bg-black opacity-60 absolute top-5 "></div>
    <button class="absolute top-6 right-2 w-7 h-7 border-2 border-purple-600 hover:bg-purple-500 hover:text-white" on:click={update}><i class="fw fa-regular fa-pen-to-square"></i></button>
    <p class="type absolute top-6 left-2">Transaction Type:Hire</p>
    <p class="driverId absolute top-6 ">Driver Id:{hire.dri_id}</p>
    <p class="drivername absolute top-6">Driver Name: {driver.first_name} {driver.middle_name} </p>
    <p class="customerId absolute top-14 left-2">Customer Id:{hire.cust_id}</p>
    <p class="customerName absolute top-14">Customer Name: {customer.first_name}  {customer.last_name}</p>
    <p class="customerContact absolute top-14">Customer Contact: 0784233343</p>
    <p class="car absolute top-24 left-2">Car RegNo: {hire.car_reg}</p>
    <p class="carName absolute top-24 left-1/3">Toyota Crown</p>
    <p class="days absolute top-24 left-2/3">Days Hired: {hire.days_hired}</p>
    <p class="price absolute top-32 left-2">Price: {hire.price_pd} per day</p>
    <p class="payment absolute top-32 left-1/3">Installments left:{rem} </p>
    <p class="balance absolute top-32 left-2/3">Total balance: ${balance}/p>
    <img src="src/images/dmIco.png" alt="Navbar Icon" class="m-0 absolute h-3 w-3 top-2/4 right-2">
</main>

<style>
    button:hover, button:hover .fw{
        background-color: rgb(180, 116, 245);
        color:white;
        transition: all ease 0.3s;
    }

    *{
        font-family: 'Times New Roman', Times, serif;
    }

    .divide{
        height:0.5px;
    }
     /* .main{
        border:black 1px solid;
        width:66%;
     } */
    p{
        font-size: 14px;
    }
    .driverId{
        left:38%;
        font-size: 14px;
    }

    .drivername{
        left:65%
    }


    .customerName{
        left:30%;
    }

    .customerContact{
        left:65%;
    }

    
</style>