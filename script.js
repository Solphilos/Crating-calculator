
document.getElementsByClassName("clicky").onclick = function() {clicky()}

   function clicky() {
      
      let answer = prompt('How many boxes?');
   
      switch (answer) { 
        case '1':
          alert('crate size: 12x16  (wood used: 40\' of 2x4\'s)')
          break;
        case '2':
          alert('12x16')
          break;
        case '3':
          alert('12x16')
          break;
          case '4':
            alert('12x16')
            break;
          case '5':
            alert('18x16')
            break;
          case '6':
            alert('18x16')
            break;
          case '7':
            alert('18x16')
            break;
          case '8':
            alert('18x16')
            break;
          case '9':
            alert('40x16')
            break;
          case '10':
            alert('40x16')
            break;
         case '11':
            alert('40x16')
            break;
          case '12':
            alert('40x16')
            break;
        }
      }
   