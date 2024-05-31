const { MessageModel, notificationModel } = require("../../Database");

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain','application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/octet-stream'];

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message, fileType } = req.body;
    
        // Check if the file type is allowed
        var isFileTypeAllowed = true
        if (req.files !== null){
            if(fileType==='audio'){
                isFileTypeAllowed =  allowedFileTypes.includes(req.files['file[data]']?.mimetype) ? true : false 
            }else if(fileType!=='audio'){
                isFileTypeAllowed =  allowedFileTypes.includes(req.files['file[]']?.mimetype) ? true : false 
            }else{
                return res.status(400).json({ msg: 'Unsupported file type.' });
            }
            
        }


        // if (req.files !== null && (!allowedFileTypes.includes(req.files['file[]']?.mimetype)|| !allowedFileTypes.includes(req.files['file[data]']?.mimetype) )) {
        //    console.log(!allowedFileTypes.includes(req.files['file[]']?.mimetype) )
        //    console.log(!allowedFileTypes.includes(req.files['file[data]']?.mimetype))
        //     return res.status(400).json({ msg: 'Unsupported file type.' });
        // } 

        var data ;

       if(req.files !== null && isFileTypeAllowed){
        
        if(fileType === 'audio'){
            data =  await MessageModel.create({
                message:{text:message,
                    file:{
                        filename: req.files['file[data]']?.name ,
                        contentType:req.files['file[data]']?.mimetype,
                        data: req.files['file[data]']?.data,
                      },
                    fileType: fileType,
                },
                users: [from, to],
                isRead:false,
                sender : from,
    
            })
            
        }else{
            data =  await MessageModel.create({
                message:{text:message,
                    file:{
                        filename: req.files['file[]']?.name ,
                        contentType:req.files['file[]']?.mimetype,
                        data: req.files['file[]']?.data,
                      },
                    fileType: fileType,
                },
                users: [from, to],
                isRead:false,
                sender : from,
    
            })
        }
       
         
       }else{
        console.log("message is sended")
        data =  await MessageModel.create({
            message:{text:message },
            users: [from, to],
            isRead:false,
            sender : from,

        })
       }
        
        if (data) return res.json({msg:"Message added succesfully"});

        return res.json({msg:"Failed to add message to the database"})
        
    } catch (ex) {
        console.log(ex)
        next(ex)
    }

}
module.exports.getAllMessage = async (req,res,next) =>{
    try {
       
    
        const {from , to} = req.body;
        const messages = await MessageModel.find({
            users :    {
                $all : [from , to]
            }
        }).sort({updatedAt : 1})

        const projectMessages = messages.map((msg)=>{
            
            return{
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text,
                file : msg.message.file,
                fileType:msg.message.fileType
            }
        })

     res.json(projectMessages);
    
        
    } catch (ex) {
        console.log(ex)
        next(ex)
    }

}

module.exports.addNotification = async (req,res,next) =>{
    try {

        const {sender, message,reciever} = req.body;
        const data =  await notificationModel.create({
            message:{text:message},
            sender : sender,
            reciever : reciever,
            Isread:false,
            recievedAt: Date.now(),
        })
        if (data) return res.json({msg:"notification added succesfully"});

        return res.json({msg:"Failed to add notification to the database"})
        
    } catch (ex) {
        next(ex)
    }
}

module.exports.removeNotification = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        // console.log(from, to)

        // Update messages where sender matches 'from' and receiver matches 'to'
        const data = await MessageModel.updateMany(
            {
                "users.0": from,
                "users.1": to,
                isRead: false // Optional, if you only want to update unread messages
            },
            { $set: { isRead: true } }
        );

        if (data) {
            return res.json({ msg: "Messages are marked as read" });
        } else {
            return res.json({ msg: "No messages were updated" });
        }
    } catch (ex) {
        next(ex);
    }
};



module.exports.getAllNotifications = async (req,res,next) =>{
    try {
       
        const {reciever} = req.body;
        const notifications = await MessageModel.find({
            isRead : false,           
           'users.1': reciever 

        }).sort({updatedAt : 1})

        const projectNotifications = notifications.map((notf)=>{
            return{
                msgId: notf._id,
                sender :notf.sender,
                message : notf.message.text,
            }
        })
    // console.log(projectNotifications)
     res.json(projectNotifications);
    
        
    } catch (ex) {
        next(ex)
    }

}


module.exports.clearChat = async (req,res,next) =>{
    try {
        const {currentChatId,currentUserId} = req.body;
  console.log(currentChatId,currentUserId);
        const response = await MessageModel.deleteMany(
            {
                users :    {
                    $all : [ currentChatId , currentUserId]
                }
            }
        )
        console.log(response)
        if(response) return res.json({msg:"Chat is Deleted Succesfully",deletedCount:response.deletedCount});
        
    } catch (ex) {
        next(ex)
    }
}