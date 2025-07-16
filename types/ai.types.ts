import { FormField, FormGroupItem, FormStep } from "./builder.types";

export type AITask = {
    index: number;
    whatIWillDo: string;
    instructionPrompt: string;
    targetID: string;
    taskType: AITaskType;
}

export type AIResponse = {
    index: number;
    targetID: string;
    result: { formField: FormField; formGroup: FormGroupItem } | FormStep;
    taskType: AITaskType;
}

export type AITaskType =
    'create-form-step' |
    'update-form-step' |
    'delete-form-step' |
    'create-form-group' |
    'update-form-group' |
    'delete-form-group';
