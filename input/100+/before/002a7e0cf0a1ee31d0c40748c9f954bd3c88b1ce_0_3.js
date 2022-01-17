function populate_demos_dialog(demos){
    var list = $('#demo_list');
    var idx, value, key, script_li;
    $.each(demos, function(){
        allDemos[this.title] = this.scripts;
        if (this.description){
            script_li = $('<li><span class="title">' + this.title + '</span><button class="load action">Load</button><button class="show_description action">Description</button><p class="description hidden">' + this.description + '<p></li>');
        }else{
            script_li = $('<li><span class="title">' + this.title + '</span><button class="load action">Load</button></li>');
        }
        script_li.data('scripts', this.scripts); // avoid re-parsing later
        list.append(script_li);
    });
}