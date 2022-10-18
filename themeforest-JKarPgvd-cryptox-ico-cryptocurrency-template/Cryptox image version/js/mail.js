/*------------------------------------------------------------------
Project:    Cryptox – ICO and Cryptocurrency Landing Page
Version:    1.0
Build Date:    11/02/19
Author: TheTheme99
This is a premium product available exclusively here : http://themeforest.net/user/thetheme99/portfolio
-------------------------------------------------------------------*/
'use strict';
$('#cForm1').submit(function(e) { //Click send
    e.preventDefault();
    var postdata = $('#cForm1').serialize();
    $.ajax({
        type: 'POST',
        url: 'php/subscribe.php', //Attach subscribe.php
        data: postdata,
        dataType: 'json',
        success: function(json) {
            if(json.valid == 0) {
                $('#success-message').hide();
                $('#error-message').hide();
                $('#error-message').html(json.message);
                $('#error-message').fadeIn('fast');
            }
            else {
                $('#error-message').hide();
                $('#success-message').hide();
                $('#cForm1').hide();
                $('#success-message').html(json.message);
                $('#success-message').fadeIn('fast', function(){
                    $('.top-content').backstretch("resize");
                });
            }
        }
    });
	return false;
});