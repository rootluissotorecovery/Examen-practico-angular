import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPokemon, IPokemonShort } from '../../../models/interfaces/IPokeApi.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemon?: IPokemonShort;
  urlDefaultImg = '../../../../assets/img/who_is_that_pokemon.jpg';

  constructor(
    private readonly _router: Router,
  ) { }

  pokemonSelected(): void {
    sessionStorage.setItem('currentPokemon', this.pokemon?.url || '');
    this._router.navigateByUrl(`pokemon`);
  }
}
