function () {
  // host_url = "//lambda-racer.nodejitsu.com/"; // NODEJITSU: SSL-problem when using *.jit.su? try using *.nodejitsu.com
  host_url = "//dry-wave-4817.herokuapp.com/";
  db_url = "mongodb://tsnm:TsuNaMi@flame.mongohq.com:27047/lambdaracer";
  redirect_url = "//www.facebook.com/lambda.maximal/app_260510290719654";
  app.use(express.errorHandler());
}