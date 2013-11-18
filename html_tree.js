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
        var data = {'data':JSON.stringify(htmlTree())}
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
    if(!obj){
        var obj = document.getElementsByTagName('body')[0];
    }
    var obj_classes = jQuery(obj).attr('class');
    var obj_id = jQuery(obj).attr('id');
    var obj_tag = obj.tagName;


    var data = {};
    data['id'] = obj_id;
    data['class'] = obj_classes;
    data['tag'] = obj_tag;

    if (obj.hasChildNodes()) {
        var child = obj.firstChild;
        while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
                var childname = 'child_'+ Math.random()// + new Date().getTime();
                data[childname] = htmlTree(child);
            }
            child = child.nextSibling;
        }
    }

    return data;
}
