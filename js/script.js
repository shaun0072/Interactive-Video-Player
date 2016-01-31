//GLOBAL VARIABLES
var video = document.getElementById('Video1');
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progressBar');
var playpauseButton = document.getElementById('play-pause');
var volMuteButton = document.getElementById('volume-mute');
var fullscreenButton = document.getElementById('fullscreen');
var totalTime = "00:59";
var currentTimeHolder = document.getElementById('currentTime');
var transcript = document.getElementById('transcript');
var textBlocks = document.querySelectorAll('.words');
var increaseVolButton = document.getElementById('volumeUp');
var decreaseVolButton = document.getElementById('volumeDown');
var volumePercentHolder = document.getElementById('volumePercent');


//FUNCTIONS

//Convert Number to mm:ss format
function convertTimeFormat(num) {
	var hrs  = Math.floor(num/3600);
	var mins = Math.floor((num % 3600)/60);
	var secs = num % 60;
	return (hrs > 0 ? hrs + ":" : "") + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
}
function updateTime() {
	var totalTime = convertTimeFormat(Math.floor(video.duration));
	currentTimeHolder.textContent = convertTimeFormat(Math.floor(video.currentTime)) + '/' + totalTime;
}


//APPLICATION

//Buttonbar Events
//Current Time/Total Length
currentTimeHolder.textContent = convertTimeFormat(Math.floor(video.currentTime)) + '/' + totalTime;
video.addEventListener('timeupdate', updateTime);

//Play/Pause Button
playpauseButton.addEventListener('click', function() {
   if (video.paused) {
	  video.play();
	  playpauseButton.innerHTML = '<img src="icons/pause-icon.png" alt="play-button"/>';
   } else {
	  video.pause();
	  playpauseButton.innerHTML = '<img src="icons/play-icon.png" alt="play-button"/>';
   }
});
//Volume/Mute Button
volMuteButton.addEventListener('click', function() {
   var button = document.getElementById("volume-mute");
   if (video.muted === false) {
	   video.muted = true;
	   button.innerHTML = '<img src="icons/volume-off-icon.png" alt="volume/mute button"/>';
   } else {
	   video.muted = false;
	   button.innerHTML = '<img src="icons/volume-on-icon.png" alt="volume/mute button"/>';
   }
});
//FullScreen Mode Button
fullscreenButton.addEventListener('click', function fullscreen() {
	video.webkitRequestFullScreen();
});

//PROGRESS BAR
//Set max value of #progress
video.addEventListener('loadedmetadata', function() {
   progress.setAttribute('max', video.duration);
});
//Change current value of #progress to reflect currentTime
video.addEventListener('timeupdate', function() {
   progress.value = video.currentTime;
   progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});
//Add correct max value on #progress for mobile devices
video.addEventListener('timeupdate', function() {
   if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
   progress.value = video.currentTime;
   progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});
//Skip ahead when #progress is clicked
progress.addEventListener('click', function(e) {
   var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
   video.currentTime = pos * video.duration;
});
//Highlight Text As Video Plays
video.addEventListener('timeupdate', function(){  //When play event happens on video	
	for (var i=0; i < textBlocks.length; i++) {
		var textBlockStart = textBlocks[i].getAttribute("data-start") - 0.5;
		var textBlockEnd = textBlocks[i].getAttribute("data-end") - 0.5;
		if(textBlockStart < video.currentTime && video.currentTime < textBlockEnd) {
			textBlocks[i].className += ' highlight';//Add class .highlite
		}else
			textBlocks[i].className = 'words';//remove .highlite class	
	}	
});
//Bind Transcript text to video.currentTime
transcript.addEventListener('click', function(e) {
	var textBlock = e.target;
	var startTime = textBlock.getAttribute("data-start");
	video.currentTime = startTime;
});
//VOLUME BUTTONS
increaseVolButton.addEventListener('click', function() {
	if(video.volume < 1) {
		var percent = Math.floor(video.volume * 100) + 10 + '%';
		video.volume += .1;
		volumePercentHolder.textContent = percent;
	}
});
decreaseVolButton.addEventListener('click', function() {
	if(video.volume > .1) {
		var percent = Math.floor(video.volume * 100) - 10 + '%';
		video.volume -= .1;
		volumePercentHolder.textContent = percent;
	}
});








	