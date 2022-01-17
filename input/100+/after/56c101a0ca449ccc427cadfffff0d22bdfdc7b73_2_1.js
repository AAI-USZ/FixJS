function(name, options) {
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
  }