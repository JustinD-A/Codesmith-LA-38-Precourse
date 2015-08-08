describe('isNumber', function() {
  it('should return true for numbers', function() {
    expect(isNumber(0)).to.be(true);
    expect(isNumber(-1)).to.be(true);
    expect(isNumber(1)).to.be(true);
  });

  it('should return false for everything', function() {
    expect(isNumber({})).to.be(false);
    expect(isNumber([])).to.be(false);
    expect(isNumber('a')).to.be(false);
    expect(isNumber(true)).to.be(false);
  });
});

describe('isArray', function() {
  it('should return true for array', function() {
    expect(isArray([])).to.be(true);
    expect(isArray([1])).to.be(true);
  });

  it('should return false for everything', function() {
    expect(isArray({})).to.be(false);
    expect(isArray('a')).to.be(false);
    expect(isArray(1)).to.be(false);
    expect(isArray(true)).to.be(false);
  });
});

describe('clone', function() {
  it('should return shallow copy of object', function() {
    var users = [{ 'user': 'barney' },{ 'user': 'fred' }];
    var shallowClone = clone(users);
    expect(shallowClone[0].user).to.equal(users[0].user);
    expect(shallowClone[0]).to.equal(users[0]);
  });
});

describe('size', function() {
  it('should return the correct size of arrays', function() {
    expect(size([])).to.eql(0);
    expect(size([1])).to.eql(1);
  });
  it('should return the correct size of objects', function() {
    expect(size({a:1,b:2})).to.eql(2);
    expect(size({})).to.eql(0);
  });
});

describe('first', function() {
  it('should be able to pull out the first element of an array', function() {
    expect(first([1,2,3])).to.equal(1);
    expect(first([6])).to.equal(6);
  });

  it('should not modify the array', function() {
    var array = [1,2,3];
    expect(first(array)).to.equal(1);
    expect(array).to.eql([1,2,3]);
  });

  it('should return undefined for empty array', function() {
    expect(first([])).to.be(undefined);
  });
});

describe('indexOf', function() {
  it('should have 40 in the list', function() {
    var numbers = [10, 20, 30, 40, 50];
    expect(indexOf(numbers, 40)).to.be(3);
  });

  it('should be able to compute indexOf even when the native function is undefined', function() {
    var numbers = [10, 20, 30];
    expect(indexOf(numbers, 20)).to.be(1);
  });

  it('returns -1 when the target cannot be found not in the list', function() {
    var numbers = [10, 20, 30, 40, 50];
    expect(indexOf(numbers, 35)).to.be(-1);
  });

  it('returns the first index that the target can be found at when there are multiple matches', function() {
    var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];
    expect(indexOf(numbers, 40)).to.be(1);
  });
});

describe('drop', function() {
  it('should remove first element if second argument not provided', function() {
    expect(drop([1, 2, 3])).to.eql([2, 3]);
  });

  it('should remove first n elem', function() {
    expect(drop([1, 2, 3], 2)).to.eql([3]);
  });

  it('should return empty array if n is larger than array length', function() {
    expect(drop([1, 2, 3], 5)).to.eql([]);
  });

  it('should return entire array if n is 0', function() {
    expect(drop([1, 2, 3], 0)).to.eql([1, 2, 3]);
  });
});

describe('take', function() {
  it('should return first element if second argument not provided', function() {
    expect(take([1, 2, 3])).to.eql([1]);
  });

  it('should remove last n elem', function() {
    expect(take([1, 2, 3], 2)).to.eql([1,2]);
  });

  it('should return entire array if n is larger than array length', function() {
    expect(take([1, 2, 3], 5)).to.eql([1,2,3]);
  });

  it('should return empty array if n is 0', function() {
    expect(take([1, 2, 3], 0)).to.eql([]);
  });
});

describe('forEach', function() {
  it('should iterate over arrays, providing access to the element, index, and array itself', function() {
    var fruits = ['apple', 'banana', 'carrot'];
    var iterationInputs = [];
    forEach(fruits, function(fruit, index, list) {
      iterationInputs.push([fruit, index, list]);
    });
    expect(iterationInputs).to.eql([
      ['apple', 0, fruits],
      ['banana', 1, fruits],
      ['carrot', 2, fruits]
    ]);
  });

  it('should only iterate over the array elements, not properties of the array', function() {
    var fruits = ['apple', 'banana', 'carrot'];
    var iterationInputs = [];
    fruits.shouldBeIgnored = 'Ignore me!';
    forEach(fruits, function(fruit, index, list) {
      iterationInputs.push([fruit, index, list]);
    });
    expect(iterationInputs).to.eql([
      ['apple', 0, fruits],
      ['banana', 1, fruits],
      ['carrot', 2, fruits]
    ]);
  });
});

describe('filter', function() {
  it('should return all even numbers in an array', function() {
    var isEven = function(num) { return num % 2 === 0; };
    var evens = filter([1, 2, 3, 4, 5, 6], isEven);
    expect(evens).to.eql([2, 4, 6]);
  });

  it('should return all odd numbers in an array', function() {
    var isOdd = function(num) { return num % 2 !== 0; };
    var odds = filter([1, 2, 3, 4, 5, 6], isOdd);
    expect(odds).to.eql([1, 3, 5]);
  });
});

