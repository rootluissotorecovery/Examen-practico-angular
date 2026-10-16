export interface IGetAllPokemon {
  count: number;
  next: string;
  previous: number;
  results: IPokemonShort[];
}

export interface IPokemonShort {
  name: string;
  url: string;
  imageUrl?: string;
  nuevaPropiedadMap?: number; // añadido en local
}

export interface IPokemon {
  abilities: IAbility[];
  order: number;
  base_experience: number;
  height: number;
  id: number;
  types: IType[];
  name: string;
  stats?: IStats[];
  imageUrl?: string;
}

export interface IType {
  slot: number;
  type: ITypeDetail;
}

export interface ITypeDetail {
  name: string;
  url: string;
}

export interface IAbility {
  slot: number;
  is_hidden: boolean;
  ability: IAbilityDetail;
}

export interface IAbilityDetail {
  name: string;
  url: string;
}

export interface IStats {
  base_stat: number;
  effort: number;
}
