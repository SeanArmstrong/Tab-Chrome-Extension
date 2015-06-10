// Incremented unique id to distinguish
// between widgets
var id = 0;

// Set up Gridster
$(function(){
    // Add gridster
    $(".gridster ul").gridster( {
        widget_margins: [5, 5],
        widget_base_dimensions: [70, 70],
        
        // Allow resizing
        resize: {
            enabled: true,
            // Once stopped save changes to permenant storage
            stop: function(e, ui, $widget) {
                saveGridChanges();
            }    
        },
        // Allow draggable only on custom class
        draggable: {
            handle: ".widget-draggable-element",
            ignore_dragging: function (event) {
                return true;
            },
            // On stopped save changes to permanent storage
            stop: function(event, ui){
               saveGridChanges(); 
            }
        },
        serialize_params: function ($w, wgd) {              

            return {
                /* add element ID to data*/
                id: $w.attr('id'),
        
                /* add feed link to data*/
                title: $w.attr('data-title'),
                description: $w.attr('data-description'),
                               
                // TODO CHANGE TO 'data-variable'
                feed: $w.attr('feed'),
                logo: $w.attr('logo'),
                due_date: $w.attr('due_date'),
                colour1: $w.attr('data-colour1'),
                colour2: $w.attr('data-colour2'),
                colour3: $w.attr('data-colour3'),
                
                /* add type to data */
                type: $w.attr('type'),
                
                /* defaults */
                col: wgd.col,
                row: wgd.row,
                size_x: wgd.size_x,
                size_y: wgd.size_y
            }
        }
    });
    
    // Load grid from storage
    chrome.storage.sync.get('layout', function (items){
        $.each(JSON.parse(items.layout), function() {
            switch(this.type){
                case "1":
                    gridster.add_widget(getNewFeedWidgetHTML(this.feed), this.size_x, this.size_y, this.col, this.row);
                    appendModalToFeedWidget(this.feed);
                    parseRSS(this.feed, '.gridster #' + this.id);
                    break;
                case "2":
                    gridster.add_widget(getNewLinkWidgetHTML(this.feed, this.logo), this.size_x, this.size_y, this.col, this.row);
                    appendModalToLinkWidget(this.feed, this.logo);
                    //colorWidget(this.id);
                    break;
                case "3":
                    gridster.add_widget(getNewDeadlineWidgetHTML(this.title, this.due_date, this.colour1, this.colour2), this.size_x, this.size_y, this.col, this.row);
                    appendModalToDeadlineWidget(this.title, this.due_date, this.colour1, this.colour2);
                    $('.gridster #' + id + ' .gs-resize-handle').addClass('deadline-widget-no-resize');
                    break;
            }
            id++;
        });
    });
    
    // Gridster variable
    gridster = $(".gridster ul").gridster().data('gridster');

    // Adding a new rss feed widget 
    $('.new-feed-widget').on('click', function(){
        addNewFeedWidget();
        saveGridChanges();
    });
    
    // Adding a link widget 
    $('.new-link-widget').on('click', function(){
        addNewLinkWidget();
        saveGridChanges();
    });
    
    // Adding a deadline widget 
    $('.new-deadline-widget').on('click', function(){
        addNewDeadlineWidget();
        saveGridChanges();
    });
    
    // Horrible race condition for retrieving images
    // and setting the widget colour using them
    setTimeout(function(){
        for(var i = 0; i < id; i++){
            var widget = $('.gridster #' + i);
            if(widget.attr('type') == "2"){
                colorWidget(i);
            }
        }
    }, 100);
    
    // Enable models on prelaoded widgets
    $('.modal-trigger').leanModal({
        dismissible: false,   
    });
    
});

// On document due to race condition
$(document).on('click', '.remove-widget', function(){
    // TODO Not susutainable
    $(this).parent().parent().parent().parent().addClass('active');
    gridster.remove_widget($('.active'));
    saveGridChanges();
});

function saveGridChanges() {
    data = JSON.stringify(gridster.serialize())
    
    // Check that there's some code there.
    if (!data) {
        message('Error: No data specified');
        return;
    }
    
    var jsonfile = {};
    jsonfile['layout'] = data
    
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set(jsonfile, function() {
        console.log('Layout saved');
    });
}


