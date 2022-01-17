function(desc, o){
            var container = document.createElement('div');
            if (desc) {
                var descspan = document.createElement('span');
                descspan.appendChild(document.createTextNode(desc + (o instanceof Array ? ' (array' + (o._key ? ', key=' + o._key : '') + ')' : '')));
                descspan.setAttribute('class', 'jsondiffpatch-property-name');
                container.appendChild(descspan);
            }
            
            if (typeof o == 'object') {
                // a node (object or array)
                var ul = document.createElement('ul');
                
                for (var prop in o) {
                    if (o.hasOwnProperty(prop)) {
                        var li = document.createElement('li');
                        li.appendChild(jdpHtml.objectToHtml(prop, o[prop]));
                        ul.appendChild(li);
                    }
                }
                if (ul.childNodes.length > 0) {
                    container.appendChild(ul);
                }
            }
            else {
                var elem = document.createElement('p');
                // unchanged
                var jsono = typeof JSON != 'undefined' ? JSON.stringify(o) : (o + ' (JSON not found)');

                elem.appendChild(document.createTextNode(jsono));
                container.appendChild(elem);
            }
            return container;
        }