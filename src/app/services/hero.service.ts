import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '../interfaces/hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET héroes del servidor */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('recibiendo héroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`encontrado el héroe con id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `encontrado` : `no se pudo encontrar`;
          this.log(`${outcome} el héroe con id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET: trae los héroes que contengan la cadena en su nombre */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // si no hay un término de búsqueda se retorna un array vacío.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`se han encontrado héroes que matcheen con "${term}"`) :
         this.log(`no hay héroes que matcheen con "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** POST: añade un nuevo héroe al servidor */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`nuevo héroe añadido con id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: borrá el héroe seleccionado del server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`el héroe con id=${id} ha sido borrado`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: actualiza el héroe seleccionado en el server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado héroe con id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Manejo de la petición HTTP que falló
   * @param operation - nombre de la operación que falló
   * @param result - valor opcional que se retornará como resultado
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //Se muestra por consola el error
      console.error(error); 

      //Se muestra la opreación que falló y su mensaje de error
      this.log(`${operation} falló: ${error.message}`);

      // Se mantiene la app corriendo retornándole un resultado vacío
      return of(result as T);
    };
  }

  //Guarda el mensaje de HeroService en el MessageService
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}