import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // <-- ¡Verifica que ambos estén aquí!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // <-- Deben estar declarados en imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'catalogo-frontend';
}