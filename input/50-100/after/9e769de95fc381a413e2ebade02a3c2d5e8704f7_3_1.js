function(){
    var data = JSON.parse(this.innerHTML);
    console.log(data);
    qp(data.text, document.getElementById('post_action').parentNode.parentNode);
    document.getElementById('post_action').id = '';
}