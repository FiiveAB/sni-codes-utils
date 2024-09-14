const test = require('ava');
const { validateSniCode, searchSniCodes, getSniCodeDetails } = require('../src');


test('validateSniCode - valid code', t => {
  const result = validateSniCode('62010');
  t.true(result, 'Should return true for a valid SNI code');
});

test('validateSniCode - invalid code', t => {
  const result = validateSniCode('99999');
  t.false(result, 'Should return false for an invalid SNI code');
});

test('searchSniCodes - search by keyword', t => {
  const results = searchSniCodes('programmering');
  t.is(results.length, 1, 'Should find one result for "programmering"');
  t.is(results[0].description, 'Dataprogrammering', 'Result description should match');
});

test('searchSniCodes - no matches', t => {
  const results = searchSniCodes('notarealjob');
  t.is(results.length, 0, 'Should find no results for an invalid keyword');
});

test('getSniCodeDetails - valid code', t => {
  const details = getSniCodeDetails('01131');
  t.deepEqual(details, { code: '01131', description: 'Potatisodling' }, 'Should return correct details');
})