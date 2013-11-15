$(document).ready(function() {
    if (!$('#html-tree').length) {
        var url = location.protocol +"//"+ location.host + Drupal.settings.basePath + 'html_tree/load';
        var request = $.ajax({
            url: url,
            dataType: "json",
            success: function(data){
                $('body').append(data.output);
                _html_tree_functionality();
            }
        });
    }
});

function _html_tree_functionality(){
    var link = $('#html-tree-link');
    link.click(function(event){
        event.preventDefault();

        var url = location.protocol +"//"+ location.host + Drupal.settings.basePath + 'html_tree/export';
        var data = {data: htmlTree()};

        var request = $.ajax({
            type: 'post',
            data: data,
            url: url,
            dataType: "json",
            success: function(data){
                if(data.status){
                    var url = data.redirect;
                    window.open(url);
                    //window.location.href = data.redirect;
                }else{
                    alert(data.output);
                }
            }
        });
    });
}

function htmlTree(obj){
    var obj = obj || document.getElementsByTagName('body')[0];
    child_classes =  _format_string(jQuery(obj).attr('class'),'class');
    child_id = _format_string(jQuery(obj).attr('id'),'id');

    var str = "<ul><li>" + obj.tagName;
    str +=  ' ' + child_classes + ' ' + child_id;
    if (obj.hasChildNodes()) {
        var child = obj.firstChild;
        while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
                str += htmlTree(child)
            }
            child = child.nextSibling;
        }
    }

    str += "</li></ul>\n";
    return str;
}

function _format_string(string, attr){
    var output = ''
    if(string && attr){
        output = attr + ': ' + string;
    }
    return output;
}
