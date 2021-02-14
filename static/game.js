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

var counter = {
	set1: 25,
	set2: 25,
	set3: 25
}

var players = ["Pl1", "Pl2"]
var colors = ["blue", "red"]
var turn = 1

document.getElementById("done").onclick = function() { 
	document.getElementById("done").disabled = true;
	document.getElementById("done").style.background = "gray"; 
	document.getElementById("draw").style.background = "#0275d8"; 
	document.getElementById("draw").disabled = false;
	document.getElementById("card_text").textContent = "Draw a card!";
	turn = 1 - turn
	document.getElementById("turn").textContent = players[turn] + "\'s turn to draw/ask!";
	document.getElementById("turn").style.color = colors[turn]
	document.getElementById("asks").textContent = "Please draw a card " + players[turn];
	if (counter.set2 === 0) {
		document.getElementById("skip").disabled = true;
	}
	if (counter.set3 === 0) {
		alert("Congratulations! You have finished all of the questions!");
		document.getElementById("done").disabled = true;
		document.getElementById("draw").disabled = true;
	}
}; 

document.getElementById("skip").onclick = function() {
	if (counter.set1 !== 0) {
		counter.set1 = 0;
		document.getElementById("level").textContent = "Level 2 - Connection";
	} else if (counter.set2 !== 0) {
		counter.set2 = 0;
		document.getElementById("skip").disabled = true;
		document.getElementById("level").textContent = "Level 3 - Reflection";
	}
	document.getElementById("done").disabled = true;
	document.getElementById("done").style.background = "gray"; 
	document.getElementById("draw").style.background = "#0275d8"; 
	document.getElementById("draw").disabled = false;
	document.getElementById("card_text").textContent = "Please draw a card " + players[turn];
	document.getElementById("turn").textContent = players[turn] + "\'s turn to draw/ask!";
	document.getElementById("turn").style.color = colors[turn]
}

document.getElementById("draw").onclick = function() { 
	document.getElementById("draw").disabled = true;
	document.getElementById("draw").style.background = "gray"; 
	document.getElementById("done").style.background = "#0275d8"; 
	document.getElementById("done").disabled = false;
	document.getElementById("turn").textContent = players[(1-turn)] + " answers for " + players[turn] + " now!";
	document.getElementById("asks").textContent = players[turn] + " asks...";
	document.getElementById("turn").style.color = colors[(1-turn)]
	if (counter.set1 !== 0) {
		document.getElementById("level").textContent = "Level 1 - Perception";
		var index = ins.in1[Math.floor(Math.random() * ins.in1.length)];
		document.getElementById("card_text").textContent = strings.level1[index];
		ins.in1 = ins.in1.filter(item => item !== index);
		counter.set1 -= 1;
		return;
	}
	if (counter.set2 !== 0) {
		document.getElementById("level").textContent = "Level 2 - Connection";
		var index = ins.in2[Math.floor(Math.random() * ins.in2.length)];
		document.getElementById("card_text").textContent = strings.level2[index];
		ins.in2 = ins.in2.filter(item => item !== index);
		counter.set2 -= 1;
		return;
	}
	if (counter.set3 !== 0) {
		document.getElementById("level").textContent = "Level 3 - Reflection";
		var index = ins.in3[Math.floor(Math.random() * ins.in3.length)];
		document.getElementById("card_text").textContent = strings.level3[index];
		ins.in3 = ins.in3.filter(item => item !== index);
		counter.set3 -= 1;
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