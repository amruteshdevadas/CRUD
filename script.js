
function loadUsers()
{
fetch("https://60eeb0b2eb4c0a0017bf45aa.mockapi.io/users")
  .then((response) => {
    if (response.ok) {
      console.log("SUCCESS");
      return response.json();
    } else {
      console.log("Failure");
    }
  })
  .then((data) => handleData(data));
}

function handleData(data) 
{
    const user_list = document.createElement("div")
    user_list.className = "user_list";
    data.forEach(element => 
        {
    var container = document.createElement("div")
    container.className = "container";

    // var name =document.createElement("p");
    // name.innerHTML= element.name
    // var image = document.createElement("img")
    // image.src= element.avatar;
    // var id = element.id;
    // console.log(id)
    // var del_user = document.createElement("button")
    // del_user.innerHTML = "delete"
    // del_user.className = "button-style"
    // del_user.onclick = delete_User(id);
    //     container.appendChild(name)
    //     container.appendChild(image)
    //     container.appendChild(del_user)
    //     user_list.appendChild(container)

    container.innerHTML = `
    <div>
    <img class ="image" src =${element.avatar}><img> 
    </div>
    
    <div class ="text" >${element.name}
    <button class ="button-style" onclick="delete_User(${element.id})">Delete</button>
    </div>
    
    `
          user_list.append(container)
       

    });

    document.body.append(user_list)
    
  

}

function updateUsers()
{
    fetch(" https://60eeb0b2eb4c0a0017bf45aa.mockapi.io/users" ,{
        method: "POST",
        Headers:{
            "Content-Type" : "  application/json"
        },
        body: JSON.stringify({
            name: "User 1"
        })
    })
        .then(response => {return response.json()})
        .then(data => console.log(data))
}

function addUsers()
{
    const name = document.getElementById("new-user-name").value;
    const avatar = document.getElementById("image-url").value;
    const createdAt = new Date()
    console.log(name,avatar,createdAt);

    const userDetails = {
        name : name,
        avatar: avatar,
        createdAt : createdAt

    };
    console.log(userDetails.name, userDetails.avatar, userDetails.createdAt)


    fetch(" https://60eeb0b2eb4c0a0017bf45aa.mockapi.io/users" , {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(userDetails)   
    })
    .then((res) => {
      
      return res.json();})
    .then((data) =>  refreshUsers());

}

function refreshUsers()
{
location.reload();
 document.getElementById("new-user-name").value="";
 document.getElementById("image-url").value="";

}


function delete_User(id)
{
  console.log(`${id} deleting.. `)

  fetch(`https://60eeb0b2eb4c0a0017bf45aa.mockapi.io/users/${id}`, {
        method: "DELETE"  
  })
    .then((res) => {
      return res.json();})
    .then((data) =>  refreshUsers());
  

}

loadUsers()
