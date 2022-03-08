const sql=require("./db.js");

const Chat=function(chat){
    this.from_id=chat.from_id;
    this.to_id=chat.to_id;
    this.msg=chat.msg;
}

Chat.create=(newChat,result)=>{
            
            sql.query("INSERT INTO chats SET ?",newChat,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created trial: ",{id:res.insertId,...newChat});
                result(null,{"status":"1","message":"Trial added Successfull!!",id:res.insertId,...newChat});
            });
       
};


Chat.findByUser=(from_id,to_id,result)=>{
    if(from_id!==null && to_id !== null){
        var sql1=`SELECT chats.* FROM chats WHERE (chats.from_id = ${from_id} AND chats.to_id=${to_id}) OR  (chats.from_id =${to_id} AND chats.to_id=${from_id})`;
    sql.query(sql1,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found chats: ",res);
            console.log(sql1);
            //result(null,res);
            result(null,{"status":"1","result":res,"message":"message fetched successfull!"});
            return;

        }
        result(null,{"status":"0","result":[],"message":"message not found!"});
    });
    }else{
         result(null,{"status":"0","message":"please provide from_id and to_id!"});
    }
};







module.exports=Chat;