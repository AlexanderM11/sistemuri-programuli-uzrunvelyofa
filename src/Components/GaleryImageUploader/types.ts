export type GaleryImageUploaderPropsType = {
    uploaderTitle: string;
    required?: boolean;
    disabled?: boolean;
    errorsCount: number;
    iconType: 'diploma' | 'license' | 'idCard' | 'profileImage';
    filesArray: PickedDocumentType[];
    setFilesArray: (files: PickedDocumentType[]) => void;
    showErrors: boolean;
    setEditableExperience?: () => void;
    maxFilesNumber?: number;
    maxFilesNumberError?: string;
    onComponentPress?: () => void;
};

export type PickedDocumentType = {
    id?: number;
    uri?: string;
    name?: string | null;
    copyError?: string;
    fileCopyUri?: string | null;
    type?: string | null;
    size?: number | null;
    base64?: string | null;
    need_reupload?: boolean;
};
