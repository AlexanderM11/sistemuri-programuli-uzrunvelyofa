export type CustomAlertProps = {
    showModal: boolean;
    closeModal: () => void;
    headerTitle?: string;
    bodyText: string;
    confirmFunction?: () => void;
    confirmButtonTitle: string;
    alertIcon?: 'completeIcon';
    cancellationButtonText?: string;
};
