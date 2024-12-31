
const emitEvent = (event,res,res, data) => {
  
};


// getSockets

const getSockets = (users=[]) => {
    const sockets = users.map((user) => userSocketMap[user]);
    return sockets;
}


module.exports = { emitEvent };