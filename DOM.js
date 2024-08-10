console.log(document.getRootNode())
let myform = document.getElementById("myform");

let updateform = document.getElementById("updateform");
let updatedata=document.getElementById("updatedata");
let list = document.getElementById("list");
var listcontent = ""
var listcontentafterdelete = ""
// console.log(document.body)

list.innerHTML = JSON.parse(localStorage.getItem('list'));
myform.addEventListener("submit", function (e) {
    e.preventDefault()
    if (`${document.getElementById("data").value.trim()}` !== "") {
        listcontent = `<li>
        <div class="text">${document.getElementById("data").value}</div>
        <div class="buttons">
            <button class="edit">done</button>
            <button class="delete">delete</button>
            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
        </div>
        </li>`
        // <i class="fa-regular fa-pen-to-square" name="updatebutton"></i>
        document.getElementById("data").value = ""
        setTimeout(() => {
            document.getElementById("showalert").innerHTML="";
        }, 3000);
        document.getElementById("showalert").innerHTML=`<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success</strong> Added SuccessFully
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
        list.style.transition = "all 0.3s linear;"
        let listdata = list.innerHTML;
        list.innerHTML = "";
        list.innerHTML = listdata + listcontent

        localStorage.setItem("list", JSON.stringify(list.innerHTML))
    }
    else {
        setTimeout(() => {
            document.getElementById("showalert").innerHTML = "";
        }, 3000);
        document.getElementById("showalert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error</strong> Please add some text
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        list.style.transition = "all 0.3s linear;"

    }
})

list.addEventListener("click", function (e) {
    if (e.target.innerHTML === "delete") {
        let item = e.target.parentNode.parentNode;
        list.removeChild(item)
        listcontentafterdelete = list.innerHTML
        localStorage.setItem("list", JSON.stringify(listcontentafterdelete))
        setTimeout(() => {
            document.getElementById("showalert").innerHTML = "";
        }, 3000);
        document.getElementById("showalert").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success</strong> Deleted Successfully
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
        list.style.transition = "all 0.3s linear;"
    }
    else if (e.target.innerHTML === "done") {
    if(e.target.parentNode.previousElementSibling.style.textDecoration=="line-through")
    {
        e.target.parentNode.previousElementSibling.style.textDecoration="none";
        e.target.parentNode.previousElementSibling.style.color="green";s
        console.log(e.target.parentNode.previousElementSibling);

    }
    else{
        e.target.parentNode.previousElementSibling.style.textDecoration="line-through";
        e.target.parentNode.previousElementSibling.style.color="red";
    }
    }
    else if(e.target.innerHTML === 'Update'){
         var itemtoupdate =  e.target.parentNode.parentNode.children[0]
         updateform.addEventListener('click',function(e1){
            e1.preventDefault();
            if(updatedata.value!=="")
            {
                itemtoupdate.innerHTML=updatedata.value
                itemtoupdate=""
                localStorage.setItem("list",JSON.stringify(list.innerHTML));
            }
            else{
                alert("Type SomeThing To Update")
            }
        })
        updatedata.value=""
         
    }
})


document.getElementById("deleteall").addEventListener("click", function (e) {
    e.preventDefault();
    if (!list.innerHTML) {
        setTimeout(() => {
            document.getElementById("showalert").innerHTML = "";
        }, 3000);
        document.getElementById("showalert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error</strong>Already there is no Tasks
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }
    else {

        list.innerHTML = "";
        localStorage.clear();
        setTimeout(() => {
            document.getElementById("showalert").innerHTML = "";
        }, 3000);
        document.getElementById("showalert").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success</strong> All Tasks Deleted Successfully
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }
    list.style.transition = "all 0.3s linear;"
})
