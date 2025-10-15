// Simple global state store without external dependencies
type Listener = () => void;

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

export interface OCRResult {
  fileId: string;
  text: string;
  confidence: number;
}

export interface Rubric {
  criteria: RubricCriterion[];
  totalMarks: number;
}

export interface RubricCriterion {
  id: string;
  name: string;
  maxMarks: number;
  description: string;
}

export interface EvaluationResult {
  id: string;
  fileId: string;
  rubricId: string;
  scores: { criterionId: string; score: number; feedback: string }[];
  totalScore: number;
  overallFeedback: string;
  timestamp: Date;
}

interface AppState {
  uploadedFiles: UploadedFile[];
  ocrResults: OCRResult[];
  rubric: Rubric | null;
  evaluations: EvaluationResult[];
  currentFileId: string | null;
}

class Store {
  private state: AppState = {
    uploadedFiles: [],
    ocrResults: [],
    rubric: null,
    evaluations: [],
    currentFileId: null,
  };

  private listeners: Listener[] = [];

  getState(): AppState {
    return this.state;
  }

  setState(updater: (state: AppState) => Partial<AppState>) {
    this.state = { ...this.state, ...updater(this.state) };
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Actions
  addUploadedFile(file: UploadedFile) {
    this.setState((state) => ({
      uploadedFiles: [...state.uploadedFiles, file],
      currentFileId: file.id,
    }));
  }

  setOCRResult(result: OCRResult) {
    this.setState((state) => ({
      ocrResults: [...state.ocrResults.filter((r) => r.fileId !== result.fileId), result],
    }));
  }

  setRubric(rubric: Rubric) {
    this.setState(() => ({ rubric }));
  }

  addEvaluation(evaluation: EvaluationResult) {
    this.setState((state) => ({
      evaluations: [...state.evaluations, evaluation],
    }));
  }

  setCurrentFileId(fileId: string | null) {
    this.setState(() => ({ currentFileId: fileId }));
  }
}

export const appStore = new Store();

