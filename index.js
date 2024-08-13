
const from = document.getElementById("from")
const baseUrl="https://crudcrud.com/api/e655b5facd1c4abe8e787dfc74e51003"
from.addEventListener('submit',(e)=>{
  e.preventDefault()
const food = document.getElementById('food').value
const price = document.getElementById('price').value
const table  = document.getElementById('table').value
const data = {food,price,table}

 axios.post(`${baseUrl}/resturant`,data)
 .then((res)=>console.log(res))
 .catch((err)=>console.log(err))
 from.reset()
 fetchdata()
})


async function fetchdata(){
  const rdata = await fetch(`${baseUrl}/resturant`)
  const data = await rdata.json()
console.log(data)
displayData(data) 
}
fetchdata()

function displayData(data){
  data.forEach((e) => {
    const tableElement = document.getElementById(e.table.toLowerCase()); // Matches ID with table value
    const item = document.createElement('p');
    item.innerHTML = `Food: ${e.food}, Price: ${e.price} <button onclick="deleteData('${e._id}')">delete</button>`;
    tableElement.appendChild(item);
  });
}


function deleteData(id){
  fetch(`${baseUrl}/resturant/${id}`, {
    method: 'DELETE', // Specify the DELETE method
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res) {
        console.log('Item deleted successfully');
        fetchdata(); // Refresh data after deletion
      } else {
        console.log('Failed to delete item');
      }
    })
    .catch((err) => console.log('Error:', err));
  
}
