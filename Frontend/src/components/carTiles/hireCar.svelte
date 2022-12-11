<script>
    export let car;
    function hire(){
        if(localStorage.getItem("roleDA")=="driver"){
             window.open(`/hirecardetails?carreg=${car.car_reg}&category=hire`);
        }
       
    }
</script>


<main class="tile w-64 h-80 border-2 border-purple-500 p-0 rounded-lg m-4" id={car.car_reg}>
<div class="image border-b-2 border-purple-500 h-3/5 rounded-lg p-0" id="image"></div>
<div class="details relative p-0 rounded-lg h-2/5">
    <h3 class="absolute top-1 left-2 text-2xl font-bold">{car.make}</h3> 
    <h3 class="absolute top-2 left-2/4 text-xl">{car.model}</h3> 
    <h3 class="absolute top-11 left-2 ">Mileage: {car.mileage}kms</h3>
    <h3 class="absolute top-11 right-2 ">YEAR: {car.YOM}</h3>
    <h3 class="absolute bottom-2 left-2">Price: sh{car.price_pd} per day</h3>
    <button class="buy border-2 border-purple-400 w-16 h-9 rounded-lg absolute bottom-2 right-4" on:click={hire} >Hire</button>
    
</div>
</main>


<style>
#image{
    background-image: url("../../images/Supra.jpg");
    background-size: cover;
}

.details,  h3{
        background-color: #685779; 
        color: white;
}


.tile{
     background-color: #685779; 
    color: white;
}

.buy:hover{
    background-color:#eec2f0;
    color:#7f03fc;
    transition: all 0.3s ease-in-out;
}
</style>
