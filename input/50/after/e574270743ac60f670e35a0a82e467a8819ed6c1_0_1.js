function(){
  var trustProxy = this.app.set('trust proxy');
  return this.connection.encrypted
    ? 'https'
    : trustProxy
      ? (this.header('X-Forwarded-Proto') || 'http')
      : 'http';
}