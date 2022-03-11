
 
document.getElementsByClassName("clicky").onclick = function() {clicky()}

   function clicky() {

      
    // obtains value of text fields and asigns them to newBoxes and oldBoxes variables //
    let newBoxes = document.getElementById("new").value; 
    let oldBoxes = document.getElementById("old").value;
   
   // if both box types are entered return appropriate values 
  
 if (newBoxes && oldBoxes) {
// takes the value of both text fields and concatenates them as as string. example: 11 would mean 1 new, 1 old.  1112 would be 11 new, 12 old.
  let reference = newBoxes + oldBoxes;

  switch (reference) {
     case '11':
      document.getElementById("result").innerHTML = 'combo test 1';
      break;
      // this would mean 1 new box, 2 old
      case '12': 
      document.getElementById("result").innerHTML = 'combo test 2';
      break;
      case '21':
      document.getElementById("result").innerHTML = 'combo test 3'
      break;






  }
    }

    

   // if only new boxes are entered return appropriate values

else if (newBoxes) {
  switch (newBoxes) {        // try boolean values: i. e, if user inputs value >= a specific number, return appropriate values
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
          document.getElementById("result").innerHTML ='12x16';
          break; }
  
}
    
// if only old boxes are entered return appropriate values

  else if (oldBoxes) {
            
    switch (oldBoxes) {
      case '1':
       document.getElementById("result").innerHTML = '12x16-old';
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
          document.getElementById("result").innerHTML ='12x16';
          break;
        default: }
}
   

      
    }

  

         
      
   
   