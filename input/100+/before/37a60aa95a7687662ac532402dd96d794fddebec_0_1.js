function toggle_source_list(id_block)
  { var content = $("#source_list_" + id_block + " .pistes").html();
    if(content.length > 0)
    { $("#source_list_" + id_block).slideUp(200);
      $("#source_list_" + id_block + " .pistes").empty();
      $("#toggle_sources_list_" + id_block + ".block_list_toggle").html("[+]");
    }
    else
    { $("#source_list_" + id_block).slideDown(200);
      $("#toggle_sources_list_" + id_block + ".block_list_toggle").html("[-]");
      $("#source_list_" + id_block + " .pistes").html("<div class=\"loading\"><span>en chargement...</span></div>");
      $.ajax
      ( { url: site_url + "index.php?e=content/sources/sources&id=" + id_block,
          dataType: "html",
          success: function(content)
          { $("#source_list_" + id_block + " .pistes").html(content);
          }
        }
      );
    }
  }