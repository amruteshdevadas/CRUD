
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
    <div style="display:flex">
    <img class ="image" src =${element.avatar}><img> 
    </div>
    <div>
   
    <div class ="text" >${element.name}
    </div>
    <div>
    <button class ="button-style" onclick="delete_User(${element.id})">Delete</button>
    <button class ="button-style" onclick="edit_User('${element.id}','${element.name}','${element.avatar}')">Edit </button>
    </div>
    </div>`
          user_list.append(container)
    });
    document.body.append(user_list)
}

function edit_User(id,name,avatar)
{ 
  // console.log(id,name,avatar)

  document.getElementById("button").innerHTML = "Edit User" 
  document.getElementById("new-user-name").value = name;
  document.getElementById("image-url").value = avatar;
  localStorage.setItem('id',id)

}

function addUsers()
{
 // type is declared because of to use the button add user to edit user 
  var type;
  if(document.getElementById("button").innerText === "Edit User")
  {
      type = 'Edit';
      console.log(type);
  }
  else{
    type = 'Add';
    console.log(type)
  }

    if(type === 'Add')
  {
      const name = document.getElementById("new-user-name").value;
      const avatar = document.getElementById("image-url").value;
      const createdAt = new Date()
      const userDetails = {
          name : name,
          avatar: avatar,
          createdAt : createdAt
      };
      fetch(" https://60eeb0b2eb4c0a0017bf45aa.mockapi.io/users${id}" , {
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

    else
    {
      const id = localStorage.getItem("id")
      const name = document.getElementById("new-user-name").value;
      const avatar = document.getElementById("image-url").value;
      const createdAt = new Date()
      // console.log(name,avatar,createdAt);

      const userDetails = {
          name : name,
          avatar: avatar,
          createdAt : createdAt 
        };
      fetch( `https://60eeb0b2eb4c0a0017bf45aa.mockapi.io/users/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(userDetails)   
    })
    .then((res) => {
      
      return res.json();})
    .then((data) =>  refreshUsers());
  }
 }



function refreshUsers()
{
 $(".user_list").remove();
 document.getElementById("new-user-name").value="";
 document.getElementById("image-url").value="";
 document.getElementById("button").innerText = "Add Users"
 loadUsers()

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
