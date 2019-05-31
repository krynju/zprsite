export interface DirectoryData {
  cwd: string;
  files: FFile[];
}

export interface FFile {
  filename: string;
  status: string;
  columns?: string[];
}

export class Report {
  name: string;
  href?: string;

  constructor(name: string, href: string) {
    this.name = name;
    this.href = href;
  }
}
