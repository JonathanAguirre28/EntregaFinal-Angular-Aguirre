import { Component } from '@angular/core';
import { User } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent {
  public user: User | null = null;
  public userId?: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private notification: NotifierService,
    private userService: UserService,
     ) {
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
    this.router.navigate(['dashboard','users']);
    this.notification.showError(`${this.activatedRoute.snapshot.params['id']} No es un ID valido`);
  } else {
    this.userId = Number(this.activatedRoute.snapshot.params['id']);
    this.loadUser();
  }
}
  loadUser(): void {
    if(this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => console.log(user),
      })
    }
  }
}


