module.exports = {


  friendlyName: 'Get random numbers',


  description: 'Get specified amount of random numbers.',


  cacheable: false,


  sync: false,


  idempotent: false,


  inputs: {
    amount: {

      example: 1,

      description: 'How many random numbers to return.',

      required: true
    },
    mult: {
      friendlyName: 'multiplier',

      example: 1,

      description: 'The multiplier which determines the upper limit of the random numbers.',

      required: true
    }
  },


  exits: {

    success: {
      variableName: 'newArray',
      description: 'Returns a new array with the specified quantity of random numbers.'
    },
    badAmount: {
      friendlyName: 'bad amount',
      description: 'The number of items requested is invalid.'
    },
    error: {
      description: 'An unexpected error occurred.'
    }

  },


  fn: function (inputs,exits) {
    var amt = inputs.amount,
      mult = inputs.mult,
      result = [],
      i = 0;

    if(inputs.amount === 0) {
      return exits.badAmount();
    }

    function getNum() {
      return Math.ceil(mult * Math.random());
    }

    for (i; i < amt; i++) {
      result.push(getNum())
    }
    return exits.success(result);
  }



};
