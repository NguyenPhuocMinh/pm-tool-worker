'use strict';

const retryOptions = {
  retries: 5,
  factor: 3,
  minTimeout: 1000,
  maxTimeout: 5000,
  randomize: true
};

const options = {
  retryOptions
};

export default options;
