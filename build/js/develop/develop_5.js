function googleMap(mapWrap) {
    var cordX=56.071444;
    var cordY=37.925901;
    var googleText = "тут";
    style = [{
    "featureType": "all",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "gamma": 0.5
    }]
},
            {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }]
    
  if(document.getElementById('mapInit')){
      function initialize() {
          var myLatlng = new google.maps.LatLng(cordX, cordY);
          var myOptions = {
              scrollwheel: false,
              zoom: 16,
              center: myLatlng,
              disableDefaultUI: true, //без управляющих елементов
              mapTypeId: google.maps.MapTypeId.ROADMAP, // SATELLITE - снимки со спутника,
              styles: style,
              zoomControlOptions: {
                  position: google.maps.ControlPosition.LEFT_BOTTOM // позиция слева внизу для упр елементов
              }
          }
          var map = new google.maps.Map(document.getElementById(mapWrap), myOptions);
          
          var contentString = '<div class="marker-test">'+googleText+'</div>';
          var infowindow = new google.maps.InfoWindow({
              content: contentString
          });


          /*маркер на svg*/
          var SQUARE_PIN = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z'
          //больше - http://map-icons.com/
          /*/маркер на svg*/
          
          /*var srcImg = ($(window).width() > 666) ? 'images/marker.png' : 'images/marker-min.png';*/
          var srcImg = 'images/marker-min.png';
          var firstCor = 0;
          var secondCor = 0;
/*            if($(window).width() < 666) {
              firstCor = -30;
              secondCor = -60;
          }
          else{
              firstCor = -25;
              secondCor = -50;
          }*/
          //параметры маркера  
          var image = {
            url: srcImg,
            size: new google.maps.Size(61,82),
            origin: new google.maps.Point(0, 0),
            //anchor: new google.maps.Point(firstCor, secondCor)
          };
          
          var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              animation: google.maps.Animation.DROP, // анимация при загрузке карты
              icon: image, //  иконка картинкой
/*                icon: {                               //маркер на svg
                  path: SQUARE_PIN,
                  fillColor: '#fff',
                  fillOpacity: 0.7,
                  strokeColor: '#FF3232',
                  strokeWeight: 5
              },*/
          });
/*            map.setOptions({draggable: false}); //возможность перетаскивать карту*/
          /*анимация при клике на маркер*/
          marker.addListener('click', toggleBounce);
          function toggleBounce() {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          }
          /*/анимация при клике на маркер*/

          /*По клику открываеться инфоблок*/
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
          });
      }
      initialize();
      $(window).resize(function(){
          initialize();
      })
  }
}
function goTo(){
    if($(window).width() > 480){
        $('.nav-menu a').click(function(e){
            e.preventDefault();
            var href = $(this).attr('href');
            var target = $(href).offset().top -143;
            $(scroller).animate({scrollTop:target},500);
        });
    }
    if($(window).width() <= 480){
         $('.nav-menu a').click(function(e){
            e.preventDefault();
            var href = $(this).attr('href');
            var target = $(href).offset().top - 70;
            $(scroller).animate({scrollTop:target},500);
        });
    }
    if($(window).height() > 768){
        $('.button').click(function(e){
                e.preventDefault();
                var href = $(this).attr('href');
                var target = $(href).offset().top - 100;
                $(scroller).animate({scrollTop:target},500);
        });
    }
    if($(window).height() <= 768 && $(window).height() > 480){
        $('.button').click(function(e){
                e.preventDefault();
                var href = $(this).attr('href');
                var target = $(href).offset().top - 50;
                $(scroller).animate({scrollTop:target},500);
        });
    }
    if($(window).height() <= 480){
        $('.button').click(function(e){
                e.preventDefault();
                var href = $(this).attr('href');
                var target = $(href).offset().top + 150;
                $(scroller).animate({scrollTop:target},500);
        });
    }
}
function menuOpener(){
    $(".sircles-and-lines").on("click", function(){
        mobileMenuHeight();
        $(".nav-menu-mobile").fadeToggle();
        event.stopPropagation();
    })
    
    $(document).on("click", function(event){
        if($(event.target).closest(".nav-menu-mobile").length) return;
        $(".nav-menu-mobile").fadeOut();
        event.stopPropagation();
    })
    
}
function mobileMenuClose(){
    $(".nav-menu li").on("click", function(){
        $(".nav-menu-mobile").fadeOut();
    });
    $(".close-button").on("click",function(){
        $(".nav-menu-mobile").fadeOut();
    });
}

function mobileMenuHeight(){
    var windowHeight = $(window).height();
    $(".nav-menu-mobile").css("height",windowHeight);
}
$(document).ready(function(){
    if($(document).find("#mapInit")) {googleMap('mapInit');}
    goTo();
    mobileMenuClose();
    mobileMenuHeight();
    menuOpener();
    $('.slider-wrap').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
});

$(window).load(function(){

});

$(window).resize(function(){

});