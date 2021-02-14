var strings = {
  level1: [],
  level2: [],
  level3: []
}

var ins = {
  in1: [],
  in2: [],
  in3: []
}

var players = ["Pl1", "Pl2"]
var colors = ["blue", "red"]
var turn = 1

document.getElementById("done").onclick = function() { 
	document.getElementById("done").disabled = true;
	document.getElementById("done").style.background = "gray"; 
	document.getElementById("draw").style.background = "#0275d8"; 
	document.getElementById("draw").disabled = false;
	turn = 1 - turn
	document.getElementById("turn").textContent = players[turn] + "\'s turn to draw/ask!";
	document.getElementById("turn").style.color = colors[turn]
	if (ins.in3.length === 0) {
		alert("Congratulations! You have finished all of the questions!");
		document.getElementById("done").disabled = true;
		document.getElementById("draw").disabled = true;
	}
}; 

document.getElementById("draw").onclick = function() { 
	document.getElementById("draw").disabled = true;
	document.getElementById("draw").style.background = "gray"; 
	document.getElementById("done").style.background = "#0275d8"; 
	document.getElementById("done").disabled = false;
	document.getElementById("turn").textContent = players[(1-turn)] + " answers now!";
	document.getElementById("turn").style.color = colors[(1-turn)]
	if (ins.in1.length !== 0) {
		document.getElementById("level").textContent = "Level 1 - Perception";
		var index = ins.in1[Math.floor(Math.random() * ins.in1.length)];
		document.getElementById("card_text").textContent = strings.level1[index];
		ins.in1 = ins.in1.filter(item => item !== index);
		return;
	}
	if (ins.in2.length !== 0) {
		document.getElementById("level").textContent = "Level 2 - Connection";
		var index = ins.in2[Math.floor(Math.random() * ins.in2.length)];
		document.getElementById("card_text").textContent = strings.level2[index];
		ins.in2 = ins.in2.filter(item => item !== index);
		return;
	}
	if (ins.in3.length !== 0) {
		document.getElementById("level").textContent = "Level 3 - Reflection";
		var index = ins.in3[Math.floor(Math.random() * ins.in3.length)];
		document.getElementById("card_text").textContent = strings.level3[index];
		ins.in3 = ins.in3.filter(item => item !== index);
		if (ins.in3.length === 0) {
			alert("Congratulations! You have finished all of the questions!");
			document.getElementById("done").disabled = true;
			document.getElementById("draw").disabled = true;
		}
		return;
	}
	alert("Congratulations! You have finished all of the questions!");
	return;
}; 

window.onload = function() {
	document.getElementById("done").disabled = true;
	document.getElementById("done").style.background = "gray"; 
	document.getElementById("draw").disabled = true;
	jQuery.get('./assets/level1.txt', function(data) {
    	strings.level1 = data.split(/\r?\n/);
		ins.in1 = Array.apply(null, {length: strings.level1.length}).map(Number.call, Number);
  	});

  	jQuery.get('./assets/level2.txt', function(data) {
    	strings.level2 = data.split(/\r?\n/);
    	ins.in2 = Array.apply(null, {length: strings.level1.length}).map(Number.call, Number);
  	});

  	jQuery.get('./assets/level3.txt', function(data) {
    	strings.level3 = data.split(/\r?\n/);
    	ins.in3 = Array.apply(null, {length: strings.level1.length}).map(Number.call, Number);
  	});
  	var player_one = prompt("Please enter your name", "");
  	if (player_one == null || player_one == "") {
	 	player_one = "Player One";
	} 
	var player_two = prompt("Please enter your partner's name", "");
	if (player_two == null || player_two == "") {
	 	player_two = "Player Two";
	}
	players[0] = player_one;
	players[1] = player_two;
	document.getElementById("level").textContent = "Level 1";
	document.getElementById("p1").textContent = players[0];
	document.getElementById("p2").textContent = players[1];
	document.getElementById("draw").disabled = false;
	document.getElementById("turn").textContent = players[turn] + "\'s turn to draw/ask!";
	document.getElementById("turn").style.color = colors[turn]
}