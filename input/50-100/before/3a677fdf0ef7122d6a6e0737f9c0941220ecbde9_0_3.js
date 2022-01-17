function addGroupKey(el) {
 parameters = {group_key:$('group_key').value, method: 'get'};
 var url = window.location.toString();
 ajaxRequest(el, url, parameters, onAddGroupKey);
}