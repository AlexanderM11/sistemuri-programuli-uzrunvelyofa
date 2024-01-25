export type SelectComponentProps = {
    route?: string;
    modalTitle: string;
    afterSelect: any;
    selectedItem: any;
    disabled?: boolean;
    renderItem: (
        item: any,
        oneLineText?: boolean,
        fontSize?: number,
        disabled?: boolean,
        key?: number,
    ) => React.ReactNode;
    itemId?: number;
    selectedTitle: string;
    headerLeftIcon:
        | 'backButton'
        | 'headerAccountIcon'
        | 'closeIcon'
    additionalQueryParams?: any;
    staticList?: Array<SelectedValueType | SelectIdValueType | Rule>;
    additionalButtonTitle?: string;
    additionalButtonFunction?: () => void;
    required?: boolean;
    beforeSelect?: () => void;
};

export type PeriodicityType = {
    id: number;
    name: string;
    meta: FrequencyMeta;
};

export type FrequencyMeta = {
    rules: Rule[];
};

export type Rule = {
    id: number;
    name: string;
};

export type SelectIdValueType = {
    id: number;
    value: string;
};

export type SelectedValueType = {
    id: number;
    name: string;
    code?: string;
    code_with_name?: string;
    type: string;
};

export type ModalPropsType = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    setSelectedValue: (
        selectedData: SelectedValueType | SelectIdValueType | Rule,
    ) => void;
    route?: string;
    modalTitle: string;
    renderItem: (
        item: any,
        oneLineText?: boolean,
        fontSize?: number,
        disabled?: boolean,
        key?: number,
    ) => React.ReactNode;
    headerLeftIcon:
        | 'backButton'
        | 'headerAccountIcon'
        | 'closeIcon';
    additionalQueryParams?: any;
    staticList?: Array<SelectedValueType | SelectIdValueType | Rule>;
    additionalButtonTitle?: string;
    additionalButtonFunction?: () => void;
};

export type searchValuesType = {
    page: number;
    searchText: string;
};

export type searchValuesWithRouteType = {
    page: number;
    searchText: string;
    route?: string;
    onAuthorizationErrorCatch: () => void;
    queryParams: string;
};
