<script>
    import {driverOBJ} from "../../stores/stock"
let payload={
lane_Assist:false,
starting_Type:"",
blindspot_Warning:false,
cruise_control:false,
nav_system:false,
reverse_sensors:false,
dash_cam:false,
camera_360:false,
auto_emergency_braking:false,
forward_collision_warning:false,
auto_high_beams:false,
steering_type:"Power steering",
}

function test(){
    $driverOBJ=payload
    console.log($driverOBJ)
}

</script>

<main class="main w-96 rounded-3xl flex flex-col justify-center items-center p-2">
    <div class="entry  ">
        <label for="lane_assist">Lane Assist</label>
        <input type=checkbox bind:checked={payload.Lane_Assist}>
    </div>

    <!-- Remember to put starting type here -->
    <div class="entry reg ">
            <label for="type">Type</label>
            <div class="txtFields">
                <label>
	            <input type="radio" bind:group={payload.starting_Type} name="type" value={"key start"} class="select">
	            Key start
            </label>
            <label>
	            <input type="radio" bind:group={payload.starting_Type} name="type" value={"button push"} class="select">
	            Button Push
            </label>
            </div>
        </div>

    <div class="entry  ">
        <label for="Blindsport">Blindspot Warning</label>
        <input type=checkbox bind:checked={payload.blindspot_Warning}>
    </div>

    
    <div class="entry  ">
        <label for="cruise_control">Cruise Control</label>
        <input type=checkbox bind:checked={payload.cruise_control}>
    </div>

    
    <div class="entry  ">
        <label for="nav_system">Navigation System</label>
        <input type=checkbox bind:checked={payload.nav_system}>
    </div>

    
    <div class="entry  ">
        <label for="reverse_sensors">Reverse Sensors</label>
        <input type=checkbox bind:checked={payload.reverse_sensors}>
    </div>

    
    <div class="entry  ">
        <label for="dashbord_cam">Dashboard_Cam</label>
        <input type=checkbox bind:checked={payload.dash_cam}>
    </div>
    
    <div class="entry  ">
        <label for="camera_360">360_cameras</label>
        <input type=checkbox bind:checked={payload.camera_360}>
    </div>
    
    <div class="entry  ">
        <label for="aeb">Auto Emergency Braking</label>
        <input type=checkbox bind:checked={payload.auto_emergency_braking}>
    </div>
    
    <div class="entry  ">
        <label for="forward_collision">Forward Collision Warning</label>
        <input type=checkbox bind:checked={payload.forward_collision_warning}>
    </div>
    
    <div class="entry  ">
        <label for="auto_high_beams">Auto High Beams</label>
        <input type=checkbox bind:checked={payload.auto_high_beams}>
    </div>
    
    <div class="entry  ">
        <label for="steering_type">Steering Type</label>
        <input type=checkbox bind:checked={payload.steering_type}>
    </div>

    <button class="submit w-16 h-6 border-2 bg-purple-100 rounded-full border-purple-500 hover:bg-purple-500 hover:text-white" on:click={test}>Submit</button>
</main>

<style>
.entry{
    margin:6px;
    float:left;
}
</style>