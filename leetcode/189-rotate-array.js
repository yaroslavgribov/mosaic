function rotate(nums, k) {
  k =  k % nums.length;
  let temp = [];
  let len = nums.length - k;
 
  for (let i = len; i < nums.length; ++i) {
    temp.push(nums[i]);
  }

  for (let i = 0; i < len; ++i) {
    temp.push(nums[i]);
  }

  return temp
}

console.log(rotate([1,2,3,4,5,6,7], 3))
console.log(rotate([1,2,3,4], 2))
