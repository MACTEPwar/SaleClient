import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AuthorizeService } from './authorize.service';
import { HttpClientModule } from '@angular/common/http';
import { type } from 'os';
import { ɵCodegenComponentFactoryResolver } from '@angular/core';

describe('AuthorizeService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));
  const authorizeService: AuthorizeService = TestBed.get(AuthorizeService);

  it('should be created', () => {
    expect(authorizeService).toBeTruthy();
  });

  // it('IsAuthorized', async (() => {
  //   const service: AuthorizeService = TestBed.get(AuthorizeService);
  //   //expect(await service.IsAuthorized).toEqual("boolean");
  //   //spyOn(authorizeService,'IsAuthorized').and.returnValue(true);
  //   await authorizeService.IsAuthorized().then(value => expect(value).toBeTruthy());
  //   // expect(typeof service.IsAuthorized).toEqual("boolean");
  // }));


  // it('IsAuthorized',async () => {
  //   let auth = await authorizeService.IsAuthorized();
  //   expect(typeof auth).toEqual("boolean");
  // });


  // it(`should have as title 'SaleClient'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('SaleClient');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to SaleClient!');
  // });
});
