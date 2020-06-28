import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn} from '@angular/forms';
import { CryptoService } from '../../services/crypto.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formHeader = 'User Registration';
  registerForm: FormGroup;
  hobbiesList: Array<any> = [{name: 'Reading', value: 'read'},
  {name: 'Cycling', value: 'cycling'},
  {name: 'Net surfing', value: 'browsing'},
  {name: 'Gardening', value: 'gardening'},
];

  constructor(private fb: FormBuilder, private cryptoService: CryptoService, private registerService: RegisterService ) {
    this.registerForm = this.fb.group({
      uName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      uMail: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
      uMobile: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
      uAge: new FormControl('', [Validators.required]),
      uPAN: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,20}$/)]),
      confpwd: new FormControl('', [Validators.required]),
      uGender: new FormControl('', [Validators.required]),
      uHobbies: this.fb.array([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ], this.minSelectedHobbies(2))
    }, {validator: this.passwordMatchValidator()});
   }

   minSelectedHobbies(min = 2) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      let selectedCount = 0;
      formArray.controls.map((control) => {
        if (control.value) {
          selectedCount++;
        }
      });
      return selectedCount >= min ? null : {required: true};
    };
    return validator;
  }

   passwordMatchValidator(){
    const validator: ValidatorFn = (formGroup: FormGroup) => {
      const pwdObj = formGroup.get('pwd');
      const cPwdObj = formGroup.get('confpwd');
      if (pwdObj.dirty && cPwdObj.dirty && cPwdObj.value !== '' && pwdObj.value !== cPwdObj.value){
        return { pwdMismatch: true };
      }else{
        return null;
      }
    };
    return validator;
   }

  ngOnInit(){
  }
  registeredUser(){
    console.log('Registeration starting');
    console.log('UserObject ==> ' + this.registerForm.value);
    const selectedHobbies = this.registerForm.value.uHobbies
  .map((val: string, index: number) => (val ? this.hobbiesList[index].value : null))
  .filter((val: string) => val !== null);
    this.registerForm.value.uPAN = this.registerForm.value.uPAN.toUpperCase();
    this.registerForm.value.uHobbies = selectedHobbies.join(',');
    this.registerForm.value.password = this.cryptoService.passwordHashing(this.registerForm.value.password);
    this.registerService.newUserRegistration(this.registerForm.value).subscribe((resp) => {
    alert('User Registered Successfully!. Try logging in now');
    this.registerForm.reset();
  }, (err) => {
    console.log('Err is-->', err);
  });
}

  get name(){
    return this.registerForm.get('uName');
  }

  get mail(){
    return this.registerForm.get('uMail');
  }

  get mobile(){
    return this.registerForm.get('uMobile');
  }
  get PAN(){
    return this.registerForm.get('uPAN');
  }

  get password(){
    return this.registerForm.get('pwd');
  }
  get confpassword(){
    return this.registerForm.get('confpwd');
  }

  get hobbiesArray(){
    return this.registerForm.get('uHobbies');
  }

  get gender(){
    return this.registerForm.get('uGender');
  }

  get age(){
    return this.registerForm.get('uAge');
  }
}
