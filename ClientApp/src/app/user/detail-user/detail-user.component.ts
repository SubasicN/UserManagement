import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormMode } from 'src/app/enum/formMode.enum';
import { User } from 'src/app/models/user.model';
import { SharedService } from 'src/SharedService.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  title: string;
  formMode = FormMode;
  @Input() mode: FormMode;
  @Input() modeForAssign: FormMode;
  @Input() user: User;
  @Output() onChangeMode = new EventEmitter<any>();
  
  constructor(private service: SharedService,private toastr: ToastrService) { 
    this.user = new User();

  }

  ngOnInit() {
    switch (this.mode) {
      case FormMode.create:
        this.title = "Create new user"
        break;
      case FormMode.edit:
        this.title = "Edit user"
        break;
      case FormMode.view:
        this.title = "View user"
        break;
      default:
        this.title = "View user"
        break;
    }
  }
  onSave(mode: FormMode) {
    if (mode == FormMode.create) {
      this.service.insertUser(this.user).subscribe(result => {
        this.user = new User();
        this.toastr.success(result,"Success");
      }, error => this.toastr.error(JSON.parse(error.error).Message,'Error'));
    }
    else if (mode == FormMode.edit) {
      this.service.updatetUser(this.user).subscribe(result => {
        this.toastr.success(result,"Success");
        this.onBack();
      }, error => this.toastr.error(JSON.parse(error.error).Message,'Error'));
    }
  }

  public onBack() {
    this.onChangeMode.emit(FormMode.table);
  }

}
