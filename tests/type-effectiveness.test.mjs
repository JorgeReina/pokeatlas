import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defensiveEffectiveness } from '../src/app/domain/type-effectiveness.ts';

const ref = name => ({ name, url: '' });
const relations = (double = [], half = [], immune = []) => ({
  double_damage_from: double.map(ref), half_damage_from: half.map(ref), no_damage_from: immune.map(ref)
});

test('combines weaknesses and resistances of dual types including cancellation and immunity', () => {
  const result = defensiveEffectiveness([
    relations(['rock', 'water', 'electric'], ['grass'], []),
    relations(['rock'], ['water'], ['electric'])
  ]);
  assert.deepEqual(result, {
    weaknesses: [{ name: 'rock', multiplier: 4 }],
    resistances: [{ name: 'grass', multiplier: 0.5 }],
    immunities: [{ name: 'electric', multiplier: 0 }]
  });
});

test('preserves double resistance and a single weakness', () => {
  assert.deepEqual(defensiveEffectiveness([relations(['fire'], ['grass']), relations([], ['grass'])]), {
    weaknesses: [{ name: 'fire', multiplier: 2 }],
    resistances: [{ name: 'grass', multiplier: 0.25 }],
    immunities: []
  });
});
