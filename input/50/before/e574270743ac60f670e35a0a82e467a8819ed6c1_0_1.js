function(){
  var trustProxy = this.app.get('trust proxy');
  return this.connection.encrypted
    ? 'https'
    : trustProxy
      ? (this.get('X-Forwarded-Proto') || 'http')
      : 'http';
}