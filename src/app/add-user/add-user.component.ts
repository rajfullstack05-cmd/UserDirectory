
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { CreateUserRequest } from '../Models/User.model';
// import { CreateUserRequest } from '../models/user.model';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

 
  userForm!: FormGroup;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          this.noWhitespaceValidator,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],

      age: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0|[1-9]\d?|1[01]\d|120)$/)
        ]
      ],

      city: [
        '',
        [
          Validators.required,
          this.noWhitespaceValidator
        ]
      ],

      state: [
        '',
        [
          Validators.required,
          this.noWhitespaceValidator
        ]
      ],

      pincode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9 -]{4,10}$/)
        ]
      ]
    });
  }

  private noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (typeof value !== 'string' || !value.trim()) {
      return { whitespace: true };
    }

    return null;
  }

  get formControls() {
    return this.userForm.controls;
  }

  saveUser(): void {

    if (this.userForm.invalid || this.isSaving) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value;

    const user: CreateUserRequest = {
      name: formValue.name.trim(),
      age: Number(formValue.age),
      city: formValue.city.trim(),
      state: formValue.state.trim(),
      pincode: formValue.pincode.trim()
    };

    this.isSaving = true;

    this.userService.addUser(user)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe(
        () => {
          this.showMessage('User added successfully.');

          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Unable to save user:', error);

          this.showMessage('Unable to save user. Please try again.');
        }
      );
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
