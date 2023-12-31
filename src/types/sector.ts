export interface SubsectorType {
  sector: string;
  subsectors: (string | SubsectorType)[];
}
