<script>
    import {luxOBJ} from "../../stores/stock"
 let payload={
multi_zone_aircon:false,
driver_elec_seat:false,
pass_elec_seat:false,
knockdown_rear_seats:false,
heated_front_seats:false,
heated_rear_seats:false,
sound_system:false,
massaging_front_seats:false,
massaging_rear_seats:false,
car_play:false,
keyless_entry:false,
camera_360:false,
HUD:false,
wireless_charging_pad:false
}
function submit(){
    $luxOBJ=payload
    console.log($luxOBJ)
}
</script>

<main class="main w-96 rounded-3xl  flex flex-col justify-center items-center p-2">
    <div class="entry  ">
        <label for="multi_zone_aircon">Multi Zone Aircon</label>
        <input type=checkbox bind:checked={payload.multi_zone_aircon}>
    </div>

    <!-- Remember to put starting type here -->
    <div class="entry  ">
        <label for="driver _elec">Driver Electric Seat</label>
        <input type=checkbox bind:checked={payload.driver_elec_seat}>
    </div>

    
    <div class="entry  ">
        <label for="pass_elec_seat">Passenger Electric Seat</label>
        <input type=checkbox bind:checked={payload.pass_elec_seat}>
    </div>

    
    <div class="entry  ">
        <label for="Heated front seats">Heated Front Seat</label>
        <input type=checkbox bind:checked={payload.heated_front_seats}>
    </div>

    
    <div class="entry  ">
        <label for="heated_rear_seats">Heated Rear Seats</label>
        <input type=checkbox bind:checked={payload.heated_rear_seats}>
    </div>

    
    <div class="entry  ">
        <label for="sound_system">Sound System</label>
        <input type=checkbox bind:checked={payload.sound_system}>
    </div>
    
    <div class="entry  ">
        <label for="massaging_front_seat">Massaging Front Seats</label>
        <input type=checkbox bind:checked={payload.massaging_front_seats}>
    </div>

    <div class="entry  ">
        <label for="massaging_rear_seat">Massaging Rear Seats</label>
        <input type=checkbox bind:checked={payload.massaging_rear_seats}>
    </div>
    
   
    
    <div class="entry  ">
        <label for="car_play">Car Play</label>
        <input type=checkbox bind:checked={payload.car_play}>
    </div>
    
    <div class="entry  ">
        <label for="keyless_entry">Keyless Entry</label>
        <input type=checkbox bind:checked={payload.keyless_entry}>
    </div>
    
    <div class="entry  ">
        <label for="hud">Head Up Display</label>
        <input type=checkbox bind:checked={payload.HUD}>
    </div>
    <div class="entry  ">
        <label for="wcp">Wireless Charging Pad</label>
        <input type=checkbox bind:checked={payload.wireless_charging_pad}>
    </div>

    <button class="submit w-16 h-6 border-2 bg-purple-100 rounded-full border-purple-500 hover:bg-purple-500 hover:text-white" on:click={submit}>Submit</button>
</main>

<style>
.entry{
    float:left;
    margin:6px;
    accent-color:#7f03fc ;
}
</style>