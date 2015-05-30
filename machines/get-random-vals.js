module.exports = {


  friendlyName: 'Get random vals',


  description: 'Get specified number of values from random positions in an array',


  cacheable: false,


  sync: false,


  idempotent: false,


  inputs: {
    num: {

      example: 8,

      description: 'The number of values to return from the array.',

      required: true
    },
    arr: {
      friendlyName: 'Array to get values from',

      example: [],

      description: 'The array we want to return values from.',

      required: true
    }
  },


  exits: {

    success: {
      variableName: 'newArray',
      description: 'Returns a new array with a quantity of random items from the provided array.'
    },
    badArr: {
      friendlyName: 'bad array',
      description: 'The array supplied is invalid or empty.'
    },
    badNum: {
      friendlyName: 'bad number',
      description: 'The number of items requested is invalid or too high.'
    },
    error: {
      description: 'An unexpected error occurred.'
    }

  },


  fn: function (inputs,exits) {
    var len = inputs.arr.length,
      arr = inputs.arr,
      num = inputs.num,
      used = [],
      result = [],
      i = 0;

    if(inputs.num === 0 || inputs.num > len || typeof inputs.num !== 'number') {
      return exits.badNum();
    }

    if (len < 1 || !inputs.arr) {
      return exits.badArr();
    }

    function getPos() {
      return Math.floor(len * Math.random());
    }
    function checkUsed(i) {
      var x = used.indexOf(i);
      return x === -1
    }
    function getRandom () {
      var pos = getPos();
      if(checkUsed(pos)) {
        used.push(pos);
        result.push(arr[pos])
      } else {
        getRandom();

      }
    }

    for (i; i < num; i++) {
      getRandom();
    }
    return exits.success(result);
  }



};
