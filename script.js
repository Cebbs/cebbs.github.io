var roomName;
var userName;
var roomSize = 10;
var admin;
var skipCount = 0;

var currentSong;
var songQueue;
var queueSpot;
var audio;

var idToDelete;

var cantClick;

function enterRoomName() {
	roomName=document.getElementById('room-name').value;
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


//test function
function uploadSongs() {
	if(cantClick === 1) {
		alert("You don't want to upload twice.");
	}
	else {
		cantClick = 1;
		queueSpot = 0;
		idToDelete = 0;

		var x = document.getElementById("file-upload");

		var div = document.getElementById("actual-queue");
		var lb = document.createElement("br");
		var songDiv;
		var node;
		var txt;
		var id;
		var idCount = 0;
		currentSong = x.files[0];
		songQueue = x.files;
		console.log(songQueue);
	    for (var i = 1; i < x.files.length; i++) {
	        var file = x.files[i];
	        if ('name' in file) {
	        	songDiv = document.createElement("div");
	        	txt = x.files[i].name;
	            node = document.createTextNode(txt);
	            songDiv.appendChild(node);
	            songDiv.appendChild(lb);
	            id = "queue-" + idCount;
	            idCount++;
	            songDiv.id = id;
	            div.appendChild(songDiv);
	        }
	    }
	    startPlayer();
	    setInterval(function(){ nextSong() }, 1500);//runs every...something		
	}
}

function startPlayer() {
	document.querySelector('audio').src = URL.createObjectURL(currentSong);
	audio = document.getElementById("uploaded-song");
	audio.play();
	var player = document.getElementById("music-player");
	player.innerHTML = currentSong.name;
}

function nextSong() {
	var currentTime = audio.currentTime;
	var nextId = document.getElementById("queue-" + idToDelete)
	if(currentTime >= audio.duration && queueSpot <= length) {
		//songQueue[0] = null;
		queueSpot += 1;
		currentSong = songQueue[queueSpot];
		startPlayer();
		nextId.innerHTML = "";
		idToDelete++;
		console.log("idToDelete: " + idToDelete);
	}
}

// initiates, continues, or concludes a skip vote
function skipVote() {
	
	if (skipCount == 0) {
		skipCount++;
		var temp = (skipCount / roomSize) * 100;
		document.getElementById('skip-line').style.marginLeft = temp + "%";
	}
	else {
		skipCount++;
		if (skipCount > roomSize / 2) {
			// skip this song
			skipCount = 0;
			document.getElementById('skip-line').style.marginLeft = "0%";
		}
		else {
			var temp = (skipCount / roomSize) * 100;
			document.getElementById('skip-line').style.marginLeft = temp + "%";
		}
	}
}
