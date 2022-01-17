function() {
  var CompactSeriesPipe, ConvertCompactPipe, DebugPipe, DecodingPipe, GenericCheckPipe, MegaPipe, ReadEdifactPipe, ReadPcAxisPipe, ReadXmlPipe, SubmitToRegistryPipe, WriteAtomPipe, WriteCsvPipe, WriteEdifactPipe, WriteJsonPipe, WriteJsonProtoPipe, WriteXmlPipe, build, createSubPipe;

  MegaPipe = require('./megaPipe').MegaPipe;

  ReadXmlPipe = require('../xml/readXmlPipe').ReadXmlPipe;

  WriteXmlPipe = require('../xml/writeXmlPipe').WriteXmlPipe;

  ReadEdifactPipe = require('../edifact/readEdifactPipe').ReadEdifactPipe;

  WriteEdifactPipe = require('../edifact/writeEdifactPipe').WriteEdifactPipe;

  WriteJsonPipe = require('../json/writeJsonPipe').WriteJsonPipe;

  WriteJsonProtoPipe = require('../json/writeJsonProtoPipe').WriteJsonProtoPipe;

  SubmitToRegistryPipe = require('../registry/submitToRegistryPipe').SubmitToRegistryPipe;

  ConvertCompactPipe = require('../transform/convertCompactPipe').ConvertCompactPipe;

  GenericCheckPipe = require('../checks/genericCheckPipe').GenericCheckPipe;

  DebugPipe = require('../util/debugPipe').DebugPipe;

  ReadPcAxisPipe = require('../pcaxis/readPcAxisPipe').ReadPcAxisPipe;

  WriteCsvPipe = require('../csv/writeCsvPipe').WriteCsvPipe;

  CompactSeriesPipe = require('../transform/compactSeriesPipe').CompactSeriesPipe;

  WriteAtomPipe = require('../odata/writeAtomPipe').WriteAtomPipe;

  DecodingPipe = require('../transform/decodingPipe').DecodingPipe;

  exports.READ_XML = 0;

  exports.WRITE_XML = 1;

  exports.READ_EDI = 2;

  exports.WRITE_JSON = 3;

  exports.SUBMIT = 4;

  exports.CONVERT = 5;

  exports.CHECK = 6;

  exports.DEBUG = 7;

  exports.READ_PX = 8;

  exports.WRITE_CSV = 9;

  exports.COMPACT = 10;

  exports.WRITE_ATOM = 11;

  exports.DECODE = 12;

  build = function(pipes, options) {
    var name, subpipes, _i, _len;
    subpipes = [];
    for (_i = 0, _len = pipes.length; _i < _len; _i++) {
      name = pipes[_i];
      subpipes.push(createSubPipe(name, options));
    }
    return new MegaPipe(subpipes, options.log);
  };

  createSubPipe = function(name, options) {
    if (exports[name] == null) {
      throw new Error("Invalid subpipe name: " + name);
    }
    switch (exports[name]) {
      case exports.READ_XML:
        return new ReadXmlPipe(options.log);
      case exports.WRITE_XML:
        return new WriteXmlPipe(options.log);
      case exports.READ_EDI:
        return new ReadEdifactPipe(options.log);
      case exports.WRITE_JSON:
        return new WriteJsonProtoPipe(options.log);
      case exports.SUBMIT:
        return new SubmitToRegistryPipe(options.log, options.registry);
      case exports.CONVERT:
        return new ConvertCompactPipe(options.log, options.registry);
      case exports.CHECK:
        return new GenericCheckPipe(options.log);
      case exports.DEBUG:
        return new DebugPipe(options.log);
      case exports.READ_PX:
        return new ReadPcAxisPipe(options.log);
      case exports.WRITE_CSV:
        return new WriteCsvPipe(options.log);
      case exports.COMPACT:
        return new CompactSeriesPipe(options.log);
      case exports.WRITE_ATOM:
        return new WriteAtomPipe(options.log, options.registry);
      case exports.DECODE:
        return new DecodingPipe(options.log, options.registry);
    }
  };

  exports.build = build;

}