describe('reject', function() {
  it('should reject all even numbers', function() {
    var isEven = function(num) { return num % 2 === 0; };
    var odds = reject([1, 2, 3, 4, 5, 6], isEven);
    expect(odds).to.eql([1, 3, 5]);
  });

  it('should reject all odd numbers', function() {
    var isOdd = function(num) { return num % 2 !== 0; };
    var evens = reject([1, 2, 3, 4, 5, 6], isOdd);
    expect(evens).to.eql([2, 4, 6]);
  });

  it('should reject all odd values in object', function() {
    var obj = {a:1, b:2, c:3, d:4};
    var isOdd = function(value, key, collection) { return value % 2 !== 0; };
    var evens = reject(obj, isOdd);  
    expect(evens).to.eql({b:2, d:4});
  })
});

describe('uniq', function() {
  it('should return all unique values contained in an unsorted array', function() {
    var list = [1, 2, 1, 3, 1, 4];
    expect(uniq(list)).to.eql([1, 2, 3, 4]);
  });

  it('should handle iterators that work with a sorted array', function() {
    var iterator = function(value) { return value +1; };
    var list = [1, 2, 2, 3, 4, 4];
    expect(uniq(list, true, iterator)).to.eql([1, 2, 3, 4]);
  });
});

describe('pluck', function() {
  it('should return values contained at a user-defined property', function() {
    var people = [
      {name : 'moe', age : 30},
      {name : 'curly', age : 50}
    ];
    expect(pluck(people, 'name')).to.eql(['moe', 'curly']);
  });
});

describe('reduce', function() {
  it('should be able to sum up an array', function() {
    var add = function(tally, item) {return tally + item; };
    var total = reduce([1, 2, 3], add, 0);
    expect(total).to.equal(6);
  });

  it('should be able to find the difference in an array', function() {
    var difference = function(tally, item) {return tally - item; };
    var total = reduce([1, 2, 3], difference, 0);
    expect(total).to.equal(-6);
  });
});

describe('flatten', function() {
  it('should flatten nested arrays', function() {
    expect(flatten([1, [2, 3, [4]]])).to.eql([1, 2, 3, [4]]);
  });
});

describe('extend', function() {
  it('returns the first argument', function() {
    var to = {};
    var from = {};
    var extended = extend(to, from);
    expect(extended).to.equal(to);
  });

  it('should extend an object with the attributes of another', function() {
    var to = {};
    var from = {a:'b'};
    extend(to, from);
    expect(to.a).to.equal('b');
  });

  it('should override properties found on the destination', function() {
    var to = {a:'x'};
    var from = {a:'b'};
    extend(to, from)
    expect(to.a).to.equal('b');
  });

  it('should not override properties not found in the source', function() {
    var to = {x:'x'};
    var from = {a:'b'};
    extend(to, from);
    expect(to.x).to.equal('x');
  });

  it('should extend from multiple source objects', function() {
    var first = {x:1};
    extend(first, {a:2}, {b:3});
    expect(first).to.eql({x:1, a:2, b:3});
  });

  it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', function() {
    var extended = extend({x:'x'}, {a:'a', x:2}, {a:1});
    expect(extended).to.eql({x:2, a:1});
  });

  it('should copy undefined values', function() {
    var extended = extend({}, {a: void 0, b: null});
    expect('a' in extended && 'b' in extended).to.be(true);
  });
});

describe('isString', function() {
  it('should return true for strings', function() {
    expect(isString('a')).to.be(true);
    expect(isString('5')).to.be(true);
  });

  it('should return false for everything', function() {
    expect(isString({})).to.be(false);
    expect(isString([])).to.be(false);
    expect(isString(1)).to.be(false);
    expect(isString(true)).to.be(false);
  });
});

describe('applyAndEmpty', function() {
  it('should iterate over the queue and submit input', function() {
    var puzzlers = [
      function(a) { return 8 * a - 10; },
      function(a) { return (a - 3) * (a - 3) * (a - 3); },
      function(a) { return a * a + 4;},
      function(a) { return a % 5;}
    ];
    var start = 2;
    expect(applyAndEmpty(2, puzzlers)).to.equal(3);
  });
});

describe('memoize', function() {
  var fib, fastFib, timeCheck, fastTime, wait;
  beforeEach(function() {
    fib = function(n) {
      if(n < 2){ return n; }
      return fib(n - 1) + fib(n - 2);
    };
    fastFib = memoize(fib);
    timeCheck = function(str) { return str + Date.now(); };
    fastTime = memoize(timeCheck);
    // Synchronous sleep: terrible for web development, awesome for testing memoize
    wait = function(t) {
      var start = Date.now();
      while ((Date.now() - start) < t){}
    };
  });

  it('a memoized function should produce the same result when called with the same arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
  });

  it('should give different results for different arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
    expect(fastFib(7)).to.equal(13);
  });

  it('should not run the function twice for the same given argument', function() {
    var firstTime = timeCheck('shazaam!');
    wait(5);
    var secondTime = fastTime('shazaam!');
    wait(5);
    expect(firstTime).to.not.equal(secondTime);
    expect(fastTime('shazaam!')).to.equal(secondTime);
  });
});

describe('delay', function() {
  var clock;
  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });
  afterEach(function() {
    clock.restore();
  });
  it('should only execute the function after the specified wait time', function() {
    var callback = sinon.spy();
    delay(callback, 100);
    clock.tick(99);
    expect(callback.notCalled).to.be(true);
    clock.tick(1);
    expect(callback.calledOnce).to.be(true);
  });

  it('should have successfully passed function arguments in', function() {
    var callback = sinon.spy();
    delay(callback, 100, 1, 2);
    clock.tick(100);
    expect(callback.calledWith(1, 2)).to.be(true);
  });
});