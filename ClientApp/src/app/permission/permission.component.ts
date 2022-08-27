import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/SharedService.service';
import { FormMode } from '../enum/formMode.enum';
import { Permission } from '../models/permission.model';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {


  // Make a variable reference to our Enum
  formMode = FormMode;

  public permissions?: Permission[];
  public mode: FormMode = FormMode.table;
  public order: boolean = false;
  public permissionForEdit: Permission;
  public permissionForView: Permission;
  closeResult: string = '';

  constructor(http: HttpClient, private service: SharedService,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }


  refreshList() {
    this.service.getAllPermissions().subscribe(result => {
      this.permissions = result;
    })
  }

  onAdd() {
    this.mode = FormMode.create;
  }
  onEdit(permission: Permission) {
    this.permissionForEdit = permission;
    this.mode = FormMode.edit;
  }

  onView(permission: Permission) {
    this.permissionForView = permission;
    this.mode = FormMode.view;
  }
  onDelete(permission: Permission,content : any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.service.deletePermmision(permission.id).subscribe(result => {
        this.toastr.success(result,'Success');
        this.refreshList();
      }, error => console.error(error));
    },error => {})
  }

  public changeMode(mode: FormMode): void {
    if (this.mode == FormMode.create || this.mode == FormMode.edit) {
      this.refreshList();
    }
    this.mode = mode;
  }
}
