// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.stellar
//= require jquery.easing
//= require jquery.waypoints
//= require turbolinks
//= require jquery.validate
//= require jquery.validate.additional-methods
//= require bootstrap-sprockets
//= require_tree .

jQuery(document).ready(function ($) {
  $('.pageselectcolor').css('color', '#ffffff');
  $(".horizontal-form").validate();
//angularjs
  angular.module('Ideal_Poster', [])
    .controller('mainController', function($scope) {
  });
    //initialise Stellar.js
    $(window).stellar();

    //Cache some variables
    var links = $('.navigation').find('li');
    var links2 = $('.nav li').find('a');

    slide = $('.slide');
    mywindow = $(window);
    htmlbody = $('html,body');

    //Setup waypoints plugin
    me = $('.me');
    me.waypoint(function (direction){
      if (direction == 'down') {
        me.addClass('js-me-animate');
      } else {
        me.removeClass('js-me-animate');
      }
    }, { offset: '90%'});
    me = $('.me');
    me.waypoint(function (direction){
      if (direction == 'down') {
        me.removeClass('js-me-animate');
      }  else {
        me.addClass('js-me-animate');
      }
    }, { offset: '1%'});
    slide.waypoint(function (direction) {
      dataslide = $(this).attr('data-slide');
      if (direction === 'down') {
      $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');

      }
      else {
      $('.navigation li[data-slide="' + (dataslide-1) + '"]').addClass('active').next().removeClass('active');
      }
    });

    //waypoints doesnt detect the first slide when user scrolls back up to the top so we add this little bit of code, that removes the class
    //from navigation link slide 2 and adds it to navigation link slide 1.
    mywindow.scroll(function () {
      if (mywindow.scrollTop() == 0) {
        $('.navigation li[data-slide="1"]').addClass('active');
        $('.navigation li[data-slide="2"]').removeClass('active');
        $('.navigation li[data-slide="3"]').removeClass('active');
      }
    });
    mywindow.ready(function() {
      $('.slide')
          .scrollie({
            scrollOffset : -300,
            scrollingInView : function(elem) {
              var bgColor = elem.data('background');
              var navrightColor = elem.data('navright');
              var logobackgroundColor = elem.data('logobackground');
              var logoColor = elem.data('logo');
              var pageSelectColor = elem.data('pageselectcolor');
              var highlightLeftColor = elem.data('highlightleft');
              var highlightRightColor = elem.data('highlightright');


              $('body').css('background-color', bgColor);
              $('.nav-right i, .small-social-media a i').css('color', navrightColor);
              $('#sidebar li a#logo').css('background-color', logobackgroundColor);
              $('#sidebar li a#logo').css('color', logoColor);
              $('.pageselectcolor').css('color', pageSelectColor);

              $(".nav-right i, .small-social-media a i").mouseover(function(){
                $(this).css("color", highlightRightColor);
              });
              $(".nav-right i, .small-social-media a i").mouseout(function(){
                $(this).css("color", navrightColor);
              });
              $(".navigation li").mouseover(function(){
                $(this).css("color", highlightLeftColor);
              });
              $(".navigation li").mouseout(function(){
              //  if ( !($( this ).hasClass( "active" )) ) {
                  $(this).css("color", pageSelectColor);
                //} else {
                //  $(this).css("color", highlightLeftColor);
              //  }
              });
            }
          });
    });

    //Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
    //easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }

    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });
    links2.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });


});
