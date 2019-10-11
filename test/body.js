const test = require('tape')
const { parse } = require('../dist/vtt-parser');

test('rejects no blank line after header', t => {
  t.plan(1);
  t.throws(() => parse('WEBVTT\n12'));
});

test('parses valid blank line after header', t => {
  t.plan(1);
  t.doesNotThrow(() => parse('WEBVTT\n\n12'));
});

test('rejects files that do not start with WEBVTT header', t => {
  t.plan(2);
  t.throws(() => parse('foo\nWEBVTT'));
  t.throws(() => parse('fooWEBVTT'));
});

test('parses a file consisting only of WEBVTT header', t => {
  t.plan(3);
  t.doesNotThrow(() => parse('WEBVTT\n\n'));
  t.doesNotThrow(() => parse('WEBVTT\n\n\n'));
  t.doesNotThrow(() => parse('\n\n\nWEBVTT\n\n'));
});

test('parses a WEBVTT header text only', t => {
  t.plan(1);
  const result = parse('WEBVTT - This file has no cues.\n\n');
  t.equal(result.header.text, '- This file has no cues.');
});

test('parses a WEBVTT header text', t => {
  t.plan(1);
  const result = parse('WEBVTT - This file has no cues.\n\n12\n');
  t.equal(result.header.text, '- This file has no cues.');
});

test('rejects a WEBVTT header text with an arrow in', t => {
  t.plan(1);
  t.throws(() => parse('WEBVTT - foo --> bar'));
});
