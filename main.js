function Game() {
  this.grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  this.init();
}

Game.prototype.init = function() {
  this.setRandom2();
  this.setRandom2();
  this.render();
  this.move();
};

Game.prototype.setRandom2 = function() {
  var i, j;

  do {
    i = Math.floor(Math.random() * 4);
    j = Math.floor(Math.random() * 4);
  } while (this.grid[i][j] != 0);
  this.grid[i][j] = Math.random() < 0.9 ? 2 : 4;
};

Game.prototype.render = function() {
  var cell = document.getElementsByClassName("cell");
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var tile = cell[i * 4 + j];
      this.grid[i][j] != 0
        ? (tile.innerHTML = this.grid[i][j])
        : (tile.innerHTML = "");
      tile.className = "cell cell-" + this.grid[i][j];
    }
  }
};

/* moves by direction */
Game.prototype.moveLeft = function() {
  var canMove = false;
  for (var i = 0; i < 4; i++) {
    var temp = this.grid[i].filter(function(val) {
      return val != 0;
    });
    for (var j = 0; j < temp.length - 1; j++) {
      if (temp[j] == temp[j + 1]) {
        temp.splice(j + 1, 1);
        temp[j] *= 2;
      }
    }
    while (temp.length < 4) {
      temp.push(0);
    }
    if (JSON.stringify(this.grid[i]) != JSON.stringify(temp)) {
      canMove = true;
      this.grid[i] = temp;
    }
  }
  return canMove;
};

Game.prototype.moveUp = function() {
  var canMove = false;
  var gridTranspose = transpose(this.grid);
  for (var i = 0; i < 4; i++) {
    var temp = gridTranspose[i].filter(function(val) {
      return val != 0;
    });
    for (var j = 0; j < temp.length - 1; j++) {
      if (temp[j] == temp[j + 1]) {
        temp.splice(j + 1, 1);
        temp[j] *= 2;
      }
    }
    while (temp.length < 4) {
      temp.push(0);
    }
    if (JSON.stringify(gridTranspose[i]) != JSON.stringify(temp)) {
      canMove = true;
      gridTranspose[i] = temp;
    }
  }
  this.grid = transpose(gridTranspose);
  return canMove;
};

Game.prototype.moveRight = function() {
  var canMove = false;
  for (var i = 0; i < 4; i++) {
    var temp = this.grid[i].filter(function(val) {
      return val != 0;
    });
    for (var j = temp.length - 1; j > 0; j--) {
      if (temp[j] == temp[j - 1]) {
        temp.splice(j, 1);
        temp[j - 1] *= 2;
      }
    }
    while (temp.length < 4) {
      temp.unshift(0);
    }
    if (JSON.stringify(this.grid[i]) != JSON.stringify(temp)) {
      canMove = true;
      this.grid[i] = temp;
    }
  }
  return canMove;
};

Game.prototype.moveDown = function() {
  var canMove = false;
  var gridTranspose = transpose(this.grid);
  for (var i = 0; i < 4; i++) {
    var temp = gridTranspose[i].filter(function(val) {
      return val != 0;
    });
    for (var j = temp.length - 1; j > 0; j--) {
      if (temp[j] == temp[j - 1]) {
        temp.splice(j, 1);
        temp[j - 1] *= 2;
      }
    }
    while (temp.length < 4) {
      temp.unshift(0);
    }
    if (JSON.stringify(gridTranspose[i]) != JSON.stringify(temp)) {
      canMove = true;
      gridTranspose[i] = temp;
    }
  }
  this.grid = transpose(gridTranspose);
  return canMove;
};

/* put all the moves in eventlistener */
Game.prototype.move = function() {
  var self = this;
  document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 37:
        if (self.moveLeft() == true) self.setRandom2();
        self.render();
        break;
      case 38:
        if (self.moveUp() == true) self.setRandom2();
        self.render();
        break;
      case 39:
        if (self.moveRight() == true) self.setRandom2();
        self.render();
        break;
      case 40:
        if (self.moveDown() == true) self.setRandom2();
        self.render();
        break;
    }
  });
};

function transpose(array) {
  return array[0].map((col, i) => array.map(row => row[i]));
}

window.onload = function() {
  var game = new Game();
  var test = [1, 2, 3, 4];
  var test2 = [1, 2, 3, 4];
  console.log(JSON.stringify(test) == JSON.stringify(test2));
};
