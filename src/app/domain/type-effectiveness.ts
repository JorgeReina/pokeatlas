import type { Ref } from '../models/pokemon';

export interface DamageRelations {
  double_damage_from: Ref[];
  half_damage_from: Ref[];
  no_damage_from: Ref[];
}
export interface TypeMultiplier { name: string; multiplier: number }
export interface DefensiveEffectiveness {
  weaknesses: TypeMultiplier[];
  resistances: TypeMultiplier[];
  immunities: TypeMultiplier[];
}

export function defensiveEffectiveness(relations: DamageRelations[]): DefensiveEffectiveness {
  const multipliers = new Map<string, number>();
  for (const relation of relations) {
    for (const [key, factor] of [['double_damage_from', 2], ['half_damage_from', 0.5], ['no_damage_from', 0]] as const) {
      for (const type of relation[key]) multipliers.set(type.name, (multipliers.get(type.name) ?? 1) * factor);
    }
  }
  const result: DefensiveEffectiveness = { weaknesses: [], resistances: [], immunities: [] };
  for (const [name, multiplier] of multipliers) {
    const entry = { name, multiplier };
    if (multiplier > 1) result.weaknesses.push(entry);
    else if (multiplier === 0) result.immunities.push(entry);
    else if (multiplier < 1) result.resistances.push(entry);
  }
  return result;
}
