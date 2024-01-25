export type BottomModalPropsType = {
    visible: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    height?: number;
    isLoading?: boolean;
    darkness?: string;
};
