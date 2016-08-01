(function($){

    $(document).ready(function(){
        initOverlayToggle();
    });

    function initOverlayToggle(){
        $.getJSON('/toggle_overlays.json',function(data) {
            var path = window.location.pathname.substr(1);
            var img = '';
            var offset = 0;

            for (var key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }

                var obj = data[key];
                if (obj['rel_path'] == path) {
                    img = obj['overlay'];
                    if ( !isNaN( obj['offset'] ) ) {
                      offset = obj['offset'];
                    }
                }
            }

            if (img == '') {
                return;
            }

            var toggleDiv       = '<div style="position:relative"><div id="page-overlay" style="background-image: url(\'' + img + '\'); background-position: center ' + offset + 'px;"><!-- x --></div></div>',
                toggleBtn       = '<p id="overlay-toggle-btn"><a href="#" class="btn btn-main">Toggle Overlay</a><a href="#" class="btn btn-extra btn-new-window"><i class="fa fa-external-link" title="open in new window"></i></a></p>',
                $pageWrapper    = $('body'),
                $pageOverlay    = $('#page-overlay'),
                $editTabs       = $('.block-workbench,section > .tabs'),
                $alertBar       = $('.alert-block');
                $msgBar         = $('.messages');

            $pageWrapper.prepend(toggleDiv);
            $pageWrapper.prepend(toggleBtn);

            $('#overlay-toggle-btn .btn-main').click(function(event){
                if($('#page-overlay').hasClass('active')){
                    $('#page-overlay').removeClass('active');
                    $editTabs.removeClass('hide');
                    $alertBar.removeClass('hide');
                    $msgBar.removeClass('hide');
                    $('#overlay-toggle-btn').removeClass('active');
                }else{
                    $('#page-overlay').addClass('active');
                    $editTabs.addClass('hide');
                    $alertBar.addClass('hide');
                    $msgBar.addClass('hide');
                    $('#overlay-toggle-btn').addClass('active');
                }
                event.preventDefault();
            });

            $('#overlay-toggle-btn .btn-new-window').click(function(event){
                var imgUrl = $('#page-overlay').css('background-image').slice(5, -2);
                console.log('img url ', imgUrl);
                window.open(imgUrl, '_blank');
                event.preventDefault();
            });
        });
    }



})(jQuery);
