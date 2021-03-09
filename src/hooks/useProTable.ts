import { useMemo } from 'react';
import { AsyncApiProps, Page, Sort, useList } from '@share/list';
import { useFormState } from './useFormState';
import { getDataToFormDataByMapField, getFormDataToDataByMapField, clearEmptyField } from '../utils/fieldTransform';
import { refresh, query, reset, tabsSwitch } from '../utils/operation';
import { PTState, IMapField } from '../types';

export interface UseProTableOptions<Condition, RowEntity> extends AsyncApiProps<Condition, RowEntity>{
    initData: Record<string, any>
    initSort: Sort
    initPage: Page
    tabsField?: string
    mapField?: IMapField
    willClearEmptyField?: boolean
    autoLoad?: boolean
}

export function useProTable<Condition = any, RowEntity = any>(
    options: UseProTableOptions<Condition, RowEntity>
): PTState<Condition, RowEntity> {
    const {
        initData = {}, initPage, initSort,
        tabsField,
        mapField,
        willClearEmptyField = true,
        ...restParams
    } = options;
    const formState = useFormState(initData);

    const dataToFormData = useMemo(
        () => (!mapField ? ((v: Record<string, any>) => v) : getDataToFormDataByMapField(mapField)),
        [mapField]
    );
    const formDataToData = useMemo(
        () => (!mapField ? ((v: Record<string, any>) => v) : getFormDataToDataByMapField(mapField)),
        [mapField]
    );

    const initRequestData = clearEmptyField(formDataToData(initData), willClearEmptyField);
    const listState = useList<Condition & typeof initData, RowEntity>({
        ...restParams,
        autoLoad: restParams.autoLoad === false ? false : {
            requestData: initRequestData as Condition,
            sort: initSort,
            page: initPage
        }
    });

    const ptContext = {
        tabsValue: tabsField ? formState.getFieldValue(tabsField) : '',
        initData, tabsField, formState, listState,
        dataToFormData, formDataToData,
        willClearEmptyField
    };

    return {
        ...ptContext,
        refresh: () => refresh(ptContext),
        query: () => query(ptContext),
        reset: () => reset(ptContext),
        tabsSwitch: (
            newValue: string | number,
            resetForm?: boolean,
            refreshTable?: boolean
        ): Promise<void> => tabsSwitch(ptContext, newValue, resetForm, refreshTable)
    };
}

export const usePT = useProTable;
