function stopRecord() {
    $("#zeftable>table>tbody>tr>td>a.stop>img").attr("src","../skins/"+skin+"/grfx/loading13_red.gif");
    $("#zeftable>table>tbody>tr:first-child>td").css( "background-color", "#F00" );
    $("#zeftable>table>tbody>tr:first-child>td").css( "color", "#FFF" );
    show_selectors();
    $.post("processor.php", { axAction: "stopRecord", axValue: 0, id: currentRecording},
        function(){
              ts_ext_reload();
              document.title = default_title;
        }
    );
}