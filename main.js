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

///////////////// Calculator Logic Module //////////////////////////////////////////////////////////////////////////////////////

/* this will be the logic for calculating the dimensions and materials of crates 
   based on amount of boxes. When user inputs number of boxes + box type, return width, length and height
   and amount of wood used.  */


  
  const newBox = {
    width: 6, 
    height: 5,
  }
  const oldBox = {
    width: 11, 
    height: 4.25,
  }
  let newBoxSpread;
  let oldBoxSpread;
  let combinedSpread;
  let skidHeight;
  let newAmount;
  let oldAmount;
  let newRowsHigh;
  let oldRowsHigh;
  let skidWidth;
  let length;
  let pallets;
  let twoByFour;
  let plywood;
 
  
  
  
  addNewBoxes = (amount) => {                // returns width of specified number of new boxes when placed side by side. 
    newAmount = amount;
    newBoxSpread = newBox.width * amount;
    return {
      newBoxSpread,
    }
  }
  
  addOldBoxes = (amount) => {                // returns width of specified number of old boxes when placed side by side. 
    oldAmount = amount;
    oldBoxSpread = oldBox.width * amount;
    return {
     oldBoxSpread,
    }
  }
  
  boxCombinator = (amountNew, amountOld) => {   // returns the combined width of specified number of old and new boxes. 
    addNewBoxes(amountNew);
    addOldBoxes(amountOld);
    combinedSpread = newBoxSpread + oldBoxSpread;
    
    return {
      combinedSpread,
    }
  }
  
  
  getSkidSize = () => {                       // using the combined width of boxes, returns all crate dimensions and relates specs. 
    if (combinedSpread > 40 && combinedSpread < 217) {
      skidWidth = '40x16';
      findCrateHeight(combinedSpread, 40);
      getWoodAmount();
      popResults(skidWidth, skidHeight + 8, '16\'', twoByFour, '2 sheets', 1, 3); // placeholder specs. Make a function to calculate wood.
         
    } 
    
    else if (combinedSpread > 0 && combinedSpread <= 24) {
      skidWidth = '12x16';
      findCrateHeight(combinedSpread, 12);
      getWoodAmount();
      popResults(skidWidth, skidHeight + 8, '16\'', twoByFour, 0, 1, 0); 
    }
    
    else if (combinedSpread > 24 && combinedSpread < 40) {
      skidWidth = '18X16';
      findCrateHeight(combinedSpread, 18); 
      getWoodAmount();
      popResults(skidWidth, skidHeight + 8, '16\'', twoByFour, 0, 1, 0);
    }

    else if (combinedSpread > 234 || oldBoxSpread > 198) {  // 216 is the max number for new boxes, 198 is max for old. 234 max for mixed.
      //startNewSkid()
      console.log('too much!')
    }
  }
    

  startNewSkid = () => {
    if (skidHeight > 38) {
      let remainder = combinedSpread - 216;
      combinedSpread = remainder;
      getSkidSize();
    }
  }
  
  findCrateHeight = (amount, crateWidth) => {        // returns number of vertical rows of boxes, old and new. 
    rowsHigh = amount / crateWidth;                  // the total width of all boxes divided by max width of skid returns the number of vertical rows. 
    let x = Math.ceil(rowsHigh);                     // there can be no partial rows, so round the returned number to the next highest interger. 
    skidHeight = x * 5;                              // multiply the rounded number by height of the box to get height. Wood height to be added later.
                                                       
  }

  getWoodAmount = () => {
    let sideBoards;
    // if skidWidth = '40x'16  return amount of wood. 59 foot baseline amount 2x4 for 40x16. add ply and side boards, which will vary.
    if (skidWidth === '40x16') {
      sideBoards = skidHeight * 8 / 12;
      twoByFour = sideBoards + 59;
    }
    else if (skidWidth === '18x16') {
      sideBoards = (skidHeight + 3) * 6 / 12;  
      twoByFour = sideBoards + 50;
    }

    else if (skidWidth === '12x16') {
      sideBoards = (skidHeight + 3) * 6 / 12;
      twoByFour = sideBoards + 44;
    }
  }


   
// include module that controls box type / gate arm length. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// populates the "results" table with calculated results.
popResults = (width, height, length, boards, ply, crate_num, pallets) => {
  document.getElementById("width").innerHTML = width;     
  document.getElementById("height").innerHTML = height;
  document.getElementById("length").innerHTML = length;    
  document.getElementById("2x4").innerHTML = boards;
  document.getElementById("ply").innerHTML = ply;
  document.getElementById("amount").innerHTML = crate_num;
  document.getElementById("pallets").innerHTML = pallets;
}



makeResetButton = (() => {
 document.querySelector('.reset').addEventListener('click', function() { 
    resetValues.reset()
    document.querySelector('input[name="new"]').value = '';
    document.querySelector('input[name="old"]').value = '';
  });
})();


/* make this a module. Refactor all code below to be more concise.
   Also build logic to calculate crate dimensions and material for every 
   additional box added to crate. */
   
function submitInput() {
  let newBoxes = document.getElementById("new").value;       // gets value of text fields and asigns them to newBoxes and oldBoxes variables //
  let oldBoxes = document.getElementById("old").value;
  //let select = document.getElementById('crate_type');         gets the value for crate types 
  //let minimal = select.options[select.selectedIndex].value;
  tabNav.turnpageResults();
  boxCombinator(newBoxes, oldBoxes);    // this logs the width of boxes laid flat, side by side and the type of crate they would go on
  getSkidSize()
 



 
  


   
}


resetValues.reset()


