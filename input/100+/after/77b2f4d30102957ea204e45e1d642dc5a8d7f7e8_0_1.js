function render_collection() {
  var t = document.createElement('table');

  t.id = "collection_table";
  var t_head = document.createElement("thead");
  var header_td1 = document.createElement("td");
  header_td1.style.width = "42%";
  header_td1.appendChild(document.createTextNode("Title"));
  var header_td2 = document.createElement("td");
  header_td2.style.width = "29%";
  header_td2.appendChild(document.createTextNode("Artist"));
  var header_td3 = document.createElement("td");
  header_td3.style.width = "3%";
  header_td3.appendChild(document.createTextNode("Duration"));
  var header_td4 = document.createElement("td");
  header_td4.style.width = "29%";
  header_td4.appendChild(document.createTextNode("Album"));
  
  t_head.appendChild(header_td1);
  t_head.appendChild(header_td2);
  t_head.appendChild(header_td3);
  t_head.appendChild(header_td4);
  t.appendChild(t_head);

  // Each item will have one row in the table.
  for (var index = 0; index < displayed_content.length; index++) {
    var item = library[displayed_content[index]];

    var link = document.createElement('a');
    link.setAttribute('href', '#');
    link.setAttribute('onclick', 'select_item(' + index + ', true); return false;');
    link.appendChild(document.createTextNode(item.title));

    var tr = document.createElement('tr');
    tr.id = get_row_id_from_index(index);
    if (current_index == index) {
      tr.className = 'selectedrow';
    } else {
      tr.className = get_row_class_from_index(index);
    }
    
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    
    // TODO: Create node for duration
    td1.appendChild(link);
    td2.appendChild(document.createTextNode(item.artist));
    td4.appendChild(document.createTextNode(item.album));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    t.appendChild(tr);
  }

  document.getElementById('collection').appendChild(t);
  document.getElementById('collection').style.display = 'block';
  document.getElementById('loading').style.display = 'none';

  // Ensure that the selected song is visible in the window.
  if (current_index !== null) {
    // If possible, show some songs before the selected song, so that it
    // doesn't appear at the top of the window.
    var top_displayed_index = Math.max(0, current_index - 3);
    document.getElementById(
      get_row_id_from_index(top_displayed_index)).scrollIntoView();
  }

  status_info.displayed_tracks = index;
  update_status_area();
}