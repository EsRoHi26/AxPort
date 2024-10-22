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
  EditRecursoComponent 
} from '../edit-recurso/edit-recurso.component';
import {
    Subscription
} from 'rxjs';
import {
    SharedService
} from '../../servicios/sharedService';
import { AddRecursoComponent } from '../add-recurso/add-recurso.component';
@Component({
    selector: 'app-mod-rec',
    standalone: true,
    imports: [CommonModule, ConfirmPopupComponent, EditRecursoComponent , AddRecursoComponent],
    templateUrl: './mod-rec.component.html',
    styleUrl: './mod-rec.component.css'
})
export class ModRecComponent {
    recursos: any[] = [];
    recursosPaginados: any[] = [];
    recursosPorPagina: number = 2;
    paginaActual: number = 1;
    totalPaginas: number = 0;
    id: number = -1;
    recursoActual: any = null;
    cantidad: number = 0;

    private confirmationSubscription: Subscription | null = null;
    private editPopupSubscription: Subscription | null = null;
    private addPopupSubscription: Subscription | null = null;
    @Output() confirmed = new EventEmitter < void > ();
    @Output() cancelled = new EventEmitter < void > ();
    @ViewChild(ConfirmPopupComponent) confirmPopup!: ConfirmPopupComponent;
    @ViewChild(EditRecursoComponent ) editPopup!: EditRecursoComponent ;
    @ViewChild(AddRecursoComponent) addPopup!: AddRecursoComponent;
    constructor(public SharedService: SharedService) {}


    async ngOnInit() {
        await fetch(SharedService.baseURL + '/rec/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => {
                this.recursos = data;
                console.log(this.recursos)
                this.cargarRecursosPaginadas();
                this.calcularTotalPaginas();
            });


    }
    cargarRecursosPaginadas() {

        const inicio = (this.paginaActual - 1) * this.recursosPorPagina;
        const fin = inicio + this.recursosPorPagina;
        this.recursosPaginados = this.recursos.slice(inicio, fin);
    }

    cambiarPagina(pagina: number) {
        this.paginaActual = pagina;
        this.cargarRecursosPaginadas();
    }

    calcularTotalPaginas() {
        this.totalPaginas = Math.ceil(this.recursos.length / this.recursosPorPagina);
    }
    modificarRecurso(recurso: any, id: number) {
        this.id = id;
        this.recursoActual = {
            ...recurso
        };
        this.editPopup.recurso = this.recursoActual;
        this.editPopup.show();
        if (this.editPopupSubscription) {
            this.editPopupSubscription.unsubscribe();
        }
        // Escuchar el evento de actualización del popup de edición
        this.editPopupSubscription = this.editPopup.updateEvent.subscribe((recursoActualizado: any) => {
            this.executeModificar(recursoActualizado);
        });
    }
    executeModificar(recursoActualizado: any) {
        const index = this.recursos.findIndex(recurso => recurso.id === this.id);

        if (index !== -1) {
            // Actualizar la recurso en la lista con los nuevos valores

            this.recursos[index] = recursoActualizado;
            const nueva = this.recursos.findIndex(recurso => recurso.id === this.id)
            this.actualizarRecurso(this.id, this.recursos[index]);
            console.log("Esta es" + this.recursos[index])
            this.cargarRecursosPaginadas();
        }

        this.recursoActual = null;
        this.id = -1;
    }
    eliminarRecurso(id: number) {
        this.id = id;
        this.openConfirmation("Eliminar recurso", "¿Está seguro de querer eliminar este recurso?", 0);
    }
    agregarRecurso() {
        this.addPopup.recurso = {
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
        this.addPopupSubscription = this.addPopup.updateEvent.subscribe((nuevoRecurso: any) => {
            this.executeAgregar(nuevoRecurso);
        });
    }

    executeAgregar(nuevoRecurso: any) {
        // Puedes ajustar el formato de la nueva recurso aquí
        this.recursos.push(nuevoRecurso);
        this.agregarRecursoBase(nuevoRecurso);
        this.cargarRecursosPaginadas();
        this.calcularTotalPaginas();
    }
    async agregarRecursoBase(nuevoRecurso: any) {
        const response = await fetch(SharedService.baseURL + '/modificar-recursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(nuevoRecurso)
        });

        if (!response.ok) {
            throw new Error('Error al agregar la recurso');
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
        console.log('Eliminar recurso con ID:', this.id);
        console.log(this.cantidad)
        this.eliminarRecursoBase(this.id);
        this.recursos = this.recursos.filter(recurso => recurso.id !== this.id);
        this.cargarRecursosPaginadas();
        this.calcularTotalPaginas();
        this.id = -1;
        this.cantidad++
    }
    executeMoficar() {
        console.log('Eliminar recurso con ID:', this.id, this.recursoActual);


        this.recursoActual = null;
        this.id = -1;
    }
    executeCancelar() {
        this.recursoActual = null;
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

    async eliminarRecursoBase(id: number) {
        const response = await fetch(SharedService.baseURL + `/modificar-recursos/${id}`, {
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
    async actualizarRecurso(id: number, recurso: any) {
        console.log(recurso)
        const response = await fetch(SharedService.baseURL + `/modificar-recursos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(recurso)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la recurso');
        }

        return response.json();
    }
}