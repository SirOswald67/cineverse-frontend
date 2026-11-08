import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createMovie(movieData: any): Observable<any> {
    return this.http.post(this.apiUrl, movieData);
  }

  updateMovie(id: number, movieData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, movieData);
  }

  // <--- Agrega este método aquí
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}