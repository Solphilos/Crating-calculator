newBoxCalc = (() => {
 
    const newBox = {
      width: 6, 
      height: 5,
    }
    const oldbox = {
      width: 11, 
      height: 5,
    }
    let width;
    let height;
    let boxAmount;
    let rowsHigh;
    let skidWidth;
  
  
    /* returns the width of X amount of new boxes added side by side. 
    make a function that stacks boxes vertically once they pass a limit width. Return limit width, this will be crate width. */
  
    addNew = (amount, boxType) => {
      boxAmount = amount;
      width = boxType.width * amount;
      return {
        width,
      }
   
    } 
  
   
    getDimNew = (boxType) => {
      if (width > 24 && width <= 54) {    
        skidWidth = 18;
        findCrateHeight(3, boxType) 
        popResults(skidWidth, height)
        
      }
      else if (width > 54 && width <= 216) {   
        skidWidth = 40;
        findCrateHeight(6, boxType)
        popResults(skidWidth, height)
      }
      else if (width > 0 && width <= 24) {
        skidWidth = 12;
        findCrateHeight(2, boxType)
        popResults(skidWidth, height)
      }
    }
  
    getDimOld = (boxType) => {
      if (width > 33 && width <= 198) {   // 40" skid, 10 new box min, 36 max
        skidWidth = 40;
        findCrateHeight(3, boxType)
        popResults(skidWidth, height)
      }
      else if (width > 0 && width <= 33) {
        skidWidth = 12;
        findCrateHeight(1, boxType)
        popResults(skidWidth, height)
      }
    }
  
  
    findCrateHeight = (boxPerRow, boxType) => {        
      rowsHigh = boxAmount / boxPerRow;
      let x = Math.round(rowsHigh);
      height = x * boxType.height;
    }
  
    retrieveNewValues = (amount) => {
      addNew(amount, newBox)
      getDimNew(newBox)
    }
  
    retrieveOldValues = (amount) => {
      addNew(amount, oldbox)
      getDimOld(oldbox)
    }
  
  
  })();