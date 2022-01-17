function() {
  gh = new Github({
    repositoryRoot : repository,
    defaultCommitPath : commitPath,
    defaultCommitMessage : commitMessage
  });
  builder = new EntryBuilder();

  var converter = new Showdown.converter();

  var dayContent = '';
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
            showDayEntries(entries);
          }
        });
      }
    }
  });

  $('.fc-button-next').click(function() {
    clearXDates();
  });

  $('.fc-button-prev').click(function() {
    clearXDates();
  });

  function clearXDates(){
    $("td").removeClass("fc-xdate");
  }

  function showDayEntries(entries){
    $main.ajaxStop(function(){
      $.facebox(dayContent);
      $(".popup").addClass("markdown-body");
    });
    getContentOfEntries(entries);
  }

  function getContentOfEntries(entries){
    dayContent = '';
    var entry_calls = [];
    $.each(entries,
          function(){
            var title = this['title'];
            call = $.ajax({url:this['url']});
            call.done(function(data){
              dayContent += '<div class="post">'
                            + '<h3>' + title + '<h3>'
                            + '<div class="post-content">' + data + '</div>'
                          + '</div>';
            });
            entry_calls.push(call);
          });

    $.when.apply($, entry_calls);
  }

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