import { Component } from '@angular/core';
import { RegisterPediaComponent } from './register-pedia/register-pedia.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterPediaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pedia-centre';
}