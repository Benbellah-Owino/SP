<script>    
import Item from "../containers/items.svelte"
import {onMount} from "svelte"
import {pendCust} from "../../stores/customer"

let txt
let pct
let comnme
let wrd
let wrct
onMount(()=>{
    txt=document.getElementById("hmeadd")
    pct=document.getElementById("pct")
    comnme=document.getElementById("comnme")
    wrd=document.getElementById("wrkad")
    wrct=document.getElementById("wrkct")
})
let addressess=[]
let contacts=[]
let companies=[]
let workaddress=[]
let workContacts=[]

let add=false
let cont=false
let nme=false
let adds=false
let comp=false

let id=1
function addAddresses(){
    
    if(add==true){
        console.log(txt.value)
        let obj={
            id,
            text:txt.value,         
        }
        console.log(obj)
        addressess=[...addressess,obj]
        id++
    }
    else{
        console.log(txt.value)
        let obj={
            id,
            text:txt.value,         
        }
        console.log(obj)
        addressess=[...addressess,obj]
        id++
        add=!add
    }
}
function addConts(){
    if(cont==true){
         let obj={
            id,
            text:pct.value,         
        }
        contacts=[...contacts,obj]
        id++
    }
    else{
         let obj={
            id,
            text:pct.value,         
        }
    cont=!cont
    contacts=[...contacts,obj]
    id++
    }
    console.log(contacts)
}
function addName(){
    if(nme==true){
        let obj={
            id,
            text:comnme.value,         
        }
        companies=[...companies,obj]
        id++       
    }
    else{
        let obj={
            id,
            text:comnme.value,         
        }
        companies=[...companies,obj]
        id++     
    nme=!nme
    }
    console.log(companies)
}
function addWrk(){
    if(adds==true){
         let obj={
            id,
            text:wrd.value,         
        }
        workaddress=[...workaddress,obj]
        id++
    }
    else{
         let obj={
            id,
            text:wrd.value,         
        }
        workaddress=[...workaddress,obj]
        id++
    adds=!adds
    }
    console.log(workaddress)
}
function addComps(){
    if(comp==true){
        let obj={
            id,
            text:wrct.value,         
        }
        workContacts=[...workContacts,obj]
        id++
    }
    else{
    let obj={
            id,
            text:wrct.value,         
        }
        workContacts=[...workContacts,obj]
        id++
    comp=!comp
    }
    console.log(workContacts)
}

async function addCust(){
        let id=document.getElementById("id").value

    
    let payload={
        id:parseInt(id),
        fname:document.getElementById("f_name").value,
        mname:document.getElementById("m_name").value,
        lname:document.getElementById("s_name").value,
        bank_account:document.getElementById("bank").value,
        email:document.getElementById("email").value,
        addresses:addressess,
        contacts:contacts,
        work:{
            companies:companies,
            contacts:workContacts,
            addresses:workaddress
        }
    }

    console.log(payload)
    try{
        await fetch("http://localhost:3000/da/api/customer/addcustomer",
            {
				method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
        
        })
        .then(response=>response.json())
        .then((data)=>{
        console.log(data.msg)
        })

        $pendCust=payload
    } catch (error) {
        console.log(error)
    }
}
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/42b8efcb5a.js" crossorigin="anonymous"></script>
</svelte:head>

