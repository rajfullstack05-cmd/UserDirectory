import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

users: User[] = [];

  displayedColumns: string[] = [
    'name',
    'age',
    'city',
    'state',
    'pincode'
  ];

  isLoading = false;
  errorMessage = '';

  // Change this URL to your actual .NET API URL.
  // private apiUrl = 'https://localhost:7001/api/users';

  constructor(
    private http: HttpClient,
    private router: Router, private userService:UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({

      next: (response: User[]) => {
        this.users = response;
        this.isLoading = false;

        console.log('Users loaded successfully:', response);
      },

      error: (error) => {
        console.error('Error loading users:', error);

        this.errorMessage = 'Unable to load users. Please try again.';
        this.isLoading = false;
      }

    });
  }
  addUser(): void {
    this.router.navigate(['/add-user']);
  }
}


