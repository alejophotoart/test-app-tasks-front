import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonList, IonItem, IonInput, IonTextarea, IonCheckbox, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Task } from '../../Interfaces/task'

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonList, 
    IonItem, 
    IonInput,
    IonTextarea, 
    IonCheckbox, 
    IonButton,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class FormTaskComponent implements OnInit, OnChanges {
  taskForm!: FormGroup;
  nameErrorMessage: string = '';

  @Input() task?: Task;
  @Output() formEmitter = new EventEmitter<Task>();

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
      completed: [false]
    });
  }

  getNameErrorMessage(): string {
    const nameControl = this.taskForm.get('name');
    const descriptionControl = this.taskForm.get('description');
    if (nameControl?.errors) {
      console.log(nameControl?.errors);
      if (nameControl.errors['required']) {
        return 'El nombre es requerido';
      }
      if (nameControl.errors['minlength']) {
        return `El nombre debe tener al menos ${nameControl.errors['minlength'].requiredLength} caracteres`;
      }
    }

    if (descriptionControl?.errors) {
      if (descriptionControl.errors['required']) {
        return 'La descripcion es requerida';
      }
    }
    return '';
  }

  onNameError() {
    this.nameErrorMessage = this.getNameErrorMessage();
  }

  ngOnInit() {
    // La inicialización del formulario ya se hace en el constructor
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && changes['task'].currentValue) {
      const task = changes['task'].currentValue;
      this.taskForm.patchValue({
        name: task.name,
        description: task.description,
        completed: task.completed
      });
      // Marcamos el formulario como no tocado y pristine para que no aparezca como modificado
      this.taskForm.markAsPristine();
      this.taskForm.markAsUntouched();
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      
      // Si estamos en modo edición, incluimos el ID de la tarea
      if (this.task?.id) {
        formData.id = this.task.id;
      }

      console.log(formData);
      this.formEmitter.emit(formData);
    }
  }
}
