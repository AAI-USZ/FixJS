function makeLessSrc(lessObj , opts){
    for( var i in lessObj ) {
      if (i == "@style") continue ;

      dist += indent(depth) + (i + "{\n") + indent(depth+1) + (lessObj[i]["@style"]||'') + "\n";
      depth++;
      makeLessSrc(lessObj[i] , opts);
      depth--;
      dist += indent(depth) + "}\n";
    }
  }