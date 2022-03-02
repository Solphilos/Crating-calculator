
 
document.getElementsByClassName("clicky").onclick = function() {clicky()}

   function clicky() {

      
    // obtains value of text fields and asigns them to textField1 and textField2  variables //
    let textField1 = document.getElementById("number-field").value; 
    let textField2 = document.getElementById("type-field").value;
    
if (textField2 === 'new') {

    switch (textField1) { 
      case '1':
       document.getElementById("result").innerHTML = '12x16';
       break;
      case '2':
       document.getElementById("result").innerHTML = '12x16';
        break;
      case '3':
       document.getElementById("result").innerHTML = '12x16';
        break;
        case '4':
         document.getElementById("result").innerHTML = '12x16';
          break;
        case '5':
         document.getElementById("result").innerHTML = '12x16';
          break;
        case '6':
         document.getElementById("result").innerHTML = '12x16';
          break;
        case '7':
         document.getElementById("result").innerHTML = '12x16';
          break;
        case '8':
         document.getElementById("result").innerHTML = '40x16';
          break;
        case '9':
         document.getElementById("result").innerHTML = '40x16';
          break;
        case '10':
         document.getElementById("result").innerHTML = '40x16';
          break;
       case '11':
         document.getElementById("result").innerHTML = '40x16';
          break;
        case '12':
         document.getElementById("result").innerHTML = '40x16';
         break;
          
   }
     
     
}
        else if (textField2 === 'old') {
          switch (textField1) { 
            case '1':
             document.getElementById("result").innerHTML = 'lkjlkfd';
             break;
            case '2':
             document.getElementById("result").innerHTML = '12x16';
              break;
            case '3':
             document.getElementById("result").innerHTML = '12x16';
              break;
              case '4':
               document.getElementById("result").innerHTML = '12x16';
                break;
              case '5':
               document.getElementById("result").innerHTML = '12x16';
                break;
              case '6':
               document.getElementById("result").innerHTML = '12x16';
                break;
              case '7':
               document.getElementById("result").innerHTML = '12x16';
                break;
              case '8':
               document.getElementById("result").innerHTML = '40x16';
                break;
              case '9':
               document.getElementById("result").innerHTML = '40x16';
                break;
              case '10':
               document.getElementById("result").innerHTML = '40x16';
                break;
             case '11':
               document.getElementById("result").innerHTML = '40x16';
                break;
              case '12':
               document.getElementById("result").innerHTML = '40x16';
               break;
         }
        }     
            


         }
      
   
   