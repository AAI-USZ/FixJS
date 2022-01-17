function (tmxFile) {
        var mapXML = cc.SAXParser.shareParser().tmxParse(tmxFile);

        // PARSE <map>
        var map = mapXML.documentElement;

        var version = map.getAttribute('version');
        var orientationStr = map.getAttribute('orientation');

        if (map.nodeName == "map") {
            if (version != "1.0" && version !== null) {
                cc.log("cocos2d: TMXFormat: Unsupported TMX version:" + version);
            }

            if (orientationStr == "orthogonal")
                this.setOrientation(cc.TMXOrientationOrtho);
            else if (orientationStr == "isometric")
                this.setOrientation(cc.TMXOrientationIso);
            else if (orientationStr == "hexagonal")
                this.setOrientation(cc.TMXOrientationHex);
            else if (orientationStr !== null)
                cc.log("cocos2d: TMXFomat: Unsupported orientation:" + this.getOrientation());

            var s = new cc.Size();
            s.width = parseFloat(map.getAttribute('width'));
            s.height = parseFloat(map.getAttribute('height'));
            this.setMapSize(s);

            s = new cc.Size();
            s.width = parseFloat(map.getAttribute('tilewidth'));
            s.height = parseFloat(map.getAttribute('tileheight'));
            this.setTileSize(s)

            // The parent element is the map
            var mp = map.querySelectorAll("map > properties >  property");
            if(mp){
                for(var k = 0; k < mp.length;k++){
                    var dict ={};
                    var name = mp[k].getAttribute('name');
                    var value = mp[k].getAttribute('value');
                    dict[name] = value;
                    this.setProperties(dict);
                }
            }
        }

        //todo fixed
        // PARSE <tileset>
        var tilesets = map.getElementsByTagName('tileset');
        if (map.nodeName !== "map") {
            tilesets = []
            tilesets.push(map);
        }

        for (var i = 0, len = tilesets.length; i < len; i++) {
            var t = tilesets[i];
            // If this is an external tileset then start parsing that
            var externalTilesetFilename = t.getAttribute('source');
            if (externalTilesetFilename) {
                this.parseXMLFile(cc.FileUtils.getInstance().fullPathFromRelativeFile(externalTilesetFilename, tmxFile));
            }
            else {
                var tileset = new cc.TMXTilesetInfo();
                tileset.name = t.getAttribute('name') || "";
                tileset.firstGid = parseInt(t.getAttribute('firstgid')) || 1;
                tileset.spacing = parseInt(t.getAttribute('spacing')) || 0;
                tileset.margin = parseInt(t.getAttribute('margin')) || 0;

                var s = new cc.Size();
                s.width = parseFloat(t.getAttribute('tilewidth'));
                s.height = parseFloat(t.getAttribute('tileheight'));
                tileset._tileSize = s;

                var image = t.getElementsByTagName('image')[0];
                var imgSource = image.getAttribute('source');
                if (imgSource) {
                    if(this._resources){
                        imgSource = this._resources + "/" + imgSource;
                    }
                    else{
                        imgSource = cc.FileUtils.getInstance().fullPathFromRelativeFile(imgSource, tmxFile);
                    }
                }
                tileset.sourceImage = imgSource;
                this.setTilesets(tileset);
            }
        }

        // PARSE  <tile>
        var tiles = map.querySelectorAll('tile');
        if (tiles) {
            for (var i = 0, len = tiles.length; i < len; i++) {
                var info = this._tileSets[0];
                var t = tiles[i];
                this.setParentGID(parseInt(info.firstGid) + parseInt(t.getAttribute('id') || 0));
                var tp = t.querySelectorAll("properties > property")[0];

                if(tp){
                    var dict ={};
                    var name = tp.getAttribute('name');
                    var value = tp.getAttribute('value');
                    dict[name] = value;
                    this._tileProperties[this.getParentGID()] = dict;
                }
            }
        }

        // PARSE  <layer>
        var layers = map.getElementsByTagName('layer');
        if (layers) {
            for (var i = 0, len = layers.length; i < len; i++) {
                var l = layers[i];
                var data = l.getElementsByTagName('data')[0];

                var layer = new cc.TMXLayerInfo();
                layer.name = l.getAttribute('name');

                var s = new cc.Size();
                s.width = parseFloat(l.getAttribute('width'));
                s.height = parseFloat(l.getAttribute('height'));
                layer._layerSize = s;

                var visible = l.getAttribute('visible')
                layer.visible = !(visible == "0");

                var opacity = l.getAttribute('opacity') || 1;

                if (opacity) {
                    layer._opacity = parseInt(255 * parseFloat(opacity));
                }
                else {
                    layer._opacity = 255;
                }

                var x = parseFloat(l.getAttribute('x')) || 0;
                var y = parseFloat(l.getAttribute('y')) || 0;
                layer.offset = cc.p(x, y);

                var nodeValue = ''
                for (var j = 0; j < data.childNodes.length; j++) {
                    nodeValue += data.childNodes[j].nodeValue
                }

                // Unpack the tilemap data
                var compression = data.getAttribute('compression');
                var encoding = data.getAttribute('encoding');
                cc.Assert(compression == null || compression == "gzip" || compression == "zlib", "TMX: unsupported compression method");
                switch (compression) {
                    case 'gzip':
                        layer._tiles = cc.unzipBase64AsArray(nodeValue, 4);
                        break;
                    case 'zlib':
                        //Not Implemented
                        break;
                    // Uncompressed
                    case null:
                    case '':
                        if(encoding == "base64"){
                            layer._tiles = cc.Codec.Base64.decodeAsArray(nodeValue, 4);
                        }
                        else{
                            layer._tiles = cc.StringToArray(nodeValue);
                        }
                        break;
                    default:
                        cc.Assert(this.getLayerAttribs() != cc.TMXLayerAttribNone, "TMX tile map: Only base64 and/or gzip/zlib maps are supported");
                }

                // The parent element is the last layer
                var lp = l.querySelectorAll("properties > property");
                if(lp){
                    for(var k = 0; k < lp.length;k++){
                        var dict ={};
                        var name = lp[k].getAttribute('name');
                        var value = lp[k].getAttribute('value');
                        dict[name] = value;

                        layer.setProperties(dict);
                    }
                }

                this.setLayers(layer);
            }
        }

        // PARSE <objectgroup>
        var objectgroups = map.getElementsByTagName('objectgroup');
        if (objectgroups) {

            for (var i = 0; i < objectgroups.length; i++) {
                var g = objectgroups[i];
                var objectGroup = new cc.TMXObjectGroup();
                objectGroup.setGroupName(g.getAttribute('name'));
                var positionOffset = cc.p();
                positionOffset.x = parseFloat(g.getAttribute('x')) * this.getTileSize().width || 0;
                positionOffset.y = parseFloat(g.getAttribute('y')) * this.getTileSize().height || 0;
                objectGroup.setPositionOffset(positionOffset);

                var gp = g.querySelectorAll("objectgroup > properties > property");
                if(gp){
                    for(var k = 0; k < gp.length;k++){
                        var dict ={};
                        var name = gp[k].getAttribute('name');
                        var value = gp[k].getAttribute('value');
                        dict[name] = value;

                        // Add the property to the layer
                        objectGroup.setProperties(dict);
                    }
                }

                var objects = g.querySelectorAll('object')
                if (objects) {
                    for (var j = 0; j < objects.length; j++) {
                        var o = objects[j]
                        // The value for "type" was blank or not a valid class name
                        // Create an instance of TMXObjectInfo to store the object and its properties
                        var dict = {};

                        // Set the name of the object to the value for "name"
                        dict["name"] = o.getAttribute('name') || "";

                        // Assign all the attributes as key/name pairs in the properties dictionary
                        dict["type"] = o.getAttribute('type') || "";

                        dict["x"] = parseInt(o.getAttribute('x') || 0) + objectGroup.getPositionOffset().x;

                        var y = parseInt(o.getAttribute('y') || 0) + objectGroup.getPositionOffset().y;

                        dict["width"] = parseInt(o.getAttribute('width')) || 0;

                        dict["height"] = parseInt(o.getAttribute('height')) || 0;

                        // Correct y position. (Tiled uses Flipped, cocos2d uses Standard)
                        y = parseInt(this.getMapSize().height * this.getTileSize().height) - y - dict["height"];
                        dict["y"] = y;

                        var op = o.querySelectorAll("properties > property");
                        if(op){
                            for(var k = 0; k < op.length;k++){
                                var name = op[k].getAttribute('name');
                                var value = op[k].getAttribute('value');
                                dict[name] = value;
                            }
                        }

                        // Add the object to the objectGroup
                        objectGroup.setObjects(dict);
                    }
                }

                this.setObjectGroups(objectGroup);
            }
        }
        return map;
    }