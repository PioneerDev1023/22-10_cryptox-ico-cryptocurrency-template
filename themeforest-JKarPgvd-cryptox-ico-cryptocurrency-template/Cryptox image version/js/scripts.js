/*------------------------------------------------------------------
Project:    Cryptox – ICO and Cryptocurrency Landing Page
Version:    1.0
Build Date:    11/02/19
Author: TheTheme99
This is a premium product available exclusively here : http://themeforest.net/user/thetheme99/portfolio

  TABLE OF CONTENTS
  1. Preloader
  2. Tabs handlers
  3. Timer function
  4. Menu
  5. Scroll animation
  6. Menu mobile
  7. Form handler
-------------------------------------------------------------------*/

$(function() {
    "use strict";
    // 1. Preloader
    var preload = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(function(){
            preload.className +=  ' fade';
            preload.style.display = 'none';
        },4000);
    });

    // 2. Tabs handlers
    $('.tab').on('click', function () {
        $('.tab, .panel').removeClass('active');
        $(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
    });
    // sale tabs
    $('.tab-sale').on('click', function () {
        $('.tab-sale, .panel-sale').removeClass('active');
        $(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
    });
    // faq tabs
    $('.tab-faq').on('click', function () {
        $('.tab-faq, .panel-faq').removeClass('active');
        $(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
    });

    // 3. Timer function
    function getTimeRemaining(endtime) {
        var t, seconds, minutes, hours, days;
        t = Date.parse(endtime) - Date.parse(new Date());
        seconds = Math.floor((t / 1000) % 60);
        minutes = Math.floor((t / 1000 / 60) % 60);
        hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline;
    deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
    initializeClock('clockdiv', deadline);
    // end timer function

    var iconContainer = document.getElementById('icon-container');
    iconContainer.addEventListener("click", scrollDown);
    function scrollDown() {
        $('#bottom-panel').addClass("hidden");
    }

    // 4. Menu
    jQuery(document).ready(function($) {
        var $window = $(window),
            $target = $("#main"),
            $h = $target.offset().top;
            $window.on('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop == 0) {
                $('#menu').removeClass("fixed-menu");
            }
            if (scrollTop > $h) {
                $('#bottom-panel').addClass("hidden");
            } else {
                $('#bottom-panel').removeClass("hidden");
            }
        });

    });

    var $window = $(window),
        lastScrollTop = 0;

    function onScroll (e) {
        var top = $window.scrollTop();
        if (lastScrollTop > top) {
            $('#menu').addClass("fixed-menu");
        } else if (lastScrollTop < top) {
            $('#menu').removeClass("fixed-menu");
        }
        lastScrollTop = top;
    }

    $window.on('scroll', onScroll);
    // end menu

    // 5. Scroll animation
    $(window).scroll(function() {
        $('.distrib h3').each(function () {
            var imagePos, topOfWindow;
            imagePos = $(this).offset().top;
            topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + $(window).innerHeight()) {
                $(this).addClass("animated fadeInUp");
                $('.line-animation').addClass("loaded");
            }
        });

        $('.distrib .status-separator').each(function () {
            var imagePos, topOfWindow;
            imagePos = $(this).offset().top;
            topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + $(window).innerHeight()) {
                $(this).addClass("animated fadeInUp");
                $('.distrib .number').addClass("animated fadeInUp");
                $('.distrib h5').addClass("animated fadeInUp");
            }
        });
    });

    setTimeout(function tick() {
        $('.header-left').addClass("animated fadeInUp");
        $('.ico-info').addClass("animated fadeInUp");
        $('.menu').addClass("animated fadeInDown");
    }, 1000);


    // 6. Menu mobile
    var toggled_bis = 0;
    $(".menu-toogle-open").on('click', function(e){
        $(".menu-toogle-open").toggleClass("toggled");
        $(".mobile-menu-container").toggleClass("hidden");
        if (toggled_bis === 0) {
            $('.menu-toogle-open .burgx3').stop().transition({
                rotate: "45"
            });
            $('.menu-toogle-open .burgx2').stop().transition({
                opacity: "0"
            }, "fast");
            $('.menu-toogle-open .burgx').stop().transition({
                rotate: "-45"
            });
            toggled_bis++;
        } else {
            $('.menu-toogle-open .burgx3').stop().transition({
                rotate: "+=135"
            });
            $('.menu-toogle-open .burgx2').transition({
                opacity: "1"
            }, "fast");
            $('.menu-toogle-open .burgx').stop().transition({
                rotate: "-=135"
            });
            toggled_bis--;
        }
    });

    // only for demo links
    $('.empty-links').on('click', function (e) {
        e.preventDefault();
    });

    // 7. Form handler
    $("#feedback").on('click', function() {
        $("#cForm").css("display", "block");
        var postname, textform, textarea;
        postname = $("#inputName").val();
        textform = $("#inputEmail").val();
        textarea = $("#textArea").val();
        $.ajax({
            type: "POST",
            url: "php/mail.php", //Attach send.php
            data: {
                "email": textform,
                "name": postname,
                "textarea": textarea
            },
            cache: false,
            success: function(response) {
                /* == Success text ==*/
                var messageResp, resultStat, oll;
                messageResp = "<p>Hello!<strong>";
                resultStat = "</strong> Your message was sent!</p>";
                oll = (messageResp + resultStat);
                if (response == 1) {
                    $("#inputEmail").css("border-bottom",
                        "1px solid #6e6868");
                    $("#loadBar").html(oll).fadeIn(4000); //Appearance of the error text
                    $("#inputEmail").val("");
                    $("#inputName").val("");
                    $("#textArea").val("");
                } else {
                    $("#loadBar").html(response).fadeIn(5000); //Appearance success text
                    $("#loadBar").html(response).fadeOut(5000);
                    $("#inputEmail").css("border-bottom",
                        "1px solid #f7153d");
                }
            }
        });
        return false;
    });

    var container = document.getElementById('main-container');
    container.style.display = 'block';
});


