function delUser(name, callback) {
    this.bufferedRequest({ path: '/users/' + name, method: 'DELETE' }, callback).end();
}