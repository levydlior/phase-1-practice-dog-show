document.addEventListener("DOMContentLoaded", () => {
  const dogsURL = "http://localhost:3000/dogs";
  const tableBody = document.querySelector("#table-body");
  const dogForm = document.querySelector("#dog-form");

  fetch(dogsURL)
    .then((response) => response.json())
    .then((dogs) => dogs.forEach(dog => renderDogs(dog)))
    
    function renderDogs(dog){
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdBreed = document.createElement("td");
        const tdSex = document.createElement("td");
        const tdEditButton = document.createElement("button");

        tr.id = dog.id;
        tdName.textContent = dog.name;
        tdBreed.textContent = dog.breed;
        tdSex.textContent = dog.sex;
        tdEditButton.textContent = "Edit Dog";

        tdEditButton.addEventListener("click", () => {
          dogForm.children[0].value = tdName.textContent;
          dogForm.children[1].value = tdBreed.textContent;
          dogForm.children[2].value = tdSex.textContent;

          tr.className = "active";
          

          dogForm.addEventListener('submit', (e) => {
            if(tr.className === "active"){
            e.preventDefault();
            const newDogForm = new FormData(e.target);

            const newDogName = newDogForm.get("name");
            const newDogBreed = newDogForm.get("breed");
            const newDogSex = newDogForm.get("sex");

            const newDogObject = {
              name: newDogName,
              breed: newDogBreed,
              sex: newDogSex,
            };

            fetch(`${dogsURL}/${tr.id}`, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(newDogObject),
            })
              .then((response) => response.json())
              .then(() =>{
                tdName.textContent = newDogName;
                tdBreed.textContent = newDogBreed;
                tdSex.textContent = newDogSex;
                tr.className = "deactivated";
              })}
              });
          });
       
        tr.append(tdName, tdBreed, tdSex, tdEditButton);
        tableBody.appendChild(tr);
      }})
   
