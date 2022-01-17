function(obj) {
                if(obj.type == 'insert' && obj.value['force']) {
                    this.onRemoteAddNode(obj);
                } else if(obj.type == 'delete' && obj.value['force']) {
                    this.onRemoteDeleteNode(obj);
                } else if(obj.type == 'insert') {
                    this.onRemoteMoveNode(obj);
                } else if(obj.type == 'delete') {
                    this.onRemoteMoveNode(obj);
                } else if(obj.type == 'update') {
                    this.onRemoteUpdateNode(obj);
                }
            }