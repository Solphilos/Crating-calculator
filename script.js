
 
document.getElementsByClassName("clicky").onclick = function() {clicky()}

   function clicky() {

      
    // obtains value of text fields and asigns them to Field1 and Field2  variables //
    let newBoxes = document.getElementById("new").value; 
    let oldBoxes = document.getElementById("old").value;
   
   
    
 
  switch (newBoxes) { 
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
          break;
    }
            
    switch (oldBoxes) {
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
          break;
}

    switch (newBoxes && oldBoxes) {
      
    }

         }
      
   
   