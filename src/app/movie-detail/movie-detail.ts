import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-detail.html'
})
export class MovieDetail implements OnInit {
  movie: any = null;
  movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef // <--- Inyectamos ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovieDetail();
  }

  loadMovieDetail(): void {
    this.movieService.getMovie(this.movieId).subscribe({
      next: (response: any) => {
        // Asignamos la película según venga la estructura
        this.movie = response.data ? response.data : (response.movie ? response.movie : response);
        
        // Forzamos la actualización de la vista de inmediato
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar los detalles de la película:', err);
      }
    });
  }

  deleteMovie(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          alert('¡Película eliminada con éxito!');
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error('Error al eliminar la película:', err);
        }
      });
    }
  }
}