import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
})
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
    return this.http.post(this.ApiUrl + '/user/InsertUser', user, { responseType: 'text' });
  }
  updatetUser(user: any) {
    return this.http.put(this.ApiUrl + '/user/UpdateUser', user, { responseType: 'text' });
  }
  deleteUser(id: any) {
    return this.http.delete(this.ApiUrl + '/user/DeleteUser?id=' + id, { responseType: 'text' });
  }

  /*UserPermission table*/
  getAllUsersPermission(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/userPermission/GetAllUsersPermission');
  }
  getPermissionForUser(userID : any): Observable<any[]> {
    return this.http.get<any[]>(this.ApiUrl + '/userPermission/GetPermissionForUser?userId='+userID);
  }
  getUserPermission(userPermission: any) {
    return this.http.get<any>(this.ApiUrl + '/userPermission/GetUserPermission', userPermission);
  }
  insertUserPermission(userPermission: any) {
    return this.http.post(this.ApiUrl + '/userPermission/InsertUserPermission', userPermission, { responseType: 'text' });
  }
  updatetUserPermission(userPermission: any) {
    return this.http.put(this.ApiUrl + '/userPermission/UpdateUserPermission', userPermission, { responseType: 'text' });
  }
  deleteUserPermission(id: any) {
    return this.http.delete(this.ApiUrl + '/userPermission/DeleteUserPermission?id=' + id, { responseType: 'text' });
  }

}
