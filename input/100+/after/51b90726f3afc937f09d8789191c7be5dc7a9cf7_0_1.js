function submitNote(eventObj) {
  metabox = $("#meta-box")
  bodybox = $("#body-box")
  meta = metabox.val()
  body = bodybox.val()

  try {
    note = jQuery.parseJSON("{" + meta + "}");
  } catch (err) {
    alert("Badly formed json in metadata.\n\nFix and submit again.")
    return
  }

  note.body = body
  data = JSON.stringify(note)
  $.post("/notedrop/putnote", data, printResponse)
}