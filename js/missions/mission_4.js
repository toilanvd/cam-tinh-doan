function get_bit(x,i){
	return (x >>> i)%2;
}

exports.information = function(callback){
	//callback(title,body,gift_cardid,index);
	callback("PLAY FOR JUSTICE","Flawless win 30 combats using 1-star card",25,4);
}

exports.check_allow_receive_gift = function(db,userid,callback){
	db.query("SELECT * FROM combat_wins WHERE userid = '"+userid+"'", function(err,user,fields){
		if(err) throw err;
		if(get_bit(user[0].receive_gift_mask,4)==1) callback(false);
		else if(user[0].one_star < 30) callback(false);
		else callback(true);
	});
}

exports.check_process = function(db,userid,callback){
	//callback(completed,need)
	db.query("SELECT * FROM combat_wins WHERE userid = '"+userid+"'", function(err,user,fields){
		if(err) throw err;
		callback(user[0].one_star,30);
	});
}

exports.make_gift = function(db,userid,callback){
	var rg_add_amount = (1 << 4);
	db.query("UPDATE combat_wins SET receive_gift_mask = receive_gift_mask+"+rg_add_amount+
			" WHERE userid = '"+userid+"'", function(err,upd,fields){
		if(err) throw err;
		callback(25);
	});
}