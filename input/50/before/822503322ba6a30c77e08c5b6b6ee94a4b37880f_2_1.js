function (testVal) {
                  var index = fluid.model.transform.matchValueMapperFull(testVal, expander, expandSpec);
                  return index === -1? null : expandSpec[index];
            }