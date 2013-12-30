var ResizeListener = require('resize-listener');
var jQuery = jQuery || require('jquery');
var eventy = require('eventy');
var $ = jQuery;

/*
  @arguments HTMLElement el
*/
module.exports = Slides;

function Slides(el) {
  var thisSlides = eventy(this);

  this.el = el;
  this.direction = 'horizontal'; // or 'vertical'
  this.checkingInterval = 100;
  this.width = this.getWidth();
  this.height = this.getHeight();

  var totalWidth = 0;
  var totalHeight = 0;

  (function checkingSlidesSize () {
    var slides = thisSlides.getSlides();
    var currentTotalWidth = 0;
    var currentTotalHeight = 0;

    for (var i = 0; i < slides.length; i++) {
      currentTotalWidth += $(slides[i]).width();
      currentTotalHeight += $(slides[i]).height();
    }

    if (totalWidth !== currentTotalWidth) {
      thisSlides.trigger('resize');
    }

    if (totalHeight !== currentTotalHeight) {
      thisSlides.trigger('resize');
    }

    totalWidth = currentTotalWidth;
    totalHeight = currentTotalHeight;

    setTimeout(checkingSlidesSize, thisSlides.checkingInterval);
  })();
}

Slides.prototype.getSlides = function () {
  var slides = [];

  $(this.el).children().each(function (i, item) {
    item.slide = i + 1;
    slides.push(item);
  });

  return slides;
}

Slides.prototype.getSlide = function (index) {
  var slides = this.getSlides();

  if (index >= slides.length) {
    return null;
  }

  return slides[index];
}

Slides.prototype.current = 1;

Slides.prototype.item = function (index) {
  return this.getSlides(index);
}

Slides.prototype.getWidth = function () {
  var slides = this.getSlides();

  if (this.direction === 'vertical') {
    return $(slides[0]).width();
  }

  return $(slides[0]).width() * slides.length;
}


Slides.prototype.getHeight = function () {
  var slides = this.getSlides();

  if (this.direction === 'horizontal') {
    return $(slides[0]).height();
  }

  return $(slides[0].height()) * slides.length;
}

Slides.prototype.each = function (callback) {
  var slides = this.getSlides();

  for (var i = 0; i < slides.length; i++) {
    callback.call(slides[i], slides[i], i);
  }

  return this;
}

Slides.prototype.slide = function (position) {
  return this.item(position - 1);
}

Slides.prototype.direction = function (value) {
  this.direction = value;

  return this;
}

Slides.prototype.first = function () {
  return this.getSlides()[0];
}

Slides.prototype.last = function () {
  var slides = this.getSlides();

  return slides[slides.length - 1];
}

Slides.prototype.shift = function (number) {
  var slides = this.getSlides();

  if (slides.length <= 0) {
    return;
  }

  return this.el.removeChild(slides.shift());
}

Slides.prototype.pop = function (number) {
  var slides = this.getSlides();

  if (this.length <= 0) {
    return;
  }

  return this.el.removeChild(slides.pop());
}

Slides.prototype.append = function (element) {
  var slides = this.getSlides();

  slides.push(this.el.appendChild(element));

  return this;
}

Slides.prototype.prepend = function (element) {
  var slides = this.getSlides();

  slides.unshift(this.el.insertBefore(element, this.first()));

  return this;
}

Slides.prototype.widths = function (amount) {
  var slides = this.getSlides();

  return this.getWidth() / slides.length * amount;
}

Slides.prototype.heights = function (amount) {
  var slides = this.getSlides();

  return this.getHeight() / slides.length * amount;
}

Slides.prototype.distance = function (slide) {
  return this.widths(this.index(slide));
}

/*
  Return current index in the slides list
  @arguments Number slide
*/
Slides.prototype.index = function (slide) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].slide === slide) return i;
  }

  return 0;
}

Slides.prototype.position = function (slide) {
  return this.index(slide) + 1;
}

Slides.prototype.active = function (slide) {
  var slides = this.getSlides();

  slides.forEach(function (slide, i) {
    $(slide).removeClass('active');
  });

  $(this.slide(slide)).addClass('active');
  this.current = slide;

  return this;
}
