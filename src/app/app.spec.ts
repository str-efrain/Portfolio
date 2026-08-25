import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

const cvInfo = {
  profileSummary: [],
  projects: [],
  skills: ['Angular'],
  tools: [],
  education: {
    courses: [],
  },
  experience: [],
  languages: [],
  strengths: [],
  extra: {
    title: 'Extra title',
    description: 'Extra description',
  },
  contact: {
    links: [
      {
        label: 'Email',
        href: 'mailto:test@example.com',
      },
    ],
  },
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const httpTesting = TestBed.inject(HttpTestingController);

    expect(fixture.componentInstance).toBeTruthy();
    httpTesting.expectOne('json/cv_info.json').flush(cvInfo);
    httpTesting.verify();
  });

  it('should render JSON CV skills', async () => {
    const fixture = TestBed.createComponent(App);
    const httpTesting = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    httpTesting.expectOne('json/cv_info.json').flush(cvInfo);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.skill-wrap')?.textContent).toContain('Angular');
    httpTesting.verify();
  });
});
