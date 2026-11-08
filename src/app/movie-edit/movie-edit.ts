import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-edit.html',
})
export class MovieEdit implements OnInit {
  movieId!: number;
  movie: any = {
    title: '',
    director: '',
    year: null,
    genre: '',
    cover: '',
    synopsis: ''
  };

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.movieService.getMovie(this.movieId).subscribe({
      next: (response: any) => {
        const data = response.data ? response.data : response;

        this.movie = {
          title: data.title || '',
          director: data.director || '',
          year: data.year || data.release_year || null,
          genre: data.genre || '',
          cover: data.cover || '',
          synopsis: data.synopsis || ''
        };

        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar la película para editar:', err);
      }
    });
  }

  updateMovie(): void {
    this.movieService.updateMovie(this.movieId, this.movie).subscribe({
      next: () => {
        alert('¡Película actualizada con éxito!');
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Error al actualizar la película:', err);
        alert('Hubo un error al guardar los cambios.');
      }
    });
  }
}