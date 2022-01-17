function(data) {

  if (localStorage['ducky'] === 'true') {
    document.getElementById('adv_ducky').checked = true;  
  }


  var search_form_input_homepage = document.getElementById('search_form_input_homepage');
  search_form_input_homepage.style.color = '#999999';
  search_form_input_homepage.value = prefill_text;
  eval("search_form_input_homepage.onclick = function() {if (this.value=='" + prefill_text + "') {this.value='';this.style.color='#000000';}}");

  document.getElementById('adv_ducky').onclick = ducky_check;
  document.getElementById('default_search').onclick = change_default;

  document.getElementById('bang_gi').onclick = function(){
    add_bang('!gi');
  }
  document.getElementById('bang_w').onclick = function(){
    add_bang('!w');
  }
  document.getElementById('bang_bi').onclick = function(){
    add_bang('!bi');
  }
  document.getElementById('bang_a').onclick = function(){
    add_bang('!a');
  }
  document.getElementById('bang_n').onclick = function(){
    add_bang('!n');
  }
  document.getElementById('bang_yt').onclick = function(){
    add_bang('!yt');
  }
  document.getElementById('bang_m').onclick = function(){
    add_bang('!m');
  }



  document.getElementById('search_form_input_homepage').focus();

  document.getElementById('search_form_homepage').onsubmit = function(){
      search();
  }

  document.getElementById("search_form_input_homepage").onkeydown = function(){
    if (this.value == prefill_text)
      this.value = '';

    this.style.color = '#000000';
  };               
  document.getElementById("search_form_input_homepage").onkeyup = function(){
    if (this.value == '') {
      this.style.color = '#999999';

      this.value = prefill_text;
      document.getElementById('search_form_input_homepage').focus();
    }
  }; 

}