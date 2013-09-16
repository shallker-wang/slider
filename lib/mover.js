module.exports = function Mover(el) {
  var speed = 500;

  var mover = function () {
    return this;
  }.call(el);

  mover.width = function (value) {
    $(this).width(value);
    return this;
  }

  mover.height = function (value) {
    $(this).height(value);
    return this;
  }

  mover.speed = function (milliseconds) {
    query = Object.create(query);
    query
    return Object.create(this).speed = milliseconds;
  }

  /*
    @arguments Pixels
  */
  mover.left = function (distance) {

  }

  mover.moveLeft = function (distance) {
    $(this).css('margin-left', -distance);
    return this;
  }

  mover.animateLeft = function (distance) {
    $(this).animate({marginLeft: -distance}, speed);
    return this;
  }

  mover.move = function () {
    var copy = Object.create(this);
    copy.speed = 0;
    return copy.move()
  }

  return mover;
}
