import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Movies } from './movies/movies';
import { MovieDetail } from './movie-detail/movie-detail'; // <--- Importas MovieDetail
import { MovieAdd } from './movie-add/movie-add';   
import { MovieEdit } from './movie-edit/movie-edit'; 

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'movies', component: Movies },
  { path: 'movies/add', component: MovieAdd },       
  { path: 'movies/edit/:id', component: MovieEdit }, 
  { path: 'movies/:id', component: MovieDetail }     // <--- Usas MovieDetail aquí
];