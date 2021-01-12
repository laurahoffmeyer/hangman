window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
          't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    var arrayOfWords;         // Array of topics
    var chosenCategory;     // Selected catagory
    var getHint ;          // Word getHint
    var word ;              // Selected word
    var guess ;             // guess
    var guesses = [];      // Stored guesses
    var lives ;             // Lives
    var counter ;           // Count correct guesses
    var space;              // Number of spaces in word '-'
  
    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hintBtn");
    var showHint = document.getElementById("hint");
  
  
  
    // create alphabet ul
    var buttons = function () {
    letterContainer = document.getElementById('letterContainer');
      letters = document.createElement('ul');
  
      for (var i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        check();
        letterContainer.appendChild(letters);
        letters.appendChild(list);
      }
    }
      
    
    // Select Catagory
    var selectCat = function () {
      if (chosenCategory === arrayOfWords[0]) {
        categoryName.innerHTML = "Category: Animals";
      } else if (chosenCategory === arrayOfWords[1]) {
        categoryName.innerHTML = "Category: Films";
      } else if (chosenCategory === arrayOfWords[2]) {
        categoryName.innerHTML = "Category: Cities";
      }
    }
  
    // Create guesses ul
     result = function () {
      wordContainer = document.getElementById('wordContainer');
      correct = document.createElement('ul');
  
      for (var i = 0; i < word.length; i++) {
        correct.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === "-") {
          guess.innerHTML = "-";
          space = 1;
        } else {
          guess.innerHTML = "_";
        }
  
        guesses.push(guess);
        wordContainer.appendChild(correct);
        correct.appendChild(guess);
      }
    }
    
    // Show lives
     comments = function () {
      showLives.innerHTML = "You have <b>" + lives + "</b> guess(es)";
      if (lives < 1) {
        showLives.innerHTML = "Game Over";
        letters.setAttribute("id", "disable");
      }
      for (var i = 0; i < guesses.length; i++) {
        if (counter + space === guesses.length) {
          showLives.innerHTML = "You Win!";
          letters.setAttribute("id", "disable");
        }
      }
    }
  
        // Animate man
    var animate = function () {
      var drawMe = lives ;
      drawArray[drawMe]();
    }
  
    
     // Hangman
    canvas = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.strokeStyle = "#18bc9c";
      context.lineWidth = 3;
    };
    
      head = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(170, 50, 25, 0, 2 * Math.PI);
        context.stroke();
      }
      
    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
      
      context.moveTo($pathFromx, $pathFromy);
      context.lineTo($pathTox, $pathToy);
      context.stroke(); 
  }
  
     frame1 = function() {
       draw (0, 248, 300, 248);
     };
     
     frame2 = function() {
       draw (10, 0, 10, 248);
     };
    
     frame3 = function() {
       draw (0, 5, 180, 5);
     };
    
     frame4 = function() {
       draw (170, 5, 170, 25);
     };
    
     torso = function() {
       draw (170, 75, 170, 160);
     };

     leftArm = function() {
      draw (170, 105, 115, 70);
    };
    
     rightArm = function() {
      draw (170, 105, 225, 70);
     };
    
     leftLeg = function() {
      draw (170, 160, 225, 195);
     };

     rightLeg = function() {
      draw (170, 160, 115, 195);
    };

        
    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1]; 
  
  
    // OnClick Function
     check = function () {
      list.onclick = function () {
        var guess = (this.innerHTML);
        this.setAttribute("class", "clicked");
        this.onclick = null;
        for (var i = 0; i < word.length; i++) {
          if (word[i] === guess) {
            guesses[i].innerHTML = guess;
            counter += 1;
          } 
        }
        var j = (word.indexOf(guess));
        if (j === -1) {
          lives -= 1;
          comments();
          animate();
        } else {
          comments();
        }
      }
    }
    
      
    // Play
    play = function () {
      arrayOfWords = [
          ["alpaca", "aardvark", "butterfly", "dragonfly", "penguin", "jellyfish", "labradoodle"],
          ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
          ["seattle","chicago","detroit", "milan", "amsterdam"]
      ];
  
      chosenCategory = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
      word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
      word = word.replace(/\s/g, "-");
      console.log(word);
      buttons();
  
      guesses = [ ];
      lives = 10;
      counter = 0;
      space = 0;
      result();
      comments();
      selectCat();
      canvas();
    }
  
    play();
    
    // Hint
  
      hintBtn.onclick = function() {
  
        hints = [
          ["Kind of like a llama", "Size of a small pig", "Use their feet to taste", "Some of the first winged insects to evolve", "Evolved to fly underwater", "Paralyze their prey before they eat them", "Make great family pets"],
          ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Animated Fish", "Giant great white shark"],
          ["The Emerald City", "The Windy City", "Everybody VS", "Has the most skyscrapers in Italy", "The city that stands on 11 million poles"]
      ];
  
      var catagoryIndex = arrayOfWords.indexOf(chosenCategory);
      var hintIndex = chosenCategory.indexOf(word);
      showHint.innerHTML = "Hint: " +  hints [catagoryIndex][hintIndex];
    };
  
     // Reset
    document.getElementById('reset').onclick = function() {
      correct.parentNode.removeChild(correct);
      letters.parentNode.removeChild(letters);
      showHint.innerHTML = "";
      context.clearRect(0, 0, 400, 400);
      play();
    }
  }
  
  
  