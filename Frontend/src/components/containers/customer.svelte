<script>
    export let customer

    import {pendCust} from "../../stores/customer"
    import {createEventDispatcher} from "svelte" 

    const dispatch=createEventDispatcher()

    function submit(){
        $pendCust=customer


        dispatch("custAlert",{
            text:"alert"
        })
    }

    
</script>

<div class="item flex justify-around items-center h-10">
<p>{customer.first_name} {customer.middle_name} {customer.last_name}</p>
<p>Id: {customer.cust_id}</p>
<button class="btn w-6 h-6 bg-white border-2 rounded-full border-purple-500 hover:bg-purple-700 hover:text-white " id={customer.cust_id} on:click={submit}><i class="fa-solid fa-check rounded-full"></i></button>
</div>

<style>
.btn:hover,.btn:hover i{
background-color:rgb(147, 51, 236) ;
color: white;
transition: all ease 0.3s;
}


</style>