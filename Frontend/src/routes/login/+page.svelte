<script>
    import Message from "$lib/messages/message.svelte";
import Error from "$lib/messages/error.svelte";
    let msg;

    let err=false;
    let good=false

    async function submit(){

        let id=document.getElementById("id").value
        let password=document.getElementById("password").value


        let payload={
            id,
            password
        }
        console.log(payload)

        try {
            await fetch(`http://localhost:3000/da/api/users/login`,
            {
				method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
        }).then((response)=>response.json())
        .then((data)=>{

            if (data.status==="Authorized"){
            msg=data.msg

            localStorage.setItem("usernameDA",msg.first_name)
            localStorage.setItem("roleDA",data.role)
            console.log(msg)
            good=true
            setTimeout(()=>{
                good=!good
            },3000)
                if (data.role=="admin"){
            window.open("/admin/adminhome")
            }else{
                window.open("/home")
            }
            }
            else if (data.status==="Unauthorized"){
            msg=data.msg
            err=!err
            setTimeout(()=>{
                err=!err
                msg=""
            },3000)
            console.log(data)
            }
        })
        } catch (error) {
            msg="Login Failure"
            err=true
            console.log(error)
              setTimeout(()=>{
                err=!err 
                msg=""
            },3000)
        }
    }

</script>


<main class="main flex flex-col justify-center items-center p-2 relative">

    {#if good===true}
        <Message message={msg}  />
    {:else if err===true}
        <Error message={msg} />
    {/if}

<img src="src/images/DonLogo.png" alt="Company Logo" id="logo"/>
<form action="" id="register" class="form w-2/3 flex flex-col justify-center m-4 items-center">
    <label for="ID">User Id   <input type="text" name="id" id="id" class="text"/></label>
    <br>

    <label for="password" class="mb-2">Password <input type="password" name="password" class="text" id="password"></label>

</form>
    <button class="submit w-20 h-12 text-2xl font-bold rounded-lg" on:click={submit}>Login</button>

</main>

<style>

    .submit{
    border:1px solid;
    border-color: #7f03fc;
}
.submit:hover{
    background-image:linear-gradient(#7f03fc,#eec2f0);
    color:aliceblue;
    transition:all 0.3s ease;
}

.text{
    border:1px #7f03fc solid;
    border-radius: 8px;
}
</style>