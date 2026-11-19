import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;
  rememberMe:boolean = false;
  isLoading = false;
  constructor(private fb: FormBuilder,private router: Router ,private authService:AuthService,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
get showLogin(): boolean {

  return this.router.url === '/' ||
         this.router.url === '/login';
}
  createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  onLogin(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

  
    const loginData = {
      username  : email,
      password: password
    };
this.authService.login(loginData).subscribe({
  next:(Response)=>{
      
    localStorage.setItem('access_token', Response.accessToken);
    localStorage.setItem('logged_user', JSON.stringify(Response.user));
    this.router.navigate(['/user-list']);

     this.showMessage('User added successfully.');
  },
  
  error: (error) => {
 
     this.showMessage('Invalid email or password.');
  }});
  }
  
  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

}
