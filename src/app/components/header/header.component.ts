import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private _Authservice: AuthService) {}
  @Input({ required: true }) usserImg: string = '';
  @Input({ required: true }) userName: string = '';
  navList = ["Home", "TV Shows", "News & Popular", "My List", "Browse By Language"];
  signOut() {
    sessionStorage.removeItem("userToken")
    this._Authservice.signOut();
  }
}
