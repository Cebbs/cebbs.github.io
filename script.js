var roomName = "Test Room";
var userName = "User 1";
var roomSize = 10;
var admin;
var skipCount = 0;
var menuState = 0;

var menu;

var currentSong;
var songQueue;
var queueSpot;
var audio;

var idToDelete;

var cantClick;

var landing;
var moreDetail;

function enterRoomName() {
	roomName = document.getElementById("room-name").value;
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

function lessDetails() {
	landing.style.display = "block";
	moreDetail.style.display = "none";
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
    document.getElementById("room-name-display").innerHTML = roomName; //this.roomName;
    document.getElementById("chat-room-name").innerHTML = roomName;
    menu = document.querySelector("#member-list");
    activeMenu = "member-list--active";
    document.addEventListener("click", clickListener);
}

//test function
function uploadSongs() {
	if(cantClick > 0) {
		alert("You don't want to upload twice.");
	}
	else {
		cantClick = 1;
		document.getElementById("file-upload").readOnly = true;
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
		document.getElementById('skip-line').style.width = temp + "%";
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
			document.getElementById('skip-line').style.width = "0%";
		}
		else {
			var temp = (skipCount / roomSize) * 100;
			document.getElementById('skip-line').style.width = temp + "%";
		}
	}
}

////////////// SHOW MEMBER LIST //////////////////////////
function showMemberList() {
	console.log("pls");
	if(menuState === 0) {
		toggleMenuOn(); 
	}
	else if (menuState === 1) {
		toggleMenuOff();
    }
}

function toggleMenuOn() {
	menuState = 1;
    menu.style.display = "block";
}

function toggleMenuOff() {
  	menuState = 0;
  	menu.style.display = "none";
}

// Sends text from textbox to chatbox
function chatTextSubmit() {
	var chatText = document.getElementById('text-input').value;
	var chatBox = document.getElementById("the-chat");
	var chatText = userName + ":" + document.getElementById('text-input').value;
	chatText.concat("<br>");
	displayChatBoxText(chatText);
	document.getElementById('text-input').value = "";
}

// Displays chat box text
function displayChatBoxText(chatText) {
	var chatBox = document.getElementById("the-chat");
	var para = document.createElement("p");
	var node = document.createTextNode(chatText);
	para.appendChild(node);
	chatBox.appendChild(para);
	scrollChat();
}

function scrollChat() {
	var elem = document.getElementById('the-chat');
    elem.scrollTop = elem.scrollHeight;
}

// if enter pressed, submit text
function enterSubmit() {
	if (event.keyCode == 13) {
		chatTextSubmit();
	}
}

function addLink() {
	var theLink = document.getElementById("add-from-link").value;
	if(cantClick > 0) {
		alert("You don't want to upload twice.");
	}
	else if(!validateForm(theLink)) {
		alert("Enter a link bud.");
	}
	else if(theLink != "youtube.com/2dFE") {
		alert("Enter the right link bud")
	}
	else {
		document.querySelector('audio').src = "The Morning.mp3";
		audio = document.getElementById("uploaded-song");
		audio.play();
		var player = document.getElementById("music-player");
		player.innerHTML = "The Weeknd - The Morning";
		cantClick++;
		document.getElementById('add-from-link').value = "";
	}
}
