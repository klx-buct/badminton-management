import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private nzMessageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const userMsg = {
      ...this.validateForm.value
    }

    if(userMsg.username === 'user1') {
      this.nzMessageService.create('error', '您没有权限登录后台界面');

      return ;
    }

    this.loginService.login(userMsg.username, userMsg.password, userMsg.remember).subscribe(response => {
      if(response.code === 0) {
        if(response.message.result) {
          this.loginService.setCookie("access_token", response.message.token, userMsg.remember);
          this.loginService.setCookie("username", userMsg.username, userMsg.remember);
          this.router.navigateByUrl("/main/overview");
        }else {
          this.nzMessageService.create('error', '用户名或密码错误');
        }
      }else {
        this.nzMessageService.create('error', '您已被禁止登录，请联系管理员解除限制');
      }
    })
  }

}
