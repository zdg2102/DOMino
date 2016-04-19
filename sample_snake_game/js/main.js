var Board = require("./board");
var SnakeView = require("./snake-view");

$d(function () {
  var $gameFigure = $d("figure");
	var board = new Board();
	var view = new SnakeView(board, $gameFigure);
});
