//define variables
let termDiv;
let definitionDiv;
let audioDiv;
let randomWord = "";
let randomWordURL = "https://random-word-api.herokuapp.com/word?number=1";
let wordDefinitionURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


window.onload = function() {
	termDiv = document.getElementById("term");
	definitionDiv = document.getElementById("definition");
	audioDiv = document.getElementById("audio");
	fetchTerm(randomWordURL);
};

function fetchTerm(randomWordURL) {
	fetch(randomWordURL)
	.then(response => response.json())
	.then(data => updateWord(data[0]))
	.then(function(word) {
		return fetch(wordDefinitionURL + word);
	})
	.then(response => response.json())
	.then(data2 => updateDefinition(data2)
	);
	
} // fetchterm

function updateWord(newWord) {
	randomWord = newWord;
	termDiv.innerHTML = randomWord;
	return randomWord;
} // updateWord

function updateDefinition(data2) {
	console.log(data2);
	if (data2[0] != undefined) {
		let definition = data2[0].meanings[0].definitions[0].definition;
	definitionDiv.innerHTML = definition;
	
	// show audio file
	if (data2[0].phonetics[0].audio != undefined) {
		let output = "<audio controls><source src='";
	output += "http:" + data2[0].phonetics[0].audio;
	output += "' type='audio/mpeg'>";
	output += "Your browser does not support the audio tag.";
	output += "</audio>";
	audioDiv.innerHTML = output;
	}
	
	
	} else {
		definitonDiv,innerHTML = data2.message + "<br>Please reload page.";
	}
	
} // updateDefinition