import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular'; // Asegúrate de que IonicModule esté importado para los componentes de Ionic
import { ReactiveFormsModule } from '@angular/forms'; // Para formularios reactivos
import { RegisterPage } from './register.page'; // Importa la página que vas a testear

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage], // Declara el componente que estás probando
      imports: [
        IonicModule.forRoot(), // Importa IonicModule
        ReactiveFormsModule // Importa ReactiveFormsModule para el formulario reactivo
      ]
    }).compileComponents(); // Compila el componente

    fixture = TestBed.createComponent(RegisterPage); // Crea la instancia del componente
    component = fixture.componentInstance; // Asigna el componente instanciado
    fixture.detectChanges(); // Detecta cambios
  }));

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });

  // Puedes añadir más tests aquí
});