<main class="main shadow-lg shadow-purple-400 flex flex-col justify-center items-center absolute ">
    NewCustomer
    <div class="name relative art_el flex justify-start items-center">
         <label for="id" class="label">ID </label>
         <input type="number" name="id" id="id" class="second">
    </div>
    <div class="name relative art_el flex justify-start items-center">
         <label for="f_name" class="label">First Name </label>
         <input type="text" name="f_name" id="f_name" class="second">
    </div>
    <div class="name relative art_el flex justify-start items-center">
         <label for="m_name" class="label">Middle Name </label>
         <input type="text" name="m_name" id="m_name" class="second">
    </div>
    <div class="name relative art_el flex justify-start items-center">
        <label for="s_name" class="label">Surname </label>
         <input type="text" name="s_name" id="s_name" class="second">
    </div>
    <div class="name relative art_el flex justify-start items-center">
        <label for="back" class="label">Bank Account </label>
         <input type="text" name="bank" id="bank" class="second">
    </div>
    <div class="name relative art_el flex justify-start items-center">
        <label for="email" class="label">Email </label>
         <input type="text" name="email" id="email" class="second">
    </div>

    
   
   
    <!-- <label for="m_name">Customer Middle Name <input type="text" name="m_name" id="m_name"></label>
    <label for="s_name">Customer Last Name <input type="text" name="s_name" id="s_name"></label> -->
    <!-- <label for="s_name">Bank Account<input type="text" name="bank" id="bank"></label>
    <label for="email"> Email<input type="text" name="email" id="email"></label>
    -->

    <div class="name relative art_el flex justify-start items-center">
        <label for="hmeadd" class="label">Home Address</label>
        <input type="text" name="email" id="hmeadd" class="secondt">
        <button on:click={addAddresses} class="abt h-7 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add Address</button>
    </div>
    
 {#if add==true}
    <div class="cont h-10 w-10/12">
        {#each addressess as item(item.id)}
           <Item item={item}/>
        {/each}
        <button class="closdisp border-2 border-purple-500 float-right h-6 w-6" on:click={()=>add=!add}><i class="fa-solid fa-xmark"></i></button>
    </div>
 {/if}

 <div class="name relative art_el flex justify-start items-center">
        <label for="pct" class="label">Personal Contacts</label>
        <input type="text" name="pct" id="pct" class="secondt">
        <button on:click={addConts} class="abt h-7 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add Address</button>
    </div>
<!-- <label for="pct">Personal Contacts <input type="number" name="pct" id="pct"><button on:click={addConts} class="h-7 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add Contact</button></label> -->
 {#if cont==true}
    <div class="cont h-10 w-10/12">
    {#each contacts as item(item.id)}
           <Item item={item}/>
        {/each}</div>
 {/if}

 <div class="name relative art_el flex justify-start items-center">
        <label for="comnme" class="label">Company/Business</label>
        <input type="text" name="comnme" id="comnme" class="secondt">
        <button on:click={addName} class="abt h-7 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add Address</button>
    </div>
<!-- <label for="comnme"> <input type="text" name="conmne" id="conmne"><button on:click={addName} class="h-7 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add </button></label> -->
     {#if nme==true}
    <div class="cont h-10 w-10/12">
        {#each companies as item(item.id)}
           <Item item={item}/>
        {/each}
    </div>
 {/if}

    <div class="name relative art_el flex justify-start items-center">
        <label for="wrkad" class="label">Work Address</label>
        <input type="text" name="wrkad" id="wrkad" class="secondt">
        <button on:click={addWrk} class="abt h-7 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add Address</button>
    </div>
    <!-- <label for="wrkad">Work Address <input type="text" name="wrkad" id="wrkad"><button on:click={addWrk} class="h-7 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add Address</button></label> -->
     {#if adds==true}
    <div class="cont h-10 w-10/12">
         {#each workaddress as item(item.id)}
           <Item item={item}/>
        {/each}
    </div>
 {/if}

 <div class="name relative art_el flex justify-start items-center">
        <label for="wrkct" class="label">Add Address</label>
        <input type="text" name="wrkct" id="wrkct" class="secondt">
        <button on:click={addComps} class="abt h-7 w-32 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add Address</button>
    </div>
    <!-- <label for="wrkct">Work Contact<input type="number" name="wrkct" id="wrkct"><button on:click={addComps} class="h-7 w-40 border-2 bg-slate-200 border-purple-500 rounded-full hover:bg-purple-600 hover:text-white">Add Work Contact</button></label> -->
     {#if comp==true}
    <div class="cont h-10 w-10/12">
         {#each workContacts  as item(item.id)}
           <Item item={item}/>
        {/each}
    </div>
 {/if}

    <div class="btnss">
        <button class="add w-14 h-7 rounded-full border-2 border-purple-500 hover:bg-purple-600 hover:text-white" id="add" on:click={addCust}>Add</button>
    </div>
</main>

<style>
.main{
    background-color: rgb(246, 235, 255);
    left:-120px;
    top:-120px;
    height:1200px;
}

.name{
    width:60%;
}
button{
    font-size: 14px;
    margin-left: 10px;
}


.cont{
    border-radius: 12px;
    border:0.5px solid #cfaaf3;
    font:12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px;
}
input{
    border:1px solid #7f03fc;
    border-radius: 8px;
    margin-left:10px;
}


.second{
    position: absolute;
    left:45%;
}
.secondt{
    position: absolute;
    left:35%;
}

.abt{
    position: absolute;
    left:75%;
}
.main {
    width:800px;
    align-items: stretch;
    border: 0;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 400px;
    flex-direction: column;
    font: inherit;
    font-size: 100%;
    margin: 0;
    min-width: 50px;
    padding: 10px;
    position: relative;
    vertical-align: baseline;
}

.label{
    box-sizing: border-box;
    flex: 0 0 194px;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    
    position: absolute;
    left:4px;
}

.art_el{
    font-size:20px;
    height:40px;
    margin:6px;
    width:98%;
}
</style>