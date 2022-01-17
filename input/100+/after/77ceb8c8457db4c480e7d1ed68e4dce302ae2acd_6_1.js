function() {
  this.cache = window.localcache.getCache();
  // DataModel
  this.contactsModel = new ContactsModel(this.cache);
  this.topicListModel = new TopicListModel(window.localcache.getCache());
  this.topicModel = new TopicModel();

  // Create the navigator
  this.topHeader = new DesktopClientHeader(this.notificationFetcher);

  // Create the Views
  this.contactsView = new JQueryContactsView();
  this.topicListView = new JQueryTopicListView(true, true);
  this.topicView = new JQueryTopicView();

  // Create the Presenter
  this.contactsChooserPresenter = new ContactsChooserPresenter(
      new ListContactsChooserDisplay('#topic_invite_user'),
      this.contactsModel
  );

  this.contactsPresenter = new ContactsPresenter(this.contactsView, this.contactsModel);
  this.contactsDetailPresenter = new ContactsDetailPresenter(new JQueryContactsDetailDisplay(100, 100), this.contactsModel, 'contact.clicked');
  this.topicListPresenter = new TopicListPresenter(this.topicListView, this.topicListModel);
  this.whoAmIPresenter = new WhoAmIPresenter(this.contactsView);
  this.windowUpdater = new WindowUpdater(this.topicListModel);

  this.topicPresenter = new TopicPresenter(this.topicView, this.topicModel);

  this.userProfilePresenter = new UserProfilePresenter();

  // Ok, all done. Lay it out
  this.doLayout();

  // Recalculate the position of the widgets, when window is resized
  BUS.on('window.resize', function(data) {
    this.doLayout(data);
  }, this);
}