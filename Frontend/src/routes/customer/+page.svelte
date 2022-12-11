<script>
import { onMount } from "svelte";

let customers=[]

let conts=false
let contacts=[]
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

function getContacts(id){
    conts=!conts
    console.log(id)
      fetch(`http://localhost:3000/da/api/customer/getcustconts?id=${id}`,{
         credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
    })
    .then((response)=>response.json())
    .then((data)=>{
        contacts=data.result
         console.log(contacts)
    })
}

function home(){
    window.open("/admin/adminhome","_self")
}
</script>
<main class="main p-3 flex flex-col h-full w-full relative">

   
    <div class="emp w-11/12">
        <div class="header text-center text-4xl">
        Customers
        </div>

        <table class="table-auto rounded-xl w-11/12">
            <tr class="bg-purple-100">
                <th>ID</th>
                <th>Name</th>
                <th>Bank Account</th>
                <th>Email</th>
                <th>Contacts</th>
            </tr>
        {#each customers as customer(customer.cust_id)}
            <tr>
                <td>{customer.cust_id}</td>
                <td>{customer.first_name} {customer.middle_name} {customer.last_name}</td>
                <td>{customer.bank_account}</td>
                <td>{customer.email}</td>
                <td><button class="border border-purple-600 hover:bg-purple-600 hover:text-white" on:click={getContacts(customer.cust_id)}>contacts</button></td>
            </tr>
        {/each}
    </table>
    
    </div>

{#if conts==true}
  <div class="cocts border rounded-md border-purple-300 p-1 flex flex-col justify-center items-center w-fit absolute top-2 right-1 bg-purple-300">
        {#each contacts as contact}
        {contact.contact}<br>
        {/each}
        <button on:click={()=>conts=!conts}>close</button>
    </div>
{/if}

     <button class="closeP absolute top-3 r-3 z-30  border border-purple-600 h-8 w-12 hover:bg-purple-500 hover:text-white hover:shadow-md hover:shadow-purple-500" on:click={home}>Home</button>
</main>

<style>
 table{
    border-radius: 12px;
 }
th, td {
    text-align: center;
    border:1px solid rgb(253, 234, 253)
}

th{
    background-color: rgb(253, 234, 253);
}

.emp{
    margin-bottom: 20px;
}
</style>