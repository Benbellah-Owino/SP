<script>
export let car;

function hire(){
    if(localStorage.getItem("roleDA")=="salesperson"){
        window.open(`/hirecardetails?carreg=${car.car_id}&category=sale`);
    }
    
}
</script>


<main class="tile w-64 h-80 border-2 border-purple-500 p-0 rounded-lg m-4" id={car.car_id}>
<div class="image border-b-2 border-purple-500 rounded-lg h-3/5 p-0" id="image"></div>
<div class="details relative rounded-lg p-0 h-2/5">
    <h3 class="absolute top-1 left-2 text-2xl font-bold">{car.make}</h3> 
    <h3 class="absolute top-2 left-2/4 text-xl">{car.model}</h3> 
    <h3 class="absolute top-11 left-2 ">Mileage: {car.mileage}kms</h3>
    <h3 class="absolute top-11 right-2 ">YEAR: {car.YOM}</h3>
    <h3 class="absolute bottom-2 left-2">Price: sh{car.price}</h3>
    <button class="buy border-2 border-purple-400 w-16 h-9 rounded-lg absolute bottom-2 right-4" on:click={hire}>Buy</button>
    
</div>
</main>



<style>
#image{
    background-image: url("../../images/Supra.jpg");
    background-size: cover;
}


.buy:hover{
    background-image: linear-gradient(#1a1463,#eec2f0);
    color:white;
    border: #f07502;
    transition: all 0.3s ease-in-out;
}
</style>
