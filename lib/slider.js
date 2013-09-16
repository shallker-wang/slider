var jQuery = jQuery || require('jquery'),
    Slides = require('./slides'),
    Mover = require('./mover'),
    $ = jQuery;

function log() { console.log.apply(console, arguments) }

module.exports = function Slider(el) {
  var mover, slides;
  var option = {
    auto: true,
    continuous: true,
    speed: 500
  }

  var slider = function () {
    mover = new Mover($(this).find('>.inner').first());
    slides = new Slides($(this).find('>.inner >.slide').get());
    mover.width(slides.width);

    slides.on('resize', function (width) {
      mover.width(width);
      console.log('resize', width)
    })

    return this;
  }.call(el);

  /*
    Slide to the slide of the index
  */
  slider.to = function (slide) {
    if (slide < 1) slide = 1;
    if (slide > slides.length) slide = slides.length;
    mover.animateLeft(slides.distance(slide));
    // mover.speed(0).moveLeft(distance);
    slides.active(slide);
    return this;
  }

  slider.next = function () {
    return this.to(slides.current + 1);
  }

  slider.prev = function () {
    return this.to(slides.current - 1);
  }

  /*
    Move left by the amount of slides
    @arguments Number amount
  */
  slider.left = function (amount) {
    return this.to(slides.current - amount);    
  }

  /*
    Move right by the number of slides
    @arguments Number amount
  */
  slider.right = function (amount) {
    return this.to(slides.current + amount);
  }

  slider.start = function () {
    return this.to(1);
  }

  slider.end = function () {
    return this.to(slides.length);
  }

  /*
    Show the slide directly without effect
    @arguments Number index
  */
  slider.jump = function (slide) {
    // mover.speed(0).moveLeft(distance);
    // var self = Object.create(this);
    // self.marginLeft = cssMarginLeft;
    // return self.to(slide);
  }

  return slider;
}
