/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  if (s2.length >= s1.length) {
    const perms = new Map();

    for (const p of s1) {
      perms.set(p, (perms.get(p) ?? 0) + 1);
    }

    let checking = new Map(perms);
    let i = 0;
  
    while (i < s2.length) {
      let j = i
      
      while (j < i + s1.length) {
        if (s2[j]) {
          const current = s2[j]
          if (checking.has(current)) {
            
            checking.set(current, checking.get(current) - 1);
  
            if (checking.get(current) === 0) {
              checking.delete(current);
  
              if (checking.size === 0) {
                return true;
              }
            }
          } else {
            checking = new Map(perms)
          }
          
          j++
        } else { 
          return false
        }
      }

      i++
    }
  }

  return false;
};
