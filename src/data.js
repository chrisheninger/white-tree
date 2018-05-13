// @flow
type General = {
  alignment: string,
  class: string,
  deity: string,
  homeland: string,
  level: string,
  name: string,
  race: string,
  size: string,
};

type Appearance = {
  age: string,
  eyes: string,
  gender: string,
  hair: string,
  height: string,
  misc: string,
  weight: string,
};

type Points = {
  gp: number,
  hp: number,
  reach: number,
  space: number,
  speed: number,
  xp: number,
};

type Ability = {
  score: number,
  modifier: number,
};

type Abilities = {
  str: Ability,
  dex: Ability,
  con: Ability,
  int: Ability,
  wis: Ability,
  cha: Ability,
};

type Attack = {
  bab: number,
  cmb: number,
  conc: number,
  init: number,
  melee: number,
  range: number,
};

type Defense = {
  ac: number,
  cmd: number,
  fort: number,
  ref: number,
  touch: number,
  will: number,
};

type Weapon = {
  ammunition: string,
  attack: number,
  crit: number,
  dmg: number,
  name: string,
  range: number,
  type: string,
};

type Armor = {
  bonus: number,
  checkPenalty: number,
  name: string,
  properties: string,
  spellFailure: number,
  type: string,
  weight: number,
};

type Gear = {
  name: string,
  weight: number,
};

type Equipment = {
  armor: Array<Armor>,
  gear: Array<Gear>,
  weapon1: Weapon,
  weapon2: Weapon,
};

type Skill = {
  abilityName: string,
  abilityModifier: number,
  classSkill: boolean,
  miscModifier: number,
  name: string,
  ranks: number,
  totalBonus: number,
};

type Skills = {
  acrobatics: Skill,
  // TODO
};

type Character = {
  abilities: Abilities,
  appearance: Appearance,
  attack: Attack,
  defense: Defense,
  equipment: Equipment,
  general: General,
  points: Points,
  skills: Skills,
};

export const defaultCharacterShape: Character = {
  general: {
    name: '',
    class: '',
    race: '',
    alignment: '',
    deity: '',
    size: '',
    space: '',
    reach: '',
  },
  appearance: {
    gender: '',
    height: '',
    weight: '',
    age: '',
    hair: '',
    eyes: '',
    skin: '',
    misc: '',
  },
  points: {
    hp: '',
    gp: '',
    level: '',
    xp: '',
    notes: '',
  },
  abilities: {
    str: '',
    dex: '',
    con: '',
    int: '',
    wis: '',
    cha: '',
  },
  attack: {
    melee: '',
    range: '',
    bab: '',
    cmb: '',
    conc: '',
    init: '',
  },
  defense: {
    ac: '',
    touch: '',
    cmd: '',
    fort: '',
    ref: '',
    will: '',
  },
  equipment: {
    'weapon 1': '',
    'weapon 2': '',
    'armor 1': '',
    'armor 2': '',
    'misc 1': '',
    'misc 2': '',
  },
};
