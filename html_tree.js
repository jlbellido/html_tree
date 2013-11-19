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
        $('#html-tree-download').show();
        $('#html-tree-download-link').attr('href','');
        var url = location.protocol +"//"+ location.host + Drupal.settings.basePath + 'html_tree/export';
        var data = {'data':JSON.stringify(htmlTree())}
        var request = $.ajax({
            type: 'post',
            data: data,
            url: url,
            dataType: "json",
            success: function(data){
                if(data.status){
                    var name = data.name;
                    var url = location.protocol +"//"+ location.host + Drupal.settings.basePath + 'html_tree/download/';
                    $('#html-tree-download-link').attr('href',url + name);
                    document.location = url + name;
                    //window.open( url + name );
                    $('#html-tree-download').show();
                }else{
                    alert(data.message);
                }
            }
        });

    });

}

function htmlTree(obj){
    if(!obj){
        var obj = document.getElementsByTagName('body')[0];
    }

    var data = {};
    data['id'] = jQuery(obj).attr('id');
    data['class'] = jQuery(obj).attr('class');
    data['tag'] = obj.tagName;

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
