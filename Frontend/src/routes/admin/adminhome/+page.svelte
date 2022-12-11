<script>
    import {onMount} from "svelte"
    let name

    onMount(()=>{
        name=localStorage.getItem("usernameDA")
    })

    function openInv(){
        window.open("/inventory")
    }
    function openTrans(){
        window.open("/reciepts")
    }
    function openMine(){
        window.open("/employeePage")
    }
    function openEmps(){
        window.open("/admin/employees")
    }
    function openCust(){
        window.open("/customer")
    }
    function newInv(){
          window.open("/admin/newstock")
    }
    function newEmp(){
          window.open("/admin/register")
    }
function logout(){
     try {
          fetch(`http://localhost:3000/da/api/users/logout`,{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        }).then(response=>response.json())
        .then((data)=>{
            person=data.result[0]
        })} catch (error) {
        console.log(error)
    }
    localStorage.removeItem("usernameDA")
    localStorage.removeItem("roleDA")
    //document.cookie = "name=Alexander; max-age=0";
    window.open("/login","_self")
}
</script>

<main class="main bg-purple-100 relative">
<section class="header w-full h-24 bg-purple-100 m-0 absolute top-0 flex justify-between items-center pl-5 pr-5 border-b border-purple-500">
    <h1 class="details h-3/4 w-auto bg-purple-100 flex justify-center items-center text-4xl font-extrabold text-center border-b border-purple-500">
        {name}
    </h1>

    <button class="logout w-16 h-12 border border-red-500 bg-slate-100 hover:bg-red-500 hover:text-white " on:click={logout}>LOGOUT</button>
</section>

<section class="mnu p-6 grid grid-cols-3 gap-4 w-auto h-auto border border-t-0 border-purple-500 absolute top-24 ">
    <div class="tile" id="inv" on:click={openInv} on:keypress={openInv}>
        <div class="over"></div>
    <h1 class="name">INVENTORY</h1>
    </div>

    <div class="tile" id="newinv" on:click={newInv} on:keypress={newInv}>
        <div class="over"></div>
    <h1 class="name">NEW INVENTORY</h1>
    </div>

    <div class="tile" id="tran" on:click={openTrans} on:keypress={openTrans}>
        <div class="over"></div>
        <h1 class="name">TRANSACTIONS</h1>
    </div>
    <div class="tile" id="customers" on:click={openCust} on:keypress={openCust}>
        <div class="over"></div>
        <h1 class="name">CUSTOMERS</h1>
    </div>
    <div class="tile" id="emps" on:click={openEmps} on:keypress={openEmps}>
        <div class="over"></div>
        <h1 class="name">EMPLOYEES</h1>
    </div>
    <div class="tile" id="np" on:click={newEmp} on:keypress={newEmp}>
        <div class="over"></div>
        <h1 class="name">NEW EMPLOYEE</h1>
    </div>
    <div class="tile" id="me" on:click={openMine} on:keypress={openMine}>
        <div class="over"></div>
        <h1 class="name">MY PAGE</h1>
</div>
</section>
</main>

<style>
    .main{
        height:100vh;
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding:0 10px;
    }

    .mnu{
        display: grid;
grid-template-columns: repeat(3, 310px);
grid-template-rows: repeat(2, 310px);
grid-column-gap: 80px;
grid-row-gap: 20px;
    }

    .tile{
        height:300px;
        width:300px;
        border:1px #7f03fc solid;
        border-radius: 10%;
        position:relative;
        cursor: pointer;
    }

    .tile:hover{
        color:#7f03fc;
        box-shadow: -12px 11px 5px 0px rgba(127,3,252,0.23);
-webkit-box-shadow: -12px 11px 5px 0px rgba(127,3,252,0.46);
-moz-box-shadow: -12px 11px 5px 0px rgba(127,3,252,0.46);
transition: all ease 0.3s;
    }

    .tile:hover .name{
        color:#ffce46;
        transition: all ease-in-out 0.3s;
    }

    .over{
  position: absolute;
  bottom: 0;
  left:0;
  background: rgba(127, 3, 252,0.4);
  color: #f1f1f1;
  width: 100%;
  height: 100%;
  transition: .5s ease;
  opacity:0;
  color: white;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 10%;
    }

    .name{
        position: absolute;
        color:white;
        text-align: center;
        font-size: 50px;
        font-weight: 700;
        background-color: rgba(0, 0, 0, 0);
        bottom:10%;
        left:5%;
        width:90%
    }

    #inv{
        background-image: url("../../../images/RANGE.jpg");
        background-repeat: no-repeat;
        background-size:100%;
    }
    #tran{
        background-image: url("../../../images/reciepts.jpg");
        background-repeat: no-repeat;
        background-size:100%;
    }
    #tran h1{
        font-size: 34px;
        background:rgba(0, 0, 0, 0.3)
    }
    #me{
        background-image: url("../../../images/RANGE.jpg");
        background-repeat: no-repeat;
        background-size:100%;
    }

    #newinv{
         background-image: url("../../../images/golf.jpg");
        background-repeat: no-repeat;
        background-size:cover;
    }
    #customers{
         background-image: url("../../../images/customers.jpg");
        background-repeat: no-repeat;
        background-size:cover;
    }
    #emps{
         background-image: url("../../../images/employees.jpg");
        background-repeat: no-repeat;
        background-size:cover;
    }
    #np{
         background-image: url("../../../images/emp.jpg");
        background-repeat: no-repeat;
        background-size:cover;
    }

    .tile:hover .over{
        opacity:0.3;
    }
</style>