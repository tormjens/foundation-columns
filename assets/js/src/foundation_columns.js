(function() {

    tinymce.create('tinymce.plugins.foundation_columnsPlugin', {
        init : function(ed, url) {

            ed.addButton('foundation_columns', {
                title   : 'Foundation Columns',
                cmd     : 'foundation_columns',
                icon    : 'zurb-icon',
                type    : 'menubutton',
                menu    : [
                {
                    text    : ed.getLang( 'foundation_columnsPlugin.columns', 'Columns' ),
                    onclick: function() {
                        ed.windowManager.open( {
                            title: ed.getLang( 'foundation_columnsPlugin.columnsTitle', 'Insert Columns' ),
                            body: [
                                {
                                    type: 'container',
                                    html: "<p>"+ ed.getLang( 'foundation_columnsPlugin.columnsIntro', 'For each device width, select the number of columns you want.' ) +"</p><p>"+ ed.getLang( 'foundation_columnsPlugin.columnsIntro2', "If you don't need one of the devices, leave it at 'No column'." ) +"</p>"
                                },
                                {
                                    type: 'listbox',
                                    name: 'small',
                                    label: ed.getLang( 'foundation_columnsPlugin.small', 'Small' ),
                                    'values': [
                                        {text: ed.getLang( 'foundation_columnsPlugin.noColumn', 'No Column' ), value: '0'},
                                        {text: '1 ' + ed.getLang( 'foundation_columnsPlugin.column', 'Column' ), value: '1'},
                                        {text: '2 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '2'},
                                        {text: '3 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '3'},
                                        {text: '4 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '4'},
                                        {text: '5 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '5'},
                                        {text: '6 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '6'},
                                        {text: '7 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '7'},
                                        {text: '8 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '8'},
                                        {text: '9 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '9'},
                                        {text: '10 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '10'},
                                        {text: '11 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '11'},
                                        {text: '12 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '12'}
                                    ]
                                },
                                {
                                    type: 'listbox',
                                    name: 'medium',
                                    label: ed.getLang( 'foundation_columnsPlugin.medium', 'Medium' ),
                                    'values': [
                                        {text: ed.getLang( 'foundation_columnsPlugin.noColumn', 'No Column' ), value: '0'},
                                        {text: '1 ' + ed.getLang( 'foundation_columnsPlugin.column', 'Column' ), value: '1'},
                                        {text: '2 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '2'},
                                        {text: '3 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '3'},
                                        {text: '4 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '4'},
                                        {text: '5 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '5'},
                                        {text: '6 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '6'},
                                        {text: '7 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '7'},
                                        {text: '8 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '8'},
                                        {text: '9 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '9'},
                                        {text: '10 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '10'},
                                        {text: '11 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '11'},
                                        {text: '12 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '12'}
                                    ]
                                },
                                {
                                    type: 'listbox',
                                    name: 'large',
                                    label: ed.getLang( 'foundation_columnsPlugin.large', 'Large' ),
                                    'values': [
                                        {text: ed.getLang( 'foundation_columnsPlugin.noColumn', 'No Column' ), value: '0'},
                                        {text: '1 ' + ed.getLang( 'foundation_columnsPlugin.column', 'Column' ), value: '1'},
                                        {text: '2 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '2'},
                                        {text: '3 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '3'},
                                        {text: '4 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '4'},
                                        {text: '5 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '5'},
                                        {text: '6 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '6'},
                                        {text: '7 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '7'},
                                        {text: '8 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '8'},
                                        {text: '9 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '9'},
                                        {text: '10 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '10'},
                                        {text: '11 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '11'},
                                        {text: '12 ' + ed.getLang( 'foundation_columnsPlugin.olumns', 'Columns' ), value: '12'}
                                    ]
                                }
                            ],
                            onsubmit: function( e ) {

                                var grid = [],
                                    selected_text = ed.selection.getContent();;

                                if(e.data.small && e.data.small !== '0')
                                    grid.push('small-' + e.data.small);

                                if(e.data.medium && e.data.medium !== '0')
                                    grid.push('medium-' + e.data.medium);

                                if(e.data.large && e.data.large !== '0')
                                    grid.push('large-' + e.data.large);

                                var cols = grid.join(' ');

                                ed.insertContent( '[fc cols="'+ cols +'"]' + selected_text + '[/fc]' );
                            }
                        });
                    }
                },
                {
                    text    : ed.getLang( 'foundation_columnsPlugin.grid', 'Block Grid' ),
                    onclick: function() {
                        ed.windowManager.open( {
                            title: ed.getLang( 'foundation_columnsPlugin.gridTitle', 'Insert Block Grid' ),
                            body: [
                                {
                                    type: 'container',
                                    html: '<p>'+ ed.getLang( 'foundation_columnsPlugin.gridInto', 'For each device width, enter the number of items you want per row.' ) +'</p>'
                                },
                                {
                                    type: 'textbox',
                                    name: 'small',
                                    label: ed.getLang( 'foundation_columnsPlugin.small', 'Small' ),
                                    value: '0'
                                },
                                {
                                    type: 'textbox',
                                    name: 'medium',
                                    label: ed.getLang( 'foundation_columnsPlugin.medium', 'Medium' ),
                                    value: '0'
                                },
                                {
                                    type: 'textbox',
                                    name: 'large',
                                    label: ed.getLang( 'foundation_columnsPlugin.large', 'Large' ),
                                    value: '0'
                                },
                                
                            ],
                            onsubmit: function( e ) {
                                
                                var grid = [],
                                    selected_text = ed.selection.getContent();;

                                if( e.data.small && e.data.small !== '0' && isNaN(e.data.sall) )
                                    grid.push('small-block-grid-' + e.data.small);

                                if( e.data.medium && e.data.medium !== '0' && isNaN(e.data.sall) )
                                    grid.push('medium-block-grid-' + e.data.medium);

                                if( e.data.large && e.data.large !== '0' && isNaN(e.data.sall) )
                                    grid.push('large-block-grid-' + e.data.large);

                                var cols = grid.join(' ');

                                ed.insertContent( '[fc grid="'+ cols +'"]'+ "\n\t" +'[fc_item]'+ selected_text + '[/fc_item]'+ "\n" +'[/fc]' );

                            }
                        });
                    }
                }
                ]
            });

        }
    }); 

    tinymce.PluginManager.add("foundation_columns", tinymce.plugins.foundation_columnsPlugin);

})();