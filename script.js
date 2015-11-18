var roomName;
var userName;
var roomSize;
var admin;

function enterRoomName() {
	roomName=document.getElementById('room-name').value;
	landing = document.getElementById("landing");
	moreDetails = document.getElementById("more-details");
	if(!validateForm(roomName)) {
		alert("Enter a name bud.");
	}
	else {
		landing.style.display = "none";
		moreDetails.style.display = "block";
	}
}

function moreDetails() {
	userName=document.getElementById('your-name').value;
	roomSize=document.getElementById('your-name').value;
	admin=document.getElementById("admin").checked;
	console.log(admin)
	if(!validateForm(roomSize)) {
		roomSize = -1; //to indicate that there is no roomsize. there may be a better option for this
	}
	if(!validateForm(userName)) {
		alert("Enter a name bud.");
	}
	else {
		//open the next window
	}

}

//checks to ensure a value has been entered
function validateForm(input) {
	return !(input == null || input == "");
}
