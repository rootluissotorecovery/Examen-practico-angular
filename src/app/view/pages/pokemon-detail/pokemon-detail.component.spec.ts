import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { IPokemon } from '../../../models/interfaces/IPokeApi.interface';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ApiService } from '../../../services/repository/api.service';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  let pokemonMock: IPokemon = {
    abilities: [],
    order: 0,
    base_experience: 0,
    height: 0,
    id: 0,
    name: '',
    types: [],
  };

  beforeEach(async () => {

    apiServiceMock = jasmine.createSpyObj('apiService', ['getGeneric']);

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
          provide: ApiService,
          useValue: apiServiceMock,
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    apiServiceMock.getGeneric.and.returnValue(of(pokemonMock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('getPokemonData()', () => {
    it('debería llamar al servicio con el url del pokemon actual  asignar los datos del pokemon', () => {
      apiServiceMock.getGeneric.and.returnValue(of(pokemonMock));
      fixture.detectChanges();

      expect(apiServiceMock.getGeneric).toHaveBeenCalledTimes(1);
      expect(component.pokemonData).toEqual(pokemonMock);
      expect(component.loading()).toBeFalse();
    });

    it('debería dejar loading en falso si hay un error', () => {
      apiServiceMock.getGeneric.and.returnValue(throwError(() => new Error('Error desconocido')));
      fixture.detectChanges();
      expect(apiServiceMock.getGeneric).toHaveBeenCalled();
      expect(component.loading()).toBeFalse();
    });
  })
});
