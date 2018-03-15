var connect = require('connect'),
    socketio = require('socket.io');
var port = 3000;
var server = connect().listen(port);

var data = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];

var io = socketio.listen(server);

var RANGE = 250;
var x = RANGE;
var dataG1x = [], dataG1y = [], dataG1z = [];
for(var i = 0; i < RANGE; i++){
    dataG1x.push({x:i, y:0});
    dataG1y.push({x:i, y:0});
    dataG1z.push({x:i, y:0});
}

setInterval(function(){
	dataG1x.push({ x:x, y:2*Math.random() - 1.0});
	dataG1y.push({ x:x, y:2*Math.random() - 1.0});
	dataG1z.push({ x:x, y:2*Math.random() - 1.0});
  if (dataG1x.length > RANGE) dataG1x.shift();
  if (dataG1y.length > RANGE) dataG1y.shift();
  if (dataG1z.length > RANGE) dataG1z.shift();
  x++;
}, 20);

io.sockets.on('connection', function(socket) {
  socket.on('getData', function() {
    socket.emit('returnDataG1x', dataG1x);
    socket.emit('returnDataG1y', dataG1y);
    socket.emit('returnDataG1z', dataG1z);
  });
});
