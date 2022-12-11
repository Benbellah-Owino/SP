<script>
import Luxury from "$lib/admin/luxury.svelte"
import Driver from "$lib/admin/driver.svelte"
import {driverOBJ,luxOBJ} from "../../../stores/stock"
	import { onMount } from "svelte";
let display;
let smp
onMount(()=>{
    display=document.getElementById("photos")
    smp=document.getElementById("smp")
})
let dr=false;
let lux=false;
let type="sale";
let body_types=["Sedan","SUV","Hatchback","Station Wagon"]
let body_type;
let transmission;
let fuel;

let payload={}

async function submit(){
    payload.car_reg=document.getElementById("reg_field").value
    payload.make=document.getElementById("make_field").value
    payload.model=document.getElementById("model_field").value
    payload.yom=document.getElementById("yom_field").value
    payload.color=document.getElementById("color_field").value
    payload.category=type
    if(type=="hire"){
    payload.hire_price=document.getElementById("price_hire").value
    }
    else if(type=="sale"){
    payload.sale_price=document.getElementById("price_sale").value
    }
    payload.mileage=document.getElementById("mileage").value
    payload.body_type=body_type

    let perfomance={
        engineCC:document.getElementById("engineCC").value,
        power:document.getElementById("hp").value,
        transmission,
        tourque:document.getElementById("tourque").value,
        fuel,
        engine_config:document.getElementById("eng_config").value
    }
    payload.perfomance=perfomance
    payload.luxury=$luxOBJ
    payload.driver=$driverOBJ

    console.log(payload)

     try {
        await fetch(`http://localhost:3000/da/api/inventory/newInventory`,
            {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            let msg=data.msg
            console.log(msg)
        })
    } catch (error) {
        console.log(error)
    }
    console.log(payload);
}

let image
let pic
function selectFile(){
    let input = document.createElement('input');
    
    input.type = 'file';
    input.name="img";
    input.accept="image/*, video/*"
    input.onchange = ()=> {
        const file=input.files[0]
        const reader=new FileReader();
        reader.addEventListener("load",()=>{
            display.style.backgroundImage=`url(${reader.result})`
            smp.style.backgroundImage=`url(${reader.result})`
            pic=reader.result
            console.log(pic)

            image=reader.result
      
        })
        if(file){
            console.log(image)
    
        reader.readAsDataURL(file);
        try{
        fetch(`http://localhost:3000/upload`,
            {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body:JSON.stringify(image)
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data)
        })
    } catch (error) {
        console.log(error)
    }
        }
        
};
    input.click()
}

function home(){
    window.open("/admin/adminhome")
}
</script>
<svelte:head>
	<script src="https://kit.fontawesome.com/42b8efcb5a.js" crossorigin="anonymous"></script>
</svelte:head>
<main class="m-2">

     <button class="closeP absolute top-3 r-3 z-30  border border-purple-600 h-8 w-12 hover:bg-purple-500 hover:text-white hover:shadow-md hover:shadow-purple-500" on:click={home}>Home</button>

