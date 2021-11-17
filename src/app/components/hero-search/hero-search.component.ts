import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;//Creacion de un observable $ estandar que indica que la variable es un observable
  private searchTerms = new Subject<string>(); //Subject contiene datos de un observable y puede ser un observable
         //Inyeccion de HeroService
  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void { // Procedimiento que recibe un parametro
    this.searchTerms.next(term); //Cargando termino que estoy buscando
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe( //pipe cambia el comportamiento del observable
      // espere 300 ms después de cada pulsación de tecla antes de considerar el término
      debounceTime(300), //para no saturar el servidor

      // ignora el término nuevo si es el mismo que el término anterior
      distinctUntilChanged(),

       // cambia a una nueva búsqueda observable cada vez que cambia el término
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
