import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from './app/models/pageRequest.model';
import { Pagination } from './app/models/pagination.model';
import { Permission } from './app/models/permission.model';
import { User } from './app/models/user.model';
import { UserPermission } from './app/models/userPermission';

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
  getAllPermissionsForPagination(pagination: Pagination): Observable<PageRequest<Permission>> {
    return this.http.get<PageRequest<Permission>>(this.ApiUrl + '/permission/GetAllPermissionForPagination?page='+pagination.page + '&&pageSize='+pagination.pageSize);
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
  getAllUsersForPagination(pagination: Pagination): Observable<PageRequest<User>> {
    return this.http.get<PageRequest<User>>(this.ApiUrl + '/user/GetAllUsersForPagination?page='+pagination.page + '&&pageSize='+pagination.pageSize);
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
  getAllUsersPermissionForPagination(pagination: Pagination): Observable<PageRequest<UserPermission>> {
    return this.http.get<PageRequest<UserPermission>>(this.ApiUrl + '/userPermission/GetAllUsersPermissionForPagination?page='+pagination.page + '&&pageSize='+pagination.pageSize);
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
