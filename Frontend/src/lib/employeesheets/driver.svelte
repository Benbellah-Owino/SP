<script>
    import NavBar from "../navBar.svelte";
     import {onMount} from "svelte"
  let addr=[];
    let conts=[]
    onMount(async()=>{
        try {
            await fetch(`http://localhost:3000/da/api/users/contacts`,{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        }).then(response=>response.json())
        .then((data)=>{
            conts=data.result
            console.log(conts)
        })

            await fetch(`http://localhost:3000/da/api/users/addresses`,{
             credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
        }).then(response=>response.json())
        .then((data)=>{
            addr=data.result
            console.log(addr)
        })
        } catch (error) {
            console.log(error)
        }
    })
    export let person
</script>

<main class="main flex flex-col justify-center items-center h-full  absolute top-0 left-20 w-11/12">
    <NavBar/>
    <img src="src/images/DonLogo.png" alt="" class="pic border-2 border-purple-400 rounded-2xl">
    <article class="art ">
        <div class="name relative art_el flex justify-start items-center ">
            <p class="label">Name</p>
            <p class="second name_text">{person.first_name} {person.middle_name} {person.surname}</p>
        </div>
        <div class="name relative art_el flex justify-start items-center ">
            <p class="label">Employee Id</p>
            <p class="second name_text">{person.dri_id}</p>
        </div>
         <div class="name relative art_el flex justify-start items-center ">
            <p class="label">Position</p>
            <p class="second name_text">driver</p>
        </div>

         <div class="name relative art_el flex justify-start items-center  ">
            <p class="label">Salary</p>
            <p class="second name_text">{person.salary}</p>
        </div>

         <div class="name relative art_el flex justify-start items-center ">
            <p class="label">Birth Date</p>
            <p class="second name_text">12/3/2003</p>
        </div>

        <div class="name relative art_el flex justify-start items-center ">
            <p class="label">Hire Date</p>
            <p class="second name_text">Hire Date</p>
        </div>

       
         <div class="name relative art_el flex justify-start items-center ">
            <p class="label">Address</p>
            <p class="second name_text">
                {#each addr as ad}
                    0{ad.address} &nbsp&nbsp
                {/each}
            </p>
        </div>
         <div class="name relative art_el flex justify-start items-center ">
            <p class="label">Contacts</p>
            <p class="second name_text">
                 {#each conts as ct}
                    0{ct.contact} &nbsp&nbsp
                {/each}
            </p>
        </div>
    </article>
</main>

<style>
.pic{
    width:150px;
    height:150px;
}

.second{
    position: absolute;
    left:50%;
}
.art {
    width:500px;
    align-items: stretch;
    border: 0;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 400px;
    flex-direction: column;
    font: inherit;
    font-size: 100%;
    margin: 0;
    min-width: 50px;
    padding: 0;
    position: relative;
    vertical-align: baseline;
}

.label{
    box-sizing: border-box;
    flex: 0 0 194px;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    margin-top: 6px;
    position: absolute;
    left:4px;
}

.art_el{
    font-size:20px;
    height:40px;
    margin:20px;
    width:98%;
}
</style>