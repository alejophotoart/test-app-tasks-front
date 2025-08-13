import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonList, IonItem, IonInput, IonTextarea, IonCheckbox, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

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
export class FormTaskComponent implements OnInit {
  taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', Validators.required],
    completed: [false]
  });

  nameErrorMessage: string = '';

  getNameErrorMessage(): string {
    const nameControl = this.taskForm.get('name');
    const descriptionControl = this.taskForm.get('description');
    if (nameControl?.errors) {
      if (nameControl.errors['required']) {
        return 'El nombre es requerido';
      }
      if (nameControl.errors['minlength']) {
        return 'El nombre debe tener al menos 3 caracteres';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  createForm() {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
      completed: [false]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      // Aquí puedes agregar la lógica para guardar la tarea
    }
  }
}
