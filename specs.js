import { findLongestWordLength } from './main.js'

describe('Find the Longest Word in a String:', function () {
  it('Treba da nadje najduzu rec.', function () {
    const rezultat = findLongestWordLength('The quick brown fox jumped over the lazy dog')
    expect(rezultat).toBe(6)
  })

  it('Treba da nadje najduzu rec.', function () {
    const rezultat = findLongestWordLength('What is the average airspeed velocity of an unladen swallow')
    expect(rezultat).toBe(8)
  })

  it('Treba da nadje najduzu rec.', function () {
    const rezultat = findLongestWordLength('What if we try a super-long word such as otorhinolaryngology')
    expect(rezultat).toBe(19)
  })
})
