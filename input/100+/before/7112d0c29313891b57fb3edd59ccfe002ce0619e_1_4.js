function startServer(port) {
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var utils = require('util');
var generator = require('./graph/Generator');
var fieldSize = 11;

finalBombCount = 6;
finalBlastRadius = 4;
maxPlayers = 4;
bombId = 0;
bombs = [];


var field = require('./graph/Field').Field(fieldSize,fieldSize);
field.connect();
generator.generate(field, 25);

var entityFactory = require('./entity/Entity');

var playerCount = 0;

var app = express.createServer();
app.use(express.static(__dirname));
app.listen(port);

var socketconnection = socketio.listen(app);


app.get('/', function(req, res){
    /*TODO: fürs erste sollte es reichen das man ein spiel eröffnet und die spielen dort zuweist..*/
    res.sendfile(__dirname + '/Client/index.html');
});

app.get('/start', function(req, res){
    /*TODO: fürs erste sollte es reichen das man ein spiel eröffnet und die spielen dort zuweist..*/
    res.sendfile(__dirname + '/Client/Client.html');
});

var clients=[];
var clientNumber=0;

var players = [];

function broadCast(command, data) {
    for(var i = 0; i < clients.length; i++)
        clients[i].emit(command,data);
}

function placePlayer(x, y, socket) {
    var player = entityFactory.entity(x,y,clientNumber, "player");
    field.getNode(x,y).containedEntity = player; /*new player*/;
    player.currentBombCount = 0;
    player.maxBombCount = 1;
    player.blastRadius = 1;
    players[clientNumber] = player;
    socket.emit('identity',{entity:player});
    socket.emit('players',{players:players});
}

socketconnection.sockets.on('connection', function (socket) {
    if(clientNumber < maxPlayers) {
        switch(clientNumber) {
            case 0 : placePlayer(0,0, socket); break;
            case 1 : placePlayer(field.width - 1, field.height - 1, socket); break;
            case 2 : placePlayer(field.width - 1, 0, socket); break;
            case 3 : placePlayer(0, field.height - 1, socket); break;
            default : return;
        }
        socket.emit('graph',{graph:field});
        clients[clientNumber++] = socket;

        function runTo(xDir, yDir, data) {
            var player = players[data['id']];
            function movePlayer(xDir, yDir) {
                if(field.getNode(player.x,player.y).containedEntity && field.getNode(player.x,player.y).containedEntity.type != 'bomb')
                    field.getNode(player.x,player.y).containedEntity = null;
                player.x += xDir;
                player.y += yDir;
                field.getNode(player.x,player.y).containedEntity = player;
                broadCast('update',{entity:player});
            }
            var currentField = field.getNode(player.x + xDir,player.y + yDir);
            if(currentField)
                if(!currentField.containedEntity) {
                    movePlayer(xDir, yDir);
                }
                else if(currentField.containedEntity.type.indexOf('power') == 0) {
                    if(currentField.containedEntity.type === 'powerup_bomb' && player.maxBombCount < finalBombCount)
                        player.maxBombCount++;
                    else if(currentField.containedEntity.type === 'powerup_fire' && player.blastRadius < finalBlastRadius)
                        player.blastRadius++;

                    broadCast('delete_entities', {delete_array:[currentField.containedEntity]});
                    movePlayer(xDir, yDir);
                }
        }

        socket.on('run_up',function(data) {
            runTo(0, -1, data);
        });
        socket.on('run_down',function(data){
            runTo(0, 1, data);
        });
        socket.on('run_left',function(data){
            runTo(-1, 0, data);
        });
        socket.on('run_right',function(data){
            runTo(1, 0, data);
        });

        socket.on('drop_bomb',function(data){
            var player = players[data['id']];
            if(player.currentBombCount < player.maxBombCount) {
                player.currentBombCount++;
                var bomb = entityFactory.entity(player.x, player.y, bombId++, 'bomb');
                field.getNode(player.x, player.y).containedEntity = bomb;
                bombs.push(bomb.id);
                broadCast('bomb_placed',{bomb:bomb});

                setTimeout(function(){
                    broadCast('show_flame',{bomb:bomb});
                },2000);

                setTimeout(function(){
                    var bombIndex = -1;
                    for (var searchIndex = 0; i < bombs.length; searchIndex++) {
                        if(bombs[searchIndex].id == bomb.id){
                            bombIndex = searchIndex;
                            break;
                        }
                    }
                    if(bombIndex > -1)
                        utils.remove(bombs,bombIndex);

                    var objects = [];
                    var died_players = [];
                    var powerups = [];
                    var droprate = 1;

                    function blastTo(xDir, yDir) {
                        var currField = field.getNode(xDir, yDir);
                        if(currField) {
                            if (currField.containedEntity) {
                                if(currField.containedEntity.type == 'player') {
                                    died_players.push(currField.containedEntity);
                                    currField.containedEntity = null;
                                }
                                else {
                                    var currEntity = currField.containedEntity;
                                    currField.containedEntity = null;
                                    if(currEntity.type === 'obstacle' && Math.random() <= droprate) {
                                        var powerup;
                                        if(Math.random() <= 0.5)
                                            powerup = entityFactory.entity(xDir, yDir, -1, 'powerup_bomb');
                                        else
                                            powerup = entityFactory.entity(xDir, yDir, -1, 'powerup_fire');
                                        powerups.push(powerup);
                                        currField.containedEntity = powerup;
                                    }
                                    objects.push(currEntity);
                                }
                                return false;
                            }
                            else
                                return true;
                        } else
                            return false;
                    }

                    field.getNode(bomb.x, bomb.y).containedEntity = null;
                    for(var i = bomb.x; i >= bomb.x-player.blastRadius; i--) {
                        if(!blastTo(i, bomb.y))
                            break;
                    }
                    for(var i = bomb.x; i <= bomb.x+player.blastRadius; i++) {
                        if(!blastTo(i, bomb.y))
                            break;
                    }
                    for(var j = bomb.y; j >= bomb.y-player.blastRadius; j--) {
                        if(!blastTo(bomb.x, j))
                            break;
                    }
                    for(var j = bomb.y; j <= bomb.y+player.blastRadius; j++) {
                        if(!blastTo(bomb.x, j))
                            break;
                    }

                    player.currentBombCount--;
                    broadCast('bomb_explode',{bomb:bomb});
                    if(died_players.length > 0)
                        broadCast('players_died',{players:died_players});
                    broadCast('delete_entities',{delete_array:objects});
                    broadCast('powerups', {powerups:powerups});
                },2500);
            }
        });
    } else {
        console.log('Game full..');
    }
});

}