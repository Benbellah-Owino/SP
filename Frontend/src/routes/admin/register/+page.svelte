<script>
import {onMount} from "svelte"
	import { each } from "svelte/internal";
import Message from "../../../lib/messages/message.svelte"
import Error from "../../../lib/messages/error.svelte"
let fNameField;
let mNameField;
let sNameField;
let idField;
let salaryField;
let DOBfield;
let addressField;
let contactsField
let addresses=[];
let contacts=[]
let pwField;
let cpwField;

let err=false
let good=false
 let msg="";
onMount(()=>{
    fNameField=document.getElementById("f_name");
    mNameField=document.getElementById("m_name");
    sNameField=document.getElementById("s_name");
    salaryField=document.getElementById("salary");
    DOBfield=document.getElementById("date_of_birth");
    addressField=document.getElementById("addresses");
    contactsField=document.getElementById("contactsField")
    idField=document.getElementById("ID");
    pwField=document.getElementById("pw");
    cpwField=document.getElementById("cpw");

})
let salesman={
    number:1,
    value:"Salesman"
}
let driver={
    number:2,
    value:"Driver"
}
let type;
let other={
    number:3,
    value:type
}
let empty={
    number:0,
    value:"Select"
}

function addAddress(){
    addresses.push(addressField.value)
    addressField.value="";
    console.log(addresses)
}

function addContacts(){
    contacts.push(contactsField.value)
    contactsField.value="";
    console.log(contacts);
}
async function submit(){
    if(pwField.value===cpwField.value){
        let sales;
        let car_reg
    if(document.getElementById("sales")){
        sales=document.getElementById("sales").value
    }
    else if(document.getElementById("carreg")){
        car_reg=document.getElementById("carreg").value
    }
    else{
        sales=0;
        car_reg=null;
    }
    
    
    let dh=new Date().toISOString().slice(0, 19).replace('T', ' ')
    dh=dh.split(" ")[0]
    let payload={
        id:parseInt(idField.value),
        firstName:fNameField.value,
        middleName:mNameField.value,
        sNameField:sNameField.value,
        employeeType:empty.value,
        salary:parseInt(salaryField.value),
        email:document.getElementById("email").value,
        contacts,
        addresses,
        password:pwField.value,
        DOB:DOBfield.value,
        sales:parseInt(sales),
        car_reg:car_reg,
        DOH:dh
    }

    console.log(payload)
    try {
        await fetch(`http://localhost:3000/da/api/users/createuser`,
            {
				method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
        }).then((response)=>response.json())
        .then((data)=>{
            if(data.status=="success"){
                msg=data.msg
            console.log(msg)

            good=true
            setTimeout(()=>{
                good=!good
                msg=""
            },10000)
            }
            else if(data.status=="fail"){
                 err=true
             msg=data.msg
            setTimeout(()=>{
                err=!err 
                msg=""
            },10000)
            }
            
        })
    } catch (error) {
        err=true
        msg=error
            setTimeout(()=>{
                err=!err 
                msg=""
            },10000)
    }
    console.log(payload);
    addresses=[]
    contacts=[]
    idField.value=""
    fNameField.value="",
    mNameField.value="",
    sNameField.value="",
    empty.value="",
    salaryField.value="",
    document.getElementById("email").value,
    pwField.value="",
    DOBfield.value="",
    sales="",
    car_reg=""
    dh=""
    }
    else if(pwField!=cpwField){
       
        err=true
        msg="Passwords don't match"
            setTimeout(()=>{
                err=!err 
                msg=""
            },3000)
    }
}

function home(){
    window.close()
    window.open("/admin/adminhome")
}

</script>

<main class="main flex flex-col justify-center items-center p-2">
    {#if good===true}
        <Message message={msg}  />
    {:else if err===true}
        <Error message={msg} />
    {/if}
<button class="h-8 w-14 absolute top-2 left-2 " on:click={home}>HOME</button>
<img src="../src/images/DonLogo.png" alt="Company Logo" id="logo"/>
<div id="register" class="form w-2/3 flex flex-col justify-center items-center">
    <label for="f_name">First Name    <input type="text" name="f_name" id="f_name" class="txt_box rounded"/></label>
    <br>

    <label for="m_name">Middle Name   <input type="text" name="m_name" id="m_name" class="txt_box rounded"/></label>
    <br>

    <label for="s_name">Surname   <input type="text" name="s_name" id="s_name" class="txt_box rounded"/></label>
        <br>

    <label for="ID">ID number   <input type="ID" name="ID" id="ID" class="txt_box rounded"/></label>
     <br>

    <div class="radio">
        <label>
	<input type="radio" class="radio" name="emp_type" bind:group={empty} value={salesman}>
	Salesman
</label>

<label>
	<input type="radio" class="radio" name="emp_type" bind:group={empty} value={driver}>
	Driver
</label>

<label>
	<input type="radio" class="radio" name="emp_type" bind:group={empty} value={other}>
	Other
</label>
    </div>

    {#if empty.number==3}
        <label for="employee_type">Employee type    <input type="text" name="employee_type" id="employee_type" bind:value={empty.value} class="txt_box rounded"/></label>
   <br>
    {:else if empty.number==1}
        <label for="sales">No Of Sales    <input type="number" name="sales" id="sales" class="txt_box rounded"/></label>
   <br>
    {:else if empty.number==2}
        <label for="carreg">Car Reg    <input type="text" name="carreg" id="carreg" class="txt_box rounded"/></label>
   <br>
    {/if}

    <label for="salary">Salary <input type="number" name="salary" id="salary" class="txt_box rounded"/></label>

    <label for="data_of_birth">Date Of Birth <input type="text" name="date_of_birth" id="date_of_birth" class="txt_box rounded" placeholder="yyyy-mm-dd"/></label><br>

    <label for="email">Email <input type="text" name="email" id="email" class="txt_box rounded"/></label><br>

    <label for="contacts">Contacts <input type="text" name="contacts" id="contactsField" class="txt_box rounded"/><button class="f rounded mr-2" id="add_Cntbtn" on:click={addContacts}>Add contacts</button></label><br>
    
    <label for="addresses">Address <input type="text" name="addresses" id="addresses" class="txt_box rounded"/> <button class="f rounded" id="add_btn" on:click={addAddress}>Add address</button></label><br>
    <div class="h-12 w-3/4 rounded-3xl border-2 border-purple-200 text-center m-3" id="disp">
        {#each addresses as address}
            {address}
        {/each}
    </div>

    <label for="pw">Password <input type="text" name="pw" id="pw"></label>
    <label for="cpw">Confirm Password <input type="text" name="cpw" id="cpw"></label>

</div>
  <button class="submit w-40 h-20 text-2xl font-bold rounded-lg" on:click={submit}>Register Employee</button>

</main>

<style>
#logo{
    height: 500px;
    width:500px;
}
.txt_box{
    border:1px solid;
    border-color: #7f03fc;
}

.radio{
    accent-color:#7f03fc;
}

label{
    margin-top: 8px;
}

#add_btn,#add_Cntbtn, .submit{
    border:1px solid;
    border-color: #7f03fc;
}
#add_btn:hover , .submit:hover{
    background-image:linear-gradient(#7f03fc,#8856e0);
    color:aliceblue;
    transition:all 0.3s ease;
}

</style>