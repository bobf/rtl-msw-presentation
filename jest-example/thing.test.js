import thing from './thing';

describe('thing', () => {
  it('appends cats', () => {
    expect(thing('hello')).toEqual('hello cats');
  });

  it('does not append dogs', () => {
    expect(thing('hello')).not.toEqual('hello dogs');
  });

  it('appends chickens', () => {
    expect(thing('hello')).toEqual('hello chickens');
  });
});


