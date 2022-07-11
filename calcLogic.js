/* this will be the logic for calculating the dimensions and materials of crates 
   based on additional boxes added */


// new boxes are 6" wide.   
const newBox = 6; 
let width;

/* returns the width of X amount of new boxes added side by side. 
   make a function that stacks boxes vertically once they pass a limit width. Return limit width, this will be crate width. */

function addNewBoxes(amount) {
  width = newBox * amount;
    return {
       width,
    }
    // if width is greater or lesser than X, set a default crate width. (40x16, 12x16, 18x18, etc.)
    
}
   
function findCrateWidth() {
    if (width > 24 && width < 54) {    // 18" skid, 5 new boxes min, 9 max.  
      return 18
    }
    else if (width > 54 && width < 216) {   // 40" skid, 10 new box min, 36 max
      return 40
    }
}
   
   console.log(addNewBoxes(5))    // returns 30
   console.log(findCrateWidth()) // returns 40
   