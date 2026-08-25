import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

interface Project {
  title: string;
  context: string;
  description: string;
  tags: string[];
}

interface Experience {
  role: string;
  place: string;
  period: string;
  details: string[];
}

interface Language {
  name: string;
  level: number;
}

interface ProfileItem {
  label: string;
  value: string;
}

interface Link {
  label: string;
  href: string;
}

interface CvInfo {
  profileSummary: ProfileItem[];
  projects: Project[];
  skills: string[];
  tools: string[];
  education: {
    courses: string[];
  };
  experience: Experience[];
  languages: Language[];
  strengths: string[];
  extra: {
    title: string;
    description: string;
  };
  contact: {
    links: Link[];
  };
}

const emptyCvInfo: CvInfo = {
  profileSummary: [],
  projects: [],
  skills: [],
  tools: [],
  education: {
    courses: [],
  },
  experience: [],
  languages: [],
  strengths: [],
  extra: {
    title: '',
    description: '',
  },
  contact: {
    links: [
      {
        label: '',
        href: '#contact',
      },
    ],
  },
};

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly http = inject(HttpClient);

  protected readonly cv = signal<CvInfo>(emptyCvInfo);
  protected readonly languageScale = [1, 2, 3, 4, 5];

  constructor() {
    this.http.get<CvInfo>('json/cv_info.json').subscribe((cvInfo) => {
      this.cv.set(cvInfo);
    });
  }
}
