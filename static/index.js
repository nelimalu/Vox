var prev = [];

function getUpdates() {
	$.get("/getmessages", function(data) {
		if (data != prev) {
			prev = data;

			let container = document.getElementById("message-container");
			let msg = "";

			for (message of JSON.parse(data)) {
				msg += message + "<br>";
			}

			container.innerHTML = msg;
		}

	}).then(function() {
		getUpdates();
	});
}


window.onload = function() {
	document.getElementById("input").addEventListener("keyup", event => {
	    if (event.key !== "Enter")
	    	return;
	    
	    let inputbox = document.getElementById("input");
	    var date_time = new Date().toLocaleString('en-GB').split(" ")[1];

	    $.post( "/sendmessage", {
	        data: "[" + date_time + "] " + inputbox.value
	    });

	    inputbox.value = "";

	    setTimeout(function() {
			container.scrollTop = container.scrollHeight;
		}, 50);

	    event.preventDefault();
	});
	
	getUpdates();
	let container = document.getElementById("message-container");
	setTimeout(function() {
		container.scrollTop = container.scrollHeight;
	}, 50);
}
