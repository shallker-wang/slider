var jQuery = jQuery || require('jquery'),
    eventy = require('eventy'),
    $ = jQuery;

/*
  @arguments Array els
*/
module.exports = function Slides(els) {
  var direction = 'horizontal'; // or 'vertical'
  var checkingInterval = 100;

  var slides = function () {
    if (!this.item) this.item = function (index) {return this[index];}

    return this;
  }.call(eventy(els));

  slides.current = 1;

  slides.width = (function () {
    if (direction === 'vertical') return $(slides[0]).width();
    else return $(slides[0]).width() * slides.length;
  })();

  slides.height = (function () {
    if (direction === 'horizontal') return $(slides[0]).height();
    else return $(slides[0].height()) * slides.length;
  })();

  (function setSlidesSize() {
    var width = 0;
    var height = 0;

    for (var i = 0; i < slides.length; i++) {
      width += $(slides.item(i)).width();
      height += $(slides.item(i)).height();
    }

    if (direction === 'horizontal') {
      width = $(slides.item(0)).width() * slides.length;
      height = $(slides.item(0)).height();
    } else {
      width = $(slides.item(0)).width();
      height = $(slides.item(0)).height() * slides.length;      
    }

    if (slides.width !== width || slides.height !== height) {
      slides.width = width;
      slides.height = height;
      slides.trigger('resize', width, height);
    }

    setTimeout(setSlidesSize, checkingInterval);
  })();

  slides.each = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback.call(this[i], this[i], i);
    }

    return this;
  }

  slides.slide = function (position) {
    return slides.item(position - 1);
  }

  slides.direction = function (value) {
    direction = value;
    return this;
  }

  slides.first = function () {
    return this.item(0);
  }

  slides.last = function () {
    return this.item(this.length - 1);
  }

  slides.parent = function () {
    return this.first().parentNode;
  }

  slides.shift = function (number) {
    if (this.length <= 0) return;
    return this.removeChild(this.first());
  }

  slides.pop = function (number) {
    if (this.length <= 0) return;
    return this.removeChild(this.last());
  }

  slides.append = function (element) {
    // return this.parent().insertBefore(element, this.last().nextSibling)
    return this.parent().appendChild(element);
  }

  slides.prepend = function (element) {
    return this.parent().insertBefore(element, this.first());
  }

  slides.distance = function (slide) {
    return (this.width / this.length) * (slide - 1)
  }

  slides.active = function (slide) {
    this.each(function (slide, index) {
      $(slide).removeClass('active');
    });

    $(this.slide(slide)).addClass('active');
    this.current = slide;
    return this;
  }

  return slides;
}
