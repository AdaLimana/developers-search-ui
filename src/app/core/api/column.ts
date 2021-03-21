export interface Column{
    field: string,
    header: string,
    type: 'text'|'number'|'currency'|'percent'|'date'|'datetime'|'select'|'template',
    options?: {label: string, value: any}[]
}