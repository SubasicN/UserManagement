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
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { DetailUserPermissionComponent } from './user-permission/detail-user-permission/detail-user-permission.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PermissionComponent,
    DetailPermissionComponent,
    UserComponent,
    DetailUserComponent,
    UserPermissionComponent,
    DetailUserPermissionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
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
      { path: 'userPermission', component: UserPermissionComponent },
    ])
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
