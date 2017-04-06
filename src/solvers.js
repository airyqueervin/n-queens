/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var initialRow = Math.floor(Math.random()*(n));
  var initialColumn = Math.floor(Math.random()*(n));
  board.togglePiece(initialRow,initialColumn);
  for ( var row = 0; row < n; row ++ ) {
    for ( var col = 0; col < n; col++) {
      if ( row !== initialRow || col !== initialColumn ) {
        board.togglePiece(row, col);
      }
      if ( board.hasRowConflictAt(row) || board.hasColConflictAt(col) ) {
        board.togglePiece(row, col);
      }
    }
  }
  var solution = board.rows();
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var set = new Set();
  var board = new Board({n:n});
  var originalRow;
  var originalCol;

  var countRooks = function(row, col, bool) {
    if ( bool ) {
      set.add(board);
      board = new Board({n:n});
      return;
    }
    var flatMatrix = [].concat.apply([], board.rows());
    var start = row*n+col+1;
    while ( start < flatMatrix.length ) {
      var r = Math.floor(start/n);
      var c = start%n;
      board.togglePiece(r, c);
      if ( !board.hasRowConflictAt(r) && !board.hasColConflictAt(c)) {
        countRooks(Math.floor(r, c, false));
      }
      else {
        return;
      }
      start ++;
    }
    var start = 0;
    while ( start < originalRow*n+originalCol ) {
      var r = Math.floor(start/n);
      var c = start%n;
      board.togglePiece(r, c);
      if ( !board.hasRowConflictAt(r) && !board.hasColConflictAt(c)) {
        countRooks(Math.floor(r, c, false));
      }
      else {
        return;
      }
      start ++;
    }
    countRooks(originalRow, originalCol, true);
  };

  for (var r = 0; r < n; r++) {
    for ( var c = 0; c < n; c++) {
      originalRow = r;
      originalCol = c;
      debugger;
      countRooks(r,c, false);
    }
  }
  var solutionCount = set.size; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
