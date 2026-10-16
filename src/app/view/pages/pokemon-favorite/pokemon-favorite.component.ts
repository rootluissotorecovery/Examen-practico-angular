import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { PokeapiService } from '../../../services/repository/pokeapi.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IPokemon } from '../../../models/interfaces/IPokeApi.interface';

@Component({
  selector: 'app-pokemon-favorite',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './pokemon-favorite.component.html',
  styleUrl: './pokemon-favorite.component.scss'
})
export class PokemonFavoriteComponent implements OnInit {
  urlDefaultImg = '../../../../assets/img/gengar.png';

  pokemonData: IPokemon = {
    abilities: [],
    order: 0,
    base_experience: 0,
    height: 0,
    id: 0,
    name: '',
    types: [],
  };
  loading = signal(true);

  constructor(
    private readonly _pokeApiService: PokeapiService,
  ) { }

  ngOnInit(): void {
    this._pokeApiService.getPokemonFavorite(this.mostrarMensajeFeliz).then(resp => {
      this.pokemonData = resp;
      this.loading.set(false);
    }).catch(() => {
      this.loading.set(false);
    });
  }

  mostrarMensajeFeliz(): void {
    console.log(`
      ( o.o )
      Soy un callback de éxito feliz
    `);
  }
}
