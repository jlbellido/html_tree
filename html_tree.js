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
        //var data = {data: htmlTree()};
        var data = htmlTree();
        var request = $.ajax({
            type: 'post',
            //contentType:'application/json',
            data: {'data':JSON.stringify(data)},
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
    if(!obj){
        var obj = document.getElementsByTagName('body')[0];
    }
    obj_classes =  _format_string(jQuery(obj).attr('class'),'class');
    obj_id = _format_string(jQuery(obj).attr('id'),'id');
    obj_tag = obj.tagName;


    var data = {};
    data['id'] = obj_id;
    data['classes'] = obj_classes;
    data['tagName'] = obj_tag;

    if (obj.hasChildNodes()) {
        var child = obj.firstChild;
        while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
                var childname = 'child_'+ new Date().getTime();
                data[childname] = htmlTree(child));
            }
            child = child.nextSibling;
        }
    }

    return data;
}

function _format_string(string, attr){
    var output = ''
    if(string && attr){
        output = attr + ': ' + string;
    }
    return output;

}
