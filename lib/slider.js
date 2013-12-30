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

    slides.on('resize', function () {
      mover.width(slides.getWidth());
    });

    return this;
  }.call(el);

  slider.auto = function (yes) {
    option.auto = yes;

    return this;
  }

  slider.continuous = function (yes) {
    option.continuous = yes;

    return this;
  }

  slider.infinity = function (yes) {
    option.infinity = yes;

    return this;
  }

  slider.speed = function (milliseconds) {
    option.speed = milliseconds;

    return this;
  }

  /*
    Slide to the slide of the index
  */
  slider.to = function (slide) {
    var elSlides = slides.getSlides();

    if (slide < 1) {
      slide = 1
    };

    if (slide > elSlides.length) {
      slide = slides.getSlides().length
    };

    if (slide < slides.first().slide) {
      return this.left(elSlides.length - slides.index(slide));
    } else {
      return this.right(slides.index(slide));
    }

    // mover.animateLeft(slides.distance(slide), callback);
    // mover.speed(0).moveLeft(distance);
    // slides.active(slide);
    // return this.right(slides.index(slide));
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

    console.log('amount', amount);
    console.log('slides.widths(amount)', slides.widths(amount))
    mover.left(-slides.widths(amount));
    mover.animateLeft(0);

    return this; 
  }

  /*
    Move right by the number of slides
    @arguments Number amount
  */
  slider.right = function (amount) {
    mover.animateLeft(-slides.widths(amount), function () {
      mover.left(0);

      for (var i = 0; i < amount; i++) {
        slides.append(slides.shift());
      }
    });

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
