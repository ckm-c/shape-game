let colors = ['yellow', 'red','blue', 'violet', 'green'];
let pattern =['rhombus','circle','square'];
let body = document.body;
let startBtn = document.querySelector('.start-game-button');
let totalShadow = document.querySelector('.total-shadow');
let currentShape = 0;
let num =0;
// let total = 10;
let gameOver = false;
let windowWidth = window.innerWidth ;
let windowHeight = window.innerHeight;
let scores = document.querySelectorAll('.score');
// let display = document.querySelector('#time');


function createShape() {
	//generate a shape and color from array colors and pattern
	let div = document.createElement('div');
	let rand = Math.floor(Math.random() * colors.length);
	let rands = Math.floor(Math.random() * pattern.length); 
	div.className = 'shape shape-' +colors[rand] +' shape-'+pattern[rands];

	//set the shape element to a random horizontal position between 0 and window width minus 100
	rand = Math.floor(Math.random() * (windowWidth - 100));
	div.style.left = rand + 'px';
	div.dataset.number = currentShape;
    currentShape++;
	body.appendChild(div);
	animateShape(div);
}
function stopBackgroundSound(){
	document.querySelector('.bg-music').pause();
}
function playShapeSound() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}
function playWinSound() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/win.mp3';
    audio.play();
}

function playGameoverSound(){
	let audio = document.createElement('audio');
	audio.src = 'sounds/gameover.wav';
	audio.play();
}

function animateShape(elem) {
	// initialize position of shape element as 0
	let pos = 0;
	// call the frame function repeatedly by the interval timer at a random number
	let random = Math.floor(Math.random() * 6-3);
	let interval = setInterval(frame, 12 - Math.floor(num/10) + random);
	//updat position of shape elem and game over if shape reach top of the window height
	function frame() {
		if (pos >= (windowHeight) && (document.querySelector('[data-number="'+elem.dataset.number+'"]')!==null)){
			clearInterval(interval);
			gameOver = true;


		}
		else{
			pos++;
			elem.style.top=windowHeight - pos+'px';
		}
	}
}
//shape to be remove and score to be increase and update
function deleteShape(elem) {

	elem.remove();
	num++;
	updateScore();
	playShapeSound();
}

//update score 
function updateScore(){
	for(let i =0; i<scores.length; i++){
		scores[i].textContent = num;
	}
	
}




function startGame() {
	
	restartGame();


    //display game timer when game start and duration is 10minuntes
	let display = document.querySelector('#time');
	display.style.display= 'flex';
	 let duration = 60*10;
	 
	var timer = duration, minutes, seconds;
	

	let countdown_loop = setInterval(function(){
		//separate minutes and seconds & covert float result to an integer
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer% 60, 10);
	// add leading zeros to minutes and seconds if less than 10 
	minutes = minutes< 10 ? "0" + minutes: minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	display.textContent = minutes + ":" + seconds;
	timer--
	if(timer<0){
		stopBackgroundSound();
		playWinSound();
		clearInterval(countdown_loop)
		clearInterval(loop);
		let forRemoving = document.querySelectorAll('.shape');
		for(let i = 0; i < forRemoving.length; i++){
	        forRemoving[i].remove();
		}
		totalShadow.style.display = 'flex';
        totalShadow.querySelector('.lose').style.display = 'none';
        totalShadow.querySelector('.win').style.display = 'block';


	}

	},1000);
	// calls createshape function to execute every seconds + timeout and gameover if shape touches the window height
	let timeout = 0;
    let loop = setInterval(function() {
        timeout = Math.floor(Math.random() * 600 - 100) 
        if(!gameOver ){
            createShape();
        } else{
        	stopBackgroundSound();
        	playGameoverSound();
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'none';
            totalShadow.querySelector('.lose').style.display = 'block';
            // let forRemoving = document.querySelectorAll('.shape');
			// for(let i = 0; i < forRemoving.length; i++){
			//         forRemoving[i].remove();
    		// }
        }
        // else {
        //     clearInterval(loop);
        //     totalShadow.style.display = 'flex';
        //     totalShadow.querySelector('.lose').style.display = 'none';
        //     totalShadow.querySelector('.win').style.display = 'block';
        // }
    },1000 + timeout);

	    
	
	

    //clear timer interval if game is over

   document.querySelector('.restart').addEventListener('click',function(){
		clearInterval(countdown_loop);
	});

	document.querySelector('.cancel').addEventListener('click',function(){
		clearInterval(countdown_loop);
	});
}
// remove shapes elems when user want to restart game
function restartGame() {
	

    let forRemoving = document.querySelectorAll('.shape');
    for(let i = 0; i < forRemoving.length; i++){
        forRemoving[i].remove();
    }
    gameOver = false;
    num = 0;
    updateScore();
    document.querySelector('.bg-music').play();
}
document.addEventListener('click', function(event){
	if(event.target.classList.contains('shape')){
		deleteShape(event.target);

	}
})
document.querySelector('.restart').addEventListener('click',function(){
    totalShadow.style.display= 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
})
document.querySelector('.cancel').addEventListener('click',function(){
    totalShadow.style.display='none';
    time.style.display = 'none';
    document.querySelector('.start-game-window').style.display = 'flex';
    let forRemoving = document.querySelectorAll('.shape');
	for(let i = 0; i < forRemoving.length; i++){
	        forRemoving[i].remove();
	}
	num=0;
	document.querySelector('.bg-music').pause();
	updateScore();

})
startBtn.addEventListener('click',function(){
	startGame();
	document.querySelector('.bg-music').play();
	document.querySelector('.start-game-window').style.display = 'none';
})