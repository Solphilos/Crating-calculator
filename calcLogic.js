/* this will be the logic for calculating the dimensions and materials of crates 
   based on amount of boxes. When user inputs number of boxes + box type, return width, length and height
   and amount of wood used.  */


// dimensions of new boxes.  
const newBox = {
    width: 6, 
    height: 5,
}
let width;
let height;
let boxAmount;
let rowsHigh;
let skidWidth;

/* returns the width of X amount of new boxes added side by side. 
   make a function that stacks boxes vertically once they pass a limit width. Return limit width, this will be crate width. */

addNewBoxes = (amount) => {
  boxAmount = amount;
  width = newBox.width * amount;
    return {
       width,
    }
    // if width is greater or lesser than X, set a default crate width. (40x16, 12x16, 18x18, etc.)
    
}
   
returnDimensions = () => {
    if (width > 24 && width <= 54) {    // 18" skid, 5 new boxes min, 9 max.  
        skidWidth = 18;
        findCrateHeight(3) 
        console.log(skidWidth)
        console.log(height)
    }
    else if (width > 54 && width <= 216) {   // 40" skid, 10 new box min, 36 max
        skidWidth = 40;
        findCrateHeight(6)
        console.log(skidWidth)
        console.log(height)
    }
    else if (width > 0 && width <= 24) {
        skidWidth = 12;
        findCrateHeight(2)
        console.log(skidWidth)
        console.log(height)
    }
}

/* takes the total amount of new boxes and divides them by the number of maximum boxes per row(boxPerRow).
   This returns the number of z axis rows(rowsHigh), multiplying them by the height of an individual box. */
findCrateHeight = (boxPerRow) => {        
    rowsHigh = boxAmount / boxPerRow;
    let x = Math.round(rowsHigh);
    height = x * newBox.height;
    
}
   
addNewBoxes(5)  
returnDimensions()   // returns skid width, plus height of boxes stacked on top of one another. Does not yet include wood, so not actual skid height yet. 

// include module that controls box type / gate arm length. 