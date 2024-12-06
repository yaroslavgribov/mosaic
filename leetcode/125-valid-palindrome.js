var isPalindrome = function(s) {
  const normalized = s.replace(/[^a-zA-Z0-9]/gi, '').toLowerCase()
  const reverse = normalized.split('').reverse().join('')

  return normalized === reverse
};

const cases = ["A man, a plan, a canal: Panama", "race a car", " "]
cases.forEach(c => console.log(isPalindrome(c)))
