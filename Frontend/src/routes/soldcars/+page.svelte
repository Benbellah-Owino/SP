<script>
    import NavBar from "$lib/navBar.svelte";
    import {onMount} from "svelte"

    let sold=[]

    onMount(async()=>{
        try {
             fetch("http://localhost:3000/da/api/inventory/getsoldcars",{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        })
        .then((response)=>response.json())
        .then((data)=>{
            sold=data.result
            
        });
        } catch (error) {
            console.log(error)
        }
    })
</script>

<main>
    
<NavBar/>
 <table class="table-auto rounded-xl w-6/12 absolute top-2 left-1/3">
            <tr class="bg-purple-100">
                <th>Car ID</th>
                <th>Transaction ID</th>
                <th>Car</th>
               
            </tr>
        {#each sold as sd}
            <tr>
                <td>{sd.car_id}</td>
                <td>{sd.trans_id} </td>
                <td>{sd.make} {sd.model}</td>
                
            </tr>
        {/each}
    </table>
</main>

<style>
 table{
    border-radius: 12px;
 }
th, td {
    text-align: center;
    border:1px solid rgb(253, 234, 253)
}

th{
    background-color: rgb(253, 234, 253);
}

</style>