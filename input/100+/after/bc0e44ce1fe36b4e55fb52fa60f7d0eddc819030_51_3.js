function setView(view) {
  if (currentView === view)
    return;

  // Do any necessary cleanup of the view we're exiting
  switch(currentView) {
  case thumbnailSelectView:
    // Clear the selection, if there is one
    Array.forEach(thumbnails.querySelectorAll('.selected.thumbnail'),
                  function(elt) { elt.classList.remove('selected'); });
    break;
  case editView:
    // Cleanup is done in exitEditMode() before this function is called
    break;
  }

  // Show the specified view, and hide the others
  for (var i = 0; i < views.length; i++) {
    if (views[i] === view)
      views[i].classList.remove('hidden');
    else
      views[i].classList.add('hidden');
  }

  // Now do setup for the view we're entering
  // In particular, we've got to move the thumbnails list into each view
  switch (view) {
  case thumbnailListView:
    view.appendChild(thumbnails);
    thumbnails.style.width = '';
    break;
  case thumbnailSelectView:
    view.appendChild(thumbnails);
    thumbnails.style.width = '';
    // Set the view header to a localized string
    updateSelectionState();
    break;
  case photoView:
    // photoView is a special case because we need to insert
    // the thumbnails into the filmstrip container and set its width
    $('photos-filmstrip').appendChild(thumbnails);
    // In order to get a working scrollbar, we apparently have to specify
    // an explict width for list of thumbnails.
    // XXX: we need to update this when images are added or deleted.
    // XXX: avoid using hardcoded 50px per image?
    thumbnails.style.width = (images.length * 50) + 'px';
    break;

  case editView:
    // We don't display the thumbnails in edit view.
    // the editPhoto() function does the necessary setup and 
    // calls setView(), so there isn't anything to do here.
    break;
  }

  // Remember the current view
  currentView = view;
}