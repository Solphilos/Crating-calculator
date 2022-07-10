// tab navigation control 
tabNav = (() => {
  const input1 = document.getElementById('input1');
  const input2 = document.getElementById('input2');
  const homepage = document.getElementById('homepage');
  const totalsWindow = document.getElementById('totals_window');
  const unboxed = document.querySelector('.unboxed');
  const boxed = document.querySelector('.boxed');
  const home = document.querySelector('.home');
  const totals = document.querySelector('.totals');
  

  // sets properties that allow tabs to display or close windows
  setDisplay = (element1, element2, element3, element4) => {        
    element1.style.display = "none";  
    element2.style.display = "none";
    element3.style.display = "none";
    element4.style.display = "flex";         
  }

  
  // sets and removes id names for tabs, rendering them active or inactive 
  setAndRemove = (ele1, ele2, ele3, ele4) => {   
    let id1 = ele1.className; 
    let id2 = ele2.className; 
    let id3 = ele3.className;
    let id4 = ele4.className;
    ele1.removeAttribute('id', id1);
    ele2.removeAttribute('id', id2);
    ele3.removeAttribute('id', id3)
    ele4.setAttribute('id', id4);
  }
  
  // "unboxed" tab
  turnPage = () => {
    setDisplay(input1, homepage, totalsWindow, input2)
    setAndRemove(boxed, home, totals, unboxed)
  }
  
  // "boxed" tab
  turnPage2 = () => {
    setDisplay(input2, homepage, totalsWindow, input1)
    setAndRemove(unboxed, home, totals, boxed)
  }
  // "home" tab
  turnpageHome = () => {
    setDisplay(input2, input1, totalsWindow, homepage)
    setAndRemove(unboxed, boxed, totals, home)
  }
  
  // "results" tab
  turnpageResults = () => {
    setDisplay(input2, input1, homepage, totalsWindow)
    setAndRemove(unboxed, boxed, home, totals)
  }


  return {
    turnPage,
    turnPage2,
    turnpageHome,
    turnpageResults,
  }

})();

// sets table results to zero as default. Also returns all caculated values back to zero.
resetValues = (() => {
  function reset() {
    document.getElementById("height").innerHTML =  '0';
    document.getElementById("width").innerHTML =  '0';
    document.getElementById("length").innerHTML = '0';
    document.getElementById("2x4").innerHTML =  '0';
    document.getElementById("ply").innerHTML = '0';
    document.getElementById("pallets").innerHTML = '0';
    document.getElementById("amount").innerHTML = '0';
  }

  return {
    reset,
  }

})();

// creates click events that allow tab/window navigation.
addListeners = (() => {
  document.querySelector('.unboxed').addEventListener('click', tabNav.turnPage);
  document.querySelector('.boxed').addEventListener('click', tabNav.turnPage2);
  document.querySelector('.home').addEventListener('click', tabNav.turnpageHome);
  document.querySelector('.totals').addEventListener('click', tabNav.turnpageResults)
})();

// populates the "results" table with calculated results.
popResults = (length, width, height, boards, ply, crate_num) => {
  document.getElementById("length").innerHTML = length;    
  document.getElementById("width").innerHTML = width;     
  document.getElementById("height").innerHTML = height;
  document.getElementById("2x4").innerHTML = boards;
  document.getElementById("ply").innerHTML = ply;
  document.getElementById("amount").innerHTML = crate_num;
}



makeResetButton = (() => {
 document.querySelector('.reset').addEventListener('click', function() { 
    resetValues.reset()
    document.querySelector('input[name="new"]').value = '';
    document.querySelector('input[name="old"]').value = '';
  });
})();


// make this a module. Refactor all code below to be more concise.  
function clicky() {
  let newBoxes = document.getElementById("new").value;       // gets value of text fields and asigns them to newBoxes and oldBoxes variables //
  let oldBoxes = document.getElementById("old").value;
  let select = document.getElementById('crate_type');
  let minimal = select.options[select.selectedIndex].value;
  tabNav.turnpageResults();
 
   
  if (newBoxes && oldBoxes) {
    // takes the value of both text fields and concatenates them as as string. example: 11 would mean 1 new, 1 old.  1112 would be 11 new, 12 old.
    let reference = newBoxes + oldBoxes;

    switch (reference) {
      case '1': 
        popResults(16, 12, 15, 42, 0, 1);
        break;
      case '2':
        popResults(16, 12, 15, 42, 0, 1);
        break;
      case '3':
        popResults(16, 12, 18, 42, 0, 1);
        break;
      case '4':
        popResults(16, 12, 15, 42, 0, 1);
        break;
      case '5':
        popResults(16, 12, 15, 42, 0, 1);
        break;
      case '6':
        popResults(16, 12, 15, 42, 0, 1);
        break; 
    }
  }


  // to make things more elegant, make a default crate size where needed instead of repeating, then make indiviual parameters for differences in wood amount.
  // use boolean values to reduce repetition. example: if boxes <= a certain number, return the shared value

  else if (newBoxes && minimal === 'Fully enclosed') {
   switch (newBoxes) {        // try boolean values: i. e, if user inputs value >= a specific number, return appropriate values
     case '1': 
       popResults(16, 12, 15, 42, 0, 1);
       break;
     case '2':
       popResults(16, 12, 15, 42, 0, 1);
       break;
     case '3':
       popResults(16, 12, 18, 42, 0, 1);
       break;
     case '4':
       popResults(16, 12, 15, 42, 0, 1);
       break;
     case '5':
       popResults(16, 12, 15, 42, 0, 1);
       break;
     case '6':
       popResults(16, 12, 15, 42, 0, 1);
       break; 
    }
  }
 
  else if (oldBoxes) {
   switch (oldBoxes) {      
     case '1': 
       popResults(16, 12, 15, 42, 0, 1);
       break;
     case '2':
       popResults(16, 12, 15, 42, 0, 1);
       break;
     case '3':
       popResults(16, 12, 18, 42, 0, 1);
       break;
     case '4':
       popResults(16, 12, 15, 42, 0, 1);
       break;
     case '5':
       popResults(16, 12, 15, 42, 0, 1);
       break;
     case '6':
       popResults(16, 12, 15, 42, 0, 1);
       break; 
    }

  }  


   
}


resetValues.reset()
