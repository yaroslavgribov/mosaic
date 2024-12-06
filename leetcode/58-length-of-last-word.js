function lengthOfLastWord(s) {
  let split = s.split(' ').filter(w => Boolean(w.trim()))
  return split[split.length - 1].length
}

const cases = ["Hello World", "   fly me   to   the moon  ", "luffy is still joyboy"]
cases.forEach(s => 
  console.log(lengthOfLastWord(s))
)
