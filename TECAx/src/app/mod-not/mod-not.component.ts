import {
    Component,
    EventEmitter,
    Output,
    ViewChild
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    ConfirmPopupComponent
} from '../confirm-popup/confirm-popup.component';
import {
    EditPopupComponent
} from '../edit-popup/edit-popup.component';
import {
    Subscription
} from 'rxjs';
import {
    SharedService
} from '../../servicios/sharedService';
import { AddPopupComponent } from '../add-popup/add-popup.component';
@Component({
    selector: 'app-mod-not',
    standalone: true,
    imports: [CommonModule, ConfirmPopupComponent, EditPopupComponent,AddPopupComponent],
    templateUrl: './mod-not.component.html',
    styleUrl: './mod-not.component.css'
})
export class ModNotComponent {
    noticias: any[] = [];
    noticiasPaginadas: any[] = [];
    noticiasPorPagina: number = 2;
    paginaActual: number = 1;
    totalPaginas: number = 0;
    id: number = -1;
    noticiaActual: any = null;
    cantidad: number = 0;
   
    private confirmationSubscription: Subscription | null = null;
    private editPopupSubscription: Subscription | null = null; 
    private addPopupSubscription: Subscription | null = null;
    @Output() confirmed = new EventEmitter < void > ();
    @Output() cancelled = new EventEmitter < void > ();
    @ViewChild(ConfirmPopupComponent) confirmPopup!: ConfirmPopupComponent;
    @ViewChild(EditPopupComponent) editPopup!: EditPopupComponent;
    @ViewChild(AddPopupComponent) addPopup!: AddPopupComponent;
    constructor(public SharedService: SharedService) {}

    async ngOnInit() {
        await fetch('http://localhost:8080/not/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                this.noticias = data;
                this.noticias = data;
                this.cargarNoticiasPaginadas();
                this.calcularTotalPaginas();
            });


    }
    cargarNoticiasPaginadas() {

        const inicio = (this.paginaActual - 1) * this.noticiasPorPagina;
        const fin = inicio + this.noticiasPorPagina;
        this.noticiasPaginadas = this.noticias.slice(inicio, fin);
    }

    cambiarPagina(pagina: number) {
        this.paginaActual = pagina;
        this.cargarNoticiasPaginadas();
    }

    calcularTotalPaginas() {
        this.totalPaginas = Math.ceil(this.noticias.length / this.noticiasPorPagina);
    }
    modificarNoticia(noticia: any, id: number) {
        this.id = id;
        this.noticiaActual = {
            ...noticia
        };
        this.editPopup.noticia = this.noticiaActual;
        this.editPopup.show();
        if (this.editPopupSubscription) {
            this.editPopupSubscription.unsubscribe();
        }
        // Escuchar el evento de actualización del popup de edición
        this.editPopupSubscription = this.editPopup.updateEvent.subscribe((noticiaActualizada: any) => {
            this.executeModificar(noticiaActualizada);
        });
    }
    executeModificar(noticiaActualizada: any) {
        const index = this.noticias.findIndex(noticia => noticia.id === this.id);

        if (index !== -1) {
            // Actualizar la noticia en la lista con los nuevos valores
            
            this.noticias[index] = noticiaActualizada;
            const nueva = this.noticias.findIndex(noticia => noticia.id === this.id)
            this.actualizarNoticia(this.id,this.noticias[index]);
            console.log("Esta es"+this.noticias[index])
            this.cargarNoticiasPaginadas();
        }
        
        this.noticiaActual = null;
        this.id = -1;
    }
    eliminarNoticia(id: number) {
        this.id = id;
        this.openConfirmation("Eliminar noticia", "¿Está seguro de querer eliminar esta noticia?", 0);
    }
    agregarNoticia() {
        this.addPopup.noticia = {
          fecha: '',
          titulo: '',
          linkimagen: '',
          descripcionimagen: '',
          linknoticia: ''
        };
        this.addPopup.show();
        if (this.addPopupSubscription) {
            this.addPopupSubscription.unsubscribe();
        }
        this.addPopupSubscription =this.addPopup.updateEvent.subscribe((nuevaNoticia: any) => {
          this.executeAgregar(nuevaNoticia);
        });
      }
    
      executeAgregar(nuevaNoticia: any) {
        // Puedes ajustar el formato de la nueva noticia aquí
        this.noticias.push(nuevaNoticia);
        this.agregarNoticiaBase(nuevaNoticia);
        this.cargarNoticiasPaginadas();
        this.calcularTotalPaginas();
      }
      async agregarNoticiaBase(nuevaNoticia: any) {
        const response = await fetch(SharedService.baseURL + '/modificar-noticias', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(nuevaNoticia)
        });
    
        if (!response.ok) {
          throw new Error('Error al agregar la noticia');
        }
    
        return response.json();
      }
    openConfirmation(title: string, content: string, action: number) {
        this.confirmPopup.title = title;
        this.confirmPopup.content = content;
        this.confirmPopup.show();

        // Desuscribirse de la suscripción anterior
        if (this.confirmationSubscription) {
            this.confirmationSubscription.unsubscribe();
        }

        // Crear una nueva suscripción
        this.confirmationSubscription = this.confirmPopup.confirmationResult.subscribe((result: boolean) => {
            if (result) {
                if (action === 0) {
                    this.executeEliminar();
                } else if (action === 1) {
                    this.executeMoficar();
                }
            } else {
                this.executeCancelar();
            }
        });
    }
    executeEliminar() {
        console.log('Eliminar noticia con ID:', this.id);
        console.log(this.cantidad)
        this.eliminarNoticiaBase(this.id);
        this.noticias = this.noticias.filter(noticia => noticia.id !== this.id);
        this.cargarNoticiasPaginadas();
        this.calcularTotalPaginas();
        this.id = -1;
        this.cantidad++
    }
    executeMoficar() {
        console.log('Eliminar noticia con ID:', this.id, this.noticiaActual);

        
        this.noticiaActual = null;
        this.id = -1;
    }
    executeCancelar() {
        this.noticiaActual = null;
        this.id = -1;
    }
    ngOnDestroy() {
        if (this.confirmationSubscription) {
            this.confirmationSubscription.unsubscribe();
        }
        if (this.editPopupSubscription) {
            this.editPopupSubscription.unsubscribe();
          }
          if (this.addPopupSubscription) {
            this.addPopupSubscription.unsubscribe();
          }
    }
    
    async eliminarNoticiaBase(id: number) {
        const response = await fetch(SharedService.baseURL+`/modificar-noticias/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Mensaje de éxito
       
      } else {
        const error = await response.json();
        console.error(error.message); // Mensaje de error
      }
    }
    async actualizarNoticia(id: number, noticia: any) {
        console.log(noticia)
        const response = await fetch(SharedService.baseURL+`/modificar-noticias/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(noticia)
        });
    
        if (!response.ok) {
          throw new Error('Error al actualizar la noticia');
        }
    
        return response.json();
    }

}