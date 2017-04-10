var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      let productsICanEat = products.filter((pizza) => !pizza.containsNuts &&
                             !_(pizza.ingredients).any((ingredient) => ingredient === 'mushrooms'))

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    let sum = _.union(_.range(0, 1000, 3), _.range(0, 1000, 5)).reduce((sum, x) => sum + x)

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    _(products)
      .chain()
      .map((pizza) => pizza.ingredients)
      .flatten()
      .each(function (ingredient) {
        ingredientCount[ingredient] =
        ingredientCount[ingredient] ?
        ingredientCount[ingredient] + 1 : 1
      })
      .value()

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  function getPrimeFactorArray(number) {
    let arr = [], primeFactor = 1
    while (number > 1)
    {
      primeFactor++
      while(number % primeFactor == 0)
      {
        arr.push(primeFactor)
        number = number / primeFactor
      }
    }
    return arr
  }

  it('should return an array containing the prime factors', function () {

    expect(getPrimeFactorArray(56)).toEqual([2, 2, 2, 7])
  })

  it("should find the largest prime factor of a composite number", function () {
    expect(_.max(getPrimeFactorArray(56))).toBe(7)
  });

  function isPalindrome(num)
  {
    num = String(num)
    for(let i = 0; i < num.length / 2; i++)
      if(num[i] != num[num.length - 1 - i])
        return false
    return true
  }

  it('should return true if number is a palindrome, false otherwise', function () {
    expect(isPalindrome(123)).toBe(false)
    expect(isPalindrome(121)).toBe(true)
    expect(isPalindrome(11)).toBe(true)
    expect(isPalindrome(1)).toBe(true)
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    let palindrome,
        palindromes = []

    for(let i = 999; i > 100; i--)
    {
      if(i * 999 < (palindrome = _.max(palindromes)))
        break
      for(let j = 999; j > 100; j--)
        if(isPalindrome(i * j))
          palindromes.push(i * j)
    }

    expect(palindrome).toBe(906609)
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    let primeCount = {}, currentPrimeCount

    for(let i = 2; i <= 20; i++)
      for(let p in (currentPrimeCount = _.groupBy(getPrimeFactorArray(i), (num) => num)))
      {
        if(!currentPrimeCount.hasOwnProperty(p))
          continue
        primeCount[p] = !primeCount[p] ||
                        primeCount[p] < currentPrimeCount[p].length ?
                        currentPrimeCount[p].length :
                        primeCount[p]
      }

    let lcm = 1
    for(let prime in primeCount)
      lcm *= primeCount.hasOwnProperty(prime) ? Math.pow(prime, primeCount[prime]) : 1

      expect(lcm).toBe(232792560)
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function add(sum, num) { return sum + num }

    let n = 5,
        range = _.range(1, n + 1),
        sumOfSquares = range.map((num) => num * num).reduce(add),
        squareOfSums = Math.pow(range.reduce(add), 2)

    expect(sumOfSquares - squareOfSums).toBe(55 - 225)

  });

  it("should find the 10001st prime", function () {
    let primeSearch = new Array(105000),
        currPrime = 2,
        primeCount = 1

    while(primeCount < 10001)
    {
      for(let index = currPrime; index < primeSearch.length; index += currPrime)
        primeSearch[index] = true // true denotes a composite number

      while(primeSearch[++currPrime]); // get to next prime

      primeCount++
    }

    expect(currPrime).toBe(104743)
  });
});
