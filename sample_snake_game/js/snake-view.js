var Board = require('./board');

// up is 38
// right is 39
// left is 37
// down is 40
var SNAKE_ONE_CODE = {
  38: "N",
  39: "E",
  37: "W",
  40: "S"
};

// W is 87
// D is 68
// S is 83
// A is 65
var SNAKE_TWO_CODE = {
  87: "N",
  68: "E",
  65: "W",
  83: "S"
};

var SnakeView = function (board, $gameFigure) {
  this.board = board;
  this.$gameFigure = $gameFigure;
  this.setUpBoard();
  this.render();
  this.bindKeys();

  this.intervalHandler = setInterval(this.step.bind(this), 75);
};

SnakeView.prototype.bindKeys = function () {
  $d("body").on('keydown', this.handleKeyEvent.bind(this));
};

SnakeView.prototype.handleKeyEvent = function (e) {
  if (SNAKE_ONE_CODE[e.keyCode]) {
    this.board.snakeOne.turn(SNAKE_ONE_CODE[e.keyCode]);
  }
  if (SNAKE_TWO_CODE[e.keyCode]) {
    this.board.snakeTwo.turn(SNAKE_TWO_CODE[e.keyCode]);
  }
  // 32 is keycode for spacebar
  if (this.board.isGameOver() && e.keyCode == 32) {
    this.resetGame();
  }
};

SnakeView.prototype.resetGame = function () {
  this.$gameFigure.find('.restart-modal').remove();
  this.board = new Board();
  this.render();

  this.intervalHandler = setInterval(this.step.bind(this), 75);
};

SnakeView.prototype.step = function () {
  this.board.step();
  if (this.board.isGameOver()) {
    window.clearInterval(this.intervalHandler);
    this.renderDeath();
  }
  this.render();
};

SnakeView.prototype.setUpBoard = function () {
  var numSquares = this.board.height * this.board.width;
  this.$gameFigure.append("<ul></ul>");
  var $gameUl = this.$gameFigure.find("ul");
  $gameUl.addClass('group');
  for (var i = 0; i < numSquares; i++) {
    $gameUl.append("<li id='id" + i + "'></li>");
  }
};

SnakeView.prototype.render = function () {
  this.$gameFigure.find('li').removeClass();
  for (var i = 0; i < this.board.snakeOne.segments.length; i++) {
    var snakeOneId = this.posToId(this.board.snakeOne.segments[i]);
    var $snakeOneSquare = $d("#id" + snakeOneId);
    $snakeOneSquare.addClass('snake-one-square');
  }

  for (i = 0; i < this.board.snakeTwo.segments.length; i++) {
    var snakeTwoId = this.posToId(this.board.snakeTwo.segments[i]);
    var $snakeTwoSquare = $d("#id" + snakeTwoId);
    $snakeTwoSquare.addClass('snake-two-square');
  }

  if (this.board.apple) {
    var appleId = this.posToId(this.board.apple);
    var $appleSquare = $d('#id' + appleId);
    $appleSquare.addClass('apple-square');
  }
  if (this.board.isGameOver()) {
    this.$gameFigure.append('<div class="restart-modal"></div>');
  }
};

SnakeView.prototype.renderDeath = function () {
  // use timeout to allow one additional frame for modal to be
  // rendered
  setTimeout(function () {
    $modal = this.$gameFigure.find('.restart-modal');
    $modal.append('<p class="restart-text">You died<br>' +
      'Press space to play again</p>');
  }.bind(this), 75);
};

SnakeView.prototype.posToId = function (pos) {
  // converts from grid position to the id number of the
  // corresponding "li" element in the view
  return pos[0] * this.board.height + pos[1];
};

module.exports = SnakeView;
