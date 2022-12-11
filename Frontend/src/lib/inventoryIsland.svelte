<script>
    import {islandMenu} from "../stores/menu"
let menu=0;

let active=true
let active2=false

function hire(){
    active=!active;
    active2=!active2;
    $islandMenu=0;
}

function sale(){
    active2=!active2;
    active=!active;
    $islandMenu=1;
}
</script>

<main class="main w-40 h-14 bg-purple-300 rounded-3xl flex mt-2 cursor-pointer m-4 fixed z-50 border-1 border-purple-600">
<button id="hired" class="island rounded-l-3xl bg-purple-300 h-full flex items-center justify-center text-center" class:active="{active}" on:click={hire}>Hire</button>
<button id="sold" class="island rounded-r-3xl bg-purple-200 h-full flex items-center justify-center border-l-2 border-purple-500" class:active2="{active2}" on:click={sale}>Sale</button>
</main>

<style>
    .island{
        width:50%;
    }

    .island:hover{
        background-image:linear-gradient(#7f03fc,#eec2f0);
    color:aliceblue;
    transition:all 0.3s ease;
    }

    .active{
        background-color: #685779;
        border-bottom: 2px solid white;
        border-top : 2px solid white;
        border-left: 2px solid white;
        color:white
    }
    .active2{
        background-color: #f4ecf5;
        border-bottom: 2px solid #7f03fc;
        border-right: 2px solid #7f03fc;
        border-top: 2px solid #7f03fc;
        color: #7f03fc;
    }

</style>