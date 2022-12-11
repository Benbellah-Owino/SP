<script>
    import { page } from '$app/stores';
    import {onMount} from "svelte"
    let username

onMount(()=>{
    username=localStorage.getItem("usernameDA")
})

function openInventory(){
    console.log($page)
    window.open("/inventory","_self");
}

function openReciepts(){
    console.log($page)
    window.open("/reciepts","_self");
}


function myDetails(){
    console.log($page);
    window.open("/employeePage","_self");
}
function openHome(){
    console.log($page);
    window.open("/home","_self");
}
</script>

<main class="main flex flex-col justify-around items-center fixed left-0 w-20 h-full z-50 m-0 shadow-lg shadow-purple-600">
    <img src="src/images/dmIco.png" alt="Navbar Icon" class="m-0">
    <h1 class="w-full text-center bg-purple-400 text-white font-bold text-lg">{username}</h1>
    <button class="link text-center w-16 h-12" on:click={openHome}>
        Home</button>
    <button class="link text-center w-16 h-12" class:active="{$page.url.pathname === '/inventory'}" on:click={openInventory}>Inventory</button>
    <button class="link text-center w-16 h-12"  class:active="{$page.url.pathname === '/reciepts'}" on:click={openReciepts}>Reciepts</button>
    <button class="link text-center w-16 h-12" class:active="{$page === '/employeePage'}" on:click={myDetails}>MyDetails</button>
</main>

<style>
.main{
    background-color: white;
}
.active{
    background-image:linear-gradient(#7f03fc,#eec2f0);
    color:aliceblue;
}
.link{
    width:4.5rem;
    height:30px;
    border-radius: 5px;
    background-color: white;
    text-align: center;
    cursor: pointer;
}

.link:hover{
    background-image:linear-gradient(#7f03fc,#eec2f0);
    color:aliceblue;
    transition:all 0.3s ease;
}


</style>