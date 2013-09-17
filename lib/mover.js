var jQuery = jQuery || require('jquery'),
    eventy = require('eventy'),
    $ = jQuery;

module.exports = function Mover(el) {
  var speed = 500;

  var mover = function () {
    return this;
  }.call(Object.create(el));

  mover.width = function (value) {
    $(el).width(value);
    return this;
  }

  mover.height = function (value) {
    $(el).height(value);
    return this;
  }

  mover.speed = function (milliseconds) {
    query = Object.create(query);
    return Object.create(this).speed = milliseconds;
  }

  /*
    Return or set margin left of mover
  */
  mover.marginLeft = function (value) {
    if (value) return $(el).css('marginLeft', value);
    else return parseInt($(el).css('marginLeft').replace(/[^-\d\.]/g, ''));
  }

  mover.left = function (marginLeft) {
    $(el).css('margin-left', marginLeft);
    return this;
  }

  mover.animateLeft = function (marginLeft, callback) {
    $(el).stop(true).animate({marginLeft: marginLeft}, speed, callback);
    return this;
  }

  mover.moveLeft = function (distance) {
    $(el).css('margin-left', this.marginLeft() - distance);
    return this;
  }

  mover.moveRight = function (distance) {
    $(el).css('margin-left', this.marginLeft() + distance);
    return this;
  }

  mover.move = function () {
    var copy = Object.create(this);
    copy.speed = 0;
    return copy.move()
  }

  return mover;
}
