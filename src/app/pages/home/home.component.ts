import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

// HomeComponent.ts
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private _Authservice: AuthService) { }
  userToken = JSON.parse(sessionStorage.getItem("userToken")!);
  name = this.userToken.name;
  userProfileImg = this.userToken.picture;
  email = this.userToken.email;


  signOut() {
    sessionStorage.removeItem("userToken")
    this._Authservice.signOut();
  }
}
