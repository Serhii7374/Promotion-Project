import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInformationComponent } from './edit-information.component';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { IUserData } from '../../../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';

describe('EditInformationComponent', () => {
  let component: EditInformationComponent;
  let fixture: ComponentFixture<EditInformationComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userData: IUserData;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['updateUserInformation']);
    userData = {
      email: 'serg@gmail.com',
      uid: '123',
      firstName: 'John',
      lastName: 'Doe',
      age: '30',
      avatarUrl: 'url'
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: ActivatedRoute, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditInformationComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserData on ngOnInit', () => {
    spyOn(component, 'getUserData');
    component.ngOnInit();
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should call setActualDataToForm on ngOnInit', () => {
    spyOn(component, 'setActualDataToForm');
    component.ngOnInit();
    expect(component.setActualDataToForm).toHaveBeenCalled();
  });

  it('should call updateUserInformation on saveDataToDB', () => {
    spyOn(component, 'saveDataToDB');
    component.saveDataToDB();
    expect(component.saveDataToDB).toHaveBeenCalled();
  });

  it('should call updateUserInformation from authService on saveDataToDB', () => {
    component.user = userData;
    component.form.setValue({ firstName: 'Jane', lastName: 'Doe', age: '25' });
    authServiceSpy.updateUserInformation.and.returnValue();

    component.saveDataToDB();

    expect(authServiceSpy.updateUserInformation).toHaveBeenCalledWith(
      userData.uid,
      { firstName: 'Jane', lastName: 'Doe', age: '25' }
    );
  });
});
