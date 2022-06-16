

// // Initialize Firebase
var config = {
    apiKey: "AIzaSyAxyq8xCW5tZ-UThmbaXkMWMR-rFBPY-BE",
    authDomain: "fir-livre-e1992.firebaseapp.com",
    databaseURL: "https://fir-livre-e1992-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-livre-e1992",
    storageBucket: "fir-livre-e1992.appspot.com",
    messagingSenderId: "465799286121",
    appId: "1:465799286121:web:f5b6606c8466b8523f41f8",
    measurementId: "G-ECEWFZVQBD"
};

firebase.initializeApp(config);
const addLivreBtnUi=document.getElementById("add-livre-btn");

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const livresRef = dbRef.child('livres');


readLivreData(); 
	

// --------------------------
// READ
// --------------------------
function readLivreData() {

	const livreListUI = document.getElementById("livre-list");

	livresRef.on("value", snap => {

		livreListUI.innerHTML = ""

		snap.forEach(childSnap => {

            let key = childSnap.key,
            value = childSnap.val()
          
        let $li = document.createElement("li");

        // edit icon
        let editIconUI = document.createElement("span");
        editIconUI.class = "edit-livre";
        editIconUI.innerHTML = " ✎";
        editIconUI.setAttribute("livreid", key);
        editIconUI.addEventListener("click", editButtonClicked);
            $li.innerHTML = value.titre
            $li.append(editIconUI);
            console.log(key);
			$li.innerHTML = value.titre;

			$li.setAttribute("livre-key", key);
			$li.addEventListener("click", livreClicked);
            $li.append(editIconUI);
            
			livreListUI.append($li);

 		});


	})

}



function livreClicked(e) {


		var livreID = e.target.getAttribute("livre-key");
        console.log("selectedkey",livreID);
		const livreRef = dbRef.child('livres/' + livreID);
		const livreDetailUI = document.getElementById("livre-detail");

		livreRef.on("value", snap => {

			livreDetailUI.innerHTML = ""

			snap.forEach(childSnap => {
				var $p = document.createElement("p");
				$p.innerHTML = childSnap.key  + " - " +  childSnap.val();
				livreDetailUI.append($p);
			})

		});


}
//-------- ADD Livre ---------------
 addLivreBtnUi.addEventListener("click", addLivreBtnClicked);

 function addLivreBtnClicked()
 {
    const addLivreInputsUI = document.getElementsByClassName("livre-input");
    // objet de nouveau livre
    let newLivre={};
    for (let i = 0, len = addLivreInputsUI.length; i < len; i++) {
        let key = addLivreInputsUI[i].getAttribute('data-key');
        let value = addLivreInputsUI[i].value;
        newLivre[key] = value;
        }
        livresRef.push(newLivre);
        alert("ajouté avec succés")
 }

function editButtonClicked(e)
{
    document.getElementById("edit-livre-module").style.display="block";
    document.querySelector(".edit-livreid").value=e.target.getAttribute("livreid");
    let livreID=e.target.getAttribute("livreid");
    const livreRef = dbRef.child('livres/' + livreID);
    const editLivreInputsUI = document.querySelectorAll(".edit-livre-input");
livreRef.on("value",
snap=>
{
    for (let i = 0, len = editLivreInputsUI.length; i < len; i++)
    {        
        let key = editLivreInputsUI[i].getAttribute('data-key');
        editLivreInputsUI[i].value=snap.val()[key];


    }
  
}

)
const saveBtn =document.querySelector("#edit-livre-btn");
saveBtn.addEventListener("click",saveLivrebtnClicked);
}
function saveLivrebtnClicked(e)
{
const livreID=document.querySelector(".edit-livreid").value;
const livreRef=dbRef.child('livres/'+livreID);
var editedLivreObject = {}
const editLivreInputsUI = document.querySelectorAll(".edit-livre-input");
editLivreInputsUI.forEach(function(textFeild)
{
let key=textFeild.getAttribute("data-key");
let value=textFeild.value;
editedLivreObject[key]=value;

});
livreRef.update(editedLivreObject);
document.getElementById("edit-livre-module").style.display="none";

}