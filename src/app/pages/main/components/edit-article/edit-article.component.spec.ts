import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditArticleComponent } from './edit-article.component';

xdescribe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: []
    });
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
