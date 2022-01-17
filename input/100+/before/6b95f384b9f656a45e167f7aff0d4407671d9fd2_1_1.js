function (options) {
  var uri;

  if (options && options.uri) {
    uri = options.uri;
    delete options.uri;
  } else {
    uri = process.env.MONGOOSE_TEST_URI ||
          'mongodb://localhost/mongoose_test'
  }

  return mongoose.createConnection(uri, options);
}