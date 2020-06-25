var room_details={};


exports.enterroom = function(room_code,username)
{
	if(!room_details[room_code])	
		room_details[room_code]=[];
	temp = {}
	temp['username']=username;
	temp['score']=0;
	room_details[room_code].push(temp);
}

console.log(room_details);