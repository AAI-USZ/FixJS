function(a){var c=Object.keys(a)[0];if(c){var e=osgDB.ObjectWrapper.getObject(c);if(e){for(var f=osgDB.ObjectWrapper.serializers,g=c.split("."),h=0,i=g.length;h<i;h++)if(f=f[g[h]],f===void 0){osg.log("can't find function to read object "+c+" - undefined");return}f(a[c],e);return e}else osg.log("can't instanciate object "+c)}else osg.log("can't find property for object "+a)}