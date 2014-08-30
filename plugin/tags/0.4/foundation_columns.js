(function() {

    tinymce.create('tinymce.plugins.foundation_columnsPlugin', {
        init : function(ed, url) {

            ed.addButton('foundation_columns', {
                title : 'Insert column',
                cmd : 'foundation_columns',
                image : url + '/foundation_columns.png'
            });

            ed.addCommand('foundation_columns', function() {
                var selected_text = ed.selection.getContent();
                    
                if(selected_text.length != 0) {

                    // prompt user for the infor for creating the fact box
                    var max = 12,
                    	small = prompt("The number of columns you want to use for this section on small devices (between 1 and 12). Empty equals no action for small devices."),
                        medium = prompt('The number of columns you want to use for this section on medium devices (between 1 and 12). Empty equals no action for medium devices.'),
                        large = prompt('The number of columns you want to use for this section on large devices (between 1 and 12). Empty equals no action for large devices.'),
                        return_text = '',
                        cols = '';

                    if(small && small >= max)
                    	small = max;
                    if(medium && medium >= max)
                    	medium = max;
                    if(large && large >= max)
                    	large = max;

                    if(small)
                    	cols += 'small-'+small+' ';
                    if(medium)
                    	cols += 'medium-'+medium+' ';
                    if(large)
                    	cols += 'large-'+large;

                    return_text = '[fc cols="'+cols+'"]' + selected_text + '[/fc]';
                    ed.execCommand('mceInsertContent', 0, return_text);
                }
                else {
                    alert('You need to select a section of text in order to create a column.')
                }
            });
        }
    }); 

    tinymce.PluginManager.add("foundation_columns", tinymce.plugins.foundation_columnsPlugin);

})();