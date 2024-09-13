const arr_Grid = Array.from(document.querySelectorAll(".box1"));
   let help = 0;
   let count = 0;
   let newscore = 0;
   let do_double_counter = 0;
   const scoreDiv = document.createElement('div');
   scoreDiv.classList.add('scorediv');
    scoreDiv.innerText = `TOTAL SCORE - ${newscore}`;
    document.body.appendChild(scoreDiv);
   
   const helpDiv = document.createElement('div');
   helpDiv.classList.add('helpDiv');
   helpDiv.textContent = `Option ${help}`
   helpDiv.addEventListener("click", () => {
      if (help > 0) {
        uthanewalabox.innerText = "";
        uthanewalabox.innerText = gain_num();
        help--;
        helpDiv.innerText = `Option ${help}`;
      }
    });
   document.body.appendChild(helpDiv);
   
   
    
    function gain_num() {
      const num_pattern = [2,4,8,16,32,64,128,256,512,1024,2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,128,
    4,4,4,4,4,1024,4,4,4,4,4,
    8,8,8,8,8,8,8,8,8,8,
    8,8,8,8,8,8,8,8,8,8,
    16,16,16,16,16,32,32,32,64,64,];
      const index1 = Math.floor(Math.random() *num_pattern.length);
      return num_pattern[index1];
    }
    const uthanewalabox = document.querySelector(".box2");
    uthanewalabox.textContent = gain_num();
    let dragged;
    uthanewalabox.addEventListener("dragstart", (event) => {
        dragged = event.target;
        event.dataTransfer.setData("text/plain", dragged.textContent);
      });
      
      arr_Grid.forEach((box,index) => {
        box.addEventListener("dragover", (event) => {
          event.preventDefault();
          box.style.backgroundColor = "#212131"
          box.addEventListener("dragleave", (event) => {
            event.preventDefault();
            box.style.backgroundColor = ""; 
          });
        });
        
        box.addEventListener("drop", (event) => {
          event.preventDefault();
          if(box.textContent==""){
            const data = event.dataTransfer.getData("text/plain");
            box.textContent = data; 
            box.style.backgroundColor = ""; 
            uthanewalabox.textContent = gain_num();
            checkPattern(index);
          }
        box.style.backgroundColor = ""; 
        
      });
    });
    function checkPattern(i) {
      let do_double = false;
      if (i != 3 && i != 7 && i != 11) {
        if (arr_Grid[i + 1]?.textContent === arr_Grid[i].textContent) {
          arr_Grid[i + 1].textContent = "";
          count++;
          do_double_counter++;
          do_double = true;
        }
      }
      if (arr_Grid[i + 4]?.textContent === arr_Grid[i].textContent) {
        arr_Grid[i + 4].textContent = "";
        count++;
         do_double_counter++;
        do_double = true;
      }
      if (i != 4 && i != 8 && i != 12) {
        if (arr_Grid[i - 1]?.textContent === arr_Grid[i].textContent) {
          arr_Grid[i - 1].textContent = "";
          do_double = true;
          do_double_counter++;
          count++;
        }
      }
      if (arr_Grid[i - 4]?.textContent === arr_Grid[i].textContent) {
        arr_Grid[i - 4].textContent = "";
        do_double = true;
        count++;
        do_double_counter++;
      }
      if (do_double) {
        i_number = parseInt(arr_Grid[i].textContent);
        arr_Grid[i].textContent = i_number * 2;
        let score = (i_number * 2)*do_double_counter;
        newscore += score;
        scoreDiv.innerText = `TOTAL SCORE - ${newscore}`;
      }
      if (
        arr_Grid[i + 1]?.textContent === arr_Grid[i].textContent ||
        arr_Grid[i + 4]?.textContent === arr_Grid[i].textContent ||
        arr_Grid[i - 1]?.textContent === arr_Grid[i].textContent ||
        arr_Grid[i - 4]?.textContent === arr_Grid[i].textContent
      ) {
        checkPattern(i);
      }if (count >= 3) {
        help++;
        helpDiv.innerText = "Option:  " + help;
      }
      count = 0;
      do_double_counter = 0;
      if (check2048()) {
        if (i == 3 || i == 7 || i == 11) {
          arr_Grid[i].textContent = "";
          arr_Grid[i - 1].textContent = "";
          arr_Grid[i - 4].textContent = "";
          arr_Grid[i - 5].textContent = "";
          arr_Grid[i + 3].textContent = "";
          arr_Grid[i + 4].textContent = "";
        } else if (i == 4 || i == 8 || i == 12) {
          arr_Grid[i].textContent = "";
          arr_Grid[i - 3].textContent = "";
          arr_Grid[i - 4].textContent = "";
          arr_Grid[i + 1].textContent = "";
          arr_Grid[i + 4].textContent = "";
          arr_Grid[i + 5].textContent = "";
        } else {
          arr_Grid[i].textContent = "";
          arr_Grid[i - 1].textContent = "";
          arr_Grid[i - 3].textContent = "";
          arr_Grid[i - 4].textContent = "";
          arr_Grid[i - 5].textContent = "";
          arr_Grid[i + 1].textContent = "";
          arr_Grid[i + 3].textContent = "";
          arr_Grid[i + 4].textContent = "";
          arr_Grid[i + 5].textContent = "";
        }
      }
      if(gameover()){
        creatGameOverDiv();
      }
    }
    
      function creatGameOverDiv() {
        let GameOverDiv = document.createElement('div');
        GameOverDiv.classList.add('GameOverDiv')
        let gameOverText = document.createElement('p');
        gameOverText.textContent = "Game Over";
        gameOverText.classList.add('p')
        GameOverDiv.appendChild(gameOverText);
        let restartButton = document.createElement('button');
        restartButton.innerText = "Restart";
        
        restartButton.classList.add('restartButton')
        restartButton.addEventListener('click', function() {
        arr_Grid.forEach(box => {
            box.textContent = ""; 
            help=0;
            newscore = 0;
            scoreDiv.innerText = `TOTAL SCORE - ${newscore}`;
            helpDiv.innerText = `Option ${help}`;
            
          });
          GameOverDiv.style.display = "none";
        });
        
      GameOverDiv.appendChild(restartButton);
      document.body.appendChild(GameOverDiv);
      return GameOverDiv;
    } 
    function gameover() {
      for (let box of arr_Grid) {
        if (box.textContent === "") {
          return false;
        }
      }
      return true;
    }
    
    
    function check2048() {
  for (let box of arr_Grid) {
    if (box.textContent === "2048") {
      return true;
    }
  }
  return false;
}