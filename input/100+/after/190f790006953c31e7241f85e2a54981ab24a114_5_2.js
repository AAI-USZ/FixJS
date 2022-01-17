function() {
  var family, familyHash, firstMembers, secondMembers,
      first, second, secondHash;
  
  // First
  family = store.materializeRecord(storeKeys[0]);
  firstMembers = family.get('members');
  first = firstMembers.objectAt(0);
  store.writeStatus(storeKeys[0], SC.Record.BUSY_LOADING);
  store.dataSourceDidComplete(storeKeys[0], {
    type: 'Family',
    name: 'Smith',
    id: 1,
    members: [
      {
        type: 'Person',
        name: 'Willie',
        id: 1
      }
    ]
  });
  
  // Second
  family = store.materializeRecord(storeKeys[0]);
  familyHash = store.readDataHash(storeKeys[0]);
  secondMembers = family.get('members');
  
  secondMembers._childrenContentDidChange();
  second = secondMembers.objectAt(0);
  secondHash = second.get('attributes');
  
  // Tests
  equals(SC.guidFor(secondMembers), SC.guidFor(firstMembers), "verify that members ChildArrays are the same after save");
  equals(SC.guidFor(second), SC.guidFor(first), "verify that Member 1 are the same after save");
  equals(second.get('attributes'), first.get('attributes'), "verify that Member 1 attributes are the same after save");
  same(second, first, "the SC.ChildRecord should the be the same before and after the save");
  same(second.get('id'), first.get('id'), "the SC.ChildRecord id should the be the same before and after the save");
  same(secondHash, familyHash.members[0], "the Family Record and the member id hash should match");
}