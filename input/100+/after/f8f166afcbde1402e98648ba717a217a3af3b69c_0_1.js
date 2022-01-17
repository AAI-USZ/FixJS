function FakeAccount(universe, accountDef, folderInfo, receiveProtoConn, _LOG) {
  this.universe = universe;
  this.id = accountDef.id;
  this.accountDef = accountDef;

  this.enabled = true;
  this.problems = [];

  var generator = new MessageGenerator();

  this.identities = accountDef.identities;

  var ourIdentity = accountDef.identities[0];
  var ourNameAndAddress = {
    name: ourIdentity.name,
    address: ourIdentity.address,
  };

  var inboxFolder = {
    id: this.id + '/0',
    name: 'Inbox',
    path: 'Inbox',
    type: 'inbox',
    delim: '/',
    depth: 0,
  };
  var todoFolder = {
    id: this.id + '/1',
    name: 'ToDo',
    path: 'Inbox/ToDo',
    type: 'normal',
    delim: '/',
    depth: 1,
  };
  var draftsFolder = {
    id: this.id + '/2',
    name: 'Drafts',
    path: 'Drafts',
    type: 'drafts',
    delim: '/',
    depth: 0,
  };
  var sentFolder = {
    id: this.id + '/3',
    name: 'Sent',
    path: 'Sent',
    type: 'sent',
    delim: '/',
    depth: 0,
  };

  this.folders = [inboxFolder, todoFolder, draftsFolder, sentFolder];
  this._folderStorages = {};
  this._folderStorages[inboxFolder.id] =
    new FakeFolderStorage(
      inboxFolder,
      generator.makeMessages(
        { folderId: inboxFolder.id, count: 16, to: [ourNameAndAddress] }));
  this._folderStorages[todoFolder.id] =
    new FakeFolderStorage(
      todoFolder,
      generator.makeMessages(
        { folderId: todoFolder.id, count: 2, to: [ourNameAndAddress] }));
  this._folderStorages[draftsFolder.id] =
    new FakeFolderStorage(draftsFolder, []);
  this._folderStorages[sentFolder.id] =
    new FakeFolderStorage(
      sentFolder,
      generator.makeMessages(
        { folderId: sentFolder.id, count: 4, from: ourNameAndAddress }));

  this.meta = folderInfo.$meta;
  this.mutations = folderInfo.$mutations;
}