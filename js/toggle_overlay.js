(function($){

    $(document).ready(function(){
        initOverlayToggle();
    });

    function initOverlayToggle(){
        if ( !location.hostname.match('local') && !location.hostname.match('sharpd') ) {
            if ( location.hostname.match('bbox') ) {
                var $account = $('li.account strong');
                if ( $account.length == 0 ) {
                    return;
                }
                if ( $account.text() != 'admin' ) {
                    return;
                }
            } else {
                return;
            }
        }
        var toggleDiv       = '<div id="page-overlay"><!-- x --></div>',
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

    }



})(jQuery);
