declare var google: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {  
  
  constructor( private _Router: Router) { }
  ngOnInit(): void {
    google.accounts.id.initialize({

      client_id: '430354709610-gfgm42vsn82o85lnjbf9lcvj5b8fmvfb.apps.googleusercontent.com',
      callback: (response: any) => {
        console.log(response);

        this.handleLogin(response)
      }
    });
    google.accounts.id.renderButton(document.getElementById("goolge-btn"), {
      shape: "rectangle",
      size: "large",
      theme: "filled-blue",
      width: 300
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }
  handleLogin(response: any) {
    //decode to Token
    const payload = this.decodeToken(response.credential);
    // Store in seesion Storage
    sessionStorage.setItem("userToken", JSON.stringify(payload))
    //Navigate to Home Page
    this._Router.navigate(['/home'])
  }
}
