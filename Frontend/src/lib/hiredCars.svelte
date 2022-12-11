<script>
import HireCar from "../components/carTiles/hireCar.svelte" 
import {fly } from 'svelte/transition';
import {forhired} from "../stores/inventory"
</script>

<main class="main grid grid-cols-4" in:fly="{{ x: 200, duration: 400 }}" out:fly="{{ x:-200, duration: 200 }}" >

    {#each $forhired as car(car.car_reg)}
        <HireCar {car}/>
    {/each}
</main>

<style>

    .main{
        background-color: #685779;
        color: white;
    }

</style>