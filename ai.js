function getCopyTile(){
	var T = [[0,0,0],[0,0,0],[0,0,0]];
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++)
			T[i][j] = TILE[i][j];
	}
	return T;
}

function getComputerMove () {

	$("#info").children('.first').addClass('active');
	$("#info").children('.first').removeClass('active');
	id=1;
	
	// AI to select move for winning the game
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			var T = getCopyTile();
			if(!T[i][j]){
				T[i][j] = 2;
				if(isPlayerWon(T, 2)){
					if(sot==0){
						addCircle(i, j, 2);
						sot=1;
					}
					else if(sot==1){
						addCross(i, j, 2);
						sot=0;
					}
					return 1;
				}
			}
		}
	}

	// AI to block player winning
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			var T = getCopyTile();
			if(!T[i][j]){
				T[i][j] = 1;
				if(isPlayerWon(T, 1)){
					if(sot==0){
						addCircle(i, j, 2);
						sot=1;
					}
					else if(sot==1){
						addCross(i, j, 2);
						sot=0;
					}
					return 1;				
				}
			}
		}
	}

	//AI to acquire random corners
	var C = [[0,0],[0,2],[2,0],[2,2]];
	var Possible = [];
	for(var i=0;i<4;i++){
		var x = C[i][0];
		var y = C[i][1];
		if(!TILE[x][y]){
			Possible.push(i);
		}
	}
	var P = C[Possible[Math.floor(Math.random()*Possible.length)]];
	if(P!=undefined){
		if(sot==0){
			addCircle(P[0], P[1], 2);
			sot=1;
		}
		else if(sot==1){
			addCross(P[0], P[1], 2);
			sot=0;
		}
		return 1;
	}

	//AI to acquire center
	if(!TILE[1][1]){
		if(sot==0){
			addCircle(i, j, 2);
			sot=1;
		}
		else if(sot==1){
			addCross(i, j, 2);
			sot=0;
		}
		return 1;
	}

	//AI to acquire remaining middle tiles
	var C = [[0,1],[1,2],[1,0],[2,1]];
	var Possible = [];
	for(var i=0;i<4;i++){
		var x = C[i][0];
		var y = C[i][1];
		if(!TILE[x][y]){
			Possible.push(i);
		}
	}
	var P = C[Possible[Math.floor(Math.random()*Possible.length)]];
	if(P!=undefined){
		if(sot==0){
			addCircle(P[0], P[1], 2);
			sot=1;
		}
		else if(sot==1){
			addCross(P[0], P[1], 2);
			sot=0;
		}
		return 1;
	}
	return 0;
}
