function majorityElement(nums) {
    let candidate;
    let count = 0;
    
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += num === candidate ? 1 : -1
    }

    // Moore's Voting Algo only works in case the candidate actually takes the majority of the input
    // and it breaks in case it doesnt, consider [1,2,3,4,4,4,2]
    count = 0
    for (const num of nums) {
      if (num === candidate) {
        ++count
      }
    }

    
    return count > nums.length / 2 ? candidate : -1;
};
