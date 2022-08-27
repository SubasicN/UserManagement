import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormMode } from 'src/app/enum/formMode.enum';
import { Permission } from 'src/app/models/permission.model';
import { SharedService } from 'src/SharedService.service';

@Component({
  selector: 'app-detail-permission',
  templateUrl: './detail-permission.component.html',
  styleUrls: ['./detail-permission.component.css']
})
export class DetailPermissionComponent implements OnInit {

  title: string;
  formMode = FormMode;
  @Input() mode: FormMode;
  @Input() permission: Permission;
  @Output() onChangeMode = new EventEmitter<any>();

  constructor(private service: SharedService,private toastr: ToastrService) { 
    this.permission = new Permission();
  }

  ngOnInit() {
    switch (this.mode) {
      case FormMode.create:
        this.title = "Create new permission"
        break;
      case FormMode.edit:
        this.title = "Edit permission"
        break;
      case FormMode.view:
        this.title = "View permission"
        break;
      default:
        this.title = "View permission"
        break;
    }
  }

  onSave(mode: FormMode) {
    if (mode == FormMode.create) {
      this.service.insertPermmision(this.permission).subscribe(result => {
        this.permission = new Permission();
        this.toastr.success(result,"Success");
      }, error => console.error(error));
    }
    else if (mode == FormMode.edit) {
      this.service.updatetPermmision(this.permission).subscribe(result => {
        this.toastr.success(result,"Success");
        this.onBack();
      }, error => console.error(error));
    }
  }
  

  public onBack() {
    this.onChangeMode.emit(FormMode.table);
  }

}
