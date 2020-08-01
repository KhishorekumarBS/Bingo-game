var room_details={};


// function createRoom()
exports.createRoom = function(no_players)
{
	room_code=0;
	while(true)
	{
		room_code = Math.floor(100000 + Math.random() * 900000);
		if(!room_details[room_code])
			break;
	}
	room_code=room_code.toString();
	room_details[room_code]={};
	room_details[room_code]["users"]={};
	room_details[room_code]["randomcalls"]= [];
	room_details[room_code]["gameended"]=false;
	room_details[room_code]["no_players"]=no_players;
	return room_code;
}

// function joinRoom(room_code,username)
async function joinroom(room_code,username)
{	
	return new Promise(function(resolve, reject) 
	{
		function checkUserCount() 
	    {
			users_count = Object.keys(room_details[room_code]["users"]).length;	
     		console.log("Users count:");
   			console.log(users_count);
			if (users_count>=room_details[room_code]["no_players"]) 
			{
				console.log('met');
				players=[];
				for(var player in room_details[room_code]["users"]) players.push(player);
				resolve(players);
     		} 
     		else 
     		{
     			room_details[room_code]["users"][username]="0";
     			console.log(room_details);
     			console.log("Added.. Next checking");
				setTimeout(checkUserCount, 2000); 
     		}
		}
		checkUserCount();
  	});
}

async function getRandomCall(room_code,turn,randnum,indextobecalled) 
{
	return new Promise(function(resolve, reject) 
	{
		console.log(room_details);
		console.log(randnum);
		console.log("In room.js");
		console.log(turn);
		current_length = Object.keys(room_details[room_code]["randomcalls"]).length;
		console.log(current_length);
		if(room_details[room_code]["gameended"])
			resolve("game_ended");
		if(turn=="true")
		{
			room_details[room_code]["randomcalls"].push(randnum);
			console.log("Number assigned");
			resolve(randnum);
		}
		else
		{
		    function checkCallCount() 
		    {
				if(room_details[room_code]["gameended"])
					resolve("game_ended");
				current_length = Object.keys(room_details[room_code]["randomcalls"]).length;
				console.log("checkCallCount");
				console.log(current_length);	
				if(current_length>=indextobecalled)
				{
					console.log("Resolved");
					resolve(room_details[room_code]["randomcalls"][indextobecalled-1]);
				}
     			else 
     			{
					console.log(room_details);
					setTimeout(checkCallCount, 2000); 
     			}
			}
			checkCallCount();
		}
	});
}

exports.updateScore = function(room_code,username,score)
{	
	room_details[room_code]["users"][username]=score;
	console.log(room_details);
	return room_details[room_code]["users"];
}


exports.disqualifyMe = function(room_code,username)
{	
	room_details[room_code]["gameended"]=true;
	room_details[room_code]["users"][username]="-1";
	console.log(room_details);
}

exports.hasgameended = function(room_code)
{	
	console.log(room_details);
	if(room_details[room_code]["gameended"])
		return true;
	else
		return false;
}

exports.getWinner = function(room_code,score)
{	
	room_details[room_code]["gameended"]=true;
	console.log(room_details);
	return Object.keys(room_details[room_code]["users"]).reduce((a, b) => parseInt(room_details[room_code]["users"][a]) > parseInt(room_details[room_code]["users"][b]) ? a : b);
}

// exports.getRandomCall= function(room_code,index)
// {	
// 	index= parseInt(index)+1;
// 	if(index>=room_details[room_code]["randomcalls"].length-1)
// 	{
// 		temp=Array.from({length: 10}, () => Math.floor(Math.random() * 100)+1);
// 		room_details[room_code]["randomcalls"].push.apply(room_details[room_code]["randomcalls"],temp);
// 	}


// 	console.log(room_details);
// 	return room_details[room_code]["randomcalls"][index];
// }

exports.joinRoom = joinroom;
exports.getRandomCall = getRandomCall;

// exports.updatescore = function(room_code,username,score)
// {
// 	room_details[room_code][username]["score"]=score;
// 	console.log(room_details);
// }
// rc1=createRoom();
// getRandomCall(rc1,"24");
// rc2=createRoom();
// joinRoom(rc1,"bsk1");
// joinRoom(rc1,"bsk2");
// joinRoom(rc2,"bsk3");
console.log(room_details);