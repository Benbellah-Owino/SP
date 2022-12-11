<script>
import { onMount } from 'svelte';
import { page } from '$app/stores';
let param
let carID
let category
let car={}
let performance={}
let driver=[]
let lux=[]


function driDict(value){
    if(value=="cruise_ctrl"){return value="Cruise Control"}
    else if(value=="nav_system"){return value="Nav System"}
    else if(value=="rev_sens"){return value="Reverse Sensors"}
    else if(value=="dash_cam"){return value="Dashboard Camera"}
}

function luxDict(value){
    if(value=="multi_air"){return value="Multi Zone Airconditioning"}
    else if(value=="driver_electric_seat"){return value="Driver Electric Seat"}
    else if(value=="pass_electric_seat"){return value="Passenger Electriic Seat"}
    else if(value=="heat_f_seats"){return value="Heated Front Seats"}
    else if(value=="sound_system"){return value="Sound System"}
}

onMount(()=>{
    param=$page.url.search
    carID=param.split("&")[0].split("=")[1]
    category=param.split("&")[1].split("=")[1]
//console.log(carID)
//console.log(category)
try{
    fetch(`http://localhost:3000/da/api/inventory/getonecar?id=${carID}&category=${category}`)
    .then((response)=>response.json())
    .then((data)=>{
        car=data.result[0]
    })


    fetch(`http://localhost:3000/da/api/inventory/getdrivfeatures?id=${carID}`)
    .then((response)=>response.json())
    .then((data)=>{
        let driv=data.result[0]
        
        let id=0
        for(const key in driv){
            
            if(driv[key]==1){
                let val=driDict(key)
                driver=[...driver,{val}]
            }
        }
        
    })


    fetch(`http://localhost:3000/da/api/inventory/getperfeatures?id=${carID}`,{
         credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
    })
    .then((response)=>response.json())
    .then((data)=>{
        performance=data.result[0]
        //console.log(performance)
    })
    fetch(`http://localhost:3000/da/api/inventory/getluxfeatures?id=${carID}`,{
         credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
    })
    .then((response)=>response.json())
    .then((data)=>{
        let l=data.result[0]
        console.log(l)
        for(const key in l){
            if(l[key]==1){
                let val=luxDict(key)
                lux=[...lux,{val}]
            }
        }

        console.log(lux)
    })
  } catch (error) {
    console.log(error)
 }
 
})

function openTransaction(){

    window.open(`/newSale?carid=${carID}&category=${category}`)
}

function home(){
    window.open("/admin/adminhome","self")
}
</script>

<main class="main h-full w-full flex flex-col justify-center items-center bg-purple-50">
     <button class="closeP absolute top-3 r-3 z-30  border border-purple-600 h-8 w-12 hover:bg-purple-500 hover:text-white hover:shadow-md hover:shadow-purple-500" on:click={home}>Home</button>
    <div class="mainDets cont h-auto border p-3 w-10/12">
        <span class="bg-purple-50">{car.make}</span> <span class="bg-purple-50">{car.model}</span><br><br>
        <span class="bg-purple-50">Year of Manufacture: &nbsp {car.YOM}</span><br><br>
        <span class="bg-purple-50">Color:  &nbsp {car.color}</span> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  <span class="bg-purple-50">Mileage: &nbsp{car.mileage}</span><br><br>
        {#if category=="hire"}
        <span class="bg-purple-50">price per day: sh{car.price_pd}</span><br><br>
        {/if}
        {#if category=="sale"}
        <span class="bg-purple-50">price: sh{car.price}</span><br><br>
        {/if}
    </div><br>

    <div class="per mainDets cont h-auto border p-3 w-10/12">
        <span class="bg-purple-50">Engine Capacity: {performance.engine_cap}cc</span> <br><br>
        <span class="bg-purple-50">Engine power: {performance.hp}hp</span><br><br>
        <span class="bg-purple-50">Transmission: {performance.transmission}</span><br><br>
        <span class="bg-purple-50">Engine Tourque: {performance.tourque}npm</span><br><br>
        <span class="bg-purple-50">Fuel/Power source: {performance.fuel_type}</span><br><br>
    </div><br>    

    <div class="per mainDets cont h-auto border p-3 w-10/12">
        {#each driver as drv}
        {#if drv.val!=undefined}
            <span class="bg-purple-50">{drv.val}</span> <br>
        {/if}
        {/each}
    </div><br>


    <div class="per mainDets cont h-auto border p-3 w-10/12">
        {#each lux as drv}
        {#if drv.val!=undefined}
            <span class="bg-purple-50">{drv.val}</span> <br>
        {/if}
        {/each}
    </div><br>
    <button class="submit rounded-full h-8 w-16 p-1 border border-purple-500 bg-purple-100 hover:bg-purple-500 hover:text-white" on:click={openTransaction}>{category}</button>
</main>

<style>
.main{
    height:100vh;
    width:100vh;
}
</style>