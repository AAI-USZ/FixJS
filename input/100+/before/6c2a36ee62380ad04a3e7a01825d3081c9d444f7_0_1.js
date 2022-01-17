function(e) {
            e.stopPropagation();
            var self = $(this);

            var node = $(self.closest('.node')[0]);

            var pos = node.parent().children().size();

            var nodeData = {};
            nodeData.type = 'Component';
            nodeData.parentId = getId(node.parent());

            var relData = {};

            var component = node.closest('.component')[0];
            if (component) {
                var componentId = getId(component);
                relData[componentId] = pos;
                relData.componentId = componentId;
            }

            var page = node.closest('.page')[0];
            if (page) {
                var pageId = getId(page);
                relData[pageId] = pos;
                relData.pageId = pageId;
            }
            if (debug) console.log('Wrap element in component', getId(node), nodeData, relData);
            //_Entities.createAndAdd(getId(node), nodeData, relData);
            
            var dialog = $('#dialogBox .dialogText');
            var dialogMsg = $('#dialogMsg');
			
            dialog.empty();
            dialogMsg.empty();
            
            dialog.append('<label for="kind">Component Class:</label></td><td><input id="_kind" name="kind" size="20" value="">');
            dialog.append('<button id="startWrap">Create Component</button>');

            Structr.dialog('Create Component', function() {
                return true;
            }, function() {
                return true;
            });
			
            $('#startWrap').on('click', function(e) {
                e.stopPropagation();

                var kind = $('#_kind', dialog).val();
                
                nodeData.kind = kind;

                if (debug) console.log('start');
                return Command.wrap(getId(node), nodeData, relData);
            });

            

        }