<div class="cont  flex flex-col justify-center items-center w-11/12 bg-purple-200 h-full p-2">
    <!-- <div class="addPhotos w-4/6 text-8xl relative" id="photos">
        
    </div>

    <div id="smp" class="w-64 h-48 border-2 border-purple-500"></div>


    <button class="addPh" id="addP" on:click={selectFile}>Add Photo</button> -->
    <div class="form w-5/6 m-3">
        <div class="entry reg ">
            <label for="reg_field">Car Registration</label>
            <input type="text" name="reg_field" id="reg_field" class="txtFields">
        </div>
        <div class="entry  ">
            <label for="make_field">Make</label>
            <input type="text" name="make_field" id="make_field" class="txtFields">
        </div>
        <div class="entry ">
            <label for="model_field">Model</label>
            <input type="text" name="model_field" id="model_field" class="txtFields">
        </div>
        <div class="entry  ">
            <label for="yom_field">Year Of Manufacture</label>
            <input type="text" name="yom_field" id="yom_field" class="txtFields">
        </div>
        <div class="entry ">
            <label for="color_field">Color</label>
            <input type="text" name="color_field" id="color_field" class="txtFields">
        </div>
        <div class="entry reg ">
            <label for="type">Type</label>
            <div class="txtFields">
                <label>
	            <input type="radio" bind:group={type} name="type" value={"hire"} class="select">
	            Hire
            </label>
            <label>
	            <input type="radio" bind:group={type} name="type" value={"sale"} class="select">
	            Sale
            </label>
            </div>
        </div>
        {#if type=="hire"}
            <div class="hire flex flex-col justify-center">
                <label for="price_hire" class="float-left">Price Per Day</label>
                <input type="text" name="price_hire" id="price_hire" class="txtFields">
            </div>
        {:else if type="sale"}
            <div class="hire flex  flex-col justify-center">
                <label for="price_sale" class="float-left">Price</label>
                <input type="text" name="price_sale" id="price_sale" class="txtFields">
            </div>
        {/if}
            <div class="entry ">
            <label for="mileage">Mileage</label>
            <input type="text" name="mileage" id="mileage" class="txtFields">
        </div>
        <div class="entry ">
            <label for="body_type">Body Type</label>
            <select class="txtFields" bind:value={body_type} on:change="{() => ''}">
		{#each body_types as type}
			<option value={type}>
			    {type}
			</option>
		{/each}
        </div>
        <h3>Perfomance details</h3>
        <div class="entry reg ">
            <label for="engineCC">Engine CC</label>
            <input type="text" name="engineCC" id="engineCC" class="txtFields">
        </div>
        <div class="entry  ">
            <label for="hp">HorsePower</label>
            <input type="text" name="hp" id="hp" class="txtFields">
        </div>
        <div class="entry ">
            <label for="Transmission">Transmission</label>
            <label>
	            <input type="radio" bind:group={transmission} name="type" value={"automatic"} class="select">
	            Automatic
            </label>
            <label>
	            <input type="radio" bind:group={transmission} name="type" value={"manual"} class="select">
	            Manual
            </label>
            <label>
	            <input type="radio" bind:group={transmission} name="type" value={"manual"} class="select">
	            CVT
            </label>
        </div>
        <div class="entry  ">
            <label for="tourque">Tourque</label>
            <input type="text" name="tourque" id="tourque" class="txtFields">
        </div>

        <div class="entry ">
            <label for="fuel">Fuel Type</label>
            <div class="txtFields">
                <label>
	            <input type="radio" bind:group={fuel} name="fuel" value={"petroleum"}  class="select">
	            Petroleum
            </label>
            <label>
	            <input type="radio" bind:group={fuel} name="fuel" value={"diesel"}  class="select">
	            Diesel
            </label>
            <label>
	            <input type="radio" bind:group={fuel} name="fuel" value={"electric"}  class="select">
	            Electric
            </label>
            </div>
        </div>
        <div class="entry  ">
            <label for="hp">Engine Configuration</label>
            <input type="text" name="eng-config" id="eng_config" class="txtFields">
        </div>
    </div>
    <button class="toggleDriver m-5 h-8 w-14 bg-purple-200 border-2 border-purple-500 rounded-full hover:bg-purple-500 hover:text-white" on:click={()=>dr=!dr}>Driver</button>
    {#if dr===true}
        <Driver />
    {/if}
    <button class="toggleLux m-5 h-8 w-16 bg-purple-200 border-2 border-purple-500 rounded-full hover:bg-purple-500 hover:text-white" on:click={()=>lux=!lux}>Luxury</button>
    {#if lux===true}
        <Luxury/>
    {/if}

    <button class="toggleDriver m-5 h-10 w-20 text-xl bg-purple-200 border-2 border-purple-500 rounded-full hover:bg-purple-500 hover:text-white" on:click={submit}>Submit</button>
</div>



</main>

<style>
.cont{
    float:right;
    height: 100%;
}

/* #photos{
    background-repeat: no-repeat;
    background-size: cover;
} */

.form{
    height:90%
}
.entry{
    margin:10px;
    position: relative;
    height:40px;
    border:#7f03fc 0.5px solid;
    padding:2px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.txtFields{
    position: absolute;
    right:20%;
    top:auto;
    margin:0;
}
/* .addPh{
    border:0.5px solid #7f03fc;
    border-radius: 25px;
    width:100px;
    background-color:#f1eaf8;
    margin:10px 10px;
}

.addPh:hover{
    background-color: #7f03fc;
    color:white;
    transition: all 0.3s ease;
}

.addPhotos{
    width:760px;
    height:400px;
    background-size: cover;
    background-repeat: no-repeat;
}

#smp{
    background-size: cover;
    background-repeat: no-repeat;
} */

input,select{
    border: #7f03fc 0.5px solid;
    border-radius: 999px;
    margin-left: 10px;
    margin-top: 10px;
    padding-left: 4px;
}



</style>