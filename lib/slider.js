var jQuery = jQuery || require('jquery'),
    Slides = require('./slides'),
    Mover = require('./mover'),
    $ = jQuery;

function log() { console.log.apply(console, arguments) }

module.exports = function Slider(el) {
  var mover, slides;
  var option = {
    auto: true,
    speed: 500,
    infinity: true,
    continuous: true
  }

  var slider = function () {
    mover = new Mover($(this).find('>.slides').get(0));
    slides = new Slides($(this).find('>.slides').get(0));
    mover.width(slides.width);

    slides.on('resize', function (width) {
      mover.width(width);
    })

    return this;
  }.call(el);

  /*
    Slide to the slide of the index
  */
  slider.to = function (slide, callback) {
    if (slide < 1) slide = 1;
    if (slide > slides.length) slide = slides.length;
    mover.animateLeft(slides.distance(slide), callback);
    // mover.speed(0).moveLeft(distance);
    slides.active(slide);
    return this;
  }

  slider.next = function () {
    return this.right(1);
  }

  slider.prev = function () {
    return this.left(1);
  }

  /*
    Move left by the amount of slides
    @arguments Number amount
  */
  slider.left = function (amount) {
    for (var i = 0; i < amount; i++) {
      slides.prepend(slides.pop());
    }

    mover.moveTo(-slides.distance(amount + 1));
    mover.animateTo(0)
    return this; 
  }

  /*
    Move right by the number of slides
    @arguments Number amount
  */
  slider.right = function (amount) {
    mover.animateTo(-slides.distance(amount + 1), function () {
      mover.moveTo(0);

      for (var i = 0; i < amount; i++) {
        slides.append(slides.shift());
      }
    })

    return this;
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
