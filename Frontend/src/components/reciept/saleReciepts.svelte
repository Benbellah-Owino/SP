<script>
    import {onMount,createEventDispatcher} from "svelte"
    const dispatch=createEventDispatcher();
export let sale
let customer={}
let sp={}
onMount(async()=>{
     await fetch(`http://localhost:3000/da/api/customer/getcustomer?id=${sale.cust_id}`,{
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

     await fetch(`http://localhost:3000/da/api/users/getsl?id=${sale.sp_id}`,{
         credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
    })
    .then((response)=>response.json())
    .then((data)=>{
        sp=data.result
        
    })

})

function update(){
    dispatch("update",{
        id:sale.trans_id
    })
}

let inst=sale.balance/sale.no_installments
</script>
<svelte:head>
	<script src="https://kit.fontawesome.com/42b8efcb5a.js" crossorigin="anonymous"></script>
</svelte:head>
<main class="main relative w-10/12 h-44 border-2 border-black m-3">
    <h1 class="head absolute top-0 left-32 font-bold text-black">Don's Auto Hire And DelearShip   &#160; &#160; &#160;  RECIEPT</h1>
    <p class="id absolute top-0 right-1">Transaction ID:  {sale.trans_id}</p>
    <button class="absolute top-6 right-2 w-7 h-7 border-2 border-purple-600 hover:bg-purple-500 hover:text-white" on:click={update}><i class=" hover:bg-purple-500 hover:text-white fa-solid fa-download"></i></button>
    <div class="divide w-full bg-black opacity-60 absolute top-5"></div>
    <p class="type absolute top-6 left-2">Transaction Type:Sales</p>
    <p class="driverId absolute top-6 ">Salesperson Id: {sale.sp_id}</p>
    <p class="drivername absolute top-6">Salesperson Name: {sp.first_name} {sp.middle_name}</p>
    <p class="customerId absolute top-14 left-2">Customer Id: {sale.cust_id}</p>
    <p class="customerName absolute top-14">Customer Name:  {customer.first_name} {customer.middle_name} </p>
    <p class="customerContact absolute top-14">Customer Contact: 0784233343</p>
    <p class="car absolute top-24 left-2">Car ID: {sale.car_id}</p>
    <p class="carName absolute top-24 left-1/3">Toyota Crown</p>
    <p class="days absolute top-24 left-2/4">Installments: {sale.no_installments}</p>
    <p class="price absolute top-24 left-2/3">I.Price: {sale.price_pi} per month</p>
    <p class="deposit absolute top-32 left-2">Price: $8000000</p>
    <p class="payment absolute top-32 left-1/3">Installments left: {inst}</p>
    <p class="balance absolute top-32 left">Total balance: {sale.balance}</p>
    <img src="src/images/dmIco.png" alt="Navbar Icon" class="m-0 h-3 w-3 absolute top-2/4 right-2">
</main>

<style>

    *{
        font-family: 'Times New Roman', Times, serif;
    }

     button:hover>i{
        background-color: rgb(147 51 234 );
        color:white;
        transition:all 0.3s ease;
    }
   

    .left{
        left:65%
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