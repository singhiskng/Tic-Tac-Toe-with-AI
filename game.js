
	var TILE = [[0,0,0],[0,0,0],[0,0,0]];
	var player = [0,1,2];
	var id=0;
	var bot = false;
	var sot = 0;// symbol of tile
	var symbol = ['circle','cross'];
	var playerFirstScore=0,playerSecondScore=0;
		
function addCircle (x, y, id) {
	$circle = "<div class=\"shape circle\"><div></div></div>";
	if(TILE[x][y]==0){
		TILE[x][y]= player[id];
		var d = y*3+x+1;
		$(".tile[data="+d+"]").append($circle);
	}
}

function addCross(x, y, id) {
	$cross = "<div class=\"shape cross\"><div></div></div>";
	if(TILE[x][y]==0){
		TILE[x][y] = player[id];
		var d = y*3+x+1;
		$(".tile[data="+d+"]").append($cross);		
	}
}

function clearGame(){

	for(i=0;i<3;i++)
		for(j=0;j<3;j++)
			TILE[i][j]=0;
	
	id=0;
	sot = Math.random()>0.5 ? 1 : 0;
	$(".tile").each(function(index, el) {
		el.innerHTML = "";		
	});
}

function updateScore () {
	$("#info").children('.first').children('.score').text("Score = " + playerFirstScore);
	$("#info").children('.second').children('.score').text("Score = " + playerSecondScore);
}

function start(){

	clearGame();

	$("#info").children('.first').removeClass('active');
	$("#info").children('.second').removeClass('active');
	
	var x = Math.floor(Math.random()*10);
	if(x>5){
		id = 1;
		alert($("#info").children('.first').children("span").first().text()+" will be "+symbol[sot]);
		$("#info").children('.first').addClass('active');
	}
	else{
		id = 2;
		alert($("#info").children('.second').children("span").first().text()+" will be "+symbol[sot]);	
		$("#info").children('.second').addClass('active');
		if(bot){
			setTimeout(getComputerMove,500);
		}
	}
}

function isDraw () {
	for(i=0;i<3;i++){
		for(j=0;j<3;j++)
			if(TILE[i][j]==0)
				return false
	}
	return true;
}

function playAgain () {

	updateScore();
	
	if(confirm("Do You Want To Play Again")){
		setTimeout(start, 500);
	}
	else{
		window.close();
	}
}

function isPlayerWon(tile, id){
	var t = tile;
	if( (t[0][0]==player[id] && t[0][1]==player[id] && t[0][2]==player[id]) ||
		(t[1][0]==player[id] && t[1][1]==player[id] && t[1][2]==player[id]) ||
		(t[2][0]==player[id] && t[2][1]==player[id] && t[2][2]==player[id]) ||
		(t[0][0]==player[id] && t[1][0]==player[id] && t[2][0]==player[id]) ||
		(t[0][1]==player[id] && t[1][1]==player[id] && t[2][1]==player[id]) ||
		(t[0][2]==player[id] && t[1][2]==player[id] && t[2][2]==player[id]) ||
		(t[0][0]==player[id] && t[1][1]==player[id] && t[2][2]==player[id]) ||
		(t[2][0]==player[id] && t[1][1]==player[id] && t[0][2]==player[id])
		) return true;
	else
		return false;
}

// main function
$(function(){
	// Document Loaded

	// setting tiles
	$("#board").children('.tile').each(function(index, el) {
		var d = $(this).attr('data')-1;
		$(this).css('transform', 'translate('+150*(d%3)+'px ,'+150*(Math.floor(d/3))+'px )');
	});

	// removing overlay

	$("#overlay > .player").click(function(e) {
		$player_first = null,$player_second = null;

		// if player is selected
		if($(this).hasClass('person')){
		
			while($player_first==null || $player_first=="")
				$player_first = prompt("Name Of First Player");
		
			while($player_second==null || $player_second=="")
				$player_second = prompt("Name Of Second Player");

			$("#info").children('.first').children("span").first().text($player_first);
			$("#info").children('.second').children("span").first().text($player_second);
			
		}

		// if computer is selected
		if($(this).hasClass('computer')){
		
			while($player_first==null || $player_first==""){
				$player_first = prompt("Name Of The Player");
			}
		
			$("#info").children('.first').children("span").first().text($player_first);
			$("#info").children('.second').children("span").first().text("Computer");

			bot = true;
		}
		$("#overlay").slideUp('slow');

		setTimeout(start,1000);
	});



	$(".tile").click(function(e) {

		var d = $(this).attr('data')-1;
		var x = d % 3;
		var y = Math.floor(d / 3);
		
		if(TILE[x][y]!=0)
		return 0;		
		// deciding symbol to be drawn
		if(sot==0){
			addCircle(x, y, id);
			sot=1;
		}
		else if(sot==1){
			addCross(x, y, id);
			sot=0;
		}

		if(bot && isPlayerWon(TILE, 1)){
			playerFirstScore++;
			alert($("#info").children('.first').children("span").first().text() + " has Won");
			clearGame();
			playAgain();
		}

		if(id==1){
			id=2;
			$("#info").children('.first').removeClass('active');
			$("#info").children('.second').addClass('active');
			// computer move
			if(bot){
				getComputerMove();
				if(isPlayerWon(TILE, 2)){
					playerSecondScore++;
					alert($("#info").children('.second').children("span").first().text() + " has Won");
					clearGame();
					playAgain();
				}
			}
		}
		else if(id==2 && !bot){
			$("#info").children('.first').addClass('active');
			$("#info").children('.second').removeClass('active');
			id=1;
		}

		// winner check
		if(!bot && isPlayerWon(TILE, 1)){
			playerFirstScore++;
			alert($("#info").children('.first').children("span").first().text() + " has Won");
			clearGame();
			playAgain();
		}
		else if(isPlayerWon(TILE, 2) && !bot){
			playerSecondScore++;
			alert($("#info").children('.second').children("span").first().text() + " has Won");
			clearGame();
			playAgain();
		}
		else if(isDraw()){
			alert("Its a Draw");
			clearGame();
			playAgain();
		}

	});
});
