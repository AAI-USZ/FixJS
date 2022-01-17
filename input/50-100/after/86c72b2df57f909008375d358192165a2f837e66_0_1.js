function(){
  info = Url.parse(process.env.REDISTOGO_URL || 'redis://localhost:6379');
  rclient = Redis.createClient(info.port, info.hostname);
  if(info.auth) {
    rclient.auth(info.auth.split(":")[1]);
  }
  domain = process.env.HEROKU_URL || "http://localhost:3000";
  hostname = Url.parse(domain).hostname;
}