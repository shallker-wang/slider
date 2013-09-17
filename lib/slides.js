var jQuery = jQuery || require('jquery'),
    eventy = require('eventy'),
    $ = jQuery;

/*
  @arguments HTMLElement el
*/
module.exports = function Slides(el) {
  var direction = 'horizontal'; // or 'vertical'
  var checkingInterval = 100;

  var els = (function () {
    var els = [];

    $(el).children().each(function (index, item) {
      item.slide = index + 1;
      els.push(item);
    })

    return els;
  })();

  var slides = function () {
    return this;
  }.call(eventy(Object.create(els)));

  slides.current = 1;

  slides.item = function (index) {
    return els[index];
  }

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
    return this.slide(1);
  }

  slides.last = function () {
    return this.slide(this.length);
  }

  slides.parent = function () {
    return this.first().parentNode;
  }

  slides.shift = function (number) {
    if (this.length <= 0) return;
    return this.parent().removeChild(els.shift());
  }

  slides.pop = function (number) {
    if (this.length <= 0) return;
    return this.parent().removeChild(els.pop());
  }

  slides.append = function (element) {
    // return this.parent().insertBefore(element, this.last().nextSibling)
    els.push(this.parent().appendChild(element));
    return this;
  }

  slides.prepend = function (element) {
    els.unshift(this.parent().insertBefore(element, this.first()));
    return this;
  }

  slides.widths = function (amount) {
    return this.width / this.length * amount;
  }

  slides.heights = function (amount) {
    return this.height / this.length * amount;
  }

  slides.distance = function (slide) {
    return this.widths(this.index(slide));
  }

  /*
    Return current index in the slides list
    @arguments Number slide
  */
  slides.index = function (slide) {
    for (var i = 0; i < this.length; i++) {
      if (this[i].slide === slide) return i;
    }

    return 0;
  }

  slides.position = function (slide) {
    return this.index(slide) + 1;
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
