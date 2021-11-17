import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = []; // arreglo de heroes que utiliza la interface de Hero

  //Inyectando el HeroService en el componente
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes(); //getHeroes trae todos los heroes
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5)); // hay un párametro que se va a llamar heroes a la cual se le asigna el arreglo de heroes con un slice que corta hasta 5
  }
}