function(){
  NestedRecord.Family = SC.Record.extend({
    /** Child Record Namespace */
    nestedRecordNamespace: NestedRecord,
    primaryKey: 'id',
    name: SC.Record.attr(String),
    members: SC.Record.toMany('NestedRecord.Person', { nested: true })
  });
  
  NestedRecord.Person = SC.Record.extend({
    nestedRecordNamespace: NestedRecord,
    primaryKey: 'id',
    name: SC.Record.attr(String),
    relationships: SC.Record.toMany('NestedRecord.Relationship', { nested: true })
  });
  
  NestedRecord.Relationship = SC.Record.extend({
    nestedRecordNamespace: NestedRecord,
    primaryKey: 'id',
    name: SC.Record.attr(String),
    connectedId: SC.Record.attr(String)
  });
  
}