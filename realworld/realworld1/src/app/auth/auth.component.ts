import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: string = '';
  title: string = '';
  isSubmitting: boolean = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;

      const isRegister = this.authType === 'register';
      this.title = isRegister? 'Sign Up' : 'Sign In';
      isRegister && this.authForm.addControl('username', new FormControl('', Validators.required));
    });
  }

  submitForm() {
    this.isSubmitting = true;
    let credentials = this.authForm.value;
    console.log(credentials);
  }

}
