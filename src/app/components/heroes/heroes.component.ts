import { Component, OnInit } from '@angular/core';

import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';

//@Component es una función decoradora 
@Component({
  selector: 'app-heroes', //el selector de elementos CSS para identificar cada componente de manera única en el árbol de componentes
  templateUrl: './heroes.component.html', //la ubicación del archivo
  styleUrls: ['./heroes.component.css'] //la ubicación de los estilos CSS
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes() //trae todos los heroes
    .subscribe(heroes => this.heroes = heroes);
  }

  //Añade un nuevo heroe al servidor
  add(name: string): void {
    name = name.trim();
    if (!name) { 
      return; 
    }
    this.heroService.addHero({ name } as Hero)  //Cuando el nombre de pila no está en blanco, el controlador crea un Hero objeto similar al nombre
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // si el parametro h es distinto a hero si queremos eliminar un numero los otros numeros quedan menos el que se elimino
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}