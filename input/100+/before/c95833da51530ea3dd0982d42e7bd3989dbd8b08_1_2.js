function init(){
    //console.log("start init...");
    initLoader(function (){
        console.log("All source loaded");
        //init canvas after source loaded
        initDraw();

        UI.active = function(uiname){
            console.log(uiname);
            switch(uiname){
                case 'select':
                    console.log('here');
                    socket.emit('ready');
                    break;
                case 'main':

                    break;
            }
        }

        UI.roleSelete = function(name){
            switch(name){
                case 'boss' :
                    console.log('add boss??');
                    socket.emit('addPerson',{'roleId':-1});
                    break;
                case 0:
                    socket.emit('addPerson',{'roleId':1});
                    break;
                case 1:
                    socket.emit('addPerson',{'roleId':2});
                    break;
                case 2:
                    socket.emit('addPerson',{'roleId':3});
            }

            UI.scene("main");
        }

    });
    //console.log("stop init...");






}