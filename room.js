var room_details={};

// exports.createroom = function()
function createRoom()
{
	room_code=0;
	while(true)
	{
		room_code = Math.floor(100000 + Math.random() * 900000);
		if(!room_details[room_code])
			break;
	}
	room_details[room_code]={};
	room_details[room_code]["users"]={};
	room_details[room_code]["randomcalls"]=[];
	return room_code;
}

// exports.enterroom = function(room_code,username)
function joinRoom(room_code,username)
{	
	room_details[room_code]["users"][username]=5;
	console.log(room_details);
}

// exports.updatescore = function(room_code,username,score)
// {
// 	room_details[room_code][username]["score"]=score;
// 	console.log(room_details);
// }
rc1=createRoom();
rc2=createRoom();
joinRoom(rc1,"bsk1");
joinRoom(rc1,"bsk2");
joinRoom(rc2,"bsk3");
console.log(room_details);