<script>
import {onMount} from "svelte"

let employees=[]
let sales=[]
let drivers=[]
onMount(async()=>{
    try {
        await fetch(`http://localhost:3000/da/api/users/getemployees`,{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        })
        .then((response)=>response.json())
        .then((data)=>{
            employees=data.payload
        })
        await fetch(`http://localhost:3000/da/api/users/getsalespersons`,{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        })
        .then((response)=>response.json())
        .then((data)=>{
            sales=data.payload
        })
        await fetch(`http://localhost:3000/da/api/users/getdrivers`,{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        })
        .then((response)=>response.json())
        .then((data)=>{
            drivers=data.payload
        })
    } catch (error) {
        
    }
})

function home(){
    window.open("/admin/adminhome","_self")
}
</script>

<main class="main p-3 flex flex-col h-full w-full relative">
    <button class="closeP absolute top-3 r-3 z-30  border border-purple-600 h-8 w-12 hover:bg-purple-500 hover:text-white hover:shadow-md hover:shadow-purple-500" on:click={home}>Home</button>

    <!-- Other Employees Table -->
    <div class="emp w-11/12">
        <div class="header text-center text-4xl">
        EMPLOYEES
        </div>

        <table class="table-auto rounded-xl w-11/12">
            <tr class="bg-purple-100">
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Email</th>
            </tr>
        {#each employees as employee(employee.emp_id)}
            <tr>
                <td>{employee.emp_id}</td>
                <td>{employee.first_name} {employee.middle_name} {employee.last_name}</td>
                <td>{employee.role}</td>
                <td>{employee.salary}</td>
                <td>{employee.email}</td>
            </tr>
        {/each}
    </table>
    </div>

    <!-- Salespersons table -->
    <div class="emp w-11/12">
        <div class="header text-center text-4xl">
        SALES PEOPLE
        </div>

        <table class="table-auto rounded-xl w-11/12">
            <tr class="bg-purple-100">
                <th>ID</th>
                <th>Name</th>
                <th>No of Sales</th>
                <th>Salary</th>
                <th>Email</th>
            </tr>
        {#each sales as employee(employee.sp_id)}
            <tr>
                <td>{employee.sp_id}</td>
                <td>{employee.first_name} {employee.middle_name} {employee.surname}</td>
                <td>{employee.no_of_sales}</td>
                <td>{employee.salary}</td>
                <td>{employee.email}</td>
            </tr>
        {/each}
    </table>
    </div>

    <!-- DRIVERS -->
    <div class="emp w-11/12">
        <div class="header text-center text-4xl">
        Drivers
        </div>

        <table class="table-auto rounded-xl w-11/12">
            <tr class="bg-purple-100">
                <th>ID</th>
                <th>Name</th>
                <th>Car</th>
                <th>Salary</th>
                <th>Email</th>
            </tr>
        {#each drivers as employee(employee.dri_id)}
            <tr>
                <td>{employee.dri_id}</td>
                <td>{employee.first_name} {employee.middle_name} {employee.surname}</td>
                <td>{employee.car_reg}</td>
                <td>{employee.salary}</td>
                <td>{employee.email}</td>
            </tr>
        {/each}
    </table>
    </div>

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

.emp{
    margin-bottom: 20px;
}
</style>