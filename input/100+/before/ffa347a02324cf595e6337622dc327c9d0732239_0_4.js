function(obj){
            try{
            // Normal insert
            if(obj.type == 'insert' && obj.value['force'])
                this.onRemoteAddNode(obj);
            // Normal delete
            else if(obj.type == 'delete' && obj.value['force'])
                this.onRemoteDeleteNode(obj);
            // Modified insert
            else if(obj.type == 'insert')
                this.onRemoteMoveNode(obj);
            // Modified delete
            else if(obj.type == 'delete')
                this.onRemoteMoveNode(obj);
            // Normal update
            else if(obj.type == 'update')
                this.onRemoteUpdateNode(obj);
            } catch(e) {
                debugger;
                console.log(e);
            }
        }