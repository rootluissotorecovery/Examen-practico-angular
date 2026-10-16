import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokeapiService } from '../../../services/repository/pokeapi.service';
import { IPokemon } from '../../../models/interfaces/IPokeApi.interface';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let pokeApiServiceMock: jasmine.SpyObj<PokeapiService>;

  let pokemonMock: IPokemon = {
    abilities: [{ description: 'Prevents paralysis', effect: 'something', name: 'Limber' }],
    color: '#dcd4d2',
    description: 'Electric Mouse',
    genus: 'When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides.',
    id: 106,
    imageUrl: 'https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev/106.webp',
    locations: ['City'],
    name: 'Hitmonlee',
    types: ['Fighting'],
  };

  beforeEach(async () => {

    pokeApiServiceMock = jasmine.createSpyObj('PokeApiService', ['getPokemonById']);

    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent, CommonModule, LoaderComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 106 }
            }
          }
        },
        {
          provide: PokeapiService,
          useValue: pokeApiServiceMock,
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    pokeApiServiceMock.getPokemonById.and.returnValue(of(pokemonMock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('getPokemonData()', () => {
    it('debería llamar al servicio con el id y asignar los datos del pokemon', () => {
      pokeApiServiceMock.getPokemonById.and.returnValue(of(pokemonMock));
      fixture.detectChanges();

      expect(pokeApiServiceMock.getPokemonById).toHaveBeenCalledWith(106);
      expect(component.pokemonData).toEqual(pokemonMock);
      expect(component.loading()).toBeFalse();
    });

    it('debería dejar loading en falso si hay un error', () => {
      pokeApiServiceMock.getPokemonById.and.returnValue(throwError(() => new Error('Error desconocido')));
      fixture.detectChanges();
      expect(pokeApiServiceMock.getPokemonById).toHaveBeenCalled();
      expect(component.loading()).toBeFalse();
    });
  })
});
