module.exports = {


  friendlyName: 'Get random range',


  description: 'Get specified amount of random numbers within a range.',


  cacheable: false,


  sync: false,


  idempotent: false,


  inputs: {
    amount: {

      example: 1,

      description: 'How many random numbers to return.',

      required: true
    },
    lower: {
      friendlyName: 'lower',

      example: 1,

      description: 'The lower limit of the range.',

      required: true
    },
    upper: {
      friendlyName: 'upper',

      example: 1,

      description: 'The upper limit of the range.',

      required: true
    }

  },


  exits: {

    success: {
      variableName: 'newArray',
      description: 'Returns a new array with the specified quantity of random numbers within the specified range.'
    },
    badAmount: {
      friendlyName: 'bad amount',
      description: 'The number of items requested is invalid.'
    },
    badRange: {
      friendlyName: 'bad range',
      description: 'The range provided is invalid.'
    },
    error: {
      description: 'An unexpected error occurred.'
    }

  },


  fn: function (inputs,exits) {
    var amt = inputs.amount,
      lower = inputs.lower,
      upper = inputs.upper,
      result = [],
      i = 0;

    if(inputs.amount === 0) {
      return exits.badAmount();
    }

    if(upper - lower < 1) {
      return exits.badRange();
    }

    function getNum() {
      return Math.ceil((upper - lower) * Math.random()) + lower;
    }

    for (i; i < amt; i++) {
      result.push(getNum())
    }
    return exits.success(result);
  }
};
