function searchFieldCheckInit ( elem ) {
  searchFieldCheck( elem );
  $(elem).change(function(){
    searchFieldCheck( elem );
  });
}