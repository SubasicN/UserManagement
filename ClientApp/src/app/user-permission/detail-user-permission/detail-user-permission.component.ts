import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormMode } from 'src/app/enum/formMode.enum';
import { Permission } from 'src/app/models/permission.model';
import { User } from 'src/app/models/user.model';
import { UserPermission } from 'src/app/models/userPermission';
import { SharedService } from 'src/SharedService.service';

@Component({
  selector: 'app-detail-user-permission',
  templateUrl: './detail-user-permission.component.html',
  styleUrls: ['./detail-user-permission.component.css']
})
export class DetailUserPermissionComponent implements OnInit {

  title: string;
  formMode = FormMode;
  permissions: Permission[];
  @Input() mode: FormMode;
  @Input() userPermission: UserPermission;
  @Output() onChangeMode = new EventEmitter<any>();
  
  constructor(private service: SharedService,private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    switch (this.mode) {
      case FormMode.create:
        this.title = "Add permission for selected user"
        break;
      case FormMode.edit:
        this.title = "Edit permission for selected user"
        break;
      default:
        this.title = "View user - permission"
        break;
    }  

    this.getPermissions();
    
  }
  onSave(mode: FormMode) {
    if (mode == FormMode.create) {
      this.service.insertUserPermission(this.userPermission).subscribe(result => {
        this.userPermission.permission = new Permission();
        this.toastr.success(result,"Success");
      }, error => this.toastr.error(error,"Error"));
    }
    else if (mode == FormMode.edit) {
      this.service.updatetUserPermission(this.userPermission).subscribe(result => {
        this.toastr.success(result,"Success");
        this.onBack();
      }, error => this.toastr.error(error,"Error"));
    }
  }

  public onBack() {
    this.onChangeMode.emit(FormMode.table);
  }

  getPermissions(){
      this.service.getAllPermissions().subscribe(result => {
        this.permissions = result;
      }, error => this.toastr.error(error,"Error"))
  }
  onPermissionChange(permission: any): void {
    this.userPermission.permission = permission;
}
  

}
