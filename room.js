var room_details={};

async function haveAllPlayersArrived() {
	return new Promise(resolve => {
    function checkCount() {
	users_count = Object.keys(room_details[room_code]["users"]).length;	
     if (users_count>=2) {
       console.log('met');
       resolve();
     } else {
     	console.log("Next checking haveAllPlayersArrived");
     	console.log("Users count:");
     	console.log(users_count);
		setTimeout(checkCount, 2000); 
     }
   }
   checkCount();
  });
 }


// function createRoom()
exports.createRoom = function()
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
	room_details[room_code]["randomcalls"]= Array.from({length: 25}, () => Math.floor(Math.random() * 100)+1);
	return room_code;
}

// function joinRoom(room_code,username)
async function enterroom(room_code,username)
{	
	return new Promise(function(resolve, reject) {
	users_count = Object.keys(room_details[room_code]["users"]).length;
	console.log("Enter room");
	console.log("Users count:");
	console.log(users_count);
    if (users_count>2) {
      resolve("UserLimitExceeded");
    }
    else
    {
		room_details[room_code]["users"][username]="-1";
		console.log(username);
		console.log("is in the game");	
		console.log(room_details);
		haveAllPlayersArrived().then(function() {
			resolve("Joined");
		});
    }
  });
}

exports.updateScore = function(room_code,username,score)
{	
	room_details[room_code]["users"][username]=score;
	console.log(room_details);
	return room_details[room_code]["users"];
}

exports.getWinner = function(room_code,score)
{	
	console.log(room_details);
	return Object.keys(room_details[room_code]["users"]).reduce((a, b) => parseInt(room_details[room_code]["users"][a]) > parseInt(room_details[room_code]["users"][b]) ? a : b);
}

exports.getRandomCall= function(room_code,index)
{	
	index= parseInt(index)+1;
	if(index>=room_details[room_code]["randomcalls"].length-1)
	{
		temp=Array.from({length: 10}, () => Math.floor(Math.random() * 100)+1);
		room_details[room_code]["randomcalls"].push.apply(room_details[room_code]["randomcalls"],temp);
	}


	console.log(room_details);
	return room_details[room_code]["randomcalls"][index];
}

exports.enterRoom = enterroom;

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