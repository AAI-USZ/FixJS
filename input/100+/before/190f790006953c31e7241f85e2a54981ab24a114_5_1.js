function(){
  NestedRecord.Family = SC.Record.extend({
    /** Child Record Namespace */
    childRecordNamespace: NestedRecord,
    primaryKey: 'id',
    name: SC.Record.attr(String),
    members: SC.Record.toMany('SC.Record', { nested: true })
  });
  
  NestedRecord.Person = SC.Record.extend({
    childRecordNamespace: NestedRecord,
    primaryKey: 'id',
    name: SC.Record.attr(String),
    relationships: SC.Record.toMany('SC.Record', { nested: true })
  });
  
  NestedRecord.Relationship = SC.Record.extend({
    primaryKey: 'id',
    name: SC.Record.attr(String),
    connectedId: SC.Record.attr(String)
  });
  
}