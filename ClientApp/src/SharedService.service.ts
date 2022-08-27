import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly ApiUrl = "https://localhost:44332/api";
  constructor(private http: HttpClient) {
  }


  /*Permission table*/

  getAllPermissions(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/permission/GetAllPermissions');
  }
  getPermmision(permission: any) {
    return this.http.get<any>(this.ApiUrl + '/permission/GetPermission', permission);
  }
  insertPermmision(permission: any) {
    return this.http.post(this.ApiUrl + '/permission/InsertPermission', permission, { responseType: 'text' });
  }
  updatetPermmision(permission: any) {
    return this.http.put(this.ApiUrl + '/permission/UpdatePermission', permission, { responseType: 'text' });
  }
  deletePermmision(id: any) {
    return this.http.delete(this.ApiUrl + '/permission/DeletePermission?id=' + id, { responseType: 'text' });
  }

  /*User table*/
  getAllUsers(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/user/GetAllUsers');
  }
  getUser(user: any) {
    return this.http.get<any>(this.ApiUrl + '/user/GetUser', user);
  }
  insertUser(user: any) {
    return this.http.post(this.ApiUrl + '/user/InserUser', user, { responseType: 'text' });
  }
  updatetUser(user: any) {
    return this.http.put(this.ApiUrl + '/user/UpdateUser', user, { responseType: 'text' });
  }
  deleteUser(id: any) {
    return this.http.delete(this.ApiUrl + '/user/DeleteUser?id=' + id, { responseType: 'text' });
  }

  /*UserPermission table*/
  getAllUsersPermission(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/user/GetAllUsersPermission');
  }
  getPermissionForUser(user : any) {
    return this.http.get<any>(this.ApiUrl + '/user/GetPermissionForUser',user);
  }
  getUserPermission(userPermission: any) {
    return this.http.get<any>(this.ApiUrl + '/user/GetUserPermission', userPermission);
  }
  insertUserPermission(userPermission: any) {
    return this.http.post(this.ApiUrl + '/user/InsertUserPermission', userPermission, { responseType: 'text' });
  }
  updatetUserPermission(userPermission: any) {
    return this.http.put(this.ApiUrl + '/user/UpdateUserPermission', userPermission, { responseType: 'text' });
  }
  deleteUserPermission(id: any) {
    return this.http.delete(this.ApiUrl + '/user/DeleteUserPermission?id=' + id, { responseType: 'text' });
  }

}
