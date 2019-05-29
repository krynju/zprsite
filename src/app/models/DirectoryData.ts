export interface DirectoryData {
  cwd: string;
  files: FFile[];
}

export interface FFile {
  filename: string;
  status: string;
  columns?: string[];
}
