function() {
  gh = new Github({
    repositoryRoot : repository,
    defaultCommitPath : commitPath,
    defaultCommitMessage : commitMessage
  });
  builder = new EntryBuilder();

  var converter = new Showdown.converter();

  var $calendar = $('#calendar');
  var $main = $('#main');

  var $tabs = $('#tabs');
  var $about = $('#about');
  var $entryMarkdown = $('#entryMarkdown');
  var $entryPreview = $('#entryPreview').hide();
  var $previewButton = $('#previewButton');
  var $preview = $('#preview');
  var $entryTitle = $('#entryTitle');
  var $commitBtn = $('#commitButton');
  var $newEntry = "src/newEntry.html";
  var $usernameField = $('#username');
  var $passwordField = $('#password');

  $calendar.fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    height: 400,
    width: 100,
    editable: true,
    dayRender: function(cell, date) {
      var day = date.format("yyyy-mm-dd");
      var entries = dayEntries[day];
      if (entries !== undefined){
        cell.addClass('fc-xdate');
        cell.click(function() {
          if (cell.hasClass('fc-xdate')){
            renderEntries(entries);
          }
        });
      } else {
        cell.removeClass('fc-xdate');
      }
    }
  });

  function renderEntries(entries){
    var dayContent = '';
    $.each(
      entries,
      function(idx, entry){
        var entryTitle = entry['title'];
        var entryUrl = entry['url'];
        requestHandler.addCall();
        $.ajax({
          url: entryUrl,
          type: "GET",
          error: function(xhr, statusText, errorThrown){
            alert(statusText);
            // Work out what the error was and display the appropriate message
          },
          success: function(data){
            dayContent += '<div class="post">'
                            + '<h3>' + entryTitle + '<h3>'
                            + '<div class="post-content">' + data + '</div>'
                          + '</div>';
            requestHandler.removeCall(dayContent);
          }
        });

      });
  }

  var requestHandler = {
        _requestsInProgress: 0,

        addCall: function() {
            this._requestsInProgress++;
        },

        removeCall: function(dayContent) {
            this._requestsInProgress--;
            if (this._requestsInProgress === 0) {
              $.facebox(dayContent);
              $(".popup").addClass("markdown-body");
            }
        }
    };

  $.facebox.settings.closeImage = 'lib/facebox/closelabel.png';
  $.facebox.settings.loadingImage = 'lib/facebox/loading.gif';

  $commitBtn.on('click', function(){
    entry = builder.buildEntry($entryTitle.val(), $entryMarkdown.val());
    gh.setCredentials($usernameField.val(), $passwordField.val());
    gh.commit(entry);
  });

  $(document).bind('beforeReveal.facebox', function() {
    $('#facebox .content').width('800px');
  });

  $($tabs).tabs();

  $($about).load('src/about.html');

  $($entryTitle).on('keyup', function() { createPreview(); });
  $($entryMarkdown).on('keyup', function() { createPreview(); });

  function createPreview(){
    var previewHtml = converter.makeHtml('#' + $entryTitle.val() + '\n' + $entryMarkdown.val());
    $($preview).html('').html(previewHtml);
  }
}