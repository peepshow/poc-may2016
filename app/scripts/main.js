console.log('\'Allo \'Allo!');

var $gallery = $('.gallery').flickity({
  cellAlign: 'left',
  contain: true,
  prevNextButtons: true,
  pageDots: false,
});

$gallery.on( 'staticClick', function( event, pointer, cellElem, cellIndex ) {
  if ( cellIndex !== undefined ) {
    $gallery.flickity( 'select', cellIndex );
  }
});


// Config
var boxes     = document.querySelectorAll('.js-box'),
    box_count = boxes.length,
    perrywax  = document.querySelector('#perrywax'),
    box_id    = '#js-box';

// Global Controller
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 0,
    reverse: true,
        addIndicators: true
  }
});

// Pinned Scene. Totes optional
new ScrollMagic.Scene({
  triggerElement: perrywax,
  duration: '100%'
})
.setPin(perrywax)
.addTo(controller);

// Box Scenes
for (var i = 1, l = box_count; i <= l; i++) {
  new ScrollMagic.Scene({
    triggerElement: perrywax,
    triggerHook: 1,
    duration: '100%'
  })
  .setTween(box_id + i, 0.25, { y: '-300' * i + '%', ease: Linear.easeNone })
  .addTo(controller);
}

var $poster = $('.poster'),
  //$shine = $('.shine'),
  $layer = $('div[class*="layer-"]'),
  w = $(window).width(), //window width
  h = $(window).height(); //window height

$(window).on('mousemove', function(e) {
  var offsetX = 0.5 - e.pageX / w, //cursor position X
    offsetY = 0.5 - e.pageY / h, //cursor position Y
    dy = e.pageY - h / 2, //@h/2 = center of poster
    dx = e.pageX - w / 2, //@w/2 = center of poster
    theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
    angle = theta * 180 / Math.PI - 90, //convert rad in degrees
    offsetPoster = $poster.data('offset'),
    transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px)'; //poster transform

  //get angle between 0-360
  if (angle < 0) {
    angle = angle + 360;
  }

  //gradient angle and opacity
  //$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

  //poster transform
  //$poster.css('transform', transformPoster);

  //parallax foreach layer
  $layer.each(function() {
    var $this = $(this),
      offsetLayer = $this.data('offset') || 0,
      transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

    $this.css('transform', transformLayer);
  });

});
var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

  $('.bg').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});

moveBackground();
