import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-add.html',
})
export class MovieAdd {
  movie: any = {
    title: '',
    director: '',
    year: null,
    genre: '',
    cover: '',     // <--- ¡Agregado para cumplir con la validación de Laravel!
    synopsis: ''
  };

  constructor(private movieService: MovieService, private router: Router) {}

  saveMovie(): void {
    this.movieService.createMovie(this.movie).subscribe({
      next: () => {
        alert('¡Película agregada con éxito!');
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Error al guardar la película:', err);
      }
    });
  }
}