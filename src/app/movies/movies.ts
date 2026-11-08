import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit {
  moviesList: any[] = [];

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data: any) => {
        this.moviesList = Array.isArray(data) ? data : (data.data || []);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error al conectar con la API de Laravel:', err);
      }
    });
  }

  // Método para eliminar una película por su ID
  deleteMovie(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          // Recargamos la lista automáticamente tras borrar
          this.loadMovies();
        },
        error: (err) => {
          console.error('Error al eliminar la película:', err);
        }
      });
    }
  }
}