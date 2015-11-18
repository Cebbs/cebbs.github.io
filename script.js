var roomName;
var userName;
var roomSize = 10;
var admin;
var skipCount = 0;

function enterRoomName() {
	roomName=document.getElementById("room-name").value;
	landing = document.getElementById("landing");
	moreDetail = document.getElementById("more-details");
	if(!validateForm(roomName)) {
		alert("Enter a name bud.");
	}
	else {
		landing.style.display = "none";
		moreDetail.style.display = "block";
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
		window.open("player.html", '_self', false);//open the next window
	}

}

//checks to ensure a value has been entered
function validateForm(input) {
	return !(input == null || input == "");
}

// Displays roomName
function displayRoomName() {
    document.getElementById("room-name-display").innerHTML = "RYAN"; //this.roomName;

// initiates, continues, or concludes a skip vote
function skipVote() {
	
	if (skipCount == 0) {
		skipCount++;
		var temp = (skipCount / roomSize) * 100;
		document.getElementById('skip-line').style.marginLeft = temp + "%";
		document.getElementById('skip-box').style.display = "block";
		document.getElementById('skip-line').style.display = "block";
	}
	else {
		skipCount++;
		if (skipCount > roomSize / 2) {
			// skip this song
			skipCount = 0;
			document.getElementById('skip-box').style.display = "none";
			document.getElementById('skip-line').style.display = "none";
			document.getElementById('skip-line').style.marginLeft = "0%";
		}
		else {
			var temp = (skipCount / roomSize) * 100;
			document.getElementById('skip-line').style.marginLeft = temp + "%";
		}
	}
}
