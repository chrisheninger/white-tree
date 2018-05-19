// @Flow

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

type Item = {
  name: string,
  description: string,
  weight: number,
};

type Equipment = {
  gold: number,
  armor: Array<Armor>,
  items: Array<Item>,
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
    alignment: '',
    class: '',
    deity: '',
    homeland: '',
    level: '',
    name: '',
    race: '',
    size: '',
  },

  appearance: {
    age: '',
    eyes: '',
    gender: '',
    hair: '',
    height: '',
    misc: '',
    weight: '',
  },

  points: {
    hp: '',
    reach: '',
    space: '',
    speed: '',
    xp: '',
  },

  abilities: {
    str: {
      score: '',
      modifier: '',
    },
    dex: {
      score: '',
      modifier: '',
    },
    con: {
      score: '',
      modifier: '',
    },
    int: {
      score: '',
      modifier: '',
    },
    wis: {
      score: '',
      modifier: '',
    },
    cha: {
      score: '',
      modifier: '',
    },
  },

  attack: {
    bab: '',
    cmb: '',
    conc: '',
    init: '',
    melee: '',
    range: '',
  },

  defense: {
    ac: '',
    cmd: '',
    fort: '',
    ref: '',
    touch: '',
    will: '',
  },

  weapon: {
    ammunition: '',
    attack: '',
    crit: '',
    dmg: '',
    name: '',
    range: '',
    type: '',
  },

  armor: {
    bonus: '',
    checkPenalty: '',
    name: '',
    properties: '',
    spellFailure: '',
    type: '',
    weight: '',
  },

  item: {
    name: '',
    description: '',
    weight: '',
  },

  equipment: {
    gold: '',
    armor: [],
    items: [],
    weapon1: {},
    weapon2: {},
  },

  skill: {
    abilityName: '',
    abilityModifier: '',
    classSkill: false,
    miscModifier: '',
    name: '',
    ranks: '',
    totalBonus: '',
  },

  skills: {
    acrobatics: {},
    // TODO
  },
};
