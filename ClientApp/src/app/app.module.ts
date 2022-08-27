import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedService } from 'src/SharedService.service';
import { PermissionComponent } from './permission/permission.component';
import { DetailPermissionComponent } from './permission/detail-permission/detail-permission.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PermissionComponent,
    DetailPermissionComponent,
    UserComponent,
    DetailUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    RouterModule.forRoot([
      { path: '', component: UserComponent },
      { path: 'user', component: UserComponent },
      { path: 'permission', component: PermissionComponent },
    ])
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
