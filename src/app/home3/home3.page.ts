import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importa el Router para la navegación

@Component({
  selector: 'app-home3',
  templateUrl: './home3.page.html',
  styleUrls: ['./home3.page.scss'],
})
export class Home3Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToHome3() {
    // Navegar a la página home3
    this.router.navigate(['/home3']);
  }
}
