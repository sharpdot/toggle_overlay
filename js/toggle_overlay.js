(function($){

    $(document).ready(function(){
        initOverlayToggle();
    });

    function initOverlayToggle(){
        var $account = $('li.account strong');

        //User must be logged in to see the overlay
        if ( $account.length == 0 ) {
            return;
        }

        $.getJSON('/toggle_overlays',function(data) {
            var path = window.location.pathname.substr(1);
            var img = '';

            for (var key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }

                var obj = data[key];
                if (obj['rel_path'] == path) {
                    img = obj['overlay'];
                }
            }

            if (img == '') {
                return;
            }

            var toggleDiv       = '<div id="page-overlay" style="background-image: url(\'' + img + '\');"><!-- x --></div>',
                toggleBtn       = '<p id="overlay-toggle-btn"><a href="#" class="btn btn-main">Toggle Overlay</a><a href="#" class="btn btn-extra btn-new-window"><i class="fa fa-external-link" title="open in new window"></i></a></p>',
                $pageWrapper    = $('#page-wrapper'),
                $pageOverlay    = $('#page-overlay'),
                $editTabs       = $('.block-workbench,section > .tabs'),
                $alertBar       = $('.alert-block');

            $pageWrapper.prepend(toggleDiv);
            $pageWrapper.prepend(toggleBtn);

            $('#overlay-toggle-btn .btn-main').click(function(event){
                if($('#page-overlay').hasClass('active')){
                    $('#page-overlay').removeClass('active');
                    $editTabs.removeClass('hide');
                    $alertBar.removeClass('hide');
                    $('#overlay-toggle-btn').removeClass('active');
                }else{
                    $('#page-overlay').addClass('active');
                    $editTabs.addClass('hide');
                    $alertBar.addClass('hide');
